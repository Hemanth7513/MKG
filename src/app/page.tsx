"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import LanguageTicker from "@/components/LanguageTicker";

const Icons = {
  Dress: ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
      <path d="M12 22V12" />
      <path d="M20 7l-8 5-8-5" />
    </svg>
  ),
  Sparkles: ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 3l1.912 5.886L20 10.8l-5.886 1.912L12 21l-1.912-5.886L4 13.2l5.886-1.912z" />
    </svg>
  ),
  ArrowUpRight: ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
};

const LegacyBadge = () => (
  <div className="legacy-badge">
    <svg viewBox="0 0 100 100">
      <defs>
        <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
      </defs>
      <text fill="var(--secondary)" fontSize="8" fontWeight="800" letterSpacing="3">
        <textPath xlinkHref="#circlePath">
          32 YEARS OF EXCELLENCE • ESTD 1994 • TRUSTED BY RETAILERS •
        </textPath>
      </text>
    </svg>
  </div>
);

export default function HomePage() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);
  
  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <LegacyBadge />
      
      {/* HERO SECTION */}
      <section style={{ height: '140vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '160px 24px' }}>
        <div className="section-container" style={{ position: 'relative', width: '100%' }}>
          <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            className="hero-content"
          >
            <LanguageTicker />
            
            <div style={{ position: 'relative' }}>
              <motion.h1 
                className="h1-hero"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                MOHAN <br/> <span className="text-outline">KRISHNA</span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{ 
                  position: 'absolute', 
                  right: '0', 
                  top: '10%', 
                  width: '45vw', 
                  height: '60vh', 
                  zIndex: -1,
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden'
                }}
              >
                <Image 
                  src="/images/hero.png" 
                  alt="Heritage Silk" 
                  fill
                  style={{ objectFit: 'cover', opacity: 0.9 }}
                  priority
                />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{ marginTop: '120px', display: 'flex', gap: '40px', alignItems: 'center' }}
            >
              <Magnetic>
                <Link href="/collections" className="awwwards-btn">
                  EXPLORE CATALOGUE
                </Link>
              </Magnetic>
              <p style={{ maxWidth: '300px', fontSize: '0.9rem', opacity: 0.5, fontWeight: 700, letterSpacing: '1px' }}>
                Curating the finest fabrics for master retailers since 1994. Quality that speaks through every thread.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES SECTION - Elevated Asymmetric Grid */}
      <section style={{ padding: 'var(--section-padding) 0', background: '#001a15', color: '#fff' }}>
        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '200px', gap: '64px' }}>
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '10px', textTransform: 'uppercase' }}>Selected Series</span>
              <h2 style={{ fontSize: 'clamp(5rem, 12vw, 12rem)', fontWeight: 800, fontFamily: 'Syne', letterSpacing: '-0.06em', lineHeight: 0.8, marginTop: '32px', textTransform: 'uppercase' }}>
                New <br/>Arrivals
              </h2>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '64px' }}>
            {/* LARGE FEATURE CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{ gridColumn: 'span 8', height: '900px' }}
              className="reveal-card"
            >
              <div className="image-wrapper">
                <Image src="/images/silk.png" alt="Fandy Silk" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="content-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,26,21,0.95))' }}>
                <div>
                  <div style={{ width: '100px', height: '100px', color: 'var(--secondary)', marginBottom: '80px' }}>
                    <Icons.Dress />
                  </div>
                  <h3 style={{ fontSize: '5rem', fontWeight: 800, fontFamily: 'Syne', color: 'white', marginBottom: '32px', letterSpacing: '-3px', textTransform: 'uppercase' }}>FANDY SILK</h3>
                  <p style={{ color: 'white', opacity: 0.6, fontSize: '1.3rem', maxWidth: '450px' }}>Our signature 3-piece sets. A fusion of heritage embroidery and contemporary silhouettes.</p>
                </div>
                <Link href="/collections" style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--secondary)', fontWeight: 800, textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '6px' }}>
                  VIEW COLLECTION <Icons.ArrowUpRight style={{ width: '24px', height: '24px' }} />
                </Link>
              </div>
            </motion.div>

            {/* OFFSET CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{ gridColumn: 'span 4', height: '700px', alignSelf: 'center', marginTop: '-200px' }}
              className="reveal-card"
            >
              <div className="image-wrapper">
                <Image src="/images/lehanga.png" alt="Lehangas" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="content-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,26,21,0.9))' }}>
                <div>
                  <h3 style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'Syne', color: 'white', marginBottom: '24px', letterSpacing: '-1px', textTransform: 'uppercase' }}>LEHANGAS</h3>
                  <p style={{ color: 'white', opacity: 0.6, fontSize: '1.1rem' }}>Bridal wear redefined for the modern age.</p>
                </div>
                <Link href="/collections" style={{ color: 'var(--secondary)', fontWeight: 800, textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '4px' }}>
                  EXPLORE <Icons.ArrowUpRight style={{ width: '18px', height: '18px' }} />
                </Link>
              </div>
            </motion.div>

            {/* HERITAGE CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ gridColumn: 'span 12', height: '600px', marginTop: '100px' }}
              className="reveal-card"
            >
              <div className="image-wrapper">
                <Image src="/images/heritage.png" alt="Heritage" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="content-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', background: 'linear-gradient(to right, rgba(0,26,21,0.9), transparent)' }}>
                <div style={{ maxWidth: '600px' }}>
                   <h3 style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'Syne', color: 'white', marginBottom: '32px', letterSpacing: '-2px', textTransform: 'uppercase' }}>A Legacy in Every Loop</h3>
                   <p style={{ color: 'white', opacity: 0.6, fontSize: '1.2rem', lineHeight: 1.6 }}>From the hand-looms of master weavers to your retail racks. 32 years of uncompromising quality.</p>
                </div>
                <Magnetic>
                  <Link href="/about" className="awwwards-btn" style={{ borderColor: 'white', color: 'white' }}>
                    OUR LEGACY
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '240px 0', background: '#001a15', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div className="section-container">
          <motion.h2 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            style={{ fontSize: 'clamp(5rem, 20vw, 15rem)', fontWeight: 800, fontFamily: 'Syne', letterSpacing: '-0.07em', marginBottom: '120px', textAlign: 'center', lineHeight: 0.8 }}
          >
            MOHAN <br/> KRISHNA
          </motion.h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '120px', flexWrap: 'wrap', marginBottom: '160px', fontWeight: 800, letterSpacing: '8px', fontSize: '0.8rem', opacity: 0.8 }}>
            <Link href="/collections" style={{ color: 'inherit', textDecoration: 'none' }}>CATALOGUE</Link>
            <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>OUR LEGACY</Link>
            <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>VISIT US</Link>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '60px' }}>
            <p style={{ opacity: 0.3, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '10px', textTransform: 'uppercase' }}>
              © 2026 • THE WHOLESALE LANDMARK
            </p>
            <p style={{ opacity: 0.3, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '10px', textTransform: 'uppercase' }}>
              VIJAYAWADA • SINCE 1994
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
