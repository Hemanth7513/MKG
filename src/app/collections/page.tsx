"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Magnetic from "@/components/Magnetic";
import MarqueeStrip from "@/components/MarqueeStrip";

const categories = [
  {
    id: '3piece',
    title: '3 Piece Sets',
    img: '/images/three-piece.jpg', // we can render it styled nicely
    tag: 'BESTSELLER',
    desc: 'Premium three-piece ethnic suit sets featuring intricate designs, dupattas, and classic fits.',
    details: ['Premium Cotton & Silk fabrics', 'Includes Top, Bottom & Matching Dupatta', 'Ideal for daily elegant wear & semi-formal gatherings'],
  },
  {
    id: 'lehangas',
    title: 'Lehangas',
    img: '/images/lehanga.png', // cutout
    tag: 'BRIDAL & FESTIVE',
    desc: 'Bespoke designer lehangas featuring rich embroidery and opulent traditional patterns.',
    details: ['Rich heavy georgette, silk & velvet bases', 'Detailed handwork, zari & sequins', 'Perfect for weddings and festive occasions'],
  },
  {
    id: 'nightwear',
    title: 'Nightwear',
    img: '/images/nightwear.png', // cutout
    tag: 'COMFORT WEAR',
    desc: 'Elite comfort cotton nightwear, nightgowns, and loungewear sets in fresh modern prints.',
    details: ['100% Breathable pure combed cotton', 'Guaranteed color-fast dyes', 'Relaxed fit designed for ultimate comfort'],
  },
  {
    id: 'leggings',
    title: 'Leggings',
    img: '/images/leggings-v2.png', // cutout
    tag: '50+ SHADES',
    desc: 'Ultra-stretch premium leggings crafted from cotton-lycra blend available in over 50 shades.',
    details: ['Super-combed 4-way stretch lycra', 'Anti-pilling treatment for longevity', 'Perfect matching for all ethnic kurtis'],
  },
  {
    id: 'fancy',
    title: 'Fancy Wear',
    img: '/images/fancy.png', // cutout
    tag: 'TRENDING FUSION',
    desc: 'Chic fancy ethnic wear, modern crop-top skirts, and contemporary silhouette wear.',
    details: ['Fusion Indo-Western styles', 'Vibrant pastels & contemporary floral prints', 'Fashion-forward edits for young retailers'],
  },
  {
    id: 'coord',
    title: 'Co-ord Sets',
    img: '/images/coord-set.png', // cutout
    tag: 'NEW ARRIVALS',
    desc: 'Matching ethnic top and pant sets presenting an effortless, sleek statement look.',
    details: ['Coordinated fabrics & prints', 'Smart casual ethnic designs', 'Easy-wear comfort style for modern women'],
  },
];

export default function CollectionsPage() {
  const [active, setActive] = useState(0);
  const [perspective, setPerspective] = useState(1000);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-adjust perspective based on width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPerspective(800);
      } else {
        setPerspective(1200);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => setActive((prev) => (prev + 1) % categories.length);
  const prevSlide = () => setActive((prev) => (prev - 1 + categories.length) % categories.length);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "120px", paddingTop: "130px" }}>

      {/* ── INTERACTIVE LOOKBOOK STACK SLIDER ── */}
      <section style={{ padding: "40px 0 60px", overflow: "hidden", position: "relative" }}>
        <div className="section-container" style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "8px", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
            The Showcase
          </span>
          <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)", textTransform: "uppercase", letterSpacing: "-0.5px", margin: 0 }}>
            Our Collections
          </h2>
        </div>

        <div className="section-container">
          <div className="grid-editorial" style={{ alignItems: "center", minHeight: "560px" }}>
            
            {/* ─ LEFT COLUMN: Details Reveal ─ */}
            <div className="col-span-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <span style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "5px", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                    {categories[active].tag}
                  </span>
                  <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "-1px", lineHeight: 1.1, margin: "0 0 24px" }}>
                    {categories[active].title}
                  </h3>
                  <p style={{ fontSize: "1.05rem", lineHeight: 1.8, opacity: 0.65, color: "var(--text)", marginBottom: "32px" }}>
                    {categories[active].desc}
                  </p>
                  
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
                    {categories[active].details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 0.8, x: 0 }}
                        transition={{ delay: idx * 0.12 }}
                        style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "12px", fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--secondary)", flexShrink: 0 }} />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls with micro interactions */}
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <button
                  onClick={prevSlide}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(168, 143, 126, 0.25)",
                    background: "rgba(235, 224, 217, 0.5)",
                    color: "#3E3129",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s var(--ease-expo)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 12px rgba(168, 143, 126, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                    e.currentTarget.style.background = "#3E3129";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "#3E3129";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "rgba(235, 224, 217, 0.5)";
                    e.currentTarget.style.color = "#3E3129";
                    e.currentTarget.style.borderColor = "rgba(168, 143, 126, 0.25)";
                  }}
                >
                  ←
                </button>

                {/* Dots Indicator */}
                <div style={{ display: "flex", gap: 8 }}>
                  {categories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      style={{
                        width: i === active ? 28 : 8,
                        height: 8,
                        borderRadius: "4px",
                        background: i === active ? "#A0785C" : "rgba(168, 143, 126, 0.25)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.4s var(--ease-expo)",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(168, 143, 126, 0.25)",
                    background: "rgba(235, 224, 217, 0.5)",
                    color: "#3E3129",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s var(--ease-expo)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 12px rgba(168, 143, 126, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                    e.currentTarget.style.background = "#3E3129";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "#3E3129";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "rgba(235, 224, 217, 0.5)";
                    e.currentTarget.style.color = "#3E3129";
                    e.currentTarget.style.borderColor = "rgba(168, 143, 126, 0.25)";
                  }}
                >
                  →
                </button>
              </div>
            </div>

            {/* ─ RIGHT COLUMN: Kinetic Stack Deck ─ */}
            <div className="col-span-7" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "550px", position: "relative" }}>
              <div style={{ position: "relative", width: "320px", height: "460px" }}>
                {categories.map((cat, i) => {
                  let offset = i - active;
                  
                  // Wrap around logic for relative indexing
                  const half = Math.floor(categories.length / 2);
                  if (offset > half) offset -= categories.length;
                  if (offset < -half) offset += categories.length;

                  const isCenter = offset === 0;
                  const isVisible = offset >= 0 && offset <= 2; // only show current and 2 next stacked cards
                  
                  // Calculate stacked variables
                  const rotate = offset * 6; // rotated slightly to the right
                  const x = offset * 45; // shifted to the right
                  const scale = 1 - (offset * 0.08); // scaled down slightly
                  const opacity = isCenter ? 1 : isVisible ? 0.7 - (offset * 0.25) : 0;
                  const zIndex = 10 - offset;

                  return (
                    <motion.div
                      key={cat.id}
                      onClick={() => !isCenter && setActive(i)}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        cursor: isCenter ? "default" : "pointer",
                        zIndex,
                        pointerEvents: isVisible ? "auto" : "none",
                      }}
                      animate={{
                        x,
                        scale,
                        rotate,
                        opacity,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 16,
                      }}
                    >
                      {/* Premium Card Frame */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: isCenter ? "rgba(255, 255, 255, 0.75)" : "rgba(255, 255, 255, 0.35)",
                          border: isCenter ? "2px solid var(--secondary)" : "1.5px solid rgba(197, 160, 40, 0.15)",
                          borderRadius: "var(--radius-xl)",
                          boxShadow: isCenter ? "0 20px 48px rgba(0, 77, 64, 0.08)" : "0 10px 24px rgba(0, 0, 0, 0.04)",
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          position: "relative",
                          transition: "background 0.3s, border-color 0.3s",
                          overflow: "visible",
                        }}
                      >
                        {/* Floor shadow pedestal */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "35px",
                            left: "15%",
                            right: "15%",
                            height: "10px",
                            background: "rgba(197, 160, 40, 0.25)",
                            filter: "blur(5px)",
                            borderRadius: "50%",
                            opacity: isCenter ? 1 : 0.4,
                          }}
                        />

                        {/* Cutout model wrapper with floating spring animation */}
                        <div style={{ position: "absolute", top: "20px", bottom: "75px", left: "20px", right: "20px" }}>
                          <motion.div
                            style={{ width: "100%", height: "100%", position: "relative" }}
                            animate={{
                              y: isCenter ? [0, -10, 0] : 0,
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <Image
                              src={cat.img}
                              alt={cat.title}
                              fill
                              style={{
                                objectFit: "contain",
                                filter: isCenter 
                                  ? "drop-shadow(0 20px 25px rgba(0,0,0,0.18))" 
                                  : "drop-shadow(0 8px 10px rgba(0,0,0,0.1))",
                                transition: "all 0.3s",
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* Label details */}
                        <div style={{ position: "relative", zIndex: 5, textAlign: "center", opacity: isCenter ? 1 : 0.4 }}>
                          <span style={{ fontSize: "0.55rem", fontWeight: 800, letterSpacing: "3px", color: "var(--secondary)", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>
                            {cat.tag}
                          </span>
                          <h4 style={{ fontFamily: "Syne", fontSize: "1.3rem", fontWeight: 800, color: "var(--primary)", margin: 0, textTransform: "uppercase" }}>
                            {cat.title}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTNOTE DISCLAIMER ── */}
      <section style={{ padding: "20px 0 40px" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <p
            style={{
              color: "var(--text)",
              opacity: 0.35,
              fontSize: "0.75rem",
              fontStyle: "italic",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            * Images are for representation purposes only. Actual prints, fabrics, and configurations may vary based on weekly catalog arrivals.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0 40px" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: "clamp(48px, 8vw, 80px)",
              background: "var(--primary)",
              border: "1.5px solid var(--secondary)",
              borderRadius: "var(--radius-xl)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "40px",
              boxShadow: "0 12px 40px rgba(0, 77, 64, 0.15)",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                REQUEST WHOLESALE<br />CATALOGUE & PRICES
              </h3>
              <p style={{ opacity: 0.7, fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF" }}>
                Submit a request to our sales team.
              </p>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Magnetic>
                <Link href="/contact" className="btn-primary btn-gold">
                  SALES ENQUIRY
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
