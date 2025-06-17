"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ApplyButton } from "@/components/apply-button/apply-button";
import { SaveJobButton } from "@/components/saveButon/save-job-button";
import { cleanDescription } from "@/helpers/page";
import { useAuth } from "@clerk/nextjs";

export default function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob(res.data);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          {/* Back button */}
          <div className="mb-8">
            <Link href="/jobs">
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-blue-600 transition"
              >
                ← Back to Jobs
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="min-w-0">
                      <CardTitle className="text-lg sm:text-2xl font-extrabold text-gray-900 truncate">
                        {job?.title}
                      </CardTitle>
                      <CardDescription className="text-base sm:text-lg mt-1 max-w-full sm:max-w-[650px] text-gray-600 truncate">
                        <Link
                          href={`/companies/${job.url}`}
                          className="hover:underline text-blue-600 font-medium"
                        >
                          {job?.organization}
                        </Link>{" "}
                        • {job?.city}, {job?.country}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-start sm:justify-end">
                      <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-semibold text-sm sm:text-base whitespace-nowrap">
                        {job?.category_name}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-gray-700 px-3 py-1 rounded-md font-medium text-sm sm:text-base whitespace-nowrap"
                      >
                        Positions: {job?.positions}
                      </Badge>
                    </div>
                    {job?.Salary && (
                      <div className="text-gray-900 font-semibold text-base sm:text-lg mt-3 sm:mt-0 whitespace-nowrap">
                        {job.Salary}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-8">
                  <section>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
                      Job Description
                    </h3>
                    <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 bg-gray-50 rounded-lg p-4 sm:p-6 leading-relaxed shadow-sm">
                      {(() => {
                        const lines = cleanDescription(job.description)
                          .split(/\n+/)
                          .filter((line) => line.trim() !== "");

                        const result = [];
                        let currentSection = "";
                        let bulletBuffer: string[] = [];
                        let scopeStarted = false;

                        const flushBullets = () => {
                          if (bulletBuffer.length > 0) {
                            result.push(
                              <ul
                                key={`ul-${result.length}`}
                                className="list-disc pl-5 space-y-1"
                              >
                                {bulletBuffer.map((text, i) => (
                                  <li key={i}>{text}</li>
                                ))}
                              </ul>
                            );
                            bulletBuffer = [];
                          }
                        };

                        lines.forEach((line, index) => {
                          const trimmed = line.trim();

                          // Check if line is a heading like "RESPONSIBILITIES:"
                          if (/^[A-Z\s&\(\)\-]+:$/.test(trimmed)) {
                            flushBullets();
                            currentSection = trimmed;
                            if (trimmed === "SCOPE OF ROLE:") {
                              scopeStarted = true;
                            }

                            result.push(
                              <p
                                key={`heading-${index}`}
                                className="font-semibold text-gray-800 mt-4"
                              >
                                {trimmed}
                              </p>
                            );
                          } else if (scopeStarted) {
                            // After SCOPE OF ROLE: => bullet
                            bulletBuffer.push(trimmed);
                          } else {
                            // Before SCOPE OF ROLE: => plain text
                            result.push(
                              <p
                                key={`pre-scope-${index}`}
                                className="text-gray-700 mb-2"
                              >
                                {trimmed}
                              </p>
                            );
                          }
                        });

                        flushBullets();
                        return result;
                      })()}
                    </div>
                  </section>

                  <Separator />

                  <section>
                    <p className="text-gray-600 text-base sm:text-lg">
                      end_date: {job?.end_date}
                    </p>
                  </section>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-4 justify-center sm:justify-start pt-6 border-t border-gray-200">
                  <ApplyButton
                    jobId={job?.id}
                    jobTitle={job?.title}
                    company={job?.organization}
                  />
                  <SaveJobButton
                    className="w-full"
                    jobId={job?.id}
                    jobTitle={job?.title}
                  />
                </CardFooter>
              </Card>
            </div>

            {/* Company Info */}
            <div>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center space-y-4 px-4">
                  <div className="relative w-48 h-auto sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center text-4xl font-bold text-gray-400">
                    {job?.organization?.charAt(0)}
                    {job.organization_logo && (
                      <Image
                        src={job.organization_logo}
                        alt="Organization Logo"
                        width={260}
                        height={20}
                        className="object-cover rounded-full"
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold whitespace-nowrap text-gray-800 truncate max-w-full">
                    {job?.organization}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg font-inter leading-relaxed px-2 md:px-6 max-w-full truncate">
                    {cleanDescription(job?.description)}
                  </p>
                  <Link href={`${job.url}`}>
                    <Button
                      variant="outline"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

