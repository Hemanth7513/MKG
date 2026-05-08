"use client";

import { useLanguage } from "./LanguageContext";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "COLLECTIONS", path: "/collections" },
    { name: "OUR LEGACY", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: scrolled ? '20px' : '40px',
        left: '50%',
        width: scrolled ? 'calc(100% - 80px)' : 'calc(100% - 40px)',
        maxWidth: scrolled ? '1200px' : '1600px',
        padding: scrolled ? '12px 32px' : '24px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2000,
        borderRadius: '100px',
        background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        border: scrolled ? '1px solid rgba(0, 77, 64, 0.1)' : '1px solid transparent',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: scrolled ? '0 20px 40px rgba(0, 77, 64, 0.05)' : 'none'
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Logo size={scrolled ? 32 : 40} />
      </Link>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              href={link.path} 
              style={{ 
                textDecoration: 'none', 
                color: 'var(--primary)', 
                fontWeight: 800, 
                fontSize: '0.7rem', 
                letterSpacing: '3px',
                position: 'relative',
                opacity: pathname === link.path ? 1 : 0.5,
                transition: 'opacity 0.3s'
              }}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div 
                  layoutId="nav-underline"
                  style={{ 
                    position: 'absolute', 
                    bottom: '-8px', 
                    left: 0, 
                    right: 0, 
                    height: '2px', 
                    background: 'var(--secondary)' 
                  }} 
                />
              )}
            </Link>
          ))}
        </div>

        <div style={{ position: 'relative' }}>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            style={{
              padding: '8px 20px',
              paddingRight: '32px',
              borderRadius: '100px',
              border: '1px solid rgba(0, 77, 64, 0.1)',
              background: scrolled ? 'white' : 'rgba(255, 255, 255, 0.4)',
              color: 'var(--primary)',
              cursor: 'pointer',
              fontSize: '0.65rem',
              fontWeight: 800,
              appearance: 'none',
              outline: 'none',
              letterSpacing: '1px',
              transition: 'all 0.3s'
            }}
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="te">TE</option>
          </select>
          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '0.5rem', color: 'var(--primary)' }}>
            ▼
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
