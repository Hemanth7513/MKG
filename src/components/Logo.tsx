"use client";

import Image from "next/image";

export default function Logo({ size = 50 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Image
        src="/logo.png"
        alt="MK Garments Logo"
        width={size * 1.4}
        height={size * 1.4}
        style={{ objectFit: 'contain', borderRadius: '50%' }}
        priority
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1
          spellCheck={false}
          style={{
            fontSize: '1.1rem',
            margin: 0,
            color: 'var(--primary)',
            fontWeight: 900,
            letterSpacing: '0.5px',
            fontFamily: "'Syne', sans-serif",
            lineHeight: 1,
          }}
        >
          MOHAN KRISHNA
        </h1>
        <span
          spellCheck={false}
          style={{
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            fontWeight: 800,
            color: 'var(--secondary)',
            marginTop: '3px',
          }}
        >
          GARMENTS · EST. 1999
        </span>
      </div>
    </div>
  );
}
