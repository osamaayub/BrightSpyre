"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export function HeaderButtons() {
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  return (
    <div className="flex items-center gap-4">
      {isLoggedIn ? (
        <>
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost" size="sm">
              Sign Up
            </Button>
          </Link>
        </>
      )}
      <Link href="/employers/post-job">
        <Button size="sm">Post a Job</Button>
      </Link>
    </div>
  )
}
