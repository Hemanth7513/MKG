"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import Magnetic from "@/components/Magnetic";
import MarqueeStrip from "@/components/MarqueeStrip";

const categories = [
  {
    id: '3piece', title: '3 Piece Sets', img: '/images/three-piece.jpg',
    tag: 'BESTSELLER', color: '#004d40',
    desc: 'Premium 3-piece sets with modern design and heritage weave.',
  },
  {
    id: 'lehangas', title: 'Lehangas', img: '/images/lehanga.png',
    tag: 'BRIDAL', color: '#8B1A3A',
    desc: 'Designer lehangas and traditional wear for exclusive occasions.',
  },
  {
    id: 'nightwear', title: 'Nightwear', img: '/images/nightwear.png',
    tag: 'COMFORT', color: '#2d4a6b',
    desc: 'Elite comfort cotton nightwear with contemporary prints.',
  },
  {
    id: 'leggings', title: 'Leggings', img: '/images/leggings-v2.png',
    tag: '50+ SHADES', color: '#5a3a7a',
    desc: 'High-stretch premium leggings in 50+ vibrant shades.',
  },
  {
    id: 'fancy', title: 'Fancy Wear', img: '/images/fancy.png',
    tag: 'TRENDING', color: '#7a3a1a',
    desc: 'Trending fancy wear and western fusion.',
  },
  {
    id: 'coord', title: 'Co-ord Sets', img: '/images/coord-set.png',
    tag: 'NEW ARRIVAL', color: '#2a5a4a',
    desc: 'Matching top & bottom co-ord sets — effortless style for every occasion.',
  },
];

export default function CollectionsPage() {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '160px' }}>
      {/* ── HEADER ── */}
      <section ref={headerRef} style={{ padding: '160px 0 80px', overflow: 'hidden' }}>
        <div className="section-container">
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'block', color: 'var(--secondary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '16px' }}
                >
                  The Catalogue
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="h1-hero" style={{ fontSize: 'clamp(2.5rem, 10vw, 11rem)', lineHeight: 0.85 }}
                >
                  DISCOVERY
                </motion.h1>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MarqueeStrip items={['3 Piece Sets', 'Lehangas', 'Nightwear', 'Leggings', 'Co-ord Sets', 'Fancy Wear', 'Cotton Sets', 'Party Wear']} />

      {/* ── FRESH STOCK NOTICE ── */}
      <div style={{ padding: '0 0 80px' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              padding: '36px 48px',
              background: 'var(--primary)',
              borderRadius: 'var(--radius-lg)',
              flexWrap: 'wrap',
              boxShadow: '0 12px 40px rgba(0,77,64,0.2)',
            }}
          >
            {/* Pulsing dot */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--secondary)' }} />
              <div style={{
                position: 'absolute', inset: -5,
                borderRadius: '50%',
                border: '2px solid var(--secondary)',
                opacity: 0.5,
                animation: 'ping 1.8s ease-out infinite',
              }} />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{
                fontFamily: 'Unbounded',
                fontWeight: 800,
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                color: 'white',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}>
                Fresh Stock · Every 10 Days
              </span>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                New collections arrive at our store every 10 days — visit or contact us to see the latest additions before they reach the shelves.
              </p>
            </div>
            <span style={{
              flexShrink: 0,
              padding: '12px 28px',
              background: 'var(--secondary)',
              color: '#002d25',
              borderRadius: '100px',
              fontFamily: 'Unbounded',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              Updated Regularly
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── GRID ── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="section-container">
          <div className="grid-editorial">
            {categories.map((cat, i) => {
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: (i % 3) * 0.12 }}
                  style={{
                    aspectRatio: '1 / 1.95',
                    height: 'auto',
                  }}
                  className="cat-card col-span-4"
                >
                  <Image src={cat.img} alt={cat.title} fill style={{ objectFit: 'cover' }} className="cat-card-img" />
                  <div className="cat-card-overlay">
                    <h2 style={{ fontFamily: 'Unbounded', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1, margin: 0 }}>
                      {cat.title}
                    </h2>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── FOOTNOTE DISCLAIMER ── */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <p style={{ color: 'var(--primary)', opacity: 0.45, fontSize: '0.8rem', fontStyle: 'italic', maxWidth: '640px', margin: '0 auto', padding: '0 20px', lineHeight: 1.6 }}>
              * Images are for representation purpose only. It may change from brand to brand and catalogue also.
            </p>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: 'clamp(48px, 8vw, 100px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '48px', background: 'linear-gradient(135deg, rgba(0,77,64,0.06) 0%, rgba(197,160,40,0.04) 100%)' }}
          >
            <div>
              <h3 style={{ fontFamily: 'Unbounded', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--primary)', lineHeight: 1.1, marginBottom: '16px' }}>
                PARTNER FOR<br />WHOLESALE
              </h3>
              <p style={{ opacity: 0.5, fontSize: '1rem', fontWeight: 600 }}>Ready to stock? Get bulk pricing & catalogue.</p>
            </div>
            <Magnetic>
              <Link href="/contact" className="btn-primary btn-gold" style={{ color: '#002d25', borderColor: 'transparent' }}>
                GET WHOLESALE PRICING
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
