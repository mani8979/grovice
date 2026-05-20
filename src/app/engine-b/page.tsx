"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Camera,
  Layers,
  Sparkles,
  CheckCircle2,
  Play,
  Clock,
  Aperture,
  Monitor,
} from "lucide-react";

/* ── TYPES ── */
type FilterType = "all" | "cinema" | "photography" | "branding";

/* ── DATA ── */
const portfolioItems = [
  {
    id: 1,
    title: "Commercial Film Set",
    category: "cinema" as FilterType,
    client: "Luxury Auto Brand",
    duration: "2:34",
    tags: ["4K", "Color Grade", "VFX"],
    icon: "🎬",
    bg: "from-red-950/80 via-slate-950 to-slate-950",
    accent: "#ef4444",
    wide: true,
  },
  {
    id: 2,
    title: "Coastal Perfume Editorial",
    category: "photography" as FilterType,
    client: "Oceana Parfum",
    duration: "48 shots",
    tags: ["Editorial", "Retouch", "Coastal"],
    icon: "📸",
    bg: "from-amber-950/60 via-slate-950 to-slate-950",
    accent: "#f59e0b",
    wide: false,
  },
  {
    id: 3,
    title: "Identity Guide Mockup",
    category: "branding" as FilterType,
    client: "Grovice Labs",
    duration: "Full Suite",
    tags: ["Logo", "Typography", "Guidelines"],
    icon: "✏️",
    bg: "from-violet-950/60 via-slate-950 to-slate-950",
    accent: "#8b5cf6",
    wide: false,
  },
  {
    id: 4,
    title: "Brand Campaign Reel",
    category: "cinema" as FilterType,
    client: "Coastal Resorts Vizag",
    duration: "1:15",
    tags: ["Drone", "Cinematic", "Social"],
    icon: "🎥",
    bg: "from-orange-950/60 via-slate-950 to-slate-950",
    accent: "#f97316",
    wide: false,
  },
  {
    id: 5,
    title: "Product Photography Pack",
    category: "photography" as FilterType,
    client: "Luxury F&B Brand",
    duration: "32 shots",
    tags: ["Studio", "Lifestyle", "E-com"],
    icon: "🍾",
    bg: "from-cyan-950/50 via-slate-950 to-slate-950",
    accent: "#06b6d4",
    wide: false,
  },
  {
    id: 6,
    title: "Brand Identity Refresh",
    category: "branding" as FilterType,
    client: "Siripuram Startup",
    duration: "Full Rebrand",
    tags: ["Color", "Motion", "Deck"],
    icon: "🎨",
    bg: "from-pink-950/50 via-slate-950 to-slate-950",
    accent: "#ec4899",
    wide: false,
  },
];

const services = [
  {
    icon: Film,
    label: "01",
    title: "Cinematic Videography",
    accent: "#ef4444",
    tags: ["4K Shoots", "Color Grade", "Motion VFX", "Drone"],
    desc: "Stunning advertising reels, commercial campaigns, and social media assets. We handle the full pipeline: scriptwriting, coastal location scouting, lighting, directing, and high-end color-graded editing.",
  },
  {
    icon: Camera,
    label: "02",
    title: "Premium Brand Photography",
    accent: "#f59e0b",
    tags: ["Editorial", "Product", "Corporate", "Retouch"],
    desc: "Editorial products, high-fashion branding shoots, and premium corporate portraits. Every image is carefully retouched to reflect a luxury tier placement, matching Vizag's finest coastal lighting.",
  },
  {
    icon: Layers,
    label: "03",
    title: "Visual Branding & Identity",
    accent: "#8b5cf6",
    tags: ["Logo Suite", "Typography", "Color System", "Brand Deck"],
    desc: "We shape your business's soul. Complete logo suites, typography grids, cohesive color charts, presentation templates, and digital guidelines that make your audience instantly trust your name.",
  },
  {
    icon: Sparkles,
    label: "04",
    title: "Social Growth Management",
    accent: "#06b6d4",
    tags: ["Reels", "Strategy", "Scheduling", "Analytics"],
    desc: "Content schedules, premium reel templates, Instagram aesthetic layouts, and algorithmic growth tactics. We make sure your creative output matches the high caliber of your operations.",
  },
];

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All Work" },
  { key: "cinema", label: "Cinema" },
  { key: "photography", label: "Photography" },
  { key: "branding", label: "Branding" },
];

/* ── COMPONENT ── */
export default function EngineBPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", budget: "₹50k - ₹1.5L", desc: "" });

  const filtered =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", budget: "₹50k - ₹1.5L", desc: "" });
    }, 5000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080C12",
        color: "#E2E8F0",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── FILM GRAIN TEXTURE OVERLAY ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── AMBIENT GLOWS ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 5%", paddingTop: 100, paddingBottom: 80 }}>

        {/* ══ HERO HEADER ══ */}
        <div style={{ marginBottom: "5rem" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 4, padding: "0.35rem 0.8rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#ef4444" }}>Engine B · Creative Production</span>
            </div>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(239,68,68,0.3), transparent)" }} />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 900,
              fontSize: "clamp(44px, 7vw, 100px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ display: "block", color: "#FFFFFF" }}>Creative Muscle</span>
            <span style={{ display: "block", fontStyle: "italic", WebkitTextStroke: "1px rgba(239,68,68,0.6)", color: "transparent" }}>& Brand Production</span>
          </h1>

          {/* Sub + meta strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "end" }} className="hero-sub-grid">
            <p style={{ fontSize: "clamp(14px, 1.4vw, 18px)", fontWeight: 300, color: "rgba(226,232,240,0.55)", lineHeight: 1.75, maxWidth: 540 }}>
              Elevating companies through high-fidelity photography, cinematic video campaigns, and luxury brand positioning.
            </p>
            <div style={{ display: "flex", gap: "2rem" }} className="hidden md:flex">
              {[
                { icon: Monitor, label: "4K Production" },
                { icon: Aperture, label: "Studio Grade" },
                { icon: Clock, label: "Fast Delivery" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.4rem", color: "rgba(239,68,68,0.8)" }}>
                    <Icon size={16} />
                  </div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(226,232,240,0.4)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Film strip separator */}
          <div style={{ marginTop: "3rem", display: "flex", gap: 3 }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 28,
                  flex: 1,
                  borderRadius: 2,
                  background: i % 4 === 0
                    ? "rgba(239,68,68,0.15)"
                    : i % 7 === 0
                    ? "rgba(139,92,246,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ══ PORTFOLIO SECTION ══ */}
        <div style={{ marginBottom: "6rem" }}>
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(239,68,68,0.7)" }}>Selected Work</span>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 900, fontSize: "clamp(22px, 3vw, 36px)", color: "#fff", marginTop: "0.3rem", letterSpacing: "-0.02em" }}>
                Production Reel
              </h2>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  style={{
                    padding: "0.45rem 1.1rem",
                    borderRadius: 3,
                    border: activeFilter === f.key ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.07)",
                    background: activeFilter === f.key ? "rgba(239,68,68,0.1)" : "transparent",
                    color: activeFilter === f.key ? "#ef4444" : "rgba(226,232,240,0.45)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid — Masonry-style */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 10,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => {
                const isWide = item.wide || idx === 0;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    style={{
                      gridColumn: isWide ? "span 7" : "span 5",
                      minHeight: isWide ? 380 : 230,
                      borderRadius: 8,
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                      background: `linear-gradient(135deg, ${item.accent}15 0%, #0a0e16 100%)`,
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    className="portfolio-card"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.border = `1px solid ${item.accent}40`;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {/* Letterbox bars — cinema feel */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 18, background: "rgba(0,0,0,0.6)", zIndex: 2, display: "flex", alignItems: "center", paddingLeft: 12, gap: 6 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.accent, opacity: 0.8 }} />
                      <span style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                        {item.category}
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 18, background: "rgba(0,0,0,0.6)", zIndex: 2 }} />

                    {/* Main content area */}
                    <div style={{ position: "absolute", inset: 18, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.5rem 1.5rem 1rem" }}>
                      {/* Icon */}
                      <div style={{ fontSize: isWide ? "4rem" : "2.5rem", opacity: 0.3 }}>{item.icon}</div>

                      {/* Info bottom */}
                      <div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: "0.8rem" }}>
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: "0.6rem",
                                fontWeight: 500,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                padding: "0.25rem 0.6rem",
                                borderRadius: 2,
                                background: `${item.accent}18`,
                                border: `1px solid ${item.accent}30`,
                                color: item.accent,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontWeight: 900,
                            fontSize: isWide ? "1.6rem" : "1.1rem",
                            color: "#fff",
                            letterSpacing: "-0.02em",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {item.title}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "0.7rem", color: "rgba(226,232,240,0.35)", fontWeight: 300 }}>
                            Client: {item.client}
                          </span>
                          <span style={{ fontSize: "0.65rem", color: item.accent, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                            {item.category === "cinema" ? <Play size={10} fill={item.accent} /> : null}
                            {item.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Corner accent line */}
                    <div style={{ position: "absolute", top: 18, right: 0, width: 3, height: "40%", background: `linear-gradient(to bottom, ${item.accent}, transparent)`, opacity: 0.5 }} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ══ SERVICES SECTION ══ */}
        <div style={{ marginBottom: "6rem" }}>
          {/* Section header */}
          <div style={{ borderLeft: "3px solid #ef4444", paddingLeft: "1.2rem", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(239,68,68,0.7)", display: "block", marginBottom: "0.4rem" }}>
              What We Deliver
            </span>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 40px)", color: "#fff", letterSpacing: "-0.02em" }}>
              Production Deliverables
            </h2>
            <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "rgba(226,232,240,0.45)", marginTop: "0.4rem" }}>
              Crafting cohesive brand storytelling assets that command premium trust.
            </p>
          </div>

          {/* Service items */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="svc-grid">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 8,
                    padding: "2rem",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.35s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border = `1px solid ${svc.accent}35`;
                    (e.currentTarget as HTMLElement).style.background = `${svc.accent}08`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                  }}
                >
                  {/* Ghost number */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1.5rem",
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 900,
                      fontSize: "5rem",
                      color: "transparent",
                      WebkitTextStroke: `1px ${svc.accent}15`,
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {svc.label}
                  </div>

                  {/* Icon + title */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, background: `${svc.accent}15`, border: `1px solid ${svc.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", color: svc.accent }}>
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.01em" }}>
                      {svc.title}
                    </h3>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" }}>
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "0.2rem 0.55rem",
                          borderRadius: 2,
                          background: `${svc.accent}12`,
                          color: svc.accent,
                          border: `1px solid ${svc.accent}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: "0.82rem", fontWeight: 300, color: "rgba(226,232,240,0.5)", lineHeight: 1.75 }}>
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ CREATIVE BRIEF FORM ══ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "4rem",
            alignItems: "start",
            padding: "4rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            position: "relative",
            overflow: "hidden",
          }}
          className="brief-grid"
        >
          {/* Red left accent */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "linear-gradient(to bottom, #ef4444, transparent)" }} />

          {/* Left: Info */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 3, padding: "0.3rem 0.8rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ef4444" }}>Work With Us</span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 900,
                fontSize: "clamp(24px, 3vw, 38px)",
                color: "#fff",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Initiate<br />
              <em style={{ fontStyle: "italic", color: "rgba(239,68,68,0.8)" }}>Creative Brief</em>
            </h3>

            <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(226,232,240,0.45)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Tell us your creative requirements, and our production coordinator will schedule a detailed brief scoping call with you.
            </p>

            {/* Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                "Coastal Location Scouting Blueprint",
                "Moodboard Design Concept",
                "Custom Campaign Timeline Outline",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CheckCircle2 size={11} color="#ef4444" />
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 300, color: "rgba(226,232,240,0.6)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {[
                      { key: "name", label: "Your Name *", placeholder: "e.g. Rahul Sharma", type: "text" },
                      { key: "email", label: "Your Email *", placeholder: "e.g. rahul@brand.com", type: "email" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(226,232,240,0.4)", display: "block", marginBottom: "0.4rem" }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          required={field.key !== "budget"}
                          placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          style={{
                            width: "100%",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 4,
                            padding: "0.65rem 0.9rem",
                            fontSize: "0.82rem",
                            color: "#E2E8F0",
                            outline: "none",
                            transition: "border-color 0.2s",
                            fontFamily: "inherit",
                          }}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(239,68,68,0.5)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(226,232,240,0.4)", display: "block", marginBottom: "0.4rem" }}>
                      Project Budget
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 4,
                        padding: "0.65rem 0.9rem",
                        fontSize: "0.82rem",
                        color: "#E2E8F0",
                        outline: "none",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="₹20k - ₹50k">₹20,000 – ₹50,000</option>
                      <option value="₹50k - ₹1.5L">₹50,000 – ₹1,50,000 (Recommended)</option>
                      <option value="₹1.5L+">₹1,50,000+ Premium Campaign</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(226,232,240,0.4)", display: "block", marginBottom: "0.4rem" }}>
                      Tell us about your brand & scope
                    </label>
                    <textarea
                      rows={4}
                      value={form.desc}
                      onChange={(e) => setForm({ ...form, desc: e.target.value })}
                      placeholder="e.g. We need a commercial cinematic video for our resort launch in Vizag, along with 20 product photos for social campaigns..."
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 4,
                        padding: "0.65rem 0.9rem",
                        fontSize: "0.82rem",
                        color: "#E2E8F0",
                        outline: "none",
                        resize: "none",
                        fontFamily: "inherit",
                        lineHeight: 1.7,
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(239,68,68,0.5)"; }}
                      onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "0.9rem",
                      borderRadius: 4,
                      background: "#ef4444",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#dc2626"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#ef4444"; }}
                  >
                    Request Campaign Scoping Call →
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4rem 2rem",
                    textAlign: "center",
                    gap: "1.2rem",
                  }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle2 size={28} color="#ef4444" />
                  </div>
                  <h4 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 900, fontSize: "1.4rem", color: "#fff" }}>
                    Creative Brief Received!
                  </h4>
                  <p style={{ fontSize: "0.82rem", fontWeight: 300, color: "rgba(226,232,240,0.5)", maxWidth: 320 }}>
                    Our production coordinator will review your brief and connect within 12 hours with moodboard options.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .hero-sub-grid { grid-template-columns: 1fr !important; }
          .svc-grid { grid-template-columns: 1fr !important; }
          .brief-grid { grid-template-columns: 1fr !important; padding: 2rem !important; }
        }
        @media (max-width: 600px) {
          .portfolio-card { grid-column: span 12 !important; }
        }
      `}</style>
    </div>
  );
}
