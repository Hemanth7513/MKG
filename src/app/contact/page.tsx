"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const contactActions = [
  {
    label: "CALL US",
    sub: "Talk to us directly",
    value: "+91 99999 88888",
    href: "tel:+919999988888",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
      </svg>
    ),
    isPrimary: true,
  },
  {
    label: "WHATSAPP",
    sub: "Quick message",
    value: "+91 99999 88888",
    href: "https://wa.me/919999988888?text=Hello%2C%20I%20am%20interested%20in%20wholesale%20enquiry%20from%20MK%20Garments.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    isPrimary: false,
  },
  {
    label: "EMAIL",
    sub: "We reply within 24hrs",
    value: "bza.gupta@gmail.com",
    href: "mailto:bza.gupta@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    isPrimary: false,
  },
];

const infoItems = [
  {
    label: "Address",
    content: "3rd Floor, A Block\nNaaganna Trade One Mall\nOne Town, Vijayawada — 520001\nAndhra Pradesh",
  },
  {
    label: "Store Hours",
    content: "Monday – Saturday: 10 AM – 8 PM\nSunday: Closed",
  },
  {
    label: "Wholesale Only",
    content: "We cater exclusively to retail businesses.\nMinimum order requirements apply.",
  },
];

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", paddingBottom: "160px" }}>

      {/* ── HEADER ── */}
      <section style={{ padding: "160px 0 80px" }}>
        <div className="section-container">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "block", color: "var(--secondary)", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "10px", textTransform: "uppercase", marginBottom: "20px" }}
          >
            Visit Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="h1-hero" style={{ fontSize: "clamp(3.5rem, 13vw, 12rem)" }}
          >
            REACH<br /><span className="text-outline">US</span>
          </motion.h1>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "clamp(24px, 4vw, 64px)", alignItems: "start" }}>

            {/* ─ LEFT: Contact actions + Info ─ */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}
              style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Action buttons */}
              {contactActions.map((a, i) => (
                <motion.a
                  key={i}
                  href={a.href}
                  target={a.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "24px 32px",
                    background: a.isPrimary ? "var(--primary)" : "white",
                    borderRadius: "var(--radius-lg)",
                    border: a.isPrimary ? "none" : "1px solid rgba(0,77,64,0.08)",
                    boxShadow: "var(--shadow-sm)",
                    textDecoration: "none",
                    color: a.isPrimary ? "white" : "var(--foreground)",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: "12px",
                    background: a.isPrimary ? "rgba(255,255,255,0.12)" : "rgba(0,77,64,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: a.isPrimary ? "white" : "var(--primary)",
                    flexShrink: 0,
                  }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "5px", opacity: a.isPrimary ? 0.6 : 0.35, textTransform: "uppercase", marginBottom: "4px" }}>{a.label}</p>
                    <p style={{ fontWeight: 800, fontSize: "1rem", color: a.isPrimary ? "white" : "var(--primary)" }}>{a.value}</p>
                    <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "2px" }}>{a.sub}</p>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, opacity: 0.4 }}>
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.a>
              ))}

              {/* Divider */}
              <div style={{ height: 1, background: "linear-gradient(to right, rgba(0,77,64,0.1), transparent)", margin: "8px 0" }} />

              {/* Info items */}
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  style={{ padding: "24px 0" }}
                >
                  <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "5px", color: "var(--secondary)", textTransform: "uppercase", marginBottom: "10px" }}>{item.label}</p>
                  <p style={{ fontWeight: 600, color: "var(--primary)", lineHeight: 1.9, opacity: 0.65, whiteSpace: "pre-line", fontSize: "0.95rem" }}>{item.content}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* ─ RIGHT: Map ─ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              style={{ gridColumn: "span 7", position: "sticky", top: "120px" }}
            >
              <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", border: "1px solid rgba(0,77,64,0.08)", height: "clamp(400px, 60vh, 700px)", position: "relative" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.6!2d80.6318!3d16.5149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff9b6d1a4b9%3A0xabcdef!2sNaaganna+Trade+One+Mall%2C+One+Town%2C+Vijayawada%2C+Andhra+Pradesh+520001!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "hue-rotate(140deg) saturate(0.4) brightness(0.9)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MK Garments Location"
                />
                {/* Map overlay card */}
                <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, background: "rgba(0,26,21,0.88)", backdropFilter: "blur(12px)", borderRadius: "var(--radius-md)", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid rgba(197,160,40,0.2)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(197,160,40,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" style={{ width: 20, height: 20 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "white", fontWeight: 800, fontSize: "0.85rem", marginBottom: "2px" }}>Naaganna Trade One Mall</p>
                    <p style={{ color: "white", opacity: 0.4, fontSize: "0.72rem", fontWeight: 600 }}>3rd Floor, A Block · One Town, Vijayawada</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Naaganna+Trade+One+Mall+Vijayawada"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "10px 20px", background: "var(--secondary)", color: "var(--primary)", borderRadius: "100px", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "3px", textDecoration: "none", textTransform: "uppercase", flexShrink: 0, whiteSpace: "nowrap" }}
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
