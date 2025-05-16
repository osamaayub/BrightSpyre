"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useForm, Controller } from "react-hook-form"
import { PostSchemaForm } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostJobSchema } from "@/schemas/page"

export default function PostJobPage() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<PostSchemaForm>({
    resolver: zodResolver(PostJobSchema),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = async (data: PostSchemaForm) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)

    toast({
      title: "Job posted successfully",
      description: "Your job has been posted and is now live.",
    })

    router.push("/employers/post-job")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Post a Job</h1>
        <Link href="/employers/pricing">
          <Button variant="outline">View Pricing</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>
                  Provide information about the position you're hiring for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    placeholder="Enter the title"
                    {...register("jobTitle")}
                  />
                  {errors.jobTitle && (
                    <p className="text-sm text-red-600">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>

                {/* Job Type & Experience Level */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type</Label>
                    <Controller
                      control={control}
                      name="jobType"
                      defaultValue="Full-time"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id="job-type">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.jobType && (
                      <p className="text-sm text-red-600">{errors.jobType.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience-level">Experience Level</Label>
                    <Controller
                      control={control}
                      name="experienceLevel"
                      defaultValue="Mid-level"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id="experience-level">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Entry-level">Entry Level</SelectItem>
                            <SelectItem value="Mid-level">Mid Level</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                            <SelectItem value="Executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.experienceLevel && (
                      <p className="text-sm text-red-600">
                        {errors.experienceLevel.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location & Remote Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g. San Francisco, CA"
                      {...register("location")}
                    />
                    {errors.location && (
                      <p className="text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="remote-options">Remote Options</Label>
                    <Controller
                      control={control}
                      name="location"
                      defaultValue="Remote"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id="remote-options">
                            <SelectValue placeholder="Select remote option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="On-site">On-site only</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.location && (
                      <p className="text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">Salary Range (Min)</Label>
                    <Input
                      id="salary-min"
                      type="number"
                      placeholder="e.g. 80000"
                      {...register("salaryMin")}
                    />
                    {errors.salaryMin && (
                      <p className="text-sm text-red-600">{errors.salaryMin.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary-max">Salary Range (Max)</Label>
                    <Input
                      id="salary-max"
                      type="number"
                      placeholder="e.g. 120000"
                      {...register("salaryMax")}
                    />
                    {errors.salaryMax && (
                      <p className="text-sm text-red-600">{errors.salaryMax.message}</p>
                    )}
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Describe the role, responsibilities, and ideal candidate..."
                    rows={8}
                    {...register("JobDescription")}
                  />
                  {errors.JobDescription && (
                    <p className="text-sm text-red-600">{errors.JobDescription.message}</p>
                  )}
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the skills, qualifications, and experience required..."
                    rows={5}
                    {...register("requirements")}
                  />
                  {errors.requirements && (
                    <p className="text-sm text-red-600">{errors.requirements.message}</p>
                  )}
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    placeholder="List the benefits and perks offered with this position..."
                    rows={5}
                    {...register("benefits")}
                  />
                  {errors.benefits && (
                    <p className="text-sm text-red-600">{errors.benefits.message}</p>
                  )}
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <Label htmlFor="featured">Feature this job (additional fee applies)</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Posting Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Write a clear job title</h3>
                <p className="text-sm text-muted-foreground">
                  Use standard job titles that job seekers are searching for.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Be specific about requirements</h3>
                <p className="text-sm text-muted-foreground">
                  List must-have skills and qualifications to attract the right candidates.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Include salary information</h3>
                <p className="text-sm text-muted-foreground">
                  Job posts with salary ranges get up to 30% more applicants.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Highlight your company culture</h3>
                <p className="text-sm text-muted-foreground">
                  Share what makes your company a great place to work.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Check out our resources for employers or contact our support team
                for assistance.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/employers/resources">
                  <Button variant="outline" className="w-full">
                    Employer Resources
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
