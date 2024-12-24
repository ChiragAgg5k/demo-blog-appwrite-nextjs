import { database } from "@/lib/appwrite";
import {
  APPWRITE_BLOGS_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
} from "@/lib/constants";

export default async function Blog({
  params,
}: {
  params: Promise<{ blog_id: string }>;
}) {
  const { blog_id } = await params;

  const blog = await database.getDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_BLOGS_COLLECTION_ID,
    blog_id,
  );

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
        {blog.title}
      </h1>
      <p className="text-base text-gray-500 leading-8">{blog.content}</p>
    </div>
  );
}
