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

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "120px", paddingTop: "130px" }}>
      <MarqueeStrip items={["3 Piece Sets", "Lehangas", "Nightwear", "Leggings", "Co-ord Sets", "Fancy Wear"]} />

      {/* ── 3D CAROUSEL STAGE ── */}
      <section style={{ padding: "40px 0 60px", overflow: "hidden", position: "relative" }}>
        <div className="section-container" style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "8px", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
            The Showcase
          </span>
          <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)", textTransform: "uppercase", letterSpacing: "-0.5px", margin: 0 }}>
            Our Collections
          </h2>
        </div>
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            height: "550px",
            perspective: `${perspective}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "280px",
              height: "440px",
              transformStyle: "preserve-3d",
            }}
          >
            {categories.map((cat, i) => {
              // Calculate offset index in 3D ring
              let offset = i - active;
              
              // Handle wrap around
              const half = Math.floor(categories.length / 2);
              if (offset > half) offset -= categories.length;
              if (offset < -half) offset += categories.length;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2; // only show center + neighbors

              // 3D positioning values
              const rotateY = offset * 36; // Angle offset
              const translateZ = isCenter ? 50 : -120;
              const translateX = offset * 240; // Lateral slide
              const scale = isCenter ? 1 : 0.82;
              const opacity = isCenter ? 1 : isVisible ? 0.65 : 0;
              const pointerEvents = isCenter ? "auto" : isVisible ? "auto" : "none";

              return (
                <motion.div
                  key={cat.id}
                  onClick={() => i !== active && setActive(i)}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    cursor: isCenter ? "default" : "pointer",
                    pointerEvents,
                  }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 18,
                  }}
                >
                  {/* Card Container styled as a premium cut-out panel */}
                  {/* Transparent Cutout Container */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      overflow: "visible",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {/* Shadow pedestal on the floor under the model */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "35px",
                        left: "15%",
                        right: "15%",
                        height: "12px",
                        background: "rgba(197, 160, 40, 0.25)",
                        filter: "blur(5px)",
                        borderRadius: "50%",
                        zIndex: 1,
                        opacity: isCenter ? 1 : 0.4,
                        transition: "opacity 0.3s",
                      }}
                    />

                    {/* Image Cutout Wrapper */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        right: "0px",
                        bottom: "55px",
                        zIndex: 2,
                      }}
                    >
                      <motion.div
                        style={{ width: "100%", height: "100%", position: "relative" }}
                        animate={{
                          y: isCenter ? [0, -12, 0] : 0,
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
                              : "drop-shadow(0 8px 10px rgba(0,0,0,0.12))",
                            transition: "filter 0.3s",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Floating clean labels below the pedestal */}
                    <div style={{ position: "relative", zIndex: 3, textAlign: "center", marginTop: "12px", opacity: isCenter ? 1 : 0.35, transition: "opacity 0.3s" }}>
                      <span
                        style={{
                          fontSize: "0.55rem",
                          fontWeight: 800,
                          letterSpacing: "3px",
                          color: "var(--gold)",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {cat.tag}
                      </span>
                      <h3
                        style={{
                          fontFamily: "Syne",
                          fontSize: "1.25rem",
                          fontWeight: 800,
                          color: "var(--text)",
                          margin: 0,
                          textTransform: "uppercase",
                          letterSpacing: "-0.5px",
                        }}
                      >
                        {cat.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── CONTROLS ── */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, marginTop: "20px" }}>
          <button
            onClick={prevSlide}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              fontSize: "1.2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.2s, background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.backgroundColor = "var(--blush)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "var(--surface)";
            }}
          >
            ←
          </button>

          {/* Dots Indicator */}
          <div style={{ display: "flex", gap: 10 }}>
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  borderRadius: "4px",
                  background: i === active ? "var(--gold)" : "rgba(197, 160, 40, 0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              fontSize: "1.2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.2s, background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.backgroundColor = "var(--blush)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "var(--surface)";
            }}
          >
            →
          </button>
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
              background: "var(--blush)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "40px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  color: "var(--text)",
                  lineHeight: 1.1,
                  marginBottom: "12px",
                }}
              >
                REQUEST WHOLESALE<br />CATALOGUE & PRICES
              </h3>
              <p style={{ opacity: 0.5, fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>
                Connect directly on WhatsApp or submit a request to our sales team.
              </p>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Magnetic>
                <Link href="/contact" className="btn-primary">
                  SALES ENQUIRY
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://wa.me/919347982187"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  WHATSAPP US →
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
