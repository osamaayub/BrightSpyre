"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { HeaderButtons } from "./header-buttons/header-buttons";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl text-black font-bold">
              BrightSpyre
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/jobs" className="text-sm font-medium hover:underline">
                Jobs
              </Link>
              <Link href="/companies" className="text-sm font-medium hover:underline">
                Companies
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:underline">
                Contact
              </Link>
              <Link href="/faq" className="text-sm font-medium hover:underline">
                FAQ
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Header Buttons (e.g. Sign In, Sign Up) */}
            <div className="hidden md:block">
              <HeaderButtons />
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden flex flex-col bg-white px-4 pb-4 space-y-2">
            <Link href="/jobs" className="block text-sm font-medium hover:underline">
              Jobs
            </Link>
            <Link href="/companies" className="block text-sm font-medium hover:underline">
              Companies
            </Link>
            <Link href="/contact" className="block text-sm font-medium hover:underline">
              Contact
            </Link>
            <Link href="/faq" className="block text-sm font-medium hover:underline">
              FAQ
            </Link>

            {/* Optional: show header buttons in mobile view */}
            <div className="pt-2">
              <HeaderButtons />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
