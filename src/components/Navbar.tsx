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
    { name: "About", href: "/#vision" },
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
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          background: scrolled ? "rgba(255,255,255,0.93)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(11,43,92,0.08)" : "none",
          boxShadow: scrolled ? "0 2px 40px rgba(11,43,92,0.06)" : "none",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontWeight: 900,
            fontSize: "1.2rem",
            color: "var(--ocean)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          GROVICE
          <span style={{ color: "var(--ocean-bright)" }}>2.0</span>
          <span
            style={{
              width: 8,
              height: 8,
              background: "var(--ocean-bright)",
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
            const isActive = pathname === link.href || (link.href === "/#vision" && pathname === "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  color: "var(--ocean)",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: isActive ? 1 : 0.65,
                  transition: "opacity 0.3s",
                  position: "relative",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.65"; }}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="tel:+917396621004"
            style={{
              background: "var(--ocean)",
              color: "var(--white)",
              padding: "0.6rem 1.5rem",
              borderRadius: "3px",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--ocean-mid)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--ocean)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Book a Call
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
            color: "var(--ocean)",
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
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
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
              color: "var(--ocean)",
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
                color: "var(--ocean)",
                textDecoration: "none",
                fontSize: "1.6rem",
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 900,
                fontStyle: "italic",
                letterSpacing: "-0.02em",
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
              background: "var(--ocean)",
              color: "var(--white)",
              padding: "0.9rem 2.5rem",
              borderRadius: "3px",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Book a Call
          </a>
        </div>
      )}
    </>
  );
}
