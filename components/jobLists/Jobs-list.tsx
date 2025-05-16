"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Filters } from "@/types/filter";
import JobCard from "@/components/jobCards/JobCard";
import { Pagination } from "@/components/pagination/pagination-job";


export function JobsList({ filters }: { filters: Filters }) {
  const [state, setState] = useState({
    jobs: [] as any[],
    loading: true,
    error: null as string | null,
    currentPage: 1,
    activeFilters: filters,
    filterToggles: {
      category: true,
      organization: true,
      city: true,
    },
  });

  const jobsPerPage = 90;

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  async function fetchJobs() {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await axios.get("/api/jobs");
      setState((prev) => ({ ...prev, jobs: response.data.results || [], loading: false }));

    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        error: err.response?.data?.message || "An unexpected error occurred.",
        loading: false,
      }));
    }
  }

  const handleFilterChange = (filterKey: keyof Filters, value: any) => {
    setState((prev) => ({
      ...prev,
      activeFilters: { ...prev.activeFilters, [filterKey]: value },
    }));
  };

  // Reset Filters
  const resetFilters = () => {
    setState((prev) => ({
      ...prev,
      activeFilters: {
        category_name: [],
        organization: [],
        city: [],
        country: [],
      },
      currentPage: 1,
    }));
  };


  // Filter jobs based on filters
  const filteredJobs = useMemo(() => {
    const seen = new Map();

    state.jobs.forEach((job) => {
      const { category_name, organization, city, country } = state.activeFilters;

      const matchesCategory =
        category_name.length === 0 ||
        category_name.some((filterCategory) =>
          job.category_name
            ?.toLowerCase()
            .split(/[,&]/)
            .map((cat: string) => cat.trim())
            .includes(filterCategory.toLowerCase())
        );

        const matchesOrganization =
        organization.length === 0 ||
        organization.some((filterOrganization) => {
          const orgs = job.organization
            ?.toLowerCase()
            .split(/[,&]/)
            .map((org:string) => org.trim())||[]
      
          return orgs?.includes(filterOrganization.toLowerCase());
        });
      


      const matchesCity =
        city.length === 0 ||
        city.some((filterCity) =>
          job.city
            .toLowerCase()
            .split(',')
            .map((c: string) => c.trim())
            .includes(filterCity.toLowerCase())
        );

      const matchesCountry =
        country.length === 0 ||
        country.map((c) => c.toLowerCase()).includes(job.country?.toLowerCase());

      if (matchesCategory && matchesOrganization && matchesCity && matchesCountry) {
        seen.set(job.id, job); // assumes job.id is unique
      }
    });

    return Array.from(seen.values());
  }, [state.activeFilters, state.jobs]);

  // Categories filter
  const uniqueCategories = useMemo(() => {
    const categorySet = new Set<string>();
    const count: Record<string, number> = {};

    state.jobs.forEach((job) => {
      if (!job.category_name) return;

      job.category_name
        .toLowerCase()
        .split(/[,&]/)
        .map((cat: string) => cat.trim())
        .filter(Boolean)
        .forEach((cat: string) => {
          categorySet.add(cat);
          count[cat] = (count[cat] || 0) + 1;
        });
    });

    return {
      categories: Array.from(categorySet).sort(),
      count,
    };
  }, [state.jobs]);


  const normalizeOrganization=(org:string)=>{
   return  org.toLowerCase()
    .replace(/&/g,"and")
    .replace(/\s+/g," ")
    .trim()

  }
  //organizations filter
  const uniqueOrganizations = useMemo(() => {
    const count: Record<string, number> = {};
    const orgSet = new Set<string>();
  
    state.jobs.forEach((job) => {
      if (!job.organization) return;
  
      // Only split by comma (not by &), and normalize
      job.organization
        .toLowerCase()
        .split(/,&|&/)
        .map((org:string) => normalizeOrganization(org))
        .filter(Boolean)
        .forEach((org:string) => {
          orgSet.add(org);
          count[org] = (count[org] || 0) + 1;
        });
    });
  
    return {
      organizations: Array.from(orgSet).sort(), // deduplicated and sorted
      count,
    };
  }, [state.jobs]);
  

  




  const uniqueLocations = useMemo(() => {
    const separators = /[,().\-–;]| and /gi;
    const noiseWords = ['district', 'remote', 'frequent travel', 'also travel', 'if required'];
  
    const cityCorrections: Record<string, string> = {
      'islmabad': 'islamabad',
      'i khan': 'd.i khan',
      'dik khan': 'd.i khan',
      'balouchistan': 'balochistan',
      'mandi bahaudin': 'mandi bahauddin',
    };
  
    const citiesSet = new Set<string>();
    const countriesSet = new Set<string>();
    const cityCount: Record<string, number> = {};
    const countryCount: Record<string, number> = {};
  
    state.jobs.forEach((job) => {
      if (job.city) {
        const parts = job.city
          .toLowerCase()
          .split(',')
          .map((part: string) => part.trim())
          .filter((part: string) => part.length > 2 && !noiseWords.some(noise => part.includes(noise)))
          .map((part: string) => cityCorrections[part] || part);
  
        parts.forEach((city: string) => {
          citiesSet.add(city);
          cityCount[city] = (cityCount[city] || 0) + 1;
        });
      }
  
      if (job.country) {
        const country = job.country.toLowerCase().trim();
        countriesSet.add(country);
        countryCount[country] = (countryCount[country] || 0) + 1;
      }
    });
  
    return {
      cities: Array.from(citiesSet).sort(),
      countries: Array.from(countriesSet).sort(),
      cityCount,
      countryCount,
    };
  }, [state.jobs]);
  





  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = filteredJobs.slice(
    (state.currentPage - 1) * jobsPerPage,
    state.currentPage * jobsPerPage
  );

  if (state.loading) return <div className="text-center text-gray-600">Loading jobs...</div>;
  if (state.error) return <div className="text-red-600 text-center">{state.error}</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Filters Sidebar */}
      <div className="w-full lg:w-1/4 p-4 border-b  rounded lg:border-b-0 lg:border-r border-gray-300 bg-gray-300">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>

        {/* Category Accordion */}
        <div>
          <h3
            className="text-sm font-medium text-gray-700 mb-2 cursor-pointer"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                filterToggles: { ...prev.filterToggles, category: !prev.filterToggles.category },
              }))
            }
          >
            {state.filterToggles.category ? "▲" : "▼"} Category
          </h3>
          {state.filterToggles.category && (
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {/* categories shown with jobs count */}
              {uniqueCategories.categories.map((category) => (
                <label key={category} className="text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={state.activeFilters.category_name.includes(category)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...state.activeFilters.category_name, category]
                        : state.activeFilters.category_name.filter((c) => c !== category);
                      handleFilterChange("category_name", updated);
                    }}
                  />
                  {category} {uniqueCategories.count[category]}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Organization Accordion */}
        <div className="mt-4">
          <h3
            className="text-sm font-medium text-gray-700 mb-2 cursor-pointer"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                filterToggles: { ...prev.filterToggles, organization: !prev.filterToggles.organization },
              }))
            }
          >
            {state.filterToggles.organization ? "▲" : "▼"} Organization
          </h3>
          {state.filterToggles.organization && (
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {/* organizations shown with jobs count */}
              {uniqueOrganizations.organizations.map((org) => (
                <label key={org} className="text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={state.activeFilters.organization.includes(org)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...state.activeFilters.organization, org]
                        : state.activeFilters.organization.filter((o) => o !== org);
                      handleFilterChange("organization", updated);
                    }}
                  />
                  {org} {uniqueOrganizations.count[org]}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* City Accordion */}
        <div className="mt-4">
          <h3
            className="text-sm font-medium text-gray-700 mb-2 cursor-pointer"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                filterToggles: { ...prev.filterToggles, city: !prev.filterToggles.city },
              }))
            }
          >
            {state.filterToggles.city ? "▲" : "▼"} Location
          </h3>
          {state.filterToggles.city && (
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {uniqueLocations.cities.map((city: string, index: number) => (
                <label key={`${city}-${index}`} className="text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={state.activeFilters.city.includes(city)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...state.activeFilters.city, city]
                        : state.activeFilters.city.filter((c) => c !== city);
                      handleFilterChange("city", updated);
                    }}
                  />
                  {city}  {uniqueLocations.cityCount[city]}
                </label>
              ))}
            </div>
          )}
        </div>
        {/* Actions */}
        <div className="flex items-center justify-between mt-4 gap-2">
          <button
            onClick={resetFilters}
            className="w-full border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Job List Section */}
      <div className="w-full lg:w-3/4 p-4">
        <div className="mb-5 text-black">{paginatedJobs.length} of {filteredJobs.length} jobs</div>
        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-700">No Jobs available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={state.currentPage}
              onPageChange={(page) => setState((prev) => ({ ...prev, currentPage: page }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
