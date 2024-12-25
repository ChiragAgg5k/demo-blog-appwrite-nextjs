"use client";

import { useUser } from "@/components/context/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteBlog, getBlogsByUserId } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { user, isAuthenticated, logout, verifyEmail } = useUser();

  const [loading, setLoading] = useState(false);
  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);
  const [blogSelectedForDelete, setBlogSelectedForDelete] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleVerifyEmail = async () => {
    setVerifyEmailLoading(true);
    await verifyEmail();
  };

  const handleDeleteBlog = async () => {
    if (!blogSelectedForDelete) return;
    await deleteBlog(blogSelectedForDelete);
    setIsDialogOpen(false);

    toast.success("Blog deleted successfully");

    window.location.reload();
  };

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs", user?.$id],
    queryFn: () => getBlogsByUserId(user?.$id),
  });

  if (isAuthenticated === false) {
    return redirect("/auth");
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center flex-col gap-4 p-4">
      <Card className="w-full max-w-lg mb-12 relative">
        <CardHeader className="flex flex-row items-center justify-start gap-4 border-b border-indigo-200 mx-4">
          <Badge
            className={`absolute top-4 right-4 ${user?.emailVerification && "text-indigo-500"}`}
            variant="outline"
          >
            {user?.emailVerification ? "Verified" : "Unverified"}
          </Badge>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-2xl border border-indigo-500 text-indigo-500 bg-white">
              {user?.name?.charAt(0)}
              {user?.name?.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-start gap-1">
            <CardTitle>{user?.name ? user?.name : "Loading..."}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between mt-6">
          <p className="text-gray-600">
            Joined:{" "}
            {user?.$createdAt ? formatDate(user?.$createdAt) : "Not available"}
          </p>
          <div className="flex items-center justify-center gap-3">
            {!user?.emailVerification && (
              <Button
                variant="outline"
                onClick={handleVerifyEmail}
                disabled={verifyEmailLoading}
              >
                {verifyEmailLoading ? "Verifying..." : "Verify Email"}
              </Button>
            )}
            <Button
              className="bg-indigo-500 text-white hover:bg-indigo-600"
              onClick={() => {
                setLoading(true);
                logout();
              }}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="w-full max-w-4xl mt-12">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            blogs?.documents.map((blog) => (
              <Card
                key={blog.$id}
                className="hover:shadow-md transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 line-clamp-3">{blog.content}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Link
                    href={`/blogs/${blog.$id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Read More
                  </Link>
                  <Button
                    variant="outline"
                    className="hover:text-red-500 text-gray-500"
                    onClick={() => {
                      setBlogSelectedForDelete(blog.$id);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Trash2Icon className="w-4 h-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
          {blogs?.documents.length === 0 && (
            <p className="text-gray-500">
              No blogs found. Create your first one{" "}
              <Link href="/create" className="text-indigo-600 hover:underline">
                here!
              </Link>
            </p>
          )}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-indigo-500 text-white hover:bg-indigo-600"
              onClick={handleDeleteBlog}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
