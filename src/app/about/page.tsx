"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Magnetic from "@/components/Magnetic";
import { useLanguage } from "@/components/LanguageContext";

const milestones = [
  { year: '1999', title: 'Founded', desc: 'Started as a wholesale dealer in Vijayawada.' },
  { year: '2000', title: 'First Shop', desc: 'Opened our first dedicated wholesale shop in Gayatri Towers, near Vijayawada Old Bus Stand.' },
  { year: '2022', title: 'New Premises', desc: 'Moved to Naganna Trade One Mall — 3,000 sq ft of curated wholesale fashion.' },
  { year: '2026', title: '32 Years Strong', desc: 'Retail partners across Andhra Pradesh & Telangana.' },
];

const values = [
  {
    title: 'INTEGRITY',
    desc: 'Honest dealings and transparent pricing for 32 years.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'QUALITY',
    desc: 'Every stitch inspected, every fabric hand-picked.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'PARTNERSHIP',
    desc: 'We grow when our retail partners grow.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const bannerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ["start end", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const bannerScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '160px' }}>
      {/* ── HEADER ── */}
      <section style={{ padding: '160px 0 80px' }}>
        <div className="section-container">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: 'block', color: 'var(--secondary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '10px', textTransform: 'uppercase', marginBottom: '20px' }}
          >
            Since 1999
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="h1-hero" style={{ fontSize: 'clamp(2.5rem, 12vw, 13rem)', lineHeight: 0.85 }}
          >
            OUR<br /><span className="text-outline">LEGACY</span>
          </motion.h1>
        </div>
      </section>
 
      {/* ── INTRO ── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="section-container">
          <div className="grid-editorial" style={{ alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="col-span-5"
            >
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontFamily: 'Syne', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '36px' }}>
                {t('about_intro_title')}
              </h2>
              <p style={{ opacity: 0.65, fontSize: '1.1rem', lineHeight: 1.9, marginBottom: '24px' }}>
                {t('about_text')}
              </p>
              <p style={{ opacity: 0.5, fontSize: '1rem', lineHeight: 1.9 }}>
                {t('manufacturer_text')}
              </p>
              <div style={{ marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span className="pill-badge">Vijayawada</span>
                <span className="pill-badge pill-badge-gold">32 Years</span>
                <span className="pill-badge">Andhra Pradesh</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="col-span-7"
              style={{ height: 'clamp(400px, 60vh, 680px)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-lg)' }}
            >
              <Image src="/images/heritage.png" alt="Heritage Weaving" fill style={{ objectFit: 'cover' }} />
              {/* Floating badge overlay */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', bottom: '40px', left: '40px', padding: '20px 28px', background: 'rgba(0,26,21,0.85)', backdropFilter: 'blur(16px)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(197,160,40,0.3)' }}
              >
                <p style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '6px' }}>ESTABLISHED</p>
                <p style={{ color: 'white', fontFamily: 'Syne', fontWeight: 800, fontSize: '2.5rem', lineHeight: 1 }}>1999</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHOWROOM BANNER ── */}
      <section style={{ margin: '80px 0' }}>
        <div className="section-container">
          <div style={{ background: 'linear-gradient(145deg, #f0f7f4 0%, #e2f0eb 100%)', borderRadius: 'var(--radius-xl)', padding: '80px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,77,64,0.1)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 0.05, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{ position: 'absolute', right: '-10%', top: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', borderRadius: '50%' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 5rem)', color: 'var(--primary)', lineHeight: 1.1, marginBottom: '24px' }}>
                Naganna Trade One Mall<br />
                <span style={{ color: 'var(--secondary)', fontSize: '0.45em', letterSpacing: '2px' }}>ONE TOWN, VIJAYAWADA</span>
              </h3>
              <p style={{ color: 'var(--primary)', opacity: 0.7, maxWidth: '500px', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Moved to our new premises in 2022. 3rd Floor, A Block — 3,000 sq ft of curated wholesale fashion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 5rem)', color: 'var(--primary)', marginBottom: '80px', textTransform: 'uppercase', letterSpacing: '-0.04em' }}
          >
            Our Journey
          </motion.h2>

          <div style={{ position: 'relative' }}>
            <div className="timeline-line" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              {milestones.map((m, i) => {
                const softColors = ['#fdfaf0', '#f2fcf5', '#f0f8ff', '#fcf2f2', '#fcfaf2'];
                return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9 }}
                  className="timeline-wrapper"
                  style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', position: 'relative' }}
                >
                  {/* Center dot */}
                  <div className="timeline-dot" style={{ position: 'absolute', left: '50%', top: '28px', transform: 'translate(-50%, -50%)', zIndex: 2 }} />
                  <div className="timeline-card" style={{ background: softColors[i % softColors.length] }}>
                    <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '3rem', color: 'var(--secondary)', opacity: 0.3, lineHeight: 1 }}>{m.year}</span>
                    <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.8rem', color: 'var(--primary)', marginTop: '8px', marginBottom: '6px' }}>{m.title}</h3>
                    <p style={{ opacity: 0.6, lineHeight: 1.8 }}>{m.desc}</p>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '8px', marginBottom: '64px', opacity: 0.4, textTransform: 'uppercase' }}
          >
            OUR VALUES
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="process-card"
              >
                <span style={{ fontSize: '2rem', marginBottom: '24px', display: 'block' }}>{v.icon}</span>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '6px' }}>{v.title}</h3>
                <p style={{ opacity: 0.6, lineHeight: 1.8 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', padding: '80px 0' }}
        >
          <p style={{ opacity: 0.4, fontWeight: 800, letterSpacing: '6px', fontSize: '0.75rem', marginBottom: '32px', textTransform: 'uppercase' }}>
            WE LOOK FORWARD TO SEEING YOU
          </p>
          <Magnetic>
            <Link href="/contact" className="btn-primary" style={{ fontSize: '0.8rem' }}>
              PARTNER WITH US
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </main>
  );
}
