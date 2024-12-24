import { AuthProvider } from "@/components/context/auth-context";
import Header from "@/components/header";
import SuccessAuth from "@/components/landing/success-auth";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demo Blog Appwrite Next.js",
  description: "A demo blog app using Appwrite and Next.js",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Toaster />
          <Suspense fallback={<></>}>
            <SuccessAuth />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
