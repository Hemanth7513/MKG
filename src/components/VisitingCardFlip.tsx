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

  const downloadImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const imageSrc = isFlipped ? "/images/visiting-card-back.png" : "/images/visiting-card-front.png";
    const fileName = isFlipped ? "MK_Garments_Visiting_Card_Back.png" : "MK_Garments_Visiting_Card_Front.png";
    
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                    style={{ objectFit: "contain" }}
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
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Tap hint */}
            <motion.p
              className="visiting-card-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: "20px" }}
            >
              {isFlipped ? "TAP CARD TO SEE FRONT" : "TAP CARD TO FLIP"}
            </motion.p>

            {/* Action button */}
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={downloadImage}
                className="btn-primary btn-gold"
                style={{
                  padding: "12px 28px",
                  fontSize: "0.68rem",
                  borderRadius: "100px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD CARD IMAGE
              </motion.button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

