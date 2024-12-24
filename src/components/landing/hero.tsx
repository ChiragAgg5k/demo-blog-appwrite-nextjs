import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimatedGridPattern from "../ui/animated-grid-pattern";
import HeroCard from "./hero-card";

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center space-y-8 space-y-6 flex flex-col items-center justify-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-center">
                <span className="block xl:inline">Welcome to</span>{" "}
                <span className="block text-indigo-600 xl:inline">
                  Demo Blog
                </span>
              </h1>
              <p className="mt-3 text-center text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                A simple and powerful blog platform built with Next.js and
                <span className="text-indigo-600 ml-2">Appwrite</span>. Share
                your thoughts, connect with readers, and grow your audience.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md bg-indigo-600 shadow-xl">
                  <Link
                    href="/blogs"
                    className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 border rounded-md border-indigo-600 sm:mt-0 sm:ml-3">
                  <Link
                    href="https://github.com/ChiragAgg5k/demo-blog-appwrite-nextjs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-100 transition-all duration-200 md:py-2 md:text-lg md:px-10"
                  >
                    Read Blogs
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <HeroCard
        title="SEO centered"
        excerpt="Don't worry, we got it covered"
        style={{
          position: "absolute",
          left: `10vw`,
          top: `10vh`,
        }}
      />
      <HeroCard
        title="Open Source"
        excerpt="Check us out on Github"
        style={{
          position: "absolute",
          left: `5vw`,
          top: `40vh`,
        }}
      />
      <HeroCard
        title="Simple"
        excerpt="No complexity here"
        style={{
          position: "absolute",
          left: `15vw`,
          top: `70vh`,
        }}
      />
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "absolute right-0 inset-y-[-40%] inset-x-[25%] h-[200%] skew-y-12 opacity-60",
        )}
      />
    </div>
  );
}
