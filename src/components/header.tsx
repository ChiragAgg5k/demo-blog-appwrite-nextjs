import { Pen } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Demo Blog</span>
              <Pen className="h-8 w-auto text-indigo-600" />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link
                href="#features"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link
              href="/auth"
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
