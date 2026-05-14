import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mohan Krishna Garments & Cloth | Wholesale Ladies Wear",
  description: "Exclusive Wholesale Dealers for Ladies Wear. 32 Years of Trust in Vijayawada. Specializing in 3-Piece Sets, Lehangas, Fancy Wear, and more.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MK Garments",
  },
  icons: {
    icon: "/icon-512.png",
    apple: "/icon-512.png",
  },
  themeColor: "#004d40",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="mesh-bg" />
          <CustomCursor />
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          
        </LanguageProvider>
      </body>
    </html>
  );
}
