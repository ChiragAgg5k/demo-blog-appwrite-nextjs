"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import account from "@/lib/appwrite";
import { ID } from "appwrite";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function AuthPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  async function onSubmit(
    event: React.SyntheticEvent,
    type: "signin" | "signup",
  ) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password || (type === "signup" && !name)) {
      setError("Please fill all fields");
      return;
    }

    try {
      if (type === "signin") {
        await account.createEmailPasswordSession(email, password);
      } else {
        await account.create(ID.unique(), email, password, name);
      }

      router.push("/?success=signin");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[90vh] flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
              Welcome to <span className="text-indigo-600">Demo Blog</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg/relaxed">
              Join our community to share your stories and connect with others
            </p>
          </div>

          <div className="w-full max-w-md space-y-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            )}

            <div className="rounded-xl border bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50">
              <div className="p-6">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin">
                    <form
                      onSubmit={(event) => onSubmit(event, "signin")}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          placeholder="name@example.com"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          disabled={isLoading}
                          className="transition-colors focus:ring-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="signin-password">Password</Label>
                          <Button variant="link" className="px-0 font-normal">
                            Forgot password?
                          </Button>
                        </div>
                        <Input
                          id="signin-password"
                          type="password"
                          required
                          disabled={isLoading}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          className="transition-colors focus:ring-2"
                        />
                      </div>
                      <Button
                        className="w-full bg-white border border-gray-200 hover:bg-gray-100 text-indigo-500"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                      <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                        Continue with Google
                        <FaGoogle />
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form
                      onSubmit={(event) => onSubmit(event, "signup")}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Name</Label>
                        <Input
                          id="signup-name"
                          placeholder="John Doe"
                          required
                          disabled={isLoading}
                          className="transition-colors focus:ring-2"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          required
                          disabled={isLoading}
                          className="transition-colors focus:ring-2"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          required
                          disabled={isLoading}
                          className="transition-colors focus:ring-2"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                      <Button
                        className="w-full bg-indigo-500 hover:bg-indigo-600"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 absolute bottom-8">
              By continuing, you agree to our{" "}
              <Button variant="link" className="px-1 font-normal">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="px-1 font-normal">
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
