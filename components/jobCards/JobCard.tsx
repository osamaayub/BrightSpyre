import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { SaveJobButton } from "@/components/saveButon/save-job-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cleanDescription } from "@/helpers/page";
import { Job } from "@/types/filter";

import { formatCities, getPostedDaysAgo } from "@/helpers/page";

const JobCard = ({ job }: { job: Job }) => {
  const postedDaysAgo = job.start_date
    ? getPostedDaysAgo(job.start_date)
    : "Unknown";
  const formattedCity = job.city ? formatCities(job.city) : "";
  const salaryText = job.salary
    ? ` PKR ${job.salary.toLocaleString()}`
    : "Salary not disclosed";

  return (
    <Card className="group flex flex-col hover:rotate-[0.5deg] justify-between w-full h-full shadow-md border border-gray-200 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-400 hover:bg-blue-300">
      <CardContent className="p-6 flex flex-col space-y-4 h-full">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex justify-center mb-2">
            {typeof job.organization_logo === "string" &&
              job.organization_logo.startsWith("http") && (
                <div className="w-16 h-16 flex items-center justify-center overflow-hidden rounded-full">
                  <Image
                    src={job.organization_logo}
                    alt="Organization Logo"
                    width={64}
                    height={64}
                    className=" object-cover w-16 h-auto rounded-full"
                  />
                </div>
              )}
          </div>
          <div className="flex justify-between  items-center uppercase text-gray-600 px-1">
            <p className="text-text-base text-gray-400">{job.country}</p>
          </div>
        </div>

        {/* Job Title & Posted Days Ago */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-blue-700 underline truncate">
            <Link
              href={`/jobs/${job.encrypted_id}`}
              className="hover:text-blue-600 transition-colors duration-300 whitespace-nowrap"
            >
              {job.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-400 uppercase text-right whitespace-nowrap">
            {postedDaysAgo}
          </p>
        </div>
        {/* Category */}
        <div className="uppercase  text-sm text-gray-400 font-bold">
          {job.category_name}
        </div>

        {/* Job Description */}
        <ul className="list-disc pl-5 text-sm font-inter text-gray-600 space-y-1">
          {cleanDescription(job.description)
            .split(/[\n]/) // Split by newline or period
            .filter((line) => line.trim() !== "") // Remove empty lines
            .slice(0, 2) // Take first 2 items
            .map((point, index) => (
              <li key={index}>{point.trim()}</li>
            ))}
        </ul>

        {/* Footer: Cities, Salary, and Buttons in One Row */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-4">
          {/* Left Side: Cities & Salary */}
          <div className="text-sm  text-gray-600">
            <p>{formattedCity}</p>
            <p className="font-medium text-gray-800"> {salaryText}</p>
          </div>

          {/* Right Side: Save and View Job Buttons */}
          <div className="flex sm:flex-row sm:items-center sm:gap-3">
            <SaveJobButton
              jobId={job.id}
              jobTitle={job.title}
              className="hover:bg:blue-500"
            />
            <Link href={`/jobs/${job.encrypted_id}`}>
              <Button size="sm" className="text-sm">
                View Job
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
