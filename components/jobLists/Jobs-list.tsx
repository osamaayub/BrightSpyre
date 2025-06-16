// app/components/JobsList.tsx
"use client";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import JobCard from "@/components/jobCards/JobCard";
import JobCardSkeleton from "@/components/jobskeleton/jobSkeleton";
import { Pagination } from "@/components/pagination/pagination-job";
import { Filters, Job, FilterToggles } from "@/types/filter";
import { getPostedDaysAgoNumber } from "@/helpers/page";

// Sort jobs by posted days ago in ascending order (oldest first)
function sortJobsByPostedDate(jobs: Job[]): Job[] {
  return [...jobs].sort((a, b) => {
    const daysA = getPostedDaysAgoNumber(a.start_date);
    const daysB = getPostedDaysAgoNumber(b.start_date);
    return daysA - daysB;
  });
}

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

  const jobsPerPage = 25;
  const maxJobs = jobs.length;

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/jobs");
        // Sort jobs in ascending order by posted date
        setJobs(sortJobsByPostedDate(res.data.results || []));
      } catch (err: string | any) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  //toggle the filter section
  const toggleFilterSection = (key: keyof FilterToggles) =>
    setFilterToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  //reset filters
  const resetFilters = () => {
    setActiveFilters({
      category_name: [],
      organization: [],
      city: [],
      country: [],
    });
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof Filters, value: string[]) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredRaw = useMemo(() => {
    return jobs.filter((job) => {
      const { category_name, organization, city, country } = activeFilters;
      const matches = (key: string[], field?: string) =>
        key.length === 0 ||
        key.some((k) => (field || "").toLowerCase().includes(k.toLowerCase()));
      return (
        matches(category_name, job.category_name) &&
        matches(organization, job.organization) &&
        (city.length === 0 ||
          city.some((c) =>
            (job.city || "")
              .split(/\s*(?:,|&|and)\s*/i)
              .map((s) => s.trim().split(" ")[0].toLowerCase())
              .includes(c.toLowerCase().split(" ")[0])
          )) &&
        (country.length === 0 ||
          country.includes(job.country?.toLowerCase() || ""))
      );
    });
  }, [jobs, activeFilters]);

  const filtered = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage; //0
    const end = start + jobsPerPage; //ending jobs limit
    return filteredRaw.slice(start, end); //0,25
  }, [filteredRaw, currentPage]);

  //calculate the total number of pages
  const totalPages = Math.ceil(filteredRaw.length / jobsPerPage);

  const getCounts = (field: keyof Filters) => {
    const counts: Record<string, number> = {};

    jobs.forEach((job) => {
      job[field]
        ?.split(/\s*(?:,|&|and)\s*/i) // split by comma or & or and
        .map((s) => s.trim())
        .filter((v) => /^[a-z\s]{3,}$/i.test(v)) // filter only valid city names
        .forEach((v) => {
          const formatted = v
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Proper case

          counts[formatted] = (counts[formatted] || 0) + 1;
        });
    });

    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => ({ key, count }));
  };

  const categoryList = getCounts("category_name");
  const orgList = getCounts("organization");
  const cityList = getCounts("city");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-gray-50 p-4 rounded shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>

          {/** CATEGORY */}
          <div className="mb-4">
            <h3
              className="cursor-pointer font-medium flex justify-between"
              onClick={() => toggleFilterSection("category")}
            >
              Categories {filterToggles.category ? "−" : "+"}
            </h3>
            {filterToggles.category && (
              <div className="max-h-48 overflow-y-auto mt-2 space-y-1 text-sm">
                {categoryList.map(({ key, count }) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.category_name.includes(key)}
                      onChange={(e) => {
                        const arr = activeFilters.category_name.includes(key)
                          ? activeFilters.category_name.filter((k) => k !== key)
                          : [...activeFilters.category_name, key];
                        handleFilterChange("category_name", arr);
                      }}
                    />
                    <span>
                      {key} ({count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/** ORGANIZATION */}
          <div className="mb-4">
            <h3
              className="cursor-pointer font-medium flex justify-between"
              onClick={() => toggleFilterSection("organization")}
            >
              Organizations {filterToggles.organization ? "−" : "+"}
            </h3>
            {filterToggles.organization && (
              <div className="max-h-48 overflow-y-auto mt-2 space-y-1 text-sm">
                {orgList.map(({ key, count }) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.organization.includes(key)}
                      onChange={(e) => {
                        const arr = activeFilters.organization.includes(key)
                          ? activeFilters.organization.filter((k) => k !== key)
                          : [...activeFilters.organization, key];
                        handleFilterChange("organization", arr);
                      }}
                    />
                    <span>
                      {key} ({count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/** CITY */}
          <div>
            <h3
              className="cursor-pointer font-medium flex justify-between"
              onClick={() => toggleFilterSection("city")}
            >
              Cities {filterToggles.city ? "−" : "+"}
            </h3>
            {filterToggles.city && (
              <div className="max-h-48 overflow-y-auto mt-2 space-y-1 text-sm">
                {cityList.map(({ key, count }) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.city.includes(key)}
                      onChange={(e) => {
                        const arr = activeFilters.city.includes(key)
                          ? activeFilters.city.filter((k) => k !== key)
                          : [...activeFilters.city, key];
                        handleFilterChange("city", arr);
                      }}
                    />
                    <span>
                      {key} ({count})
                    </span>
                  </label>
                ))}
              </div>
            )}
            <button
              onClick={resetFilters}
              className="w-full text-sm bg-gray-300 px-3 py-2 rounded text-black hover:bg-purple-600"
            >
              Clear All
            </button>
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : filteredRaw.length === 0 ? (
            <div className="text-center text-gray-600 py-10">
              No jobs found.
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-black font-bold">
                {filtered.length} jobs of {maxJobs}
              </div>
              <div className="grid grid-cols-1 gap-4 max-w-2xl">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
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
