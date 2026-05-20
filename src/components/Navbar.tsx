"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/#features-section" },
    { name: "Engine A", href: "/engine-a" },
    { name: "Engine B", href: "/engine-b" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "1rem 6%" : "1.6rem 6%",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
          background: scrolled ? "rgba(0, 0, 0, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          boxShadow: scrolled ? "0 8px 32px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "monospace",
            fontWeight: 900,
            fontSize: "1.1rem",
            color: "var(--white)",
            textDecoration: "none",
            letterSpacing: "0.1em",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          GROVICE
          <span style={{ color: "#06b6d4", fontWeight: "bold" }}>2.0</span>
          <span
            style={{
              width: 6,
              height: 6,
              background: "#06b6d4",
              borderRadius: "50%",
              display: "inline-block",
              animation: "pulse-dot 2.5s ease-in-out infinite",
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  color: "var(--white)",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: isActive ? 1 : 0.6,
                  transition: "opacity 0.3s, color 0.3s",
                  position: "relative",
                }}
                onMouseEnter={(e) => { 
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.color = "#06b6d4";
                }}
                onMouseLeave={(e) => { 
                  (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.6";
                  (e.currentTarget as HTMLElement).style.color = "var(--white)";
                }}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="tel:+917396621004"
            style={{
              background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
              color: "#000000",
              padding: "0.6rem 1.4rem",
              borderRadius: "0px",
              fontFamily: "monospace",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
              boxShadow: "0 0 15px rgba(6, 182, 212, 0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(6, 182, 212, 0.5)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.25)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Launch OS
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--white)",
            padding: "0.4rem",
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: "rgba(0, 0, 0, 0.98)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "1.4rem",
              right: "5%",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--white)",
            }}
          >
            <X size={26} />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: "var(--white)",
                textDecoration: "none",
                fontSize: "1.2rem",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {link.name}
            </Link>
          ))}

          <a
            href="tel:+917396621004"
            onClick={() => setIsOpen(false)}
            style={{
              marginTop: "1rem",
              background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
              color: "#000000",
              padding: "0.8rem 2.2rem",
              borderRadius: "0px",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 0 15px rgba(6, 182, 212, 0.25)",
            }}
          >
            Launch OS
          </a>
        </div>
      )}
    </>
  );
}
