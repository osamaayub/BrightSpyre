"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export function HeaderButtons() {
  const { isLoggedIn, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    signOut()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  return (
    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-center gap-2 sm:gap-3 md:gap-4">
      {isLoggedIn ? (
        <>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              Profile
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full sm:w-auto"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              Sign Up
            </Button>
          </Link>
        </>
      )}
      <Link href="/employers/post-job">
        <Button size="sm" className="w-full sm:w-auto">
          Post a Job
        </Button>
      </Link>
    </div>
  )
}
