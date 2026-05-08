"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  { en: "32 YEARS OF WHOLESALE TRUST", hi: "32 वर्षों का थोక विश्वास", te: "32 ఏళ్ళ హోల్‌సేల్ నమ్మకం" },
  { en: "THE HEART OF VIJAYAWADA FASHION", hi: "विजयवाड़ा फैशन का दिल", te: "విజయవాడ ఫ్యాషన్ హృదయం" },
  { en: "QUALITY IN EVERY THREAD", hi: "हर धागे में गुणवत्ता", te: "ప్రతి దారంలో నాణ్యత" }
];

export default function LanguageTicker() {
  const [index, setIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0); // 0: EN, 1: HI, 2: TE
  const langs = ['en', 'hi', 'te'];

  useEffect(() => {
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${index}-${langIndex}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontSize: '0.8rem', 
            fontWeight: 800, 
            color: 'var(--secondary)', 
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            fontFamily: langIndex === 0 ? 'Syne' : 'inherit'
          }}
        >
          {messages[0][langs[langIndex] as keyof typeof messages[0]]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
