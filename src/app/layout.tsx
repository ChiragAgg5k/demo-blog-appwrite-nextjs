import { AuthProvider } from "@/components/context/auth-context";
import Header from "@/components/header";
import SuccessAuth from "@/components/landing/success-auth";
import { Toaster } from "@/components/ui/sonner";
import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
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
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  icons: {
    icon: SITE_LOGO,
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    images: [
      {
        url: SITE_IMAGE,
      },
    ],
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
