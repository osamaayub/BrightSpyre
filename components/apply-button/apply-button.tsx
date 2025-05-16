"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { applySchema } from "@/schemas/page"
import { ApplyButtonProps } from "@/types/type"
import { z } from "zod"

const formSchema = applySchema

type ApplicationFormInputs = z.infer<typeof formSchema>

export function ApplyButton({ jobId, jobTitle, company }: ApplyButtonProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormInputs>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: ApplicationFormInputs) => {
    setIsSubmitting(true)

    // Example API logic
    console.log("Submitted Data:", {
      ...data,
      jobId,
      jobTitle,
      company,
      resume: data.resume?.[0], // actual file
    })

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setOpen(false)
    reset()

    toast({
      title: "Application submitted",
      description: `Your application for ${jobTitle} at ${company} has been submitted successfully.`,
    })
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">
        Apply Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mt-4">Apply for {jobTitle}</DialogTitle>
            <DialogDescription>
              Complete the form below to apply for this position at {company}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="resume">Resume</Label>
              <Input
                id="resume"
                type="file"
                {...register("resume")}
                accept=".pdf,.doc,.docx"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Accepted formats: PDF, DOC, DOCX. Max size: 5MB.
              </p>
              {errors.resume && typeof errors.resume.message==="string" &&(
                <p className="text-sm text-red-500">{errors?.resume?.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="coverLetter">Cover letter (optional)</Label>
              <Textarea
                id="coverLetter"
                rows={5}
                placeholder="Tell us why you're a good fit"
                {...register("coverLetter")}
              />
              {errors.coverLetter && (
                <p className="text-sm text-red-500">{errors.coverLetter.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="linkedin">LinkedIn profile (optional)</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/osamaayub"
                {...register("linkedin")}
              />
              {errors.linkedin && (
                <p className="text-sm text-red-500">{errors.linkedin.message}</p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
