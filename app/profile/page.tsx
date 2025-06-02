import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserProfile } from "@clerk/nextjs"

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    bio: "Experienced frontend developer with a passion for creating beautiful and functional user interfaces.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp",
        period: "2020 - Present",
        description: "Leading frontend development for multiple projects.",
      },
      {
        title: "Frontend Developer",
        company: "WebSolutions",
        period: "2018 - 2020",
        description: "Developed responsive web applications using React.",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "University of California",
        year: "2018",
      },
    ],
    applications: [
      {
        id: "1",
        jobTitle: "Senior Frontend Developer",
        company: "TechCorp",
        date: "May 15, 2023",
        status: "In Review",
      },
      {
        id: "2",
        jobTitle: "React Developer",
        company: "DevInc",
        date: "May 10, 2023",
        status: "Rejected",
      },
    ],
    savedJobs: [
      {
        id: "3",
        title: "Frontend Engineer",
        company: "DesignCo",
        location: "Remote",
        posted: "3 days ago",
      },
      {
        id: "4",
        title: "UI Developer",
        company: "WebSolutions",
        location: "New York, NY",
        posted: "1 week ago",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <Link href="/profile/edit">
          <Button>Edit Profile</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <CardTitle className="text-2xl text-center">{user.name}</CardTitle>
                <CardDescription className="text-center">{user.title}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Contact</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.location}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
              <UserProfile routing="hash"/>
            <CardContent>
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">About Me</h3>
                    <p className="text-muted-foreground">{user.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Experience</h3>
                    <div className="space-y-4">
                      {user.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4">
                          <h4 className="font-semibold">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exp.company} • {exp.period}
                          </p>
                          <p className="mt-2 text-sm">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Education</h3>
                    <div className="space-y-4">
                      {user.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4">
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">
                            {edu.institution} • {edu.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="applications" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Job Applications</h3>
                  {user.applications.length > 0 ? (
                    <div className="space-y-4">
                      {user.applications.map((app) => (
                        <Card key={app.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <Link href={`/jobs/${app.id}`} className="text-lg font-medium hover:underline">
                                  {app.jobTitle}
                                </Link>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {app.company} • Applied on {app.date}
                                </div>
                              </div>
                              <div>
                                <Badge variant={app.status === "In Review" ? "outline" : "secondary"}>
                                  {app.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
                  )}
                </TabsContent>

                <TabsContent value="saved" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Saved Jobs</h3>
                  {user.savedJobs.length > 0 ? (
                    <div className="space-y-4">
                      {user.savedJobs.map((job) => (
                        <Card key={job.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <Link href={`/jobs/${job.id}`} className="text-lg font-medium hover:underline">
                                  {job.title}
                                </Link>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {job.company} • {job.location} • {job.posted}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Link href={`/jobs/${job.id}`}>
                                  <Button size="sm" variant="outline">
                                    View
                                  </Button>
                                </Link>
                                <Button size="sm" variant="ghost">
                                  Unsave
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">You haven't saved any jobs yet.</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
