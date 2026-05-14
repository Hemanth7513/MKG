"use client";

import React, { useState, useEffect } from "react";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Enable custom cursor exclusively on non-touch desktop screens
    const checkScreen = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(!isTouch && window.innerWidth > 1024);
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen, { passive: true });

    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    // Use direct native DOM translation for lightning-fast zero-latency hardware tracking
    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (cursor.style.opacity !== '1') {
        cursor.style.opacity = '1';
      }
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
        
      if (isInteractive) {
        cursor.classList.add('hovered');
      } else {
        cursor.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkScreen);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div 
      id="custom-cursor" 
      style={{ 
        position: 'fixed',
        left: 0,
        top: 0,
        opacity: 0, // starts fully hidden until initial hardware mouse movement
        pointerEvents: 'none',
        zIndex: 10000,
        willChange: 'transform'
      }}
    />
  );
}
