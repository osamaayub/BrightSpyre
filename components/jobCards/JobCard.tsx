
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { SaveJobButton } from "../saveButon/save-job-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cleanDescription } from "@/helpers/page";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/filter";

const JobCard=({ job }: { job: Job })=> {
  return (
    <Card className=" group flex  flex-col hover:rotate-[0.5deg] justify-between w-full h-full shadow-md border border-gray-200 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-400 hover:bg-blue-50">
      <CardContent className="p-6 flex flex-col space-y-4 h-full">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-2">
          <div className=" flex  justify-center mb-2">
            {typeof job.organization_logo === 'string' && job.organization_logo.startsWith('http') && (
              <Image
                src={job.organization_logo}
                alt="Organization Logo"
                width={48}
                height={48}
                className="rounded-full  transition-transform duration-200 group-hover:scale-100"
              />
            )}
          </div>
          <div className="flex justify-between  text-sm text-gray-600 px-1">
            {/* <p className="text-xs text-gray-500 whitespace-nowrap">{job.organization}</p> */}
            <p className="text-xs text-gray-400">{job.country}</p>
          </div>
        </div>

        {/* Job Info */}
        <div className="flex flex-col flex-grow space-y-2">
          <h3 className="text-base font-semibold text-gray-800 truncate">
            <Link href={`/jobs/${job.id}`} className="hover:text-blue-600 transition-colors duration-300 whitespace-nowrap">
              {job.title}
            </Link>

          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">{cleanDescription(job.description)}</p>

          {/* Location & Category */}
          <div className="flex flex-col text-sm gap-2  pt-2">
            {job.city && <Badge className="bg-blue-100 whitespace-nowrap text-blue-800">{job.city}</Badge>}
            {job.category_name && <Badge className="bg-green-100 break-words mr-2 text-green-800">{job.category_name}</Badge>}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:gap-3 sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <SaveJobButton jobId={job.id} jobTitle={job.title} />
            <Link href={`/jobs/${job.encrypted_id}`}>
              <Button size="sm" className="text-sm">View Job</Button>
            </Link>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

export default JobCard;