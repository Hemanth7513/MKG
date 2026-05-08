"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '160px 0 240px' }}>
      <div className="section-container">
        <header style={{ marginBottom: '160px' }}>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '10px', textTransform: 'uppercase' }}
          >
            Visit Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="h1-hero" 
            style={{ fontSize: 'clamp(4rem, 15vw, 15rem)', marginTop: '24px' }}
          >
            GET IN TOUCH
          </motion.h1>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', padding: '80px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Syne', color: 'var(--primary)', marginBottom: '64px' }}>DROP A MESSAGE</h2>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="YOUR NAME" style={{ width: '100%', padding: '24px 0', border: 'none', borderBottom: '1px solid rgba(0, 77, 64, 0.1)', outline: 'none', background: 'transparent', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <input type="email" placeholder="EMAIL ADDRESS" style={{ width: '100%', padding: '24px 0', border: 'none', borderBottom: '1px solid rgba(0, 77, 64, 0.1)', outline: 'none', background: 'transparent', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <textarea placeholder="HOW CAN WE HELP?" rows={4} style={{ width: '100%', padding: '24px 0', border: 'none', borderBottom: '1px solid rgba(0, 77, 64, 0.1)', outline: 'none', background: 'transparent', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px', resize: 'none' }} />
                </div>
                
                <Magnetic>
                  <button type="submit" className="awwwards-btn" style={{ width: '100%', background: 'var(--primary)', color: 'white' }}>
                    SEND INQUIRY
                  </button>
                </Magnetic>
              </form>
            </motion.div>
          </div>

          <div style={{ gridColumn: 'span 5' }}>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}
            >
              <div>
                <h3 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '6px', color: 'var(--secondary)', marginBottom: '24px', textTransform: 'uppercase' }}>Location</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.4 }}>
                  MOHAN KRISHNA GARMENTS<br/>
                  Wholesale Market Area,<br/>
                  Vijayawada, Andhra Pradesh
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '6px', color: 'var(--secondary)', marginBottom: '24px', textTransform: 'uppercase' }}>Contact</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.4 }}>
                  +91 99999 88888<br/>
                  hello@mkgarments.com
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '6px', color: 'var(--secondary)', marginBottom: '24px', textTransform: 'uppercase' }}>Hours</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.4 }}>
                  Mon - Sat: 10AM - 8PM<br/>
                  Sunday: Closed
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
