"use client";

import { motion } from "framer-motion";

export default function AIAssistantPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '160px 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ maxWidth: '800px', textAlign: 'center', padding: '80px', border: '1px dashed rgba(197,160,40,0.4)', borderRadius: 'var(--radius-lg)' }}
      >
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(197,160,40,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
            <path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2z"/>
            <path d="M12 8v8M8 12H4M20 12h-4M6.34 6.34L4.93 4.93M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41"/>
          </svg>
        </div>
        <p style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2rem', color: 'var(--primary)', marginBottom: '16px' }}>AI Assistant</p>
        <p style={{ fontWeight: 800, letterSpacing: '4px', opacity: 0.3, fontSize: '0.75rem', textTransform: 'uppercase' }}>NEW EXPERIENCE COMING SOON</p>
        <p style={{ marginTop: '16px', opacity: 0.4, fontSize: '0.85rem', fontFamily: 'var(--telugu-font)' }}>త్వరలో అందుబాటులోకి వస్తుంది</p>
      </motion.div>
    </main>
  );
}
