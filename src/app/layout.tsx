import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NestSeeker | Accommodation Finder",
  description: "Verified PG, Hostels, and Flats for students and young professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f9ff] text-zinc-950 min-h-screen flex flex-col justify-between`}
      >
        <QueryProvider>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
