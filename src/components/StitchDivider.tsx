"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StitchDividerProps {
  label?: string;
  color?: string;
}

export default function StitchDivider({ label, color = "var(--secondary)" }: StitchDividerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 20, padding: "48px 0" }}>
      {/* Left stitch line */}
      <svg height="3" style={{ flex: 1 }} overflow="visible">
        <motion.line
          x1="0" y1="1.5"
          x2="100%" y2="1.5"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.35 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ vectorEffect: "non-scaling-stroke" }}
        />
      </svg>

      {/* Needle dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}
      >
        {/* needle icon */}
        <svg viewBox="0 0 24 24" width="18" height="18" style={{ color, opacity: 0.6 }}>
          <path
            d="M12 2L12 15M9 18L12 22L15 18M12 15L9 18M12 15L15 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="5" r="1.5" fill="currentColor" />
        </svg>
        {label && (
          <span style={{
            fontSize: "0.6rem",
            fontWeight: 800,
            letterSpacing: "6px",
            textTransform: "uppercase",
            color,
            opacity: 0.5,
          }}>
            {label}
          </span>
        )}
      </motion.div>

      {/* Right stitch line */}
      <svg height="3" style={{ flex: 1 }} overflow="visible">
        <motion.line
          x1="0" y1="1.5"
          x2="100%" y2="1.5"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.35 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.1 }}
          style={{ vectorEffect: "non-scaling-stroke" }}
        />
      </svg>
    </div>
  );
}
