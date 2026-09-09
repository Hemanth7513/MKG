"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function VisitingCardFlip({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleClose = () => {
    setIsFlipped(false);
    onClose();
  };

  const downloadVCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:Mohan Krishna Garments & Cloth
ORG:Mohan Krishna Garments & Cloth
TITLE:Wholesale Ladies Wear
TEL;TYPE=CELL,VOICE:+919347982187
EMAIL;TYPE=INTERNET:bza.gupta@gmail.com
ADR;TYPE=WORK:;;3rd Floor A Block Naaganna Trade One Mall One Town;Vijayawada;Andhra Pradesh;520001;India
NOTE:Exclusive Wholesale Dealers for Ladies Wear in Vijayawada. Surat & Ahmedabad Stock.
URL:https://mk-garments-web.vercel.app
END:VCARD`;

    const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Mohan_Krishna_Garments.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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

            {/* Action buttons bar */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={downloadVCard}
                className="btn-primary btn-gold"
                style={{
                  padding: "10px 20px",
                  fontSize: "0.65rem",
                  borderRadius: "100px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                {saved ? "ADDED TO CONTACTS ✓" : "SAVE TO CONTACTS (.VCF)"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={downloadImage}
                style={{
                  padding: "10px 18px",
                  fontSize: "0.65rem",
                  borderRadius: "100px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD CARD
              </motion.button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

