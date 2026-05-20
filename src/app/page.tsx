"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 24; i++) {
      const s = document.createElement("span");
      const size = 2 + Math.random() * 3;
      s.className = "hero-particle";
      s.style.cssText = `
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        width:${size}px;
        height:${size}px;
        --dur:${6 + Math.random() * 10}s;
        --delay:${Math.random() * 8}s;
      `;
      container.appendChild(s);
    }
  }, []);

  const words = ["Visakhapatnam's", "First", "Business", "Operating", "System"];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 6%",
        position: "relative",
        overflow: "hidden",
        background: "var(--white)",
      }}
    >
      {/* Particles */}
      <div
        ref={particlesRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
      />

      {/* Ghost watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: "clamp(120px, 22vw, 300px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(11,43,92,0.04)",
          right: "-3%",
          top: "50%",
          transform: "translateY(-50%)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          animation: "ghost-drift 18s ease-in-out infinite",
        }}
      >
        GROW
      </div>

      {/* Grid bg */}
      <div className="grid-bg-ocean" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000 }}>
        {/* Eyebrow */}
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--ocean-bright)",
            marginBottom: "1.8rem",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          <span style={{ width: 32, height: 1, background: "var(--ocean-bright)", display: "inline-block" }} />
          Visakhapatnam · Est. 2024
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 900,
            fontSize: "clamp(44px, 7.5vw, 108px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "var(--ocean)",
            marginBottom: "2rem",
            maxWidth: 900,
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "0.22em",
                ...(i === 4 ? { fontStyle: "italic", color: "var(--ocean-bright)" } : {}),
              }}
            >
              {w}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: "clamp(15px, 1.6vw, 19px)",
            fontWeight: 300,
            color: "var(--muted)",
            maxWidth: 520,
            marginBottom: "3rem",
            lineHeight: 1.75,
          }}
        >
          Where AI Automation meets Creative Excellence — the first Business Operating System built for Vizag.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/engine-a" className="btn-ocean">
            Explore Engine A <span>→</span>
          </Link>
          <Link href="/engine-b" className="btn-outline-ocean">
            Explore Engine B
          </Link>
        </div>
      </div>

      {/* Wave transition to cream */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 90 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C240,100 480,20 720,50 C960,80 1200,10 1440,45 L1440,90 L0,90 Z" fill="#F7F9FC" />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VISION SECTION
───────────────────────────────────────────── */
function VisionSection() {
  const stats = [
    { number: "1", suffix: "OS", label: "One complete system" },
    { number: "2", suffix: "Engines", label: "AI Brain + Creative Muscle" },
    { number: "∞", suffix: "Growth", label: "Unlimited potential" },
  ];

  const pills = ["AI Automation", "Photography", "Videography", "SEO & Maps", "Social Media", "Design"];

  return (
    <section
      id="vision"
      style={{
        background: "var(--cream)",
        padding: "9rem 6%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grid-bg-ocean" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
        className="vision-inner"
      >
        {/* Stats */}
        <div>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "2.5rem 0",
                borderBottom: "1px solid var(--border)",
                ...(i === 0 ? { borderTop: "1px solid var(--border)" } : {}),
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 900,
                  fontSize: "clamp(52px, 6vw, 80px)",
                  color: "var(--ocean)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {s.number}{" "}
                <span style={{ color: "var(--ocean-bright)" }}>{s.suffix}</span>
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: "0.4rem",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Text */}
        <div>
          <span className="section-tag">Our Vision</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 900,
              fontSize: "clamp(30px, 3.5vw, 48px)",
              lineHeight: 1.1,
              color: "var(--ocean)",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Redefining digital growth{" "}
            <em style={{ fontStyle: "italic", color: "var(--ocean-bright)" }}>in Vizag</em>
          </h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: "#4A6080", lineHeight: 1.85, marginBottom: "1.2rem" }}>
            Grovice 2.0 is a hybrid agency that merges AI-powered automation with a managed creative talent marketplace. We handle everything — from the technical backend running your leads to the creative frontend building your brand.
          </p>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: "#4A6080", lineHeight: 1.85, marginBottom: "2rem" }}>
            Born in Visakhapatnam. Built for Vizag businesses. With on-field presence in Siripuram and Gajuwaka, we deliver digital excellence with local trust.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {pills.map((p) => (
              <span
                key={p}
                style={{
                  background: "var(--sky)",
                  color: "var(--ocean)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  padding: "0.45rem 1rem",
                  borderRadius: 100,
                  letterSpacing: "0.05em",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Wave to Engine A */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" fill="var(--ocean)" />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ENGINE A SECTION
───────────────────────────────────────────── */
function EngineASection() {
  const steps = [
    { num: "01", title: "Lead comes in", body: "Via phone, WhatsApp, Instagram, or your website — every channel captured automatically." },
    { num: "02", title: "AI responds instantly", body: "Our AI Voice Agent answers, qualifies, and engages your lead within 3 seconds — 24 hours a day." },
    { num: "03", title: "Lead gets booked", body: "The n8n workflow nurtures the lead, updates your CRM, and books them into your calendar automatically." },
  ];

  const eaStats = [
    { num: "3", suf: "sec", label: "Average AI response time" },
    { num: "40", suf: "%", label: "More leads captured monthly" },
    { num: "120", suf: "hrs", label: "Saved per month on follow-ups" },
  ];

  const wfNodes = [
    { icon: "📱", title: "Lead Arrives", sub: "WhatsApp / Web", color: "rgba(214,232,255,0.12)" },
    { icon: "🤖", title: "AI Voice Agent", sub: "Responds in 3 sec", color: "rgba(46,107,196,0.25)" },
    { icon: "⚡", title: "n8n Workflow", sub: "Qualifies & routes", color: "rgba(214,232,255,0.12)" },
    { icon: "📊", title: "CRM Update", sub: "Auto-logged", color: "rgba(214,232,255,0.12)" },
    { icon: "✅", title: "Lead Booked", sub: "You get notified", color: "rgba(26,155,100,0.2)" },
  ];

  return (
    <section
      id="engine-a"
      style={{
        background: "var(--ocean)",
        padding: "9rem 6%",
        position: "relative",
        overflow: "hidden",
        color: "var(--white)",
      }}
    >
      {/* Ghost A */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: 480,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          right: -60,
          top: "50%",
          transform: "translateY(-50%)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        A
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <span className="section-tag section-tag-dark">Engine A — AI Brain</span>

        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 900,
            fontSize: "clamp(38px, 5.5vw, 74px)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            color: "var(--white)",
            maxWidth: 700,
            marginBottom: "1.2rem",
          }}
        >
          Your business runs
          <br />
          <em style={{ fontStyle: "italic", color: "var(--sky)" }}>while you sleep</em>
        </h2>

        <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(214,232,255,0.7)", maxWidth: 480, marginBottom: "3.5rem", lineHeight: 1.8 }}>
          AI Voice Agents that never miss a lead. n8n workflows connecting your entire business. Automated follow-ups that book clients 24/7.
        </p>

        {/* Workflow Diagram */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "2.5rem",
            marginBottom: "4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(214,232,255,0.5)",
              marginBottom: "1.5rem",
              fontWeight: 500,
            }}
          >
            Live automation flow
          </div>
          <div style={{ display: "flex", alignItems: "center", overflowX: "auto", paddingBottom: "0.5rem" }}>
            {wfNodes.map((node, i) => (
              <React.Fragment key={i}>
                {/* Node */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 10,
                    padding: "1rem 1.2rem",
                    minWidth: 120,
                    textAlign: "center",
                    flexShrink: 0,
                    cursor: "default",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: node.color,
                      margin: "0 auto 0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    {node.icon}
                  </div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--white)", lineHeight: 1.3 }}>{node.title}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(214,232,255,0.5)", marginTop: "0.2rem" }}>{node.sub}</div>
                </div>

                {/* Connector (not after last node) */}
                {i < wfNodes.length - 1 && (
                  <div style={{ flex: 1, minWidth: 40, maxWidth: 80, position: "relative", height: 2, flexShrink: 0, display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "100%",
                        height: 2,
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 1,
                        position: "relative",
                        overflow: "hidden",
                      }}
                      className="wf-connector-fill"
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: -1,
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid rgba(214,232,255,0.6)",
                        borderTop: "4px solid transparent",
                        borderBottom: "4px solid transparent",
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }} className="ea-steps-grid">
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "1.8rem 1.5rem",
                position: "relative",
                transition: "all 0.4s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "3rem",
                  fontWeight: 900,
                  color: "rgba(214,232,255,0.1)",
                  lineHeight: 1,
                  position: "absolute",
                  top: "1rem",
                  right: "1.2rem",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--white)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 300, color: "rgba(214,232,255,0.6)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }} className="ea-stats-grid">
          {eaStats.map((s, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1.2rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 900,
                  color: "var(--sky)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {s.num}
                <span style={{ fontSize: "0.55em", opacity: 0.6 }}>{s.suf}</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(214,232,255,0.55)", marginTop: "0.4rem", fontWeight: 400, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/engine-a"
          style={{
            background: "var(--sky)",
            color: "var(--ocean)",
            padding: "1rem 2.2rem",
            borderRadius: 4,
            fontSize: "0.82rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(11,43,92,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          Get Your Free AI Audit →
        </a>
      </div>

      {/* Wave to Engine B */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,70 720,10 1080,50 C1260,70 1380,25 1440,40 L1440,80 L0,80 Z" fill="var(--white)" />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ENGINE B SECTION
───────────────────────────────────────────── */
function EngineBSection() {
  const portfolioItems = [
    { cat: "Brand Photography", title: "Visual Storytelling", icon: "📸", color: "linear-gradient(135deg,#D6E8FF 0%,#B5D4F4 100%)", span: "col-span-7 row-span-2" },
    { cat: "Brand Films", title: "Motion & Story", icon: "🎬", color: "linear-gradient(135deg,#EEF5FF 0%,#D6E8FF 100%)", span: "col-span-5" },
    { cat: "Brand Identity", title: "Design Systems", icon: "✏️", color: "linear-gradient(135deg,#E8F0FF 0%,#C8DCFF 100%)", span: "col-span-5" },
    { cat: "Social Strategy", title: "Growth Content", icon: "📱", color: "linear-gradient(135deg,#D6E8FF 0%,#B8CEFF 100%)", span: "col-span-4" },
    { cat: "Short Form", title: "Reels & Promos", icon: "🎞️", color: "linear-gradient(135deg,#EEF5FF 0%,#D0E5FF 100%)", span: "col-span-4" },
    { cat: "Event Coverage", title: "Live Moments", icon: "🎉", color: "linear-gradient(135deg,#E0EEFF 0%,#C0D8FF 100%)", span: "col-span-4" },
  ];

  const services = [
    { icon: "📸", name: "Photography", desc: "Product shoots, brand portraits, event coverage — all quality-controlled." },
    { icon: "🎬", name: "Videography", desc: "Brand films, reels, promos and testimonials that convert viewers into clients." },
    { icon: "✏️", name: "Design", desc: "Logos, brand identity, social creatives and everything visual your brand needs." },
    { icon: "📱", name: "Social Media", desc: "Content strategy, posting calendars, and growth management — done for you." },
  ];

  return (
    <section
      id="engine-b"
      style={{
        background: "var(--white)",
        padding: "9rem 6%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost B */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: 480,
          color: "transparent",
          WebkitTextStroke: "1px rgba(11,43,92,0.03)",
          left: -60,
          top: "50%",
          transform: "translateY(-50%)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        B
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end", marginBottom: "4rem" }} className="eb-header-grid">
          <div>
            <span className="section-tag">Engine B — Creative Muscle</span>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 68px)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: "var(--ocean)",
              }}
            >
              Every creative need.
              <br />
              <em style={{ fontStyle: "italic", color: "var(--ocean-bright)" }}>One team.</em>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Photography, videography, brand design, and social media — all managed under one roof, with quality-controlled output and a curated talent marketplace.
            </p>
            <a href="/engine-b" className="btn-ocean">See Our Work →</a>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 12,
            marginBottom: "4rem",
          }}
          className="portfolio-grid-main"
        >
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              className="port-item"
              style={{
                gridColumn: `span ${[7,5,5,4,4,4][i]}`,
                gridRow: i === 0 ? "span 2" : "auto",
                minHeight: [380, 184, 184, 200, 200, 200][i],
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div className="port-bg" style={{ background: item.color, width: "100%", height: "100%", position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: "2.5rem" }}>{item.icon}</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                  {item.cat}
                </span>
              </div>
              <div className="port-overlay" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "1.5rem" }}>
                <div className="port-info">
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sky)", fontWeight: 500, marginBottom: "0.3rem" }}>{item.cat}</div>
                  <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--white)" }}>{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }} className="svc-cards-grid">
          {services.map((svc, i) => (
            <div
              key={i}
              className="svc-card"
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "2rem 1.5rem",
                cursor: "pointer",
                transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
                background: "var(--white)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--ocean)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(11,43,92,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "var(--sky)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: "1.2rem",
                  }}
                >
                  {svc.icon}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--ocean)", marginBottom: "0.4rem" }}>{svc.name}</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 300, color: "var(--muted)", lineHeight: 1.6 }}>{svc.desc}</div>
                <span style={{ display: "block", marginTop: "1.2rem", fontSize: "1.2rem", color: "var(--border)" }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────────── */
function CtaSection() {
  return (
    <section
      style={{
        background: "var(--ocean)",
        padding: "7rem 6%",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grid-bg-tech" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(214,232,255,0.7)",
            marginBottom: "1.5rem",
          }}
        >
          Ready to Scale?
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--white)",
            marginBottom: "1.5rem",
          }}
        >
          Let&apos;s build your
          <br />
          <em style={{ fontStyle: "italic", color: "var(--sky)" }}>business operating system</em>
        </h2>
        <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(214,232,255,0.65)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
          One call. One team. One platform that handles your AI backend and creative output.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="tel:+917396621004"
            style={{
              background: "var(--sky)",
              color: "var(--ocean)",
              padding: "1rem 2.2rem",
              borderRadius: 4,
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            Book a Free Call →
          </a>
          <a
            href="mailto:grovicedigital@gmail.com"
            style={{
              background: "transparent",
              color: "rgba(214,232,255,0.85)",
              padding: "1rem 2.2rem",
              borderRadius: 4,
              fontSize: "0.82rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid rgba(214,232,255,0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.4s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(214,232,255,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(214,232,255,0.2)"; }}
          >
            Send a Message
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .vision-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .ea-steps-grid { grid-template-columns: 1fr !important; }
          .ea-stats-grid { grid-template-columns: repeat(3,1fr) !important; }
          .eb-header-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .svc-cards-grid { grid-template-columns: repeat(2,1fr) !important; }
          .portfolio-grid-main > div:nth-child(1) { grid-column: span 12 !important; min-height: 240px !important; }
          .portfolio-grid-main > div:nth-child(2),
          .portfolio-grid-main > div:nth-child(3) { grid-column: span 6 !important; }
          .portfolio-grid-main > div:nth-child(4),
          .portfolio-grid-main > div:nth-child(5),
          .portfolio-grid-main > div:nth-child(6) { grid-column: span 12 !important; }
        }
        @media (max-width: 600px) {
          .ea-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .svc-cards-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid-main > div:nth-child(2),
          .portfolio-grid-main > div:nth-child(3) { grid-column: span 12 !important; }
        }
      `}</style>

      {/* Floating bottom pill */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: 0,
          right: 0,
          zIndex: 30,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "var(--ocean)",
            color: "var(--white)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: 100,
            padding: "0.6rem 1.5rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 8px 32px rgba(11,43,92,0.25)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--ocean-mid)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--ocean)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--sky)",
              animation: "pulse-dot 2.5s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          Start a Project
        </button>
      </div>

      <HeroSection />
      <VisionSection />
      <EngineASection />
      <EngineBSection />
      <CtaSection />
    </>
  );
}
