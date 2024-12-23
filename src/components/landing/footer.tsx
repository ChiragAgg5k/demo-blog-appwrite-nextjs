import { Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600"
            href="https://github.com/ChiragAgg5k/demo-blog-appwrite-nextjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2024 Demo Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
