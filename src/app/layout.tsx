import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "Robotlar.uz — Dunyo Robotlari Haqida",
    template: "%s | Robotlar.uz",
  },
  description:
    "Dunyo bo'ylab robotika sohasidagi so'nggi yangiliklar, robot katalogi va texnologiya tahlillari. O'zbek tilida.",
  keywords: ["robotlar", "robotika", "sun'iy intellekt", "texnologiya", "robot yangiliklari"],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://robotlar.uz",
    siteName: "Robotlar.uz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.className} h-full`}>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
