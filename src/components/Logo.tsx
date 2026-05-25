"use client";

import Image from "next/image";

export default function Logo({ size = 50 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="MK Garments"
      width={size * 2}
      height={size * 2}
      style={{
        objectFit: "contain",
        borderRadius: "50%",
        display: "block",
      }}
      priority
    />
  );
}
