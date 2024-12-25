"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Blog, updateBlog } from "@/lib/api";
import { useEffect, useState } from "react";
import { useUser } from "../context/auth-context";
import { SquarePenIcon } from "../icons/square-pen";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function EditBlogModel({ blog }: { blog: Blog }) {
  const { user } = useUser();
  const [showEditButton, setShowEditButton] = useState(false);
  const [editedBlog, setEditedBlog] = useState(blog);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.$id === blog.author_id) {
      setShowEditButton(true);
    }
  }, [user, blog]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await updateBlog(blog.$id, editedBlog);
    window.location.reload();
    setIsLoading(false);
  };

  return (
    showEditButton && (
      <Dialog>
        <DialogTrigger>
          <SquarePenIcon />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>Edit your blog here.</DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Title"
              value={editedBlog.title}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, title: e.target.value })
              }
            />
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Content"
              value={editedBlog.content}
              rows={10}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, content: e.target.value })
              }
            />
            <Button
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
}
