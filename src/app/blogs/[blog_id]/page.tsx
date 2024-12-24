import { database } from "@/lib/appwrite";

export default async function Blog({
  params: { blog_id },
}: {
  params: { blog_id: string };
}) {
  const blog = await database.getDocument(
    "demo-blog-appwrite-nextjs",
    "blogs",
    blog_id,
  );

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
        {blog.title}
      </h1>
      <p className="text-base text-gray-500 leading-8">{blog.content}</p>
    </div>
  );
}
