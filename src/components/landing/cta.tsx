import Link from "next/link";

export default function CTA() {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to start blogging?</span>
          <span className="block">Create your account today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-200">
          Join our community of writers and start sharing your ideas with the
          world. It's free and easy to get started.
        </p>
        <Link
          href="/auth"
          className="mt-8 w-auto px-10 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}
