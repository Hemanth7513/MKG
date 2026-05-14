"use client";

import React from "react";

export default function Logo({ size = 50 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <svg width={size * 1.2} height={size * 1.2} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="#001a15" />
          </linearGradient>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#aa8d2d" />
          </linearGradient>
        </defs>
        
        {/* Elite Minimalist Dress Vector */}
        <path d="M50 20L35 35C33 37 35 45 35 45H65C65 45 67 37 65 35L50 20Z" fill="url(#logo-grad)" />
        <path d="M35 45C35 45 20 75 10 90H90C80 75 65 45 65 45H35Z" fill="url(#logo-grad)" opacity="0.9" />
        
        {/* Gold Accent - The "Legacy" Stitch */}
        <path d="M50 20V90" stroke="url(#gold-grad)" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="50" cy="15" r="4" fill="url(#gold-grad)" />
      </svg>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 
          spellCheck={false}
          style={{ 
            fontSize: '1.2rem', 
            margin: 0, 
            color: 'var(--primary)', 
            fontWeight: 900, 
            letterSpacing: '1px',
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1
          }}
        >
          MOHAN KRISHNA
        </h1>
        <span 
          spellCheck={false}
          style={{ 
            fontSize: '0.6rem', 
            textTransform: 'uppercase', 
            letterSpacing: '5px', 
            fontWeight: 900,
            color: 'var(--secondary)',
            marginTop: '2px'
          }}
        >
          EST. 1994
        </span>
      </div>
    </div>
  );
}
