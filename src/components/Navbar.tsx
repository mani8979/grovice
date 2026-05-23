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
    { name: "Engine A", href: "/engine-a" },
    { name: "Engine B", href: "/engine-b" },
    { name: "Book Call", href: "/book" },
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
          transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
          background: scrolled ? "rgba(5, 6, 10, 0.95)" : "transparent",
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
            color: "#F6F7FB",
            textDecoration: "none",
            letterSpacing: "0.1em",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          GROVICE
          <span style={{ color: "#FF9E00", fontWeight: "bold" }}>2.0</span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF9E00] animate-pulse"
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-10"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  color: "#F6F7FB",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: isActive ? 1 : 0.6,
                  transition: "opacity 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => { 
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.color = "#FF9E00";
                }}
                onMouseLeave={(e) => { 
                  (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.6";
                  (e.currentTarget as HTMLElement).style.color = "#F6F7FB";
                }}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/book"
            style={{
              background: "linear-gradient(135deg, #FF9E00 0%, #FF4069 50%, #7000FF 100%)",
              color: "#000000",
              padding: "0.6rem 1.4rem",
              borderRadius: "0px",
              fontFamily: "monospace",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.15s",
              boxShadow: "0 0 15px rgba(255, 158, 0, 0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(255, 158, 0, 0.5)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(255, 158, 0, 0.25)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Launch OS
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F6F7FB] focus:outline-none"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
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
            background: "rgba(4, 3, 8, 0.98)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: "#F6F7FB",
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

          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            style={{
              marginTop: "1rem",
              background: "linear-gradient(135deg, #FF9E00 0%, #FF4069 50%, #7000FF 100%)",
              color: "#000000",
              padding: "0.8rem 2.2rem",
              borderRadius: "0px",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 0 15px rgba(255, 158, 0, 0.25)",
            }}
          >
            Launch OS
          </Link>
        </div>
      )}
    </>
  );
}
