import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { database } from "@/lib/appwrite";
import {
  APPWRITE_BLOGS_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID,
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

  const profile = await database.getDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_USERS_COLLECTION_ID,
    blog.author_id,
  );

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex flex-col min-h-[80vh]">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
            {blog.title}
          </h1>
          <p className="text-base text-gray-500 leading-8">{blog.content}</p>
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-gray-500">{profile.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
