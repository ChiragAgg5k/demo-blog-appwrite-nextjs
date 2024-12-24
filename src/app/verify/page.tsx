"use client";

import { Button } from "@/components/ui/button";
import { account } from "@/lib/appwrite";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify() {
  const urlParams = useSearchParams();
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "missing"
  >(!secret || !userId ? "missing" : "loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateVerification = async () => {
      try {
        if (secret !== null && userId !== null) {
          await account.updateVerification(userId, secret);
          setStatus("success");
        }
      } catch (error) {
        setError(error as string);
        setStatus("error");
      }
    };

    if (status !== "missing") {
      updateVerification();
    }
  }, [secret, userId, status]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold text-center text-indigo-600">
        {status === "loading"
          ? "Verifying your email..."
          : status === "success"
            ? "Email verified"
            : status === "missing"
              ? "Invalid verification link"
              : "Email verification failed"}
      </h1>
      <p className="text-base text-gray-500 leading-8 text-center ">
        {status === "loading"
          ? "Please wait while we verify your email..."
          : status === "success"
            ? "Your email has been verified. You can now login to your account."
            : status === "missing"
              ? "The verification link is invalid or has expired. Please request a new verification email."
              : "There was an error verifying your email: " + error}
      </p>
      {status !== "loading" && (
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 px-7"
          onClick={() =>
            (window.location.href = status === "success" ? "/profile" : "/auth")
          }
        >
          {status === "success" ? "Go to profile" : "Go to login"}
        </Button>
      )}
    </div>
  );
}
