"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Workflow,
  Camera,
  Layers,
  Database,
  Cpu,
  Tv,
  LineChart,
  Star,
  Quote,
  ArrowUpRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   COMPOSABLE ORBITING CARD 1: ENGINE A
───────────────────────────────────────────── */
function EngineACard() {
  return (
    <div
      className="p-5 rounded-xl border transition-all duration-500 shadow-lg relative overflow-hidden"
      style={{
        background: "rgba(7, 28, 61, 0.85)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(47, 107, 255, 0.25)",
        boxShadow: "0 10px 30px rgba(47, 107, 255, 0.15)",
        width: "100%",
        maxWidth: 280,
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent blur-md pointer-events-none" />
      <div className="flex items-center justify-between mb-4">
        <span className="text-[9px] uppercase tracking-widest text-[#2F6BFF] font-bold">Engine A · AI OS</span>
        <div className="flex items-center gap-1.5 bg-[#2F6BFF]/10 px-2 py-0.5 rounded border border-[#2F6BFF]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F6BFF] animate-pulse" />
          <span className="text-[8px] text-[#2F6BFF] font-mono font-bold uppercase">Active</span>
        </div>
      </div>
      <div className="space-y-3 font-mono text-[10px] text-slate-300">
        <div className="flex justify-between items-center border-b border-white/5 pb-1">
          <span>AI Agents</span>
          <span className="text-[#BFD4FF]">98.4% Efficiency</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-1">
          <span>CRM Router</span>
          <span className="text-[#BFD4FF]">n8n Live</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Voice Dialers</span>
          <span className="text-emerald-400">12 Parallel</span>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
        <Cpu size={12} className="text-[#2F6BFF]" />
        <span className="text-[9px] text-[#BFD4FF] font-sans font-medium uppercase tracking-wider">Automating Sales Pipeline</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPOSABLE ORBITING CARD 2: ENGINE B
───────────────────────────────────────────── */
function EngineBCard() {
  return (
    <div
      className="p-5 rounded-xl border transition-all duration-500 shadow-lg relative overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        width: "100%",
        maxWidth: 280,
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/10 to-transparent blur-md pointer-events-none" />
      <div className="flex items-center justify-between mb-4">
        <span className="text-[9px] uppercase tracking-widest text-[#BFD4FF]/60 font-bold">Engine B · Creative</span>
        <span className="text-[8px] bg-red-950/40 border border-red-500/30 text-red-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Production</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["🌅", "🎥", "📸"].map((emoji, i) => (
          <div
            key={i}
            className="aspect-[4/5] rounded bg-white/5 border border-white/5 flex items-center justify-center text-sm relative group overflow-hidden"
          >
            {emoji}
            <div className="absolute inset-0 bg-[#071C3D]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[6px] text-white uppercase font-bold tracking-widest">View</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[9px] text-[#BFD4FF]/60 font-sans">
        <span>Vizag Coastal Shoots</span>
        <span className="text-white font-medium">1080p | 4K</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPOSABLE ORBITING CARD 3: SOFTWARE PROJECTS
───────────────────────────────────────────── */
function SoftwareCard() {
  return (
    <div
      className="p-5 rounded-xl border transition-all duration-500 shadow-lg relative overflow-hidden"
      style={{
        background: "rgba(7, 28, 61, 0.85)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        width: "100%",
        maxWidth: 280,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Database size={12} className="text-[#2F6BFF]" />
          <span className="text-[9px] uppercase tracking-widest text-[#BFD4FF] font-bold">Software Infra</span>
        </div>
        <span className="text-[8px] text-[#BFD4FF]/40 font-mono">v2.0.4</span>
      </div>
      
      {/* Code mockup */}
      <div className="p-3 rounded bg-[#020914]/80 border border-white/5 font-mono text-[8px] text-sky-300/80 space-y-1">
        <div><span className="text-pink-400">const</span> app = <span className="text-yellow-300">GroviceOS</span>();</div>
        <div>app.<span className="text-green-300">integrate</span>(<span className="text-orange-300">&apos;EngineA&apos;</span>);</div>
        <div>app.<span className="text-green-300">powerUp</span>(<span className="text-orange-300">&apos;EngineB&apos;</span>);</div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[9px] text-[#BFD4FF]/50 font-sans">
        <span>Custom Portals & Apps</span>
        <span className="text-emerald-400">Secure ✅</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL-LINKED STICKY CARD STACKING SECTION
───────────────────────────────────────────── */
interface FadeBlurSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  sideHeadingNum: string;
  sideHeadingText: string;
  zIndex: number;
}

function FadeBlurSection({
  children,
  id,
  className = "",
  sideHeadingNum,
  sideHeadingText,
  zIndex,
}: FadeBlurSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this section container from entering to leaving
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth entry transitions, stay static on exit to prevent gaps
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 1.0], [0, 1, 1]);
  const blur = useTransform(scrollYProgress, [0.05, 0.25, 1.0], ["blur(12px)", "blur(0px)", "blur(0px)"]);
  const scale = useTransform(scrollYProgress, [0.05, 0.25, 1.0], [0.95, 1, 1]);
  const y = useTransform(scrollYProgress, [0.05, 0.25, 1.0], [40, 0, 0]);

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative h-[160vh] w-full"
      style={{ zIndex }}
    >
      {/* Sticky background wrapper - completely static and opaque */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
        className={`w-full flex items-center justify-center px-6 sm:px-12 md:px-20 overflow-hidden ${className}`}
      >
        {/* Animated content container */}
        <motion.div
          style={{
            opacity,
            filter: blur,
            scale,
            y,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* ASYMMETRIC SIDE HEADING COLUMN */}
            <div className="lg:col-span-3 flex lg:flex-col lg:items-start items-center justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-8 lg:min-h-[220px]">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#2F6BFF] uppercase tracking-[0.25em] font-bold">
                  {sideHeadingNum}
                </span>
                <h3 className="text-xs font-sans font-black tracking-widest text-slate-100 uppercase mt-1">
                  {sideHeadingText}
                </h3>
              </div>
              <div className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-[#2F6BFF]/30 to-transparent mt-8" />
            </div>

            {/* MAIN SECTION CONTENT COLUMN */}
            <div className="lg:col-span-9 w-full">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HOMEPAGE CONTAINER
───────────────────────────────────────────── */
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Page-wide background transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(7, 18, 36, 1) 0%, rgba(3, 8, 18, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(6, 14, 28, 1) 0%, rgba(2, 6, 14, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(4, 10, 22, 1) 0%, rgba(1, 4, 10, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(5, 12, 26, 1) 0%, rgba(1, 3, 8, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(3, 8, 18, 1) 0%, rgba(0, 2, 6, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(2, 5, 12, 1) 0%, rgba(0, 1, 4, 1) 100%)",
    ]
  );

  const heroScrollProgress = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroScrollProgress,
    offset: ["start start", "end start"],
  });

  // Hero stays pinned and solid, only fading/scaling/blurring when Section 2 covers it completely
  const heroOpacity = useTransform(heroScrollY, [0, 0.9, 1.0], [1, 1, 0]);
  const heroBlur = useTransform(heroScrollY, [0, 0.9, 1.0], ["blur(0px)", "blur(0px)", "blur(12px)"]);
  const heroScale = useTransform(heroScrollY, [0, 0.9, 1.0], [1, 1, 0.98]);
  const heroY = useTransform(heroScrollY, [0, 0.9, 1.0], [0, 0, -20]);

  // Mouse tilt logic for 3D coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30; // max degrees
      const y = (clientY / innerHeight - 0.5) * -30;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        background: bgGradient,
        position: "relative",
      }}
      className="relative text-slate-100"
    >
      {/* ── BACKGROUND NOISE OVERLAY ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── FLOATING WATERMARK ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          fontFamily: "var(--font-archivo), system-ui, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(120px, 20vw, 320px)",
          color: "rgba(47, 107, 255, 0.03)",
          left: "-5%",
          top: "40%",
          transform: "translateY(-50%)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        GROVICE
      </div>

      {/* ═════════════════════════════════════════════
          SECTION 1: HERO SECTION
          ═════════════════════════════════════════════ */}
      <div ref={heroScrollProgress} className="relative h-[140vh] w-full" style={{ zIndex: 10 }}>
        <motion.div
          style={{
            opacity: heroOpacity,
            filter: heroBlur,
            scale: heroScale,
            y: heroY,
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
          className="w-full px-6 sm:px-12 md:px-20 flex items-center justify-center overflow-hidden"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT HERO METADATA */}
            <div className="lg:col-span-7 space-y-6 text-left relative z-10">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#2F6BFF] block" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#2F6BFF]">
                  Visakhapatnam’s First Business Operating System
                </span>
              </div>

              <motion.h1
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 900,
                  fontSize: "clamp(54px, 7vw, 105px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  rotateX: springY,
                  rotateY: springX,
                  transformStyle: "preserve-3d",
                }}
                className="text-white drop-shadow-[0_10px_30px_rgba(47,107,255,0.25)]"
              >
                GROVICE 2.0
              </motion.h1>

              <div className="space-y-2">
                <h2 className="font-display font-black text-xl md:text-2xl text-slate-100 tracking-tight">
                  One Stop Business Solution
                </h2>
                <p className="font-cormorant font-normal text-lg md:text-xl text-[#2F6BFF] italic">
                  “Where AI Infrastructure Meets Creative Power.”
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    const targetEl = document.getElementById("vision-section");
                    targetEl?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300"
                  style={{
                    background: "#2F6BFF",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#1d4ed8";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#2F6BFF";
                  }}
                >
                  Explore Platform
                </button>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
                  className="px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider border text-white backdrop-blur-md transition-all duration-300"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  Consulting OS
                </button>
              </div>
            </div>

            {/* RIGHT HERO NON-OVERLAPPING STAGGERED COLUMN LAYOUT */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-center items-center h-full py-4 relative hidden md:flex">
              {/* Card 1 - Align Self Left */}
              <motion.div
                style={{
                  x: springX,
                  y: springY,
                }}
                className="self-start ml-2 w-full flex justify-start"
                whileHover={{ scale: 1.02 }}
              >
                <EngineACard />
              </motion.div>

              {/* Card 2 - Align Self Center */}
              <motion.div
                style={{
                  x: useTransform(springX, (val) => val * -0.8),
                  y: useTransform(springY, (val) => val * -0.8),
                }}
                className="self-center w-full flex justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <EngineBCard />
              </motion.div>

              {/* Card 3 - Align Self Right */}
              <motion.div
                style={{
                  x: useTransform(springX, (val) => val * 1.2),
                  y: useTransform(springY, (val) => val * 1.2),
                }}
                className="self-end mr-2 w-full flex justify-end"
                whileHover={{ scale: 1.02 }}
              >
                <SoftwareCard />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═════════════════════════════════════════════
          SECTION 2: VISION / MISSION
          ═════════════════════════════════════════════ */}
      <FadeBlurSection
        id="vision-section"
        sideHeadingNum="01 // OVERVIEW"
        sideHeadingText="System Vision"
        className="bg-slate-900/95 backdrop-blur-md border-t border-white/5"
        zIndex={20}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              { num: "1", label: "Unified OS", desc: "AI engines + creative content teams integrated seamlessly" },
              { num: "2", label: "Core Engines", desc: "Software engineering pipelines & high-end cinematography" },
              { num: "∞", label: "Scale Architecture", desc: "Cloud integrations that adapt and automate booking workflows" },
            ].map((stat, i) => (
              <div key={i} className="flex gap-6 items-center border-b border-white/10 pb-4">
                <span className="font-serif font-black text-6xl text-[#2F6BFF]">{stat.num}</span>
                <div>
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-white">{stat.label}</h4>
                  <p className="text-[10px] text-[#BFD4FF]/60 uppercase tracking-widest mt-0.5">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-bold text-[#2F6BFF] bg-[#2F6BFF]/10 px-3 py-1 rounded">
              Visakhapatnam Brand Ecosystem
            </span>
            <h2 className="font-serif font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Redefining growth with{" "}
              <em className="text-[#BFD4FF] italic">coastal-tech caliber</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#BFD4FF]/80 leading-relaxed font-light">
              Grovice 2.0 bridges technical AI systems with cinematic brand photography. We own the software infrastructure that scales your lead conversion, and the creative media assets that command consumer trust.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["AI Integrations", "Software Dev", "Luxury Brand Design", "Automated Booking"].map((pill) => (
                <span key={pill} className="text-[9px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded text-[#BFD4FF]">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeBlurSection>

      {/* ═════════════════════════════════════════════
          SECTION 3: SELECTED PROJECTS
          ═════════════════════════════════════════════ */}
      <FadeBlurSection
        id="projects-section"
        sideHeadingNum="02 // PORTFOLIO"
        sideHeadingText="Architectural Deployments"
        className="bg-slate-950/95 backdrop-blur-md border-t border-white/5"
        zIndex={30}
      >
        <div className="space-y-8">
          <div className="max-w-xl space-y-2">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-white leading-tight">
              Select Case Studies
            </h2>
            <p className="text-xs text-[#BFD4FF]/60 font-light">
              A brief preview of systems deployed for luxury automotive, premium beauty brands, and logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Oceana Perfume Campaign",
                type: "Brand Film / Creative (Engine B)",
                desc: "High-fidelity editorial content and video campaigns filmed on Visakhapatnam beaches, delivering luxury positioning.",
                metric: "5M+ Campaign Views",
                tag: "Creative Calibration",
              },
              {
                title: "Apex Logistics Platform",
                type: "Custom ERP & Automation (Engine A)",
                desc: "Autonomous workflow system syncing customer inquiries, voice dialers, and automated schedules into a single panel.",
                metric: "140% Booking Uplift",
                tag: "AI Architecture",
              },
              {
                title: "V-Motors Launch Shoot",
                type: "Automotive Campaigns (Engine B)",
                desc: "Commercial cinematography sets, color-graded reels, and professional brand portraits showcasing auto catalogs.",
                metric: "98% Customer Retainment",
                tag: "High Fidelity",
              },
              {
                title: "Vizag Homes Portal",
                type: "SaaS Portal / n8n System (Engine A)",
                desc: "An intelligent database routing WhatsApp, Instagram, and web leads straight into CRM modules without human latency.",
                metric: "0% Lead Loss",
                tag: "Automation System",
              },
            ].map((proj, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-white/5 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between hover:border-[#2F6BFF]/40 transition duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest text-[#2F6BFF] font-bold">
                      {proj.type}
                    </span>
                    <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#BFD4FF] transition">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                    {proj.metric}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">
                    {proj.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeBlurSection>

      {/* ═════════════════════════════════════════════
          SECTION 4: ENGINE A
          ═════════════════════════════════════════════ */}
      <FadeBlurSection
        id="engine-a-section"
        sideHeadingNum="03 // ENGINE A"
        sideHeadingText="Software & Automations"
        className="bg-slate-900/95 backdrop-blur-md border-t border-white/5"
        zIndex={40}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-bold text-[#2F6BFF] bg-[#2F6BFF]/10 px-3 py-1 rounded">
              Engine A · Software & AI
            </span>
            <h2 className="font-serif font-black text-3xl md:text-5xl text-white tracking-tight leading-none">
              Your Infrastructure<br />
              <em className="text-[#BFD4FF] italic">Always Active</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#BFD4FF]/70 leading-relaxed font-light">
              Custom AI voice agents, n8n databases, and smart lead routers. Instantly scale customer communication and book meetings automatically.
            </p>
            <Link
              href="/engine-a"
              className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-white bg-[#2F6BFF] hover:bg-blue-600 px-4 py-2.5 rounded transition"
            >
              Configure Engine A <ArrowRight size={12} />
            </Link>
          </div>

          <div className="lg:col-span-7 bg-[#071C3D]/50 border border-white/5 p-6 rounded-xl relative overflow-hidden space-y-6">
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#BFD4FF]/50 block">Live Pipeline Blueprint</span>
            
            <div className="space-y-4">
              {[
                { icon: Sparkles, color: "#2F6BFF", step: "01", title: "Omnichannel Lead Ingestion", desc: "Websites, social networks, calls captured automatically" },
                { icon: Workflow, color: "#BFD4FF", step: "02", title: "n8n Qualification Router", desc: "Automated verification and smart routing pipelines" },
                { icon: LineChart, color: "#34d399", step: "03", title: "CRM Logging & Automated Booking", desc: "Syncs directly with your team calendar" },
              ].map((flow, i) => (
                <div key={i} className="flex gap-4 p-3 rounded bg-white/5 border border-white/5 items-start">
                  <div className="p-2 rounded" style={{ background: `${flow.color}15`, border: `1px solid ${flow.color}30` }}>
                    <flow.icon size={16} style={{ color: flow.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-[#BFD4FF]/40">{flow.step}</span>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{flow.title}</h4>
                    </div>
                    <p className="text-[10px] text-[#BFD4FF]/60 mt-0.5">{flow.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeBlurSection>

      {/* ═════════════════════════════════════════════
          SECTION 5: ENGINE B
          ═════════════════════════════════════════════ */}
      <FadeBlurSection
        id="engine-b-section"
        sideHeadingNum="04 // ENGINE B"
        sideHeadingText="Creative Calibration"
        className="bg-slate-950/95 backdrop-blur-md border-t border-white/5"
        zIndex={50}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-bold text-red-400 bg-red-950/40 border border-red-500/25 px-3 py-1 rounded">
              Engine B · Creative Muscle
            </span>
            <h2 className="font-serif font-black text-3xl md:text-5xl text-white tracking-tight leading-none">
              High-Fidelity<br />
              <em className="text-red-400 italic">Brand Production</em>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Premium brand photography, cinematic video campaigns, and complete visual guidelines designed to command luxury-tier trust.
            </p>
            <Link
              href="/engine-b"
              className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-white bg-red-500 hover:bg-red-600 px-4 py-2.5 rounded transition"
            >
              Configure Engine B <ArrowRight size={12} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {[
              { label: "Commercial Films", bg: "from-red-950/40", client: "Luxury Auto", icon: Tv },
              { label: "Coastal Editorials", bg: "from-amber-950/30", client: "Oceana Parfum", icon: Camera },
              { label: "Corporate Guidelines", bg: "from-violet-950/30", client: "Grovice Labs", icon: Layers },
              { label: "Social Campaign Reels", bg: "from-pink-950/30", client: "Coastal Resorts", icon: Sparkles },
            ].map((p, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-lg border border-white/5 bg-gradient-to-br ${p.bg} to-[#020914] flex flex-col justify-between aspect-[16/10]`}
              >
                <p.icon size={16} className="text-slate-400" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{p.label}</h4>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Client: {p.client}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeBlurSection>

      {/* ═════════════════════════════════════════════
          SECTION 6: CLIENT REVIEWS & VERDICT
          ═════════════════════════════════════════════ */}
      <FadeBlurSection
        id="reviews-section"
        sideHeadingNum="05 // TRUST OS"
        sideHeadingText="Client Testimonials"
        className="bg-slate-900/95 backdrop-blur-md border-t border-white/5"
        zIndex={60}
      >
        <div className="space-y-8">
          <div className="max-w-xl space-y-2">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-white leading-tight">
              Ecosystem Feedback
            </h2>
            <p className="text-xs text-[#BFD4FF]/60 font-light">
              Honest validation from founders who integrated our Software and Creative Engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Grovice completely integrated our client acquisition setup. We automated booking workflows via WhatsApp, resulting in an 80% decrease in manual call answering time.",
                author: "Siripuram Properties",
                role: "Director of Operations",
                rating: 5,
              },
              {
                quote: "The visual photography and cinematic automobile set production delivered for our auto launch captured the premium feel we wanted. They are the best creative agency in Vizag.",
                author: "V-Motors Auto Group",
                role: "Marketing lead",
                rating: 5,
              },
              {
                quote: "Our backend API and custom databases developed by Grovice have run with zero latency for six months. Outstanding software engineering support.",
                author: "Vizag Maritime Logistics",
                role: "Systems Specialist",
                rating: 5,
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md flex flex-col justify-between space-y-6 relative"
              >
                <div className="absolute top-4 right-4 text-[#2F6BFF]/10">
                  <Quote size={48} />
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F6BFF] to-[#BFD4FF] flex items-center justify-center font-bold text-xs text-slate-950">
                    {rev.author[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{rev.author}</h4>
                    <span className="text-[9px] text-[#BFD4FF]/60 uppercase tracking-widest font-mono">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeBlurSection>

      {/* ═════════════════════════════════════════════
          SECTION 7: DEPLOY & ONBOARD
          ═════════════════════════════════════════════ */}
      <FadeBlurSection
        id="cta-section"
        sideHeadingNum="06 // ONBOARDING"
        sideHeadingText="Deploy Ecosystem"
        className="bg-slate-950/95 backdrop-blur-md border-t border-white/5 pb-32"
        zIndex={70}
      >
        <div className="max-w-xl space-y-6">
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#2F6BFF] block">
            Configure Your Ecosystem
          </span>
          <h2 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-tight leading-none">
            Scale Your<br />
            <em className="text-[#BFD4FF] italic">Business OS Today</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#BFD4FF]/60 max-w-md leading-relaxed font-light">
            One partner. One operating system. We coordinate your technical automation layers and your entire creative content output.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="tel:+917396621004"
              className="px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-slate-950 bg-white transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#DCEBFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "white";
              }}
            >
              Book Scoping Call
            </a>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
              className="px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider border border-white/20 bg-white/5 text-white transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
            >
              Chat With OS
            </button>
          </div>
        </div>
      </FadeBlurSection>

      {/* ── FLOATING BOTTOM START PROJECT PILL ── */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: 0,
          right: 0,
          zIndex: 100,
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
            background: "rgba(7, 28, 61, 0.85)",
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
            (e.currentTarget as HTMLElement).style.background = "rgba(47, 107, 255, 0.85)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(7, 28, 61, 0.85)";
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
    </motion.div>
  );
}
