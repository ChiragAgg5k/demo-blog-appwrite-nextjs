"use client";

import { useUser } from "@/components/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { database } from "@/lib/appwrite";
import {
  APPWRITE_BLOGS_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
} from "@/lib/constants";
import { ID, Permission, Role } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Create() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTitle = localStorage.getItem("draft_title");
    const savedContent = localStorage.getItem("draft_content");

    if (savedTitle) setTitle(savedTitle);
    if (savedContent) setContent(savedContent);
  }, []);

  useEffect(() => {
    localStorage.setItem("draft_title", title);
    localStorage.setItem("draft_content", content);
  }, [title, content]);

  const clearLocalStorage = () => {
    localStorage.removeItem("draft_title");
    localStorage.removeItem("draft_content");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAuthenticated === false) {
      toast.error("You need to sign in to create a post");
      return;
    }

    if (!user) {
      toast.error("Please wait...");
      return;
    }

    if (!title || !content) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setIsLoading(true);

      const document = await database.createDocument(
        APPWRITE_DATABASE_ID, // database id
        APPWRITE_BLOGS_COLLECTION_ID, // collection id
        ID.unique(),
        {
          author_id: user.$id,
          title,
          content,
        },
        [Permission.read(Role.any()), Permission.write(Role.user(user?.$id))],
      );

      // Clear localStorage after successful submission
      clearLocalStorage();

      toast.success("Post created successfully");
      router.push(`/blogs/${document.$id}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-indigo-600">
            Create a new post
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create a new post to share with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-gray-500">
              Choose a catchy title for your post.
            </p>
            <Input
              className="mb-4"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label htmlFor="content">
              Content <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-gray-500">
              Make sure to write in <span className="font-bold">Markdown</span>{" "}
              format.
            </p>
            <Textarea
              id="content"
              placeholder="Content"
              className="resize-none mb-4"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              disabled={isLoading}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
