"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-performance spring configuration for premium zero-latency trailing parallax
  const springConfig = { damping: 28, stiffness: 300, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
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
        target.tagName === 'SELECT' ||
        target.closest('.magnetic-wrap');
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div 
      id="custom-cursor" 
      className={isHovered ? 'hovered' : ''}
      style={{ 
        x: cursorX, 
        y: cursorY, 
        translateX: '-50%', 
        translateY: '-50%',
        position: 'fixed',
        left: 0,
        top: 0,
        display: isVisible ? 'block' : 'none',
        pointerEvents: 'none',
        zIndex: 10000
      }}
    />
  );
}
