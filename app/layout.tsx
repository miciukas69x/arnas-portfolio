import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arnas - Digital Marketing Specialist",
  description: "Elevate your brand with custom identity and package design. Digital marketing services including Meta Ads, Google Ads, branding, and strategic consulting.",
  keywords: ["digital marketing", "branding", "Meta Ads", "Google Ads", "marketing consulting", "brand identity", "Lithuania"],
  authors: [{ name: "Arnas" }],
  openGraph: {
    title: "Arnas - Digital Marketing Specialist",
    description: "Elevate your brand with custom identity and package design. Digital marketing services including Meta Ads, Google Ads, branding, and strategic consulting.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["lt_LT"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnas - Digital Marketing Specialist",
    description: "Elevate your brand with custom identity and package design. Digital marketing services including Meta Ads, Google Ads, branding, and strategic consulting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
          <GoogleAnalytics />
          <Providers>
            {children}
            <Toaster />
            <Sonner />
            <PerformanceMonitor />
          </Providers>
      </body>
    </html>
  );
}

