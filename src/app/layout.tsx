import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#004d40",
};

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
          <Analytics />
          {/* ═══ NOUPE AI WIDGET ═══ */}
          <Script 
            src="https://www.noupe.com/embed/019e0775ed4c75689ee8193b178882ea9d9f.js" 
            strategy="afterInteractive" 
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
