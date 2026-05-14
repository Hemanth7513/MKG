"use client";

import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
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
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        border: scrolled ? '1px solid rgba(0,77,64,0.1)' : '1px solid transparent',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: scrolled ? '0 20px 40px rgba(0,77,64,0.05)' : 'none',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Logo size={scrolled ? 32 : 40} />
      </Link>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
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
              transition: 'opacity 0.3s',
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
                  background: 'var(--secondary)',
                }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
