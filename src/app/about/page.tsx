"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '160px 0 240px' }}>
      <div className="section-container">
        <header style={{ marginBottom: '160px', textAlign: 'center' }}>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '10px', textTransform: 'uppercase' }}
          >
            Since 1994
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="h1-hero" 
            style={{ fontSize: 'clamp(4rem, 15vw, 15rem)', marginTop: '24px' }}
          >
            OUR LEGACY
          </motion.h1>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ gridColumn: 'span 5' }}
          >
            <h2 style={{ fontSize: '3.5rem', fontFamily: 'Syne', fontWeight: 800, color: 'var(--primary)', marginBottom: '40px', lineHeight: 1, textTransform: 'uppercase' }}>
              Three Decades <br/> of Trust
            </h2>
            <div style={{ opacity: 0.7, fontSize: '1.25rem', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '32px' }}>
                Founded in 1994, Mohan Krishna Garments has grown from a local shop to a landmark wholesale destination in Vijayawada. Our journey is woven with the threads of quality, integrity, and timeless style.
              </p>
              <p>
                We specialize in curated ladies' wear, sourcing the finest fabrics directly from master weavers across India to ensure our retailers receive only the best.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ 
              gridColumn: 'span 7', 
              height: '700px', 
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <Image 
              src="/images/heritage.png" 
              alt="Heritage Weaving" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>

        <div style={{ marginTop: '240px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '8px', marginBottom: '80px', opacity: 0.5 }}>OUR VALUES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
            {[
              { t: 'INTEGRITY', d: 'Honest dealings and transparent pricing for 32 years.' },
              { t: 'QUALITY', d: 'Every stitch inspected, every fabric hand-picked.' },
              { t: 'PARTNERSHIP', d: 'We grow when our retail partners grow.' }
            ].map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: '64px', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Syne', color: 'var(--secondary)', marginBottom: '24px' }}>{val.t}</h3>
                <p style={{ opacity: 0.6 }}>{val.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
