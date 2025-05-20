"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

import { Company } from "@/types/filter";
import Image from "next/image";
import { cleanDescription } from "@/helpers/page";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const response = await axios.get("/api/companies");
      setCompanies(response.data || []);
    } catch (error: any) {
      setError(error?.response?.data?.message || "companies data not found");
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <div className="text-center text-gray-600">Loading companies...</div>;

  if (error)
    return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center md:text-left">
        Companies
      </h1>

      {/* Search Bar */}
      <div className="mb-8 max-w-xl mx-auto md:mx-0">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search companies..."
            className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            className="w-full sm:w-auto px-6 py-2 rounded-lg"
            size="lg"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Companies Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {companies.map((company) => (
          <Card
            key={company.id}
            className="
              group flex flex-col justify-between
              border border-gray-200 rounded-2xl shadow-md
              bg-white
              hover:shadow-lg hover:border-blue-400 hover:bg-blue-50
              transition-colors  duration-300
              p-6
              min-h-[340px]
            "
          >
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {company.organization_logo?.startsWith("http") ? (
                    <Image
                      src={company.organization_logo}
                      alt={`${company.organization} Logo`}
                      width={56}
                      height={56}
                      className="rounded-full object-cover shadow"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                      {company.organization?.charAt(0) || "C"}
                    </div>
                  )}
                </div>

                <div className="flex flex-col w-full overflow-hidden min-w-0">
                  {/* min-w-0 allows truncation to work properly */}
                  <CardTitle className="text-lg font-semibold truncate max-w-full group-hover:text-blue-600 transition-colors">
                    {company.organization}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 truncate max-w-full">
                    {company.category_name}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex-grow">
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex flex-wrap justify-between gap-x-2 gap-y-1 text-gray-600">
                  <div className="flex gap-1">
                    <span className="font-medium">Location:</span>
                    <span className=" sm:text-xs text-base whitespace-nowrap">{company.city}, {company.country}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium">Open Positions:</span>
                    <Link href={"/jobs"}>
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        {company.positions}
                      </span>
                    </Link>
                  </div>
                </div>
                <p className="text-gray-600 line-clamp-3">
                  {cleanDescription(company.description)}
                </p>
              </div>
            </CardContent>

            <CardFooter className="p-0 mt-6">
              <Link href={`${company.url}`} className="w-full">
                <Button
                  variant="outline"
                  className="w-full py-3 rounded-lg font-semibold text-blue-600 border-blue-600 hover:bg-blue-50"
                  size="lg"
                >
                  View Company
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
