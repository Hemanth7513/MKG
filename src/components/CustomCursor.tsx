"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('.reveal-card') ||
        target.closest('.awwwards-btn') ||
        target.tagName === 'SELECT';
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      id="custom-cursor" 
      ref={cursorRef} 
      className={isHovered ? 'hovered' : ''}
      style={{ 
        x: mouseX, 
        y: mouseY, 
        translateX: '-50%', 
        translateY: '-50%',
        position: 'fixed',
        left: 0,
        top: 0
      }}
    />
  );
}
