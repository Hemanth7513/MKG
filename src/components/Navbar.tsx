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
      className={`nav-container ${scrolled ? 'scrolled' : ''}`}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Logo size={scrolled ? 32 : 40} />
      </Link>

      <div className="nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="nav-link-item"
            style={{
              opacity: pathname === link.path ? 1 : 0.5,
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
