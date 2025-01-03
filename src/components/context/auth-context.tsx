"use client";

import { account } from "@/lib/appwrite";
import { ID, OAuthProvider } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface User {
  $id: string;
  $createdAt: string;
  email: string;
  name: string;
  emailVerification: boolean;
}

const UserContext = createContext<{
  isAuthenticated: boolean | null;
  user: User | null;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  verifyEmail: () => Promise<void>;
}>({
  isAuthenticated: null,
  user: null,
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
});

export function useUser() {
  return useContext(UserContext);
}

export function AuthProvider(props: React.PropsWithChildren<unknown>) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      window.location.href = "/profile";
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    window.location.href = "/?success=signout";
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
    await verifyEmail();
    window.location.href = "/profile";
  }

  async function verifyEmail() {
    await account.createVerification(
      new URL("/verify", window.location.href).toString(),
    );
    toast.success("Please check your email for a verification link");
  }

  // ?: Now moved to appwrite-functions
  // async function verifyAndCreateProfile(loggedInUser: User) {
  //   try {
  //     await database.getDocument(
  //       APPWRITE_DATABASE_ID,
  //       APPWRITE_USERS_COLLECTION_ID,
  //       loggedInUser.$id,
  //     );
  //   } catch (error: unknown) {
  //     if (error instanceof AppwriteException && error.code === 404) {
  //       await database.createDocument(
  //         APPWRITE_DATABASE_ID,
  //         APPWRITE_USERS_COLLECTION_ID,
  //         loggedInUser.$id,
  //         {
  //           name: loggedInUser.name,
  //           email: loggedInUser.email,
  //         },
  //       );
  //     }
  //   }
  // }

  useEffect(() => {
    async function init() {
      try {
        const loggedIn = (await account.get()) as unknown as User;
        // await verifyAndCreateProfile(loggedIn);
        setUser(loggedIn);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    }

    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        loginWithGoogle,
        verifyEmail,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
