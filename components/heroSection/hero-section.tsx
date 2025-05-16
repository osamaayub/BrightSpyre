import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  return (
    <div className="py-12 md:py-24 lg:py-32 bg-gray-50 rounded-xl">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Dream Job Today
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover thousands of job opportunities from top companies around the world.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex w-full max-w-lg items-center space-x-2">
              <Input type="text" placeholder="Search jobs..." className="flex-1" />
              <Button type="submit">Search</Button>
            </form>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobs">
              <Button variant="outline">Browse All Jobs</Button>
            </Link>
            <Link href="/companies">
              <Button variant="outline">Explore Companies</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
