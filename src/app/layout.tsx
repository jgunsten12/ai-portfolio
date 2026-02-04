import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jack Gunsten | AI Product Manager Portfolio",
  description: "Building the future of AI. Combining technical depth with product intuition to build AI-powered experiences that empower economic empowerment.",
  keywords: ["AI", "Product Manager", "Machine Learning", "Portfolio", "Square"],
  authors: [{ name: "Jack Gunsten" }],
  openGraph: {
    title: "Jack Gunsten | AI Product Manager Portfolio",
    description: "Building the future of AI at Square",
    type: "website",
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
      </body>
    </html>
  );
}
