"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import LanguageTicker from "@/components/LanguageTicker";
import MarqueeStrip from "@/components/MarqueeStrip";
import CounterStat from "@/components/CounterStat";
import StitchDivider from "@/components/StitchDivider";

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } }
};

const marqueeItems = [
  "Mohan Krishna Garments", "మోహన్ కృష్ణ గర్మెంట్స్", "मोहन कृष्णा गारमेंट्स",
  "32 Years of Wholesale Trust", "32 సంవత్సరాల నమ్మకం", "32 वर्षों का विश्वास",
  "Vijayawada's Premier Landmark", "విజయవాడ హోల్‌సేల్ సెంటర్", "विजयवाड़ा थोक केंद्र",
  "Since 1994", "Wholesale Excellence"
];

const process = [
  { n: "01", title: "Source", desc: "Direct from weavers in Ahmedabad, Surat & Hyderabad — no middlemen, best prices." },
  { n: "02", title: "Curate", desc: "Hand-picked for quality, trend, and retailer demand. Only the finest reaches our shelves." },
  { n: "03", title: "Deliver", desc: "Wholesale bulk dispatch to retailers across Andhra Pradesh & beyond. Fast and reliable." },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <main style={{ minHeight: "100vh" }}>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 120 }}>
        <motion.div style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 2, width: "100%" }}>
          <div className="section-container">
            <LanguageTicker />

            <motion.div variants={stagger} initial="hidden" animate="show" style={{ marginTop: 32 }}>
              <motion.h1 variants={fadeUp} className="h1-hero" style={{ marginBottom: 0 }}>MOHAN</motion.h1>
              <motion.h1 variants={fadeUp} className="h1-hero text-outline" style={{ marginBottom: 0 }}>KRISHNA</motion.h1>
              <motion.div variants={fadeUp} style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: "clamp(0.9rem,1.5vw,1.2rem)", color: "var(--secondary)", fontWeight: 700, letterSpacing: "3px" }}>
                  GARMENTS &amp; CLOTH
                </span>
                <span style={{ width: 40, height: 1, background: "var(--secondary)", opacity: 0.4, display: "inline-block" }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "5px", opacity: 0.35 }}>VIJAYAWADA</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              style={{ marginTop: 52, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}
            >
              <Magnetic>
                <Link href="/collections" className="btn-primary">
                  EXPLORE CATALOGUE <ArrowRight />
                </Link>
              </Magnetic>
              <Link
                href="/about"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: "0.7rem", letterSpacing: "4px", color: "var(--primary)", opacity: 0.5, textDecoration: "none", transition: "opacity 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >
                OUR STORY <ArrowRight />
              </Link>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
              style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 12 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 1, height: 48, background: "linear-gradient(to bottom, var(--secondary), transparent)", borderRadius: 1 }}
              />
              <span style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "6px", opacity: 0.3, textTransform: "uppercase" }}>Scroll</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <MarqueeStrip items={marqueeItems} />

      {/* ═══ STATS ═══ */}
      <section style={{ padding: "clamp(64px,10vw,120px) 0", background: "linear-gradient(135deg, #fdf8f0 0%, #f9f4eb 100%)" }}>
        <div className="section-container">
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "7px", textTransform: "uppercase", opacity: 0.4, marginBottom: 48, color: "var(--primary)" }}
          >
            By The Numbers
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {[
              { end: 32,   suffix: "+", label: "Years of Trust",   bg: "linear-gradient(135deg, #004d40 0%, #00695c 100%)", color: "#fff", accent: "#C5A028" },
              { end: 500,  suffix: "+", label: "Retail Partners",  bg: "linear-gradient(135deg, #b8860b 0%, #C5A028 100%)", color: "#fff", accent: "rgba(255,255,255,0.5)" },
              { end: 1000, suffix: "+", label: "Ready Varieties",  bg: "linear-gradient(135deg, #6b2737 0%, #8B1A3A 100%)", color: "#fff", accent: "#f0c060" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                style={{
                  padding: "44px 40px",
                  background: s.bg,
                  borderRadius: "var(--radius-xl)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
              >
                {/* subtle fabric dot pattern */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(3.5rem,7vw,5.5rem)", color: s.color, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 12 }}>
                    <span>{s.end}</span><span style={{ fontSize: "0.55em", color: s.accent }}>{s.suffix}</span>
                  </div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "5px", textTransform: "uppercase", color: s.color, opacity: 0.6 }}>{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <StitchDivider label="How We Work" />

      {/* ═══ PROCESS ═══ */}
      <section style={{ padding: "clamp(32px,4vw,60px) 0 clamp(80px,14vw,160px)" }}>
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2.5rem,6vw,6rem)", color: "var(--primary)", letterSpacing: "-0.05em", lineHeight: 0.9, textTransform: "uppercase", marginBottom: "clamp(48px,6vw,80px)" }}
          >
            The MK <span className="text-outline">Process</span>
          </motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {process.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="process-card"
              >
                <span className="process-number thread-number">{s.n}</span>
                <div style={{ width: 40, height: 3, background: "var(--secondary)", borderRadius: 2, marginBottom: 28 }} />
                <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.8rem", color: "var(--primary)", marginBottom: 16 }}>{s.title}</h3>
                <p style={{ opacity: 0.55, lineHeight: 1.9, fontSize: "0.95rem" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "clamp(80px,12vw,160px) 0", background: "#001a15", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "100%", height: "100%", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,40,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-container" style={{ position: "relative" }}>
          <motion.h2
            initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.3 }}
            style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2.5rem,14vw,13rem)", letterSpacing: "-0.07em", lineHeight: 0.85, textAlign: "center", marginBottom: 20 }}
          >
            MOHAN<br />KRISHNA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            style={{ textAlign: "center", opacity: 0.3, fontWeight: 700, letterSpacing: "4px", fontSize: "0.8rem", marginBottom: "clamp(48px,6vw,80px)" }}
          >
            GARMENTS &amp; CLOTH • VIJAYAWADA • SINCE 1994
          </motion.p>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px,6vw,80px)", flexWrap: "wrap", marginBottom: "clamp(48px,6vw,80px)", fontWeight: 800, letterSpacing: "5px", fontSize: "0.72rem" }}>
            {[["CATALOGUE", "/collections"], ["OUR LEGACY", "/about"], ["VISIT US", "/contact"]].map(([n, h]) => (
              <Link key={h} href={h} style={{ color: "inherit", textDecoration: "none", opacity: 0.5, transition: "opacity 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >{n}</Link>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ opacity: 0.2, fontSize: "0.62rem", fontWeight: 800, letterSpacing: "6px", textTransform: "uppercase" }}>© 2026 • THE WHOLESALE LANDMARK</p>
            <p style={{ opacity: 0.2, fontSize: "0.62rem", fontWeight: 800, letterSpacing: "6px", textTransform: "uppercase" }}>VIJAYAWADA • SINCE 1994</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
