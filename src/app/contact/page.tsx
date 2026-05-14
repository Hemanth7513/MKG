"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Magnetic from "@/components/Magnetic";

// Uiverse-style floating label input
function FloatField({ id, label, type = "text", isTextarea = false }: { id: string; label: string; type?: string; isTextarea?: boolean }) {
  const Tag = isTextarea ? 'textarea' : 'input';
  return (
    <div className="input-group">
      <Tag
        id={id}
        type={isTextarea ? undefined : type}
        placeholder=" "
        className={`input-float${isTextarea ? ' textarea-float' : ''}`}
        rows={isTextarea ? 4 : undefined}
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif', color: 'var(--foreground)' }}
      />
      <label htmlFor={id} className="input-float-label">{label}</label>
      <div className="input-float-bar" />
    </div>
  );
}

// Inquiry type selector
const inquiryTypes = [
  { value: 'wholesale', label: 'Wholesale Order', te: 'హోల్‌సేల్ ఆర్డర్' },
  { value: 'visit', label: 'Store Visit', te: 'స్టోర్ సందర్శన' },
  { value: 'other', label: 'Other', te: 'ఇతర' },
];

const infoCards = [
  {
    label: 'Location', te: 'చిరునామా',
    content: '3rd Floor, A Block\nNaaganna Trade One Mall\nOne Town, Vijayawada — 520001',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Phone', te: 'ఫోన్',
    content: '+91 99999 88888\n+91 88888 77777',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
      </svg>
    ),
  },
  {
    label: 'Hours', te: 'వ్యాపార సమయం',
    content: 'Mon – Sat: 10AM – 8PM\nSunday: Closed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Email', te: 'ఇమెయిల్',
    content: 'hello@mkgarments.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [selected, setSelected] = useState('wholesale');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '160px' }}>
      {/* ── HEADER ── */}
      <section style={{ padding: '160px 0 80px' }}>
        <div className="section-container">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: 'block', color: 'var(--secondary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '10px', textTransform: 'uppercase', marginBottom: '20px' }}
          >
            సంప్రదించండి • Visit Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="h1-hero" style={{ fontSize: 'clamp(3.5rem, 13vw, 12rem)' }}
          >
            GET IN<br /><span className="text-outline">TOUCH</span>
          </motion.h1>
        </div>
      </section>

      {/* ── CONTENT GRID ── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '64px' }}>

            {/* ─ FORM ─ */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              style={{ gridColumn: 'span 7' }}
            >
              <div style={{ background: 'white', padding: 'clamp(40px, 6vw, 80px)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(0,77,64,0.05)' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, fontFamily: 'Syne', color: 'var(--primary)', marginBottom: '8px' }}>
                  DROP A MESSAGE
                </h2>
                <p style={{ opacity: 0.4, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '3px', marginBottom: '48px' }}>
                  సందేశం పంపండి
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '60px 0' }}
                  >
                    <div style={{ width: 64, height: 64, background: 'rgba(0,77,64,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ width: 28, height: 28 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2rem', color: 'var(--primary)', marginBottom: '12px' }}>Message Sent!</h3>
                    <p style={{ opacity: 0.5, lineHeight: 1.7 }}>
                      మీ సందేశానికి ధన్యవాదాలు. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-ghost"
                      style={{ marginTop: '32px', borderColor: 'rgba(0,77,64,0.2)' }}
                    >
                      SEND ANOTHER
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Inquiry type pills */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                      {inquiryTypes.map(t => (
                        <button
                          key={t.value}
                          type="button"
                          id={`inquiry-${t.value}`}
                          onClick={() => setSelected(t.value)}
                          style={{
                            padding: '10px 22px',
                            borderRadius: '100px',
                            border: `1.5px solid ${selected === t.value ? 'var(--secondary)' : 'rgba(0,77,64,0.15)'}`,
                            background: selected === t.value ? 'rgba(197,160,40,0.1)' : 'transparent',
                            color: selected === t.value ? 'var(--secondary)' : 'var(--foreground)',
                            fontFamily: 'Bricolage Grotesque, sans-serif',
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                      <FloatField id="contact-name" label="YOUR NAME" />
                      <FloatField id="contact-business" label="BUSINESS NAME" />
                    </div>
                    <FloatField id="contact-email" label="EMAIL ADDRESS" type="email" />
                    <FloatField id="contact-phone" label="PHONE NUMBER" type="tel" />
                    <FloatField id="contact-message" label="HOW CAN WE HELP?" isTextarea />

                    <Magnetic>
                      <button
                        type="submit"
                        id="contact-submit"
                        className="btn-primary"
                        style={{ width: '100%', marginTop: '16px', justifyContent: 'center', background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' }}
                      >
                        SEND INQUIRY
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 18, height: 18 }}>
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    </Magnetic>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ─ INFO CARDS ─ */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {infoCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }}
                  style={{ padding: '32px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,77,64,0.06)', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow 0.4s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(0,77,64,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                      {card.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '4px', color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {card.label} • {card.te}
                      </p>
                      <p style={{ fontWeight: 700, color: 'var(--primary)', lineHeight: 1.8, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                        {card.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                style={{ height: '180px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', background: 'rgba(0,77,64,0.04)', border: '1px solid rgba(0,77,64,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(197,160,40,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" style={{ width: 24, height: 24 }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '4px', color: 'var(--primary)', opacity: 0.5 }}>VIJAYAWADA, AP</p>
                <a
                  href="https://maps.google.com/?q=Naaganna+Trade+Mall+Vijayawada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: '0.6rem', padding: '10px 24px' }}
                >
                  OPEN IN MAPS
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
