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

export default function Create() {
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
        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-gray-500">
            Choose a catchy title for your post.
          </p>
          <Input className="mb-4" id="title" placeholder="Title" />
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
          />
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            Create
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
