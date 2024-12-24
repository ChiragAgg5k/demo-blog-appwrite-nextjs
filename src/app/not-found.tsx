import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center flex-col gap-2">
      <h1 className="text-4xl font-bold text-indigo-600">Not Found</h1>
      <p className="text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-indigo-500 py-2 px-4 mt-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75 transition-colors duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
}
