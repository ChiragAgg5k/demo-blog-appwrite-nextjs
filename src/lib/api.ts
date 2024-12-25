import { Models, Query } from "appwrite";
import { database } from "./appwrite";
import {
  APPWRITE_BLOGS_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
} from "./constants";

export interface Blog extends Models.Document {
  title: string;
  content: string;
  author_id: string;
}

export async function getBlogsByUserId(userId: string | undefined) {
  if (!userId) {
    return {
      total: 0,
      documents: [],
    } as Models.DocumentList<Blog>;
  }
  const blogs = await database.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_BLOGS_COLLECTION_ID,
    [Query.equal("author_id", userId)],
  );
  return blogs;
}

export async function deleteBlog(blogId: string) {
  await database.deleteDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_BLOGS_COLLECTION_ID,
    blogId,
  );
}

export async function updateBlog(blogId: string, blog: Blog) {
  await database.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_BLOGS_COLLECTION_ID,
    blogId,
    {
      title: blog.title,
      content: blog.content,
    },
  );
}
