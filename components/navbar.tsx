import Link from "next/link";
import { HeaderButtons } from "./header-buttons/header-buttons";





export function Navbar() {
    return (
        <div className="flex flex-col  justify-content-between">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold">
                            Brightspyre
                        </Link>
                        <nav className="hidden  md:flex items-center gap-6">
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
                        <HeaderButtons />
                    </div>
                </div>
            </header>
        </div>
    );
}