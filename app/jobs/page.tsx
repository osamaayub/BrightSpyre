"use client";


import { JobsList } from "@/components/jobLists/Jobs-list";
import { Filters } from "@/types/filter";
import { useState } from "react";


export default function JobPage() {
  const [filters, setFilters] = useState<Filters>({
    category_name:[],
    city: [],
    organization:[],
    country:[]
  });
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Browse Jobs</h1>

      {/* Display Jobs List */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> */}
          <JobsList filters={filters} />

    </div>
  );
}
