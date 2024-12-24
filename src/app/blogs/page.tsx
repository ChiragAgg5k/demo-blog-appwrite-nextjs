import { database } from "@/lib/appwrite";
import {
  APPWRITE_BLOGS_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
} from "@/lib/constants";
import Link from "next/link";

export default async function BlogsPage() {
  const blogs = await database.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_BLOGS_COLLECTION_ID,
  );

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
        Latest Blogs
      </h1>
      <p className="text-base text-gray-500 leading-8 text-center mb-12">
        Check out the latest blogs from our community. Share your thoughts and
        ideas with the world.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.total === 0 && (
          <div className="col-span-full h-[50vh] flex items-center justify-center">
            <p className="text-center text-gray-500">
              No blogs yet.
              <Link
                href="/blogs/create"
                className="text-indigo-600 ml-2 hover:underline"
              >
                Be the first to write one!
              </Link>
            </p>
          </div>
        )}
        {blogs.documents.map((blog) => (
          <Link
            href={`/blogs/${blog.$id}`}
            key={blog.$id}
            className="hover:shadow-md transition-all duration-300"
          >
            <div className="p-4 border border-gray-200 rounded-md">
              <h2 className="text-lg font-bold text-indigo-600 mb-2">
                {blog.title}
              </h2>
              <p className="text-base text-gray-500 leading-8 line-clamp-3">
                {blog.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
