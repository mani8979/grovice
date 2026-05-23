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
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
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
      <header
        style={{
          position: "fixed",
          top: scrolled ? "0.8rem" : "1.2rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "92%",
          maxWidth: "1200px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "0.6rem 1.6rem" : "0.9rem 2rem",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          background: scrolled ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "9999px",
          boxShadow: scrolled 
            ? "0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)" 
            : "0 8px 24px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.01)",
        }}
      >
        {/* Logo and Brand Icon */}
        <Link
          href="/"
          style={{
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "#0A2540",
            textDecoration: "none",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          }}
        >
          {/* Custom resort wave logo icon */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transition: "transform 0.4s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(30deg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "rotate(0deg)"; }}
            >
              <circle cx="50" cy="50" r="46" fill="url(#logoGrad)" />
              <path
                d="M25 58 C35 50, 40 62, 50 58 C60 54, 65 66, 75 58 C75 58, 75 75, 75 75 L25 75 Z"
                fill="#005B94"
                opacity="0.85"
              />
              <path
                d="M25 65 C32 60, 38 68, 50 65 C62 62, 68 70, 75 65 C75 65, 75 78, 75 78 L25 78 Z"
                fill="#0B3C73"
              />
              {/* Palm Tree silhouette simplified */}
              <path
                d="M48 60 L49 42 C49 40, 51 40, 51 42 L50 60 Z"
                fill="#FF9E00"
              />
              <path
                d="M50 42 C43 38, 38 41, 38 41 C38 41, 44 43, 49 43 Z"
                fill="#FF9E00"
              />
              <path
                d="M50 42 C57 38, 62 41, 62 41 C62 41, 56 43, 51 43 Z"
                fill="#FF9E00"
              />
              <path
                d="M50 42 C48 35, 43 32, 43 32 C43 32, 47 37, 49 41 Z"
                fill="#FF9E00"
              />
              <path
                d="M50 42 C52 35, 57 32, 57 32 C57 32, 53 37, 51 41 Z"
                fill="#FF9E00"
              />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#FFF0D4" />
                  <stop offset="40%" stopColor="#FFE1A8" />
                  <stop offset="100%" stopColor="#8EE3F5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span style={{ fontWeight: 800 }}>GROVICE</span>
          <span style={{ color: "#0B3C73", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", opacity: 0.8 }}>OS</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  color: "#0F172A",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  opacity: isActive ? 1 : 0.65,
                  transition: "opacity 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { 
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.color = "#0B3C73";
                }}
                onMouseLeave={(e) => { 
                  (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.65";
                  (e.currentTarget as HTMLElement).style.color = "#0F172A";
                }}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/book"
            style={{
              background: "#0B3C73",
              color: "#FFFFFF",
              padding: "0.65rem 1.6rem",
              borderRadius: "9999px",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "all 0.25s ease",
              boxShadow: "0 4px 12px rgba(11, 60, 115, 0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#07274B";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(11, 60, 115, 0.35)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#0B3C73";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(11, 60, 115, 0.2)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#0F172A] focus:outline-none"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.4rem",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} className="text-[#0F172A]" /> : <Menu size={22} className="text-[#0F172A]" />}
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
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
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
                color: "#0F172A",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.02em",
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
              background: "#0B3C73",
              color: "#FFFFFF",
              padding: "0.75rem 2.2rem",
              borderRadius: "9999px",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              boxShadow: "0 4px 15px rgba(11, 60, 115, 0.2)",
            }}
          >
            Book Now
          </Link>
        </div>
      )}
    </>
  );
}
