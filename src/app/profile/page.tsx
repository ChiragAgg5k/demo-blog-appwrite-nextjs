"use client";

import { useUser } from "@/components/context/auth-context";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { logout } = useUser();

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
