"use client";

import Link from "next/link";
export const Footer = () => {
  return (
    <div>
        <footer className="border-t bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Brightspyre</h3>
                      <p className="text-sm text-muted-foreground">
                        Find your dream job or the perfect candidate with Brightspyre, the leading job board platform.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/jobs" className="text-muted-foreground hover:underline">
                            Browse Jobs
                          </Link>
                        </li>
                        <li>
                          <Link href="/companies" className="text-muted-foreground hover:underline">
                            Companies
                          </Link>
                        </li>
                        <li>
                          <Link href="/profile" className="text-muted-foreground hover:underline">
                            My Profile
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">For Employers</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/employers/post-job" className="text-muted-foreground hover:underline">
                            Post a Job
                          </Link>
                        </li>
                        <li>
                          <Link href="/employers/pricing" className="text-muted-foreground hover:underline">
                            Pricing
                          </Link>
                        </li>
                        <li>
                          <Link href="/employers/resources" className="text-muted-foreground hover:underline">
                            Employer Resources
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Company</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/about" className="text-muted-foreground hover:underline">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link href="/contact" className="text-muted-foreground hover:underline">
                            Contact
                          </Link>
                        </li>
                        <li>
                          <Link href="/faq" className="text-muted-foreground hover:underline">
                            FAQ
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Brightspyre. All rights reserved.
                  </div>
                </div>
              </footer>
    </div>
  )
}
