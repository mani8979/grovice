"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Engine A", href: "/engine-a" },
    { name: "Engine B", href: "/engine-b" },
    { name: "Book Call", href: "/book" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: scrolled ? "0.6rem" : "1rem",
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          width: "94%",
          maxWidth: "1200px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "0.55rem 1.4rem" : "0.75rem 1.8rem",
          transition: "top 0.45s cubic-bezier(0.16,1,0.3,1), padding 0.45s cubic-bezier(0.16,1,0.3,1), background 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)",
          background: scrolled
            ? "rgba(4, 3, 8, 0.90)"
            : "rgba(4, 3, 8, 0.65)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255, 158, 0, 0.12)",
          borderRadius: "9999px",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,158,0,0.06), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.55rem",
          }}
        >
          {/* Logo SVG Icon */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Outer glow ring */}
            <div
              style={{
                position: "absolute",
                inset: "-3px",
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #FF9E00, #FF4069, #7000FF, #FF9E00)",
                opacity: 0.25,
                filter: "blur(4px)",
              }}
            />
            <svg
              width="30"
              height="30"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)", position: "relative" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(30deg) scale(1.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "rotate(0deg) scale(1)"; }}
            >
              <circle cx="50" cy="50" r="46" fill="url(#logoGradDark)" />
              <path
                d="M25 58 C35 50, 40 62, 50 58 C60 54, 65 66, 75 58 L75 75 L25 75 Z"
                fill="#0B3C73"
                opacity="0.9"
              />
              <path
                d="M25 65 C32 60, 38 68, 50 65 C62 62, 68 70, 75 65 L75 78 L25 78 Z"
                fill="#07274B"
              />
              <path d="M48 60 L49 42 C49 40, 51 40, 51 42 L50 60 Z" fill="#FF9E00" />
              <path d="M50 42 C43 38, 38 41, 38 41 C38 41, 44 43, 49 43 Z" fill="#FF9E00" />
              <path d="M50 42 C57 38, 62 41, 62 41 C62 41, 56 43, 51 43 Z" fill="#FF9E00" />
              <path d="M50 42 C48 35, 43 32, 43 32 C43 32, 47 37, 49 41 Z" fill="#FFD700" />
              <path d="M50 42 C52 35, 57 32, 57 32 C57 32, 53 37, 51 41 Z" fill="#FFD700" />
              <defs>
                <linearGradient id="logoGradDark" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#1a1140" />
                  <stop offset="45%" stopColor="#0d2a55" />
                  <stop offset="100%" stopColor="#1a3060" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: "0.95rem",
                color: "#F0F2FF",
                letterSpacing: "0.10em",
                fontFamily: "var(--font-outfit), system-ui, sans-serif",
                textTransform: "uppercase",
              }}
            >
              GROVICE
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                background: "linear-gradient(135deg, #FF9E00, #FF4069)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-outfit), monospace",
              }}
            >
              2.0
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  position: "relative",
                  color: isActive ? "#F0F2FF" : "rgba(240,242,255,0.5)",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-outfit), system-ui, sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.05em",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "9999px",
                  transition: "all 0.2s ease",
                  background: isActive ? "rgba(255,158,0,0.08)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (!isActive) {
                    el.style.color = "rgba(240,242,255,0.85)";
                    el.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (!isActive) {
                    el.style.color = "rgba(240,242,255,0.5)";
                    el.style.background = "transparent";
                  }
                }}
              >
                {link.name}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "16px",
                      height: "2px",
                      borderRadius: "1px",
                      background: "linear-gradient(90deg, #FF9E00, #FF4069)",
                    }}
                  />
                )}
              </Link>
            );
          })}

          <Link
            href="/book"
            style={{
              marginLeft: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 1.4rem",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #FF9E00 0%, #FF4069 55%, #7000FF 100%)",
              color: "#000",
              fontSize: "0.72rem",
              fontFamily: "var(--font-outfit), monospace",
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: "0 4px 20px rgba(255,158,0,0.22)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-2px) scale(1.03)";
              el.style.boxShadow = "0 8px 30px rgba(255,158,0,0.35)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0) scale(1)";
              el.style.boxShadow = "0 4px 20px rgba(255,158,0,0.22)";
            }}
          >
            <Zap size={10} />
            Book Now
          </Link>
        </nav>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "9999px",
            cursor: "pointer",
            padding: "0.45rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(240,242,255,0.8)",
            transition: "all 0.2s",
          }}
          aria-label="Toggle menu"
          className="md:hidden"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.header>

      {/* ── Mobile Fullscreen Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: "rgba(4, 3, 8, 0.96)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(240,242,255,0.7)",
              }}
            >
              <X size={18} />
            </button>

            {/* Glow orbs */}
            <div style={{ position: "absolute", top: "20%", left: "20%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,158,0,0.05)", filter: "blur(60px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "20%", right: "20%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(112,0,255,0.05)", filter: "blur(60px)", pointerEvents: "none" }} />

            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "block",
                      color: isActive ? "#FF9E00" : "rgba(240,242,255,0.75)",
                      textDecoration: "none",
                      fontSize: "1.6rem",
                      fontFamily: "var(--font-outfit), system-ui, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textAlign: "center",
                      padding: "0.6rem 2rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{ marginTop: "1.5rem" }}
            >
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.9rem 2.5rem",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #FF9E00 0%, #FF4069 55%, #7000FF 100%)",
                  color: "#000",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-outfit), monospace",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 8px 30px rgba(255,158,0,0.3)",
                }}
              >
                <Zap size={12} />
                Book Now
              </Link>
            </motion.div>

            {/* Bottom status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                position: "absolute",
                bottom: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-outfit), monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(240,242,255,0.3)",
              }}
            >
              <span className="uptime-dot" />
              All systems operational
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
