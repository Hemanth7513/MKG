"use client";

import { useLanguage } from "@/components/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import Magnetic from "@/components/Magnetic";
import MarqueeStrip from "@/components/MarqueeStrip";

const categories = [
  {
    id: '3piece', key: 'cat_3piece', te: '3 పీస్ సెట్స్', img: '/images/silk.png',
    tag: 'BESTSELLER', color: '#004d40',
    desc: 'Premium 3-piece sets, including exclusive Fandy Silk collections. హెరిటేజ్ నేత మరియు ఆధునిక డిజైన్.',
  },
  {
    id: 'lehangas', key: 'cat_lehangas', te: 'లెహంగాలు', img: '/images/lehanga.png',
    tag: 'BRIDAL', color: '#8B1A3A',
    desc: 'Designer lehangas and traditional wear for exclusive occasions.',
  },
  {
    id: 'nighty', key: 'cat_nighty', te: 'నైటీలు', img: '/images/nighty.png',
    tag: 'COMFORT', color: '#2d4a6b',
    desc: 'Elite comfort cotton nighties with contemporary prints. మెత్తని కాటన్ నైటీలు.',
  },
  {
    id: 'leggings', key: 'cat_leggings', te: 'లెగ్గింగ్స్', img: '/images/leggings.png',
    tag: '50+ SHADES', color: '#5a3a7a',
    desc: 'High-stretch premium leggings in 50+ vibrant shades. 50+ రంగులలో లెగ్గింగ్స్.',
  },
  {
    id: 'fancy', key: 'cat_fancy', te: 'ఫ్యాన్సీ వేర్', img: '/images/fancy.png',
    tag: 'TRENDING', color: '#7a3a1a',
    desc: 'Trending fancy wear and western fusion. ట్రెండింగ్ ఫ్యాన్సీ వేర్.',
  },
];

// Search bar component (uiverse-style)
function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className={`search-container ${open ? 'open' : ''}`} style={{ marginLeft: 'auto' }}>
      <input
        className="search-input"
        placeholder="Search collections..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search collections"
        id="collections-search"
      />
      <button className="search-btn" onClick={() => setOpen(o => !o)} aria-label="Toggle search" id="search-toggle-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          {open
            ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            : <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>
          }
        </svg>
      </button>
    </div>
  );
}

export default function CollectionsPage() {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '160px' }}>
      {/* ── HEADER ── */}
      <section ref={headerRef} style={{ padding: '160px 0 80px', overflow: 'hidden' }}>
        <div className="section-container">
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'block', color: 'var(--secondary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '16px' }}
                >
                  మా కలెక్షన్స్ • The Catalogue
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="h1-hero" style={{ fontSize: 'clamp(4rem, 12vw, 11rem)', lineHeight: 0.85 }}
                >
                  DISCOVERY
                </motion.h1>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '8px' }}>
                <SearchBar />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <MarqueeStrip items={['3 పీస్ సెట్స్', '3 Piece Sets', 'లెహంగాలు', 'Lehangas', 'నైటీలు', 'Nighties', 'లెగ్గింగ్స్', 'Leggings', 'ఫ్యాన్సీ వేర్', 'Fancy Wear']} />

      {/* ── GRID ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
            {categories.map((cat, i) => {
              const isLarge = i % 3 === 0;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: (i % 3) * 0.12 }}
                  style={{
                    gridColumn: isLarge ? 'span 7' : 'span 5',
                    height: isLarge ? '640px' : '520px',
                    marginTop: i % 2 === 1 ? '60px' : '0',
                  }}
                  className="cat-card"
                >
                  <Image src={cat.img} alt={t(cat.key)} fill style={{ objectFit: 'cover' }} className="cat-card-img" />
                  <div className="cat-card-overlay">
                    <div className="cat-tag">{cat.tag}</div>
                    <div>
                      <h2 style={{ fontFamily: 'Syne', fontSize: isLarge ? '3.5rem' : '2.5rem', fontWeight: 800, color: 'white', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1 }}>
                        {t(cat.key)}
                      </h2>
                      <p style={{ color: 'white', opacity: 0.55, fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '340px', marginBottom: '32px' }}>{cat.desc}</p>
                      <Magnetic>
                        <Link href="/contact" className="btn-primary" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', fontSize: '0.65rem' }}>
                          INQUIRE WHOLESALE
                        </Link>
                      </Magnetic>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: 'clamp(48px, 8vw, 100px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '48px', background: 'linear-gradient(135deg, rgba(0,77,64,0.06) 0%, rgba(197,160,40,0.04) 100%)' }}
          >
            <div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--primary)', lineHeight: 1.1, marginBottom: '16px' }}>
                హోల్‌సేల్ కోసం<br />సంప్రదించండి
              </h3>
              <p style={{ opacity: 0.5, fontSize: '1rem', fontWeight: 600 }}>Ready to stock? Get bulk pricing & catalogue.</p>
            </div>
            <Magnetic>
              <Link href="/contact" className="btn-primary btn-gold" style={{ color: '#002d25', borderColor: 'transparent' }}>
                GET WHOLESALE PRICING
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
