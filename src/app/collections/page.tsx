"use client";

import { useLanguage } from "@/components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

const Icons = {
  Dress: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
      <path d="M12 22V12" />
      <path d="M20 7l-8 5-8-5" />
    </svg>
  ),
  Shirt: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M12 3l1.912 5.886L20 10.8l-5.886 1.912L12 21l-1.912-5.886L4 13.2l5.886-1.912z" />
    </svg>
  )
};

const categories = [
  { id: '3piece', key: 'cat_3piece', icon: <Icons.Dress />, desc: 'Premium 3-piece sets, including exclusive Fandy Silk collections.' },
  { id: 'lehangas', key: 'cat_lehangas', icon: <Icons.Shirt />, desc: 'Designer lehangas and traditional wear for exclusive occasions.' },
  { id: 'nighty', key: 'cat_nighty', icon: <Icons.Moon />, desc: 'Elite comfort cotton nighties with contemporary prints.' },
  { id: 'leggings', key: 'cat_leggings', icon: <Icons.Layers />, desc: 'High-stretch premium leggings in over 50+ vibrant shades.' },
  { id: 'fancy', key: 'cat_fancy', icon: <Icons.Sparkles />, desc: 'Trending fancy wear and western fusion for modern retailers.' },
];

export default function CollectionsPage() {
  const { t } = useLanguage();

  return (
    <main style={{ minHeight: '100vh', padding: '160px 0 240px' }}>
      <div className="section-container">
        <header style={{ marginBottom: '160px' }}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '8px', textTransform: 'uppercase' }}
          >
            The Catalogue
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1-hero" 
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)', marginTop: '24px' }}
          >
            DISCOVERY
          </motion.h1>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px' }}>
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.id} 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              style={{ 
                gridColumn: i % 3 === 0 ? 'span 7' : 'span 5',
                height: i % 3 === 0 ? '600px' : '500px',
                marginTop: i % 2 === 1 ? '80px' : '0'
              }}
              className="reveal-card"
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '64px', height: '64px', marginBottom: '48px', color: 'var(--primary)' }}>
                    {cat.icon}
                  </div>
                  <h2 style={{ fontSize: '3rem', fontFamily: 'Syne', marginBottom: '24px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t(cat.key)}
                  </h2>
                  <p style={{ color: 'var(--foreground)', opacity: 0.6, fontSize: '1.1rem', maxWidth: '300px' }}>
                    {cat.desc}
                  </p>
                </div>
                
                <Magnetic>
                  <Link href="/contact" className="awwwards-btn" style={{ width: '100%', borderStyle: 'dashed', borderWidth: '1px' }}>
                    INQUIRE FOR WHOLESALE
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
