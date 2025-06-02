import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import "./globals.css"
import { Footer } from "@/components/footer/footer"
import { Navbar } from "@/components/navbar"
import {ClerkProvider} from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Brightspyre - Find Your Dream Job",
  description: "Discover thousands of job opportunities from top companies around the world.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
              <Navbar/>
              <main className="flex-1">
                {children}
                </main>
              <Footer/>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
