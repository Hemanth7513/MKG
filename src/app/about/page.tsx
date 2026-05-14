"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Magnetic from "@/components/Magnetic";

const milestones = [
  { year: '1994', title: 'Founded', te: 'స్థాపించబడింది', desc: 'Started as a wholesale dealer from our home in Vijayawada.' },
  { year: '2000', title: 'First Shop', te: '', desc: 'Opened our first dedicated shop in One Town, expanding our wholesale reach across AP.' },
  { year: '2022', title: 'New Premises', te: '', desc: 'Moved to Naganna Trade One Mall — 3,000 sq ft of curated wholesale fashion.' },
  { year: '2024', title: '32 Years Strong', te: '32 సంవత్సరాలు', desc: '500+ retail partners across Andhra Pradesh & Telangana. విశ్వసనీయత కొనసాగుతుంది.' },
];

const values = [
  { title: 'INTEGRITY', te: 'నిజాయితీ', desc: 'Honest dealings and transparent pricing for 32 years.', icon: '⚖️' },
  { title: 'QUALITY', te: 'నాణ్యత', desc: 'Every stitch inspected, every fabric hand-picked.', icon: '✦' },
  { title: 'PARTNERSHIP', te: 'భాగస్వామ్యం', desc: 'మేము పెరిగినప్పుడు మీరు పెరుగుతారు. We grow when our retail partners grow.', icon: '◈' },
];

export default function AboutPage() {
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
            Since 1994
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
                Three Decades<br />of Trust
              </h2>
              <p style={{ opacity: 0.65, fontSize: '1.1rem', lineHeight: 1.9, marginBottom: '24px' }}>
                Founded in 1994, Mohan Krishna Garments started as a home-based wholesale dealer and has grown into Vijayawada's landmark wholesale destination.
              </p>
              <p style={{ opacity: 0.5, fontSize: '1rem', lineHeight: 1.9 }}>
                From our humble beginnings at home, we have grown to source directly from master weavers in Ahmedabad, Surat &amp; Hyderabad, serving hundreds of retailers.
              </p>
              <div style={{ marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span className="pill-badge">విజయవాడ</span>
                <span className="pill-badge pill-badge-gold">32 Years</span>
                <span className="pill-badge">ఆంధ్రప్రదేశ్</span>
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
                <p style={{ color: 'white', fontFamily: 'Syne', fontWeight: 800, fontSize: '2.5rem', lineHeight: 1 }}>1994</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX BANNER ── */}
      <section ref={bannerRef} style={{ height: '480px', overflow: 'hidden', position: 'relative', margin: '80px 0' }}>
        <motion.div style={{ y: bannerY, scale: bannerScale, width: '100%', height: '120%', position: 'absolute', top: '-10%' }}>
          <Image src="/images/store.png" alt="MK Garments Store" fill style={{ objectFit: 'cover', opacity: 0.7 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,26,21,0.85) 0%, rgba(0,26,21,0.4) 60%, transparent 100%)', display: 'flex', alignItems: 'center' }}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 5rem)', color: 'white', lineHeight: 1.1, marginBottom: '24px' }}>
                Naganna Trade One Mall<br />
                <span style={{ color: 'var(--secondary)', fontSize: '0.5em' }}>ONE TOWN, VIJAYAWADA</span>
              </h3>
              <p style={{ color: 'white', opacity: 0.6, maxWidth: '400px', lineHeight: 1.7 }}>3rd Floor, A Block — 3,000 sq ft of curated wholesale fashion.</p>
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
            Our Journey<br /><span style={{ color: 'var(--secondary)', fontSize: '0.5em', letterSpacing: '8px', fontFamily: 'Bricolage Grotesque' }}>మా ప్రయాణం</span>
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
                    {m.te && <p style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '3px', marginBottom: '16px' }}>{m.te}</p>}
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
            మా విలువలు • OUR VALUES
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
                <p style={{ color: 'var(--primary)', opacity: 0.4, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '3px', marginBottom: '20px' }}>{v.te}</p>
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
