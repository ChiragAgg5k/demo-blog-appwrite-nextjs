"use client";

import account from "@/lib/appwrite";
import { ID, Models, OAuthProvider } from "appwrite";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  $id: string;
  email: string;
  name: string;
}

const UserContext = createContext<{
  user: User | null;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}>({
  user: null,
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
});

export function useUser() {
  return useContext(UserContext);
}

export function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function login(email: string, password: string) {
    const loggedIn: Models.Session = await account.createEmailPasswordSession(
      email,
      password,
    );

    const user = await account.get();

    setUser({
      $id: user.$id,
      email: user.email,
      name: user.name,
    });

    router.push("/profile");
  }

  async function loginWithGoogle() {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      new URL("/profile", window.location.href).toString(),
    );
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    router.push("/");
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = (await account.get()) as unknown as User;
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, logout, register, loginWithGoogle }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
