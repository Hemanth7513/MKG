"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function VisitingCardFlip({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClose = () => {
    setIsFlipped(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="vc-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={handleClose}
        >
          {/* Modal content container — click stops propagation */}
          <motion.div
            className="vc-modal-content"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="vc-modal-close"
              onClick={handleClose}
              aria-label="Close visiting card"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 20, height: 20 }}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Title */}
            <p className="vc-modal-label">OUR IDENTITY</p>
            <h2 className="vc-modal-title">Visiting Card</h2>

            {/* 3D Flip Card */}
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
                    sizes="360px"
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
                    sizes="360px"
                    style={{ objectFit: "cover", borderRadius: "inherit" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Tap hint */}
            <motion.p
              className="visiting-card-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {isFlipped ? "TAP CARD TO SEE FRONT" : "TAP CARD TO FLIP"}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
