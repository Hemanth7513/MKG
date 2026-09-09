"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function VisitingCardFlip() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="visiting-card-wrapper"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsFlipped(!isFlipped); }}
      role="button"
      tabIndex={0}
      aria-label="Flip visiting card"
    >
      <motion.div
        className="visiting-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div className="visiting-card-face visiting-card-front">
          <Image
            src="/images/visiting-card-front.png"
            alt="MK Garments Visiting Card — Front"
            fill
            sizes="(max-width: 768px) 85vw, 420px"
            style={{ objectFit: "cover", borderRadius: "inherit" }}
            priority
          />
        </div>

        {/* Back Face */}
        <div className="visiting-card-face visiting-card-back">
          <Image
            src="/images/visiting-card-back.png"
            alt="MK Garments Visiting Card — Back (Contact Details)"
            fill
            sizes="(max-width: 768px) 85vw, 420px"
            style={{ objectFit: "cover", borderRadius: "inherit" }}
          />
        </div>
      </motion.div>

      {/* Tap hint */}
      <motion.p
        className="visiting-card-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {isFlipped ? "TAP TO SEE FRONT" : "TAP TO FLIP"}
      </motion.p>
    </div>
  );
}
