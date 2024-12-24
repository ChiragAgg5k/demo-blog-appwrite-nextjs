import { database } from "@/lib/appwrite";
import Link from "next/link";

export default async function BlogsPage() {
  const blogs = await database.listDocuments(
    "demo-blog-appwrite-nextjs",
    "blogs",
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
