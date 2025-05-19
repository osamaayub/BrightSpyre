"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Filters, Job, FilterToggles } from "@/types/filter";
import JobCard from "@/components/jobCards/JobCard";
import { Pagination } from "@/components/pagination/pagination-job";




export function JobsList({ filters }: { filters: Filters }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Filters>(filters);
  const [filterToggles, setFilterToggles] = useState<FilterToggles>({
    category: true,
    organization: true,
    city: true,
  });

  const jobsPerPage = 90;

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/jobs");
        setJobs(response.data.results || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [filters]);

  const toggleFilterSection = (key: keyof FilterToggles) => {
    setFilterToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetFilters = () => {
    setActiveFilters({
      category_name: [],
      organization: [],
      city: [],
      country: [],
    });
    setCurrentPage(1);
  };

  const handleFilterChange = (filterKey: keyof Filters, value: any) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: value }));
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    const seen = new Map();

    jobs.forEach((job) => {
      const { category_name, organization, city, country } = activeFilters;

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
            .map((org: string) => org.trim()) || [];

          return orgs.includes(filterOrganization.toLowerCase());
        });

      const matchesCity =
        city.length === 0 ||
        city.some((filterCity) =>
          job.city
            .toLowerCase()
            .split(",")
            .map((c: string) => c.trim())
            .includes(filterCity.toLowerCase())
        );

      const matchesCountry =
        country.length === 0 ||
        country.map((c) => c.toLowerCase()).includes(job.country?.toLowerCase());

      if (matchesCategory && matchesOrganization && matchesCity && matchesCountry) {
        seen.set(job.id, job);
      }
    });

    return Array.from(seen.values());
  }, [activeFilters, jobs]);

  //pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  //filters function
  function getUniqueAndCount(field: keyof typeof activeFilters) {
    const counts: Record<string, number> = {};

    jobs.forEach((job) => {
      const values = job[field]
        ?.toLowerCase()
        .split(/[,&]/)
        .map((v: string) => v.trim())
        .filter((v) =>
          // allow valid city names only
          /^[a-z\s]{3,}$/i.test(v) && // at least 3 letters, only alphabets & spaces
          !/\d/.test(v) &&            // no numbers
          !/[^\w\s]/.test(v)          // no special characters
        );

      values?.forEach((val: string) => {
        counts[val] = (counts[val] || 0) + 1;
      });
    });

    return counts;
  }

  const categoryCounts = getUniqueAndCount("category_name");
  const organizationCounts = getUniqueAndCount("organization");
  const cityCounts = getUniqueAndCount("city");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 lg:w-1/4  bg-gray-50 p-4 rounded shadow-md h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3
              className="cursor-pointer font-medium mb-2"
              onClick={() => toggleFilterSection("category")}
            >
              Categories {filterToggles.category ? "▼" : "▶"}
            </h3>
            {filterToggles.category && (
              <div className="space-y-1 max-h-48 overflow-y-auto text-sm">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <label key={cat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.category_name.includes(cat)}
                      onChange={(e) => {
                        let newFilters = [...activeFilters.category_name];
                        if (e.target.checked) {
                          newFilters.push(cat);
                        } else {
                          newFilters = newFilters.filter((f) => f !== cat);
                        }
                        handleFilterChange("category_name", newFilters);
                      }}
                    />
                    <span>{cat} ({count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Organization Filter */}
          <div className="mb-4">
            <h3
              className="cursor-pointer font-medium mb-2"
              onClick={() => toggleFilterSection("organization")}
            >
              Organizations {filterToggles.organization ? "▼" : "▶"}
            </h3>
            {filterToggles.organization && (
              <div className="space-y-1 max-h-48 overflow-y-auto text-sm">
                {Object.entries(organizationCounts).map(([org, count]) => (
                  <label key={org} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.organization.includes(org)}
                      onChange={(e) => {
                        let newFilters = [...activeFilters.organization];
                        if (e.target.checked) {
                          newFilters.push(org);
                        } else {
                          newFilters = newFilters.filter((f) => f !== org);
                        }
                        handleFilterChange("organization", newFilters);
                      }}
                    />
                    <span>{org} ({count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* City Filter */}
          <div>
            <h3
              className="cursor-pointer font-medium mb-2"
              onClick={() => toggleFilterSection("city")}
            >
              Cities {filterToggles.city ? "▼" : "▶"}
            </h3>
            {filterToggles.city && (
              <div className="space-y-1 max-h-48 overflow-y-auto text-sm">
                {Object.entries(cityCounts).map(([city, count]) => (
                  <label key={city} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.city.includes(city)}
                      onChange={(e) => {
                        let newFilters = [...activeFilters.city];
                        if (e.target.checked) {
                          newFilters.push(city);
                        } else {
                          newFilters = newFilters.filter((f) => f !== city);
                        }
                        handleFilterChange("city", newFilters);
                      }}
                    />
                    <span>{city} ({count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
              onClick={resetFilters}
              className=" w-full text-sm bg-gray-300 px-3 py-2 rounded text-black hover:bg-purple-600"
            >
              Clear All
          </button>
        </aside>
       

        {/* Main Content */}
        <main className="flex-1">

          {loading ? (
            <p className="text-center text-gray-600">Loading jobs...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <>
              <div className="mb-5 text-black">{currentJobs.length} of {filteredJobs.length} jobs </div>
              <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto px-4">

                {currentJobs.length === 0 ? (
                  <p className="text-center col-span-full">No jobs found.</p>
                ) : (
                  currentJobs.map((job) => <JobCard key={job.id} job={job} />)
                )}
              </div>
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={jobsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
