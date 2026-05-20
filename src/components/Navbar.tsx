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
          background: scrolled ? "rgba(9, 9, 11, 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.2)" : "none",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontWeight: 900,
            fontSize: "1.2rem",
            color: "var(--white)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          GROVICE
          <span style={{ color: "#c5a880" }}>2.0</span>
          <span
            style={{
              width: 8,
              height: 8,
              background: "#c5a880",
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
                  color: "var(--white)",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
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
              background: "#c5a880",
              color: "#000000",
              padding: "0.6rem 1.5rem",
              borderRadius: "0px",
              fontFamily: "monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#b5976f";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c5a880";
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
            background: "rgba(9, 9, 11, 0.98)",
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
              background: "#c5a880",
              color: "#000000",
              padding: "0.9rem 2.5rem",
              borderRadius: "0px",
              fontFamily: "monospace",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
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
