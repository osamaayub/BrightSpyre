import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cleanDescription } from "@/helpers/page";
import { SaveJobButton } from "@/components/saveButon/save-job-button";
import { Job } from "@/types/filter";

const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="border border-gray-200 rounded-md bg-white px-5 py-4 flex flex-col justify-between shadow-sm hover:shadow-md transition min-h-[220px]">
      {/* Top Row */}
      <div className="flex justify-between text-xs text-gray-500 font-medium uppercase mb-1">
        <span>{job.category_name}</span>
        <span>Posted 1 week ago</span>
      </div>

      {/* Job Title */}
      <Link
        href={`/jobs/${job.id}`}
        className="text-blue-700 font-semibold text-base hover:underline leading-snug"
      >
        {job.title}
      </Link>

      {/* Description (truncated) */}
      <p className="text-sm text-gray-700 mt-2 line-clamp-2">
        {cleanDescription(job.description)}
      </p>

      {/* Location & Meta */}
      <div className="text-sm text-gray-500 mt-2 space-x-2 flex flex-wrap">
        {job.job_type && <span>{job.job_type}</span>}
        {job.city && <span>{job.city}</span>}
        {job.country && <span>{job.country}</span>}
        <span>${job.salary}</span>
        <span>No equity</span>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-end items-center gap-2">
        <SaveJobButton jobId={job.id} jobTitle={job.title} />
        <Link href={`/jobs/${job.encrypted_id}`}>
          <Button size="sm" className="text-sm">
            View Job
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
