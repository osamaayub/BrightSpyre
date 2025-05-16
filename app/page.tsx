import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroSection } from "@/components/heroSection/hero-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured Jobs</h2>
          <Link href="/jobs">
            <Button variant="outline">View All Jobs</Button>
          </Link>
        </div>
        {/* <FeaturedJobs /> */}
      </section>

      <section className="my-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">For Employers</CardTitle>
            <CardDescription>Post jobs and find the perfect candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Reach thousands of job seekers and find the perfect match for your company. Our platform provides powerful
              tools to help you find the right talent.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/companies">
              <Button>Learn More</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
