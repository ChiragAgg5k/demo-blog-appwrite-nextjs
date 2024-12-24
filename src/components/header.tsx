"use client";

import { useUser } from "@/components/context/auth-context";
import { SquarePenIcon } from "@/components/icons/square-pen";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { isAuthenticated } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500">
          <div className="flex items-center">
            <Link href="/">
              <SquarePenIcon />
            </Link>
          </div>
          {isAuthenticated === null ? (
            <div className="ml-10 space-x-4">
              <p className="text-gray-500 text-sm">Loading...</p>
            </div>
          ) : isAuthenticated ? (
            <div className="ml-10 space-x-4 flex items-center">
              <Link
                href="/profile"
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75 transition-colors duration-300"
              >
                My Profile
              </Link>
              <Link
                href="/create"
                className="inline-block px-4 py-2 border border-indigo-500 rounded-md text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
              >
                <PlusIcon className="w-5 h-5" />
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
