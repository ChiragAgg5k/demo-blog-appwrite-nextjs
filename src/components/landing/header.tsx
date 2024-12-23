"use client";

import { useUser } from "@/components/context/auth-context";
import { Pen } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500">
          <div className="flex items-center">
            <Link href="/">
              <Pen className="h-8 w-auto text-indigo-600 hover:text-indigo-700 hover:scale-105 transition-all duration-300" />
            </Link>
          </div>
          {user ? (
            <div className="ml-10 space-x-4">
              <Link
                href="/profile"
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                My Profile
              </Link>
            </div>
          ) : (
            <div className="ml-10 space-x-4">
              <Link
                href="/auth"
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
