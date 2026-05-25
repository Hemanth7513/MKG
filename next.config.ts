import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Aggressively cache outputs for blazing fast Vercel edge delivery
  reactStrictMode: true,
  poweredByHeader: false, // Security: hide X-Powered-By
  
  async headers() {
    return [
      {
        // Apply security and cache headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
