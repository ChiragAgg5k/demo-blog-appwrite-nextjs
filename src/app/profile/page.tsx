"use client";

import { useUser } from "@/components/context/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useState } from "react";

const formatDate = (date: string) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 1) {
    return "Today";
  }
  if (diffDays === 1) {
    return "Yesterday";
  }
  return `${diffDays} days ago`;
};

export default function Profile() {
  const { user, logout, isAuthenticated } = useUser();

  const [loading, setLoading] = useState(false);

  if (isAuthenticated === false) {
    return redirect("/auth");
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center flex-col gap-4 p-4">
      <Card className="w-full max-w-md mb-12">
        <CardHeader className="flex flex-row items-center justify-start gap-4 border-b border-indigo-200 mx-4">
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
        <CardContent className="flex items-center justify-between mt-4">
          <p className="text-gray-600">
            Joined:{" "}
            {user?.$createdAt ? formatDate(user?.$createdAt) : "Not available"}
          </p>
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
        </CardContent>
      </Card>
    </div>
  );
}
