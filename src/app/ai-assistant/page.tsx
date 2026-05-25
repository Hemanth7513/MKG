"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Find the Chat Button",
    desc: "Look for the chat icon at the bottom-right corner of any page on our website. It's always visible.",
  },
  {
    number: "2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Type Your Question",
    desc: "Click the icon and type your question in plain language — in English, Telugu, or Hindi. No special format needed.",
  },
  {
    number: "3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Get an Instant Answer",
    desc: "Our AI assistant replies immediately — about products, pricing, location, timings, or anything else.",
  },
];

const faqs = [
  { q: "What products do you sell?", a: "We specialise in wholesale ladies wear — 3-piece sets, lehangas, nightwear, leggings, and fancy wear." },
  { q: "Do you sell to individuals?", a: "No — we are an exclusive wholesale dealer catering only to retail businesses. Minimum order requirements apply." },
  { q: "Where are you located?", a: "3rd Floor, A Block, Naaganna Trade One Mall, One Town, Vijayawada — 520001, Andhra Pradesh." },
  { q: "What are your store hours?", a: "Monday to Saturday: 10 AM – 8 PM. Closed on Sundays." },
  { q: "How often do new stocks arrive?", a: "Fresh stock arrives every 10 days. Contact us or visit to see the latest additions." },
];

const contacts = [
  {
    label: "CALL US",
    value: "+91 93479 82187",
    sub: "Talk to us directly",
    href: "tel:+919347982187",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
      </svg>
    ),
    primary: true,
  },
  {
    label: "WHATSAPP",
    value: "+91 93479 82187",
    sub: "Send a quick message",
    href: "https://wa.me/919347982187?text=Hello%2C%20I%20need%20help%20with%20a%20wholesale%20enquiry.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    primary: false,
  },
  {
    label: "EMAIL",
    value: "bza.gupta@gmail.com",
    sub: "We reply within 24 hrs",
    href: "mailto:bza.gupta@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    primary: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1 } }),
};

export default function HelpPage() {
  return (
    <main style={{ minHeight: "100vh", paddingBottom: "120px" }}>

      {/* ── HEADER ── */}
      <section style={{ padding: "160px 0 60px" }}>
        <div className="section-container">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "block", color: "var(--secondary)", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "10px", textTransform: "uppercase", marginBottom: "20px" }}
          >
            We&apos;re Here For You
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="h1-hero" style={{ fontSize: "clamp(2.5rem, 10vw, 10rem)", lineHeight: 0.85 }}
          >
            HELP &<br /><span className="text-outline">SUPPORT</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ marginTop: 32, maxWidth: 520, opacity: 0.55, fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            Have a question? You can get answers instantly using our AI chat, or reach us directly through call, WhatsApp, or email.
          </motion.p>
        </div>
      </section>

      {/* ── HOW TO USE THE AI BOT ── */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, rgba(0,77,64,0.05) 0%, rgba(197,160,40,0.06) 100%)",
              border: "1px solid rgba(0,77,64,0.1)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(40px, 6vw, 80px)",
              marginBottom: 48,
            }}
          >
            {/* Bot intro */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "var(--primary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 26, height: 26 }}>
                  <path d="M12 2a2 2 0 012 2v2a2 2 0 01-4 0V4a2 2 0 012-2z" />
                  <path d="M12 8v8M8 12H4M20 12h-4M6.34 6.34L4.93 4.93M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.4rem", color: "var(--primary)", marginBottom: 4 }}>
                  AI Chat Assistant
                </p>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "3px", color: "var(--secondary)", textTransform: "uppercase" }}>
                  Available 24 / 7 · Instant Replies
                </p>
              </div>
            </div>

            {/* Steps */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  style={{
                    background: "white",
                    borderRadius: "var(--radius-lg)",
                    padding: "32px 28px",
                    border: "1px solid rgba(0,77,64,0.07)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "var(--primary)",
                      color: "white",
                      fontFamily: "Syne",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>{s.number}</span>
                    <span style={{ fontSize: "1.6rem" }}>{s.icon}</span>
                  </div>
                  <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.05rem", color: "var(--primary)", marginBottom: 10 }}>
                    {s.title}
                  </h3>
                  <p style={{ opacity: 0.55, lineHeight: 1.8, fontSize: "0.9rem" }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Pointer hint */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12, padding: "16px 24px", background: "rgba(197,160,40,0.08)", borderRadius: "var(--radius-md)", border: "1px dashed rgba(197,160,40,0.4)", width: "fit-content" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, flexShrink: 0 }}>
                <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
              </svg>
              <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--primary)", opacity: 0.7 }}>
                The chat button is at the <strong>bottom-right corner</strong> of every page — look for the icon and tap it to start.
              </p>
            </motion.div>
          </motion.div>

          {/* ── FAQ ── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 3rem)", color: "var(--primary)", marginBottom: 32, letterSpacing: "-0.03em" }}
          >
            Common Questions
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 80 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{
                  background: "white",
                  border: "1px solid rgba(0,77,64,0.07)",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px 32px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <p style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1rem", color: "var(--primary)", marginBottom: 10, display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--secondary)" }}>Q.</span> {faq.q}
                </p>
                <p style={{ opacity: 0.6, lineHeight: 1.8, fontSize: "0.95rem", paddingLeft: 24 }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── STILL NEED HELP ── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 3rem)", color: "var(--primary)", marginBottom: 8, letterSpacing: "-0.03em" }}
          >
            Still Need Help?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ opacity: 0.5, marginBottom: 32, fontSize: "0.95rem" }}
          >
            Reach us directly — we&apos;re happy to help.
          </motion.p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {contacts.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "24px 32px",
                  background: c.primary ? "var(--primary)" : "white",
                  borderRadius: "var(--radius-lg)",
                  border: c.primary ? "none" : "1px solid rgba(0,77,64,0.08)",
                  boxShadow: "var(--shadow-sm)",
                  textDecoration: "none",
                  color: c.primary ? "white" : "var(--foreground)",
                  transition: "box-shadow 0.3s, transform 0.3s",
                  maxWidth: 560,
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: c.primary ? "rgba(255,255,255,0.12)" : "rgba(0,77,64,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: c.primary ? "white" : "var(--primary)",
                  flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "5px", opacity: c.primary ? 0.6 : 0.35, textTransform: "uppercase", marginBottom: 4 }}>{c.label}</p>
                  <p style={{ fontWeight: 800, fontSize: "1rem", color: c.primary ? "white" : "var(--primary)" }}>{c.value}</p>
                  <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: 2 }}>{c.sub}</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, opacity: 0.4 }}>
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
