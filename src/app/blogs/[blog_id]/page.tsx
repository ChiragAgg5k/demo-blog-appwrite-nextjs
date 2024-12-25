import EditBlogModel from "@/components/blog/edit-blog-model";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Blog } from "@/lib/api";
import { database } from "@/lib/appwrite";
import {
  APPWRITE_BLOGS_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID,
} from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blog_id: string }>;
}) {
  const { blog_id } = await params;

  const blog = await database.getDocument<Blog>(
    APPWRITE_DATABASE_ID,
    APPWRITE_BLOGS_COLLECTION_ID,
    blog_id,
  );

  const profile = await database.getDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_USERS_COLLECTION_ID,
    blog.author_id,
  );

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex flex-col min-h-[80vh]">
        <div className="flex-grow text-gray-600">
          <div className="flex items-center justify-between  mb-8">
            <h1 className="text-2xl font-bold text-center text-indigo-600">
              {blog.title}
            </h1>
            <EditBlogModel blog={blog} />
          </div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose max-w-none text-gray-600 border-t border-gray-200 pt-4"
            components={{
              a: ({ href, children }) => (
                <Link href={href} className="text-indigo-600 hover:underline">
                  {children}
                </Link>
              ),
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-indigo-600 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-indigo-600 mb-4">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="text-base text-gray-500 leading-8 mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-500 mb-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-500 mb-4">
                  {children}
                </ol>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="w-auto mx-auto h-full mb-4 rounded-md max-h-[400px]"
                />
              ),
              pre: ({ children }) => (
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  {children}
                </div>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-end">
          <div className="flex flex-col items-end justify-center">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-gray-500">{profile.name}</p>
            </div>
            <p className="text-gray-500">- {formatDate(blog.$createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
