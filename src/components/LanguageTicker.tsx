"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  { text: "32 YEARS OF WHOLESALE TRUST", lang: "en" },
  { text: "32 ఏళ్ళ హెూల్ సేల్ నమ్మకం", lang: "te" },
  { text: "32 वर्षों का थोक विश्वास", lang: "hi" },
  { text: "VIJAYAWADA'S FINEST", lang: "en" },
  { text: "విజయవాడ ఫ్యాషన్ కేంద్రం", lang: "te" },
  { text: "विजयवाड़ा का श्रेष्ठ थोक केंद्र", lang: "hi" },
  { text: "QUALITY IN EVERY THREAD", lang: "en" },
  { text: "ప్రతి దారంలో నాణ్యత", lang: "te" },
  { text: "हर धागे में गुणवत्ता", lang: "hi" },
];

export default function LanguageTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const current = messages[index];
  const isLatin = current.lang === "en";

  return (
    <div style={{ height: 36, overflow: "hidden", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--secondary)", flexShrink: 0 }} />
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "0.7rem",
            fontWeight: 800,
            color: "var(--secondary)",
            letterSpacing: isLatin ? "6px" : "1px",
            textTransform: isLatin ? "uppercase" : "none",
            fontFamily: isLatin
              ? "Syne, sans-serif"
              : current.lang === "te"
              ? "var(--telugu-font)"
              : "Bricolage Grotesque, sans-serif",
            lineHeight: 1,
          }}
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
