"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "#040308", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* ── Top gradient accent line ── */}
      <div className="accent-line-full" />

      {/* ── Ambient background glows ── */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,158,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          width: "400px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(112,0,255,0.03)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10 relative z-10">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* ── Brand Column ── */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-outfit), monospace",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  letterSpacing: "0.12em",
                  color: "#F0F2FF",
                  textTransform: "uppercase",
                }}
              >
                GROVICE
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #FF9E00, #FF4069)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "var(--font-outfit), monospace",
                  letterSpacing: "0.08em",
                }}
              >
                2.0
              </span>
            </Link>

            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(240,242,255,0.45)",
                lineHeight: 1.75,
                maxWidth: "280px",
                fontFamily: "var(--font-dm-sans), system-ui",
              }}
            >
              Visakhapatnam&apos;s first dual-engine business operating system. Bridging high-performance AI automation with world-class creative production.
            </p>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href="https://www.instagram.com/grovice2.0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(240,242,255,0.5)",
                  transition: "all 0.25s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,64,105,0.5)";
                  el.style.background = "rgba(255,64,105,0.08)";
                  el.style.color = "#FF4069";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 4px 15px rgba(255,64,105,0.2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.color = "rgba(240,242,255,0.5)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Engines ── */}
          <div className="md:col-span-2 space-y-5">
            <h5
              style={{
                fontFamily: "var(--font-outfit), monospace",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(240,242,255,0.35)",
              }}
            >
              Engines
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { href: "/engine-a", label: "Engine A: Software & AI", color: "#FF9E00" },
                { href: "/engine-b", label: "Engine B: Creative Muscle", color: "#FF4069" },
              ].map(({ href, label, color }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(240,242,255,0.5)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "color 0.2s",
                      fontFamily: "var(--font-dm-sans), system-ui",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = color; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,242,255,0.5)"; }}
                  >
                    <span style={{ width: "14px", height: "1px", background: color, borderRadius: "1px", flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="md:col-span-3 space-y-5">
            <h5
              style={{
                fontFamily: "var(--font-outfit), monospace",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(240,242,255,0.35)",
              }}
            >
              Contact
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <li>
                <a
                  href="tel:+917396621004"
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(240,242,255,0.5)", textDecoration: "none", fontSize: "0.8rem", transition: "color 0.2s", fontFamily: "var(--font-dm-sans), system-ui" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF9E00"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,242,255,0.5)"; }}
                >
                  <Phone size={13} color="#FF9E00" />
                  +91-7396621004
                </a>
              </li>
              <li>
                <a
                  href="mailto:grovicedigital@gmail.com"
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(240,242,255,0.5)", textDecoration: "none", fontSize: "0.8rem", transition: "color 0.2s", fontFamily: "var(--font-dm-sans), system-ui" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF4069"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,242,255,0.5)"; }}
                >
                  <Mail size={13} color="#FF4069" />
                  grovicedigital@gmail.com
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", color: "rgba(240,242,255,0.5)", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans), system-ui" }}>
                <MapPin size={13} color="#FF9E00" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ color: "rgba(240,242,255,0.65)" }}>Visakhapatnam, AP</p>
                  <p style={{ fontSize: "0.72rem", color: "rgba(240,242,255,0.3)", marginTop: "1px" }}>Siripuram & Gajuwaka</p>
                </div>
              </li>
            </ul>
          </div>

          {/* ── System Status Widget ── */}
          <div className="md:col-span-3 space-y-5">
            <h5
              style={{
                fontFamily: "var(--font-outfit), monospace",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(240,242,255,0.35)",
              }}
            >
              System Status
            </h5>

            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.65rem",
              }}
            >
              {[
                { label: "Engine A — AI Pipeline", status: "Operational", color: "#22c55e" },
                { label: "Engine B — Studio Grid", status: "Operational", color: "#22c55e" },
                { label: "CRM Sync", status: "99.98% Uptime", color: "#22c55e" },
              ].map(({ label, status, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(240,242,255,0.4)", fontFamily: "var(--font-outfit), monospace" }}>
                    {label}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span className="uptime-dot" style={{ width: "5px", height: "5px" }} />
                    <span style={{ fontSize: "0.62rem", color, fontFamily: "var(--font-outfit), monospace", fontWeight: 600 }}>
                      {status}
                    </span>
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: "0.25rem",
                  paddingTop: "0.6rem",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "0.62rem", color: "rgba(240,242,255,0.25)", fontFamily: "var(--font-outfit), monospace" }}>
                  Last checked: live
                </span>
                <a
                  href="https://status.grovice.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.62rem",
                    color: "rgba(240,242,255,0.35)",
                    textDecoration: "none",
                    fontFamily: "var(--font-outfit), monospace",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF9E00"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,242,255,0.35)"; }}
                >
                  Status page <ExternalLink size={9} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              color: "rgba(240,242,255,0.25)",
              fontFamily: "var(--font-outfit), monospace",
              letterSpacing: "0.05em",
            }}
          >
            © {year} GROVICE 2.0. All Rights Reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "0.58rem",
                color: "rgba(240,242,255,0.2)",
                fontFamily: "var(--font-outfit), monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Powered by
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                fontFamily: "var(--font-outfit), monospace",
                letterSpacing: "0.1em",
                background: "linear-gradient(135deg, #FF9E00, #FF4069)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              GROVICE OS
            </span>
          </div>

          <p
            style={{
              fontSize: "0.62rem",
              color: "rgba(240,242,255,0.2)",
              fontFamily: "var(--font-outfit), monospace",
              letterSpacing: "0.08em",
            }}
          >
            Designed for Coastal Luxury & Business Automation
          </p>
        </div>
      </div>
    </footer>
  );
}
