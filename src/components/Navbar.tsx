"use client";

import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import VisitingCardFlip from "./VisitingCardFlip";

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
        <Link href="/" className="nav-logo-link" style={{ textDecoration: 'none' }}>
          <Logo size={scrolled ? 32 : 40} />
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link-item ${pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
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
                  }}
                />
              )}
            </Link>
          ))}

          {/* Visiting Card trigger */}
          <button
            className="nav-link-item nav-card-btn"
            onClick={() => setCardOpen(true)}
            aria-label="View Visiting Card"
          >
            VISITING CARD
          </button>
        </div>
      </nav>

      {/* Modal rendered outside nav */}
      <VisitingCardFlip isOpen={cardOpen} onClose={() => setCardOpen(false)} />
    </>
  );
}
