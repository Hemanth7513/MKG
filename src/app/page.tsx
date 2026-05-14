"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import LanguageTicker from "@/components/LanguageTicker";
import MarqueeStrip from "@/components/MarqueeStrip";
import CounterStat from "@/components/CounterStat";
import StitchDivider from "@/components/StitchDivider";

/* ── icons ── */
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── stagger container variants ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const marqueeItems = [
  "మోహన్ కృష్ణ గార్మెంట్స్", "Wholesale Excellence", "ప్రీమియం క్వాలిటీ",
  "Vijayawada's Finest", "ఫ్యాషన్ & ట్రెండ్", "Since 1994", "హోల్‌సేల్ మాత్రమే",
  "Fandy Silk", "లెహంగాలు & 3 పీస్", "Trusted Retailers"
];

export default function HomePage() {
  /* scroll refs */
  const heroRef = useRef(null);
  const { scrollYProgress: hScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(hScroll, [0, 1], [0, 140]);
  const heroOpacity = useTransform(hScroll, [0, 0.75], [1, 0]);

  const arrivals = useRef(null);
  const { scrollYProgress: arrScroll } = useScroll({ target: arrivals, offset: ["start end", "center center"] });
  const arrHeadY = useTransform(arrScroll, [0, 1], [80, 0]);

  return (
    <main style={{ minHeight: "100vh" }}>

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 120 }}
      >
        {/* Scroll-linked hero image — right side */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <motion.div style={{ y: heroImgY, width: "100%", height: "115%" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "52%", height: "100%", borderRadius: "0 0 0 80px", overflow: "hidden" }}>
              <Image src="/images/hero.png" alt="MK Garments" fill sizes="52vw" style={{ objectFit: "cover", opacity: 0.88 }} priority />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--background) 0%, transparent 30%)" }} />
            </div>
          </motion.div>
        </motion.div>



        <motion.div style={{ opacity: heroOpacity, position: "relative", zIndex: 2, width: "100%" }}>
          <div className="section-container">
            <LanguageTicker />

            {/* headline */}
            <motion.div variants={stagger} initial="hidden" animate="show" style={{ marginTop: 32 }}>
              <motion.div variants={fadeUp}>
                <h1 className="h1-hero" style={{ marginBottom: 0 }}>
                  MOHAN
                </h1>
              </motion.div>
              <motion.div variants={fadeUp}>
                <h1 className="h1-hero text-outline" style={{ marginBottom: 0 }}>
                  KRISHNA
                </h1>
              </motion.div>
              <motion.div variants={fadeUp} style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: "clamp(0.9rem,1.5vw,1.2rem)", color: "var(--secondary)", fontWeight: 700, letterSpacing: "3px" }}>GARMENTS &amp; CLOTH</span>
                <span style={{ width: 48, height: 1, background: "var(--secondary)", opacity: 0.4, display: "inline-block" }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "5px", opacity: 0.35, textTransform: "uppercase" }}>Vijayawada</span>
              </motion.div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              style={{ marginTop: 52, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}
            >
              <Magnetic>
                <Link href="/collections" className="btn-primary">
                  EXPLORE CATALOGUE <ArrowRight />
                </Link>
              </Magnetic>
              <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: "0.7rem", letterSpacing: "4px", color: "var(--primary)", opacity: 0.5, textDecoration: "none", transition: "opacity 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >
                OUR STORY <ArrowRight />
              </Link>
            </motion.div>

            {/* scroll hint */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
              style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 12 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 1, height: 48, background: "linear-gradient(to bottom, var(--secondary), transparent)", borderRadius: 1 }}
              />
              <span style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "6px", opacity: 0.3, textTransform: "uppercase", writingMode: "horizontal-tb" }}>Scroll</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════════ */}
      <MarqueeStrip items={marqueeItems} />

      {/* ═══════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════ */}
      <section className="bg-weave" style={{ padding: "clamp(64px,10vw,140px) 0" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 56, display: "flex", alignItems: "center", gap: 20 }}
          >
            <span className="pill-badge pill-badge-gold">Our Numbers</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(0,77,64,0.1), transparent)" }} />
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {[
              { end: 32, suffix: "+", label: "Years of Trust" },
              { end: 500, suffix: "+", label: "Retail Partners" },
              { end: 1000, suffix: "+", label: "SKUs in Stock" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}>
                <CounterStat {...s} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StitchDivider label="New Arrivals" />

      {/* ═══════════════════════════════════════════
          NEW ARRIVALS — dark section
      ═══════════════════════════════════════════ */}
      <section ref={arrivals} className="bg-weave-dark" style={{ padding: "clamp(80px,14vw,200px) 0", background: "#001a15", color: "#fff" }}>
        <div className="section-container">

          {/* section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(60px,10vw,120px)", gap: 32, flexWrap: "wrap" }}>
            <motion.div style={{ y: arrHeadY }}>
              <span style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "8px", textTransform: "uppercase", display: "block", marginBottom: 16 }}>
                Selected Series
              </span>
              <h2 style={{ fontFamily: "Syne", fontSize: "clamp(3.5rem,10vw,10rem)", fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.85, textTransform: "uppercase", margin: 0 }}>
                New<br />Arrivals
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ maxWidth: 280, fontSize: "1rem", opacity: 0.45, lineHeight: 1.8 }}
            >
              Fresh trends, direct to your store.
            </motion.p>
          </div>

          {/* cards grid — responsive */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "clamp(16px,3vw,48px)" }}>
            {/* large card */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1 }}
              className="cat-card"
              style={{ gridColumn: "span 8", height: "clamp(400px,55vw,760px)" }}
            >
              <Image src="/images/silk.png" alt="Fandy Silk" fill sizes="(max-width:768px) 100vw, 66vw" style={{ objectFit: "cover" }} className="cat-card-img" />
              <div className="cat-card-overlay">
                <div className="cat-tag">Fandy Silk</div>
                <div>
                  <h3 style={{ fontFamily: "Syne", fontSize: "clamp(2rem,4vw,4.5rem)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: "-2px", textTransform: "uppercase", lineHeight: 1 }}>FANDY SILK</h3>
                  <p style={{ color: "#fff", opacity: 0.55, fontSize: "clamp(0.88rem,1.2vw,1.1rem)", maxWidth: 380, marginBottom: 36, lineHeight: 1.8 }}>
                    Our signature 3-piece sets — heritage craft meets contemporary design.
                  </p>
                  <Link href="/collections" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--secondary)", fontWeight: 800, textDecoration: "none", fontSize: "0.75rem", letterSpacing: "5px" }}>
                    VIEW COLLECTION <ArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* offset card */}
            <motion.div
              initial={{ opacity: 0, y: 130 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="cat-card"
              style={{ gridColumn: "span 4", height: "clamp(320px,40vw,580px)", alignSelf: "center", marginTop: "-120px" }}
            >
              <Image src="/images/lehanga.png" alt="Lehangas" fill sizes="(max-width:768px) 100vw, 34vw" style={{ objectFit: "cover" }} className="cat-card-img" />
              <div className="cat-card-overlay">
                <div className="cat-tag">Lehangas</div>
                <div>
                  <h3 style={{ fontFamily: "Syne", fontSize: "clamp(1.6rem,3vw,2.8rem)", fontWeight: 800, color: "#fff", marginBottom: 12, textTransform: "uppercase", lineHeight: 1 }}>LEHANGAS</h3>
                  <p style={{ color: "#fff", opacity: 0.5, fontSize: "0.9rem", marginBottom: 28 }}>Bridal wear redefined.</p>
                  <Link href="/collections" style={{ color: "var(--secondary)", fontWeight: 800, textDecoration: "none", fontSize: "0.65rem", letterSpacing: "4px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    EXPLORE <ArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* full-width heritage */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, delay: 0.35 }}
              className="cat-card"
              style={{ gridColumn: "span 12", height: "clamp(280px,35vw,520px)" }}
            >
              <Image src="/images/heritage.png" alt="Heritage" fill sizes="100vw" style={{ objectFit: "cover" }} className="cat-card-img" />
              <div className="cat-card-overlay" style={{ background: "linear-gradient(90deg, rgba(0,26,21,0.9) 0%, rgba(0,26,21,0.4) 55%, transparent 100%)", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ maxWidth: 520 }}>
                  <h3 style={{ fontFamily: "Syne", fontSize: "clamp(1.8rem,4vw,4rem)", fontWeight: 800, color: "#fff", marginBottom: 20, letterSpacing: "-1px", textTransform: "uppercase", lineHeight: 1.1 }}>
                    A Legacy in Every Loop
                  </h3>
                  <p style={{ color: "#fff", opacity: 0.45, fontSize: "0.95rem", lineHeight: 1.8 }}>
                    32 years of uncompromising quality — from weavers to retail racks.
                  </p>
                </div>
                <Magnetic>
                  <Link href="/about" className="awwwards-btn" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff", flexShrink: 0 }}>
                    OUR LEGACY
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE 2 — reversed
      ═══════════════════════════════════════════ */}
      <MarqueeStrip items={marqueeItems} direction="right" dark speed={22} />

      {/* ═══════════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════════ */}
      <StitchDivider label="How We Work" />
      <section style={{ padding: "clamp(32px,4vw,80px) 0 clamp(64px,12vw,180px)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: "clamp(40px,6vw,80px)" }}
          >
            <span className="pill-badge" style={{ marginBottom: 24, display: "inline-flex" }}>How We Work</span>
            <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2.5rem,6vw,6rem)", color: "var(--primary)", letterSpacing: "-0.05em", lineHeight: 0.9, textTransform: "uppercase", marginTop: 16 }}>
              The MK <span className="text-outline">Process</span>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {[
              { n: "01", title: "Source", desc: "Direct from weavers in Ahmedabad, Surat & Hyderabad — no middlemen, best prices." },
              { n: "02", title: "Curate", desc: "Hand-picked for quality, trend, and retailer demand. Only the finest reaches our shelves." },
              { n: "03", title: "Deliver", desc: "Wholesale bulk dispatch to retailers across Andhra Pradesh & beyond. Fast and reliable." },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer style={{ padding: "clamp(80px,14vw,200px) 0", background: "#001a15", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,40,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-container" style={{ position: "relative" }}>
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3 }}
            style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(3.5rem,16vw,13rem)", letterSpacing: "-0.07em", lineHeight: 0.85, textAlign: "center", marginBottom: 20 }}
          >
            MOHAN<br />KRISHNA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ textAlign: "center", opacity: 0.3, fontWeight: 700, letterSpacing: "4px", fontSize: "0.8rem", marginBottom: "clamp(60px,8vw,100px)" }}
          >
            GARMENTS &amp; CLOTH • VIJAYAWADA • SINCE 1994
          </motion.p>

          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px,6vw,80px)", flexWrap: "wrap", marginBottom: "clamp(60px,8vw,100px)", fontWeight: 800, letterSpacing: "5px", fontSize: "0.72rem" }}>
            {[["CATALOGUE", "/collections"], ["OUR LEGACY", "/about"], ["VISIT US", "/contact"]].map(([n, h]) => (
              <Link key={h} href={h} style={{ color: "inherit", textDecoration: "none", opacity: 0.5, transition: "opacity 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >{n}</Link>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 48, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <p style={{ opacity: 0.2, fontSize: "0.62rem", fontWeight: 800, letterSpacing: "6px", textTransform: "uppercase" }}>© 2026 • THE WHOLESALE LANDMARK</p>
            <p style={{ opacity: 0.2, fontSize: "0.62rem", fontWeight: 800, letterSpacing: "6px", textTransform: "uppercase" }}>VIJAYAWADA • SINCE 1994</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
