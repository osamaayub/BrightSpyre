"use client";
import { JSX, useEffect, useState } from "react";
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

  interface RenderJobDescriptionProps {
    description: string;
  }

  interface ResultElement {
    key: string;
    type: string;
    props: any;
  }

  // (removed duplicate and problematic renderJobDescription implementation)

  const renderJobDescription = (description: string): JSX.Element[] => {
    const lines: string[] = cleanDescription(description)
      .split(/\n+/)
      .filter((line: string) => line.trim() !== "");

    // Fallback: if no structured headings exist and all lines are short, render as simple bullets
    const hasHeadings = lines.some(
      (line) =>
        /^[A-Z\s&()\-]+:$/.test(line.trim()) ||
        line.trim().toLowerCase() === "scope of role"
    );
    if (
      !hasHeadings &&
      lines.length >= 2 &&
      lines.every((l) => l.length <= 100)
    ) {
      return [
        <ul key="fallback-ul" className="list-disc pl-5 space-y-1">
          {lines.map((line, i) => (
            <li key={i}>{line.trim()}</li>
          ))}
        </ul>,
      ];
    }

    const result: JSX.Element[] = [];
    let bulletBuffer: string[] = [];
    let insideSection = false;

    const flushBullets = (): void => {
      if (bulletBuffer.length > 0) {
        result.push(
          <ul key={`ul-${result.length}`} className="list-disc pl-5 space-y-1">
            {bulletBuffer.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        );
        bulletBuffer = [];
      }
    };

    const isMainHeading = (text: string): boolean =>
      /^[A-Z\s&()\-]+:$/.test(text);
    const isSubheading = (text: string): boolean =>
      /^[A-Z]/.test(text) && /^[^:]+$/.test(text) && text.length < 60;
    const isLabelValuePair = (text: string): boolean =>
      /^[A-Z][a-zA-Z\s]+:\s+.+/.test(text);

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed === "Level 3" || trimmed.toLowerCase() === "scope of role") {
        flushBullets();
        insideSection = true;
        result.push(
          <p key={`bold-${index}`} className="font-bold text-gray-800 mt-4">
            {trimmed}
          </p>
        );
      } else if (isMainHeading(trimmed)) {
        flushBullets();
        insideSection = true;
        result.push(
          <p key={`heading-${index}`} className="font-bold text-gray-800 mt-4">
            {trimmed}
          </p>
        );
      } else if (insideSection && isLabelValuePair(trimmed)) {
        flushBullets();
        const [label, ...rest] = trimmed.split(":");
        const value = rest.join(":").trim();
        result.push(
          <p key={`label-value-${index}`} className="text-gray-700 mt-2">
            <span className="font-semibold">{label}:</span> {value}
          </p>
        );
      } else if (insideSection && isSubheading(trimmed)) {
        flushBullets();
        result.push(
          <p
            key={`subheading-${index}`}
            className="font-bold text-gray-700 mt-2"
          >
            {trimmed}
          </p>
        );
      } else if (insideSection) {
        bulletBuffer.push(trimmed);
      } else {
        result.push(
          <p key={`intro-${index}`} className="text-gray-700 mb-2">
            {trimmed}
          </p>
        );
      }
    });

    flushBullets();

    return result;
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-10">
      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          {/* Back button */}
          <div className="mb-6 sm:mb-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
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

                <CardContent className="space-y-6 sm:space-y-8">
                  <section className="w-full">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                      Job Description
                    </h3>
                    <div
                      className="
              prose
              prose-sm
              sm:prose-base
              max-w-none
              text-gray-700
              bg-gray-50
              rounded-lg
              p-2
              sm:p-4
              md:p-6
              leading-relaxed
              shadow-sm
              w-full
              break-words
              overflow-x-auto
              "
                    >
                      <div className="space-y-2">
                        {/* Render description with bold headings and subheadings, text underneath */}
                        {renderJobDescription(
                          cleanDescription(job.description)
                        )}
                      </div>
                    </div>
                  </section>
                  <Separator />

                  <section>
                    <p className="text-gray-600 text-base sm:text-lg">
                      End date: {job?.end_date}
                    </p>
                  </section>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start pt-6 border-t border-gray-200">
                  <ApplyButton
                    jobId={job?.id}
                    jobTitle={job?.title}
                    company={job?.organization}
                  />
                  <SaveJobButton
                    className="w-full sm:w-auto"
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
                <CardContent className="flex flex-col items-center text-center space-y-4 px-2 sm:px-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex items-center justify-center text-4xl font-bold text-gray-400 bg-gray-100">
                    {job?.organization?.charAt(0)}
                    {job.organization_logo && (
                      <Image
                        src={job.organization_logo}
                        alt="Organization Logo"
                        width={112}
                        height={112}
                        className="object-cover rounded-full absolute inset-0"
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
