"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SuccessAuth() {
  const urlParams = useSearchParams();
  const success = urlParams.get("success");

  useEffect(() => {
    if (success === "signin") {
      toast.success("Successfully signed in");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (success === "signout") {
      toast.success("Successfully signed out");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [success]);

  return <div></div>;
}
