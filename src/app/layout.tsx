import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Jack Gunsten | Portfolio",
  description: "Building the future at Square. Combining technical depth with product intuition to build AI-powered experiences that drive real impact.",
  keywords: ["AI", "Product Manager", "Machine Learning", "Portfolio", "Square", "RevOps", "Data"],
  authors: [{ name: "Jack Gunsten" }],
  creator: "Jack Gunsten",
  metadataBase: new URL("https://jackgunsten.com"),
  openGraph: {
    title: "Jack Gunsten | Portfolio",
    description: "Building the future at Square",
    type: "website",
    locale: "en_US",
    siteName: "Jack Gunsten Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack Gunsten | Portfolio",
    description: "Building the future at Square",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
