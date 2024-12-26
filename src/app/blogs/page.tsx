import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { database } from "@/lib/appwrite";
import {
  APPWRITE_BLOGS_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
} from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

async function getBlogs() {
  noStore();
  try {
    const blogs = await database.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_BLOGS_COLLECTION_ID,
    );
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

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
                href="/create"
                className="text-indigo-600 ml-2 hover:underline"
              >
                Be the first to write one!
              </Link>
            </p>
          </div>
        )}
        {blogs.documents.map((blog) => (
          <Card
            key={blog.$id}
            className="flex flex-col hover:shadow-lg transition-all duration-300"
          >
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>{formatDate(blog.$createdAt)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ReactMarkdown
                className={`prose max-w-none line-clamp-3 text-gray-500`}
              >
                {blog.content.substring(0, 250)}
              </ReactMarkdown>
            </CardContent>
            <CardFooter className="">
              <Link
                href={`/blogs/${blog.$id}`}
                className="text-indigo-600 hover:underline"
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
