import type { Metadata } from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
    subsets: ["latin"], variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Ecommerce NextJS App",
  description: "Ecommerce practice project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('bg-background min-h-screen font-sans antialiased', inter.variable)}
      >
        {children}
      </body>
    </html>
  );
}
