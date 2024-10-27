import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "800"],
})

export const metadata: Metadata = {
  title: "jhoanpassword",
  description: "app para gestionar tus passwords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
