
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"

interface SaveJobButtonProps {
  jobId: string
  jobTitle: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function SaveJobButton({
  jobId,
  jobTitle,
  variant = "outline",
  size = "default",
  className = "",
}: SaveJobButtonProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { isLoggedIn } = useAuth()

  const handleSaveJob = async () => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      toast({
        title: "Login required",
        description: "Please login to save jobs",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    // Simulate API call to save/unsave job
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSaved(!isSaved)
    setIsLoading(false)

    toast({
      title: isSaved ? "Job removed" : "Job saved",
      description: isSaved
        ? `${jobTitle} has been removed from your saved jobs.`
        : `${jobTitle} has been added to your saved jobs.`,
    })
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleSaveJob} disabled={isLoading}>
      {isSaved ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-2" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 p-2" />
          Save
        </>
      )}
    </Button>
  )
}
