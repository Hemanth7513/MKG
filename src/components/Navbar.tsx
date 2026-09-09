"use client";

import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import VisitingCardFlip from "./VisitingCardFlip";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

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
    <>
      <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
        <Magnetic strength={0.2}>
          <Link href="/" className="nav-logo-link" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Logo size={scrolled ? 32 : 40} />
            </motion.div>
          </Link>
        </Magnetic>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {navLinks.map((link) => (
            <Magnetic key={link.path} strength={0.25}>
              <Link
                href={link.path}
                className={`nav-link-item ${pathname === link.path ? 'active' : ''}`}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                  {link.name}
                </motion.span>
                {pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="nav-underline-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--secondary)',
                      boxShadow: '0 0 8px var(--secondary)',
                    }}
                  />
                )}
              </Link>
            </Magnetic>
          ))}

          {/* Visiting Card trigger wrapped in Magnetic */}
          <Magnetic strength={0.3}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="nav-link-item nav-card-btn"
              onClick={() => setCardOpen(true)}
              aria-label="View Visiting Card"
            >
              VISITING CARD
            </motion.button>
          </Magnetic>
        </div>
      </nav>

      {/* Modal rendered outside nav */}
      <VisitingCardFlip isOpen={cardOpen} onClose={() => setCardOpen(false)} />
    </>
  );
}

