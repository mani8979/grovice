"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   COMPOSABLE ORBITING CARD 1: ENGINE A
───────────────────────────────────────────── */
function EngineACard() {
  return (
    <div
      className="p-5 rounded-sm border transition-all duration-500 relative overflow-hidden"
      style={{
        background: "rgba(18, 18, 20, 0.9)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(197, 168, 128, 0.2)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        width: "100%",
        maxWidth: 280,
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c5a880]/10 to-transparent blur-md pointer-events-none" />
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
        <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#c5a880] font-bold">NODE 01 // SALES FLOW</span>
        <span className="text-[7px] font-mono text-emerald-400 border border-emerald-400/30 px-1 py-0.5 uppercase bg-emerald-950/20">LIVE</span>
      </div>
      <div className="space-y-2.5 font-mono text-[9px] text-zinc-300">
        <div className="flex justify-between items-center border-b border-white/5 pb-1">
          <span>AI AGENTS</span>
          <span className="text-[#c5a880] font-bold">12 ACTIVE</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-1">
          <span>n8n PIPELINE</span>
          <span className="text-zinc-400">99.8% READY</span>
        </div>
        <div className="flex justify-between items-center">
          <span>LATENCY</span>
          <span className="text-zinc-400">45ms</span>
        </div>
      </div>
      <div className="mt-4 pt-2 border-t border-white/5 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-[#c5a880]" />
        <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-wider">Automating Inbound Pipeline</span>
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
      className="p-5 rounded-sm border transition-all duration-500 relative overflow-hidden"
      style={{
        background: "rgba(18, 18, 20, 0.9)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        width: "100%",
        maxWidth: 280,
      }}
    >
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
        <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#c5a880] font-bold">NODE 02 // CINEMATIC</span>
        <span className="text-[7px] font-mono text-zinc-400">4K DCI</span>
      </div>
      
      {/* Custom Minimalist Camera Frame Blocks */}
      <div className="grid grid-cols-2 gap-2 my-2">
        <div className="border border-white/10 p-2 text-center bg-white/5">
          <p className="text-[8px] font-mono text-[#c5a880] font-bold">2.39 : 1</p>
          <span className="text-[6px] font-mono text-zinc-500 uppercase tracking-widest block mt-0.5">ANAMORPHIC</span>
        </div>
        <div className="border border-white/10 p-2 text-center bg-white/5">
          <p className="text-[8px] font-mono text-zinc-300 font-bold">4 : 5</p>
          <span className="text-[6px] font-mono text-zinc-500 uppercase tracking-widest block mt-0.5">EDITORIAL</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-[8px] text-zinc-500 font-mono uppercase border-t border-white/5 pt-2">
        <span>Production Set</span>
        <span className="text-zinc-300">Vizag Coastal</span>
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
      className="p-5 rounded-sm border transition-all duration-500 relative overflow-hidden"
      style={{
        background: "rgba(18, 18, 20, 0.9)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        width: "100%",
        maxWidth: 280,
      }}
    >
      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#c5a880] font-bold">NODE 03 // DB SYNC</span>
        </div>
        <span className="text-[7px] font-mono text-zinc-500">v2.1.0</span>
      </div>
      
      {/* Code mockup */}
      <div className="p-3 rounded-none bg-[#09090b] border border-white/5 font-mono text-[7px] text-zinc-400 space-y-1">
        <div><span className="text-[#c5a880] font-bold">init</span> system.os() {"{"}</div>
        <div className="pl-3">{'modules: ["A", "B"],'}</div>
        <div className="pl-3">{'ping: "8ms_resolved"'}</div>
        <div>{"}"}</div>
      </div>

      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[8px] text-zinc-500 font-mono uppercase">
        <span>DATABASE GATE</span>
        <span className="text-emerald-400">SECURE ✓</span>
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
            <div className="lg:col-span-7 space-y-8 text-left relative z-10">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#c5a880] block" />
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
                  Visakhapatnam’s First Business Operating System
                </span>
              </div>

              <motion.h1
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 900,
                  fontSize: "clamp(54px, 7vw, 105px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  rotateX: springY,
                  rotateY: springX,
                  transformStyle: "preserve-3d",
                }}
                className="text-white"
              >
                GROVICE 2.0
              </motion.h1>

              <div className="space-y-4 max-w-xl">
                <h2 className="font-sans font-light text-lg md:text-xl text-zinc-300 tracking-wider uppercase">
                  UNIFIED BUSINESS PLATFORM
                </h2>
                <p className="font-cormorant font-normal text-2xl md:text-4xl text-[#c5a880] italic leading-tight">
                  “Where automated AI workflows meet luxury-tier art direction.”
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6">
                <button
                  onClick={() => {
                    const targetEl = document.getElementById("vision-section");
                    targetEl?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-4 rounded-none text-[10px] font-mono uppercase tracking-widest text-black font-bold transition-all duration-300"
                  style={{
                    background: "#c5a880",
                    border: "1px solid #c5a880",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#b5976f";
                    (e.currentTarget as HTMLElement).style.borderColor = "#b5976f";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#c5a880";
                    (e.currentTarget as HTMLElement).style.borderColor = "#c5a880";
                  }}
                >
                  Explore Platform
                </button>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
                  className="px-8 py-4 rounded-none text-[10px] font-mono uppercase tracking-widest border text-white backdrop-blur-md transition-all duration-300"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    background: "rgba(255, 255, 255, 0.02)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.02)";
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
        className="bg-[#0e0e10]/98 backdrop-blur-md border-t border-white/5"
        zIndex={20}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            {[
              { num: "01", label: "Unified OS", desc: "AI automation engines + elite creative cinematography integrated under one unified strategy." },
              { num: "02", label: "Core Engines", desc: "Autonomous software development pipelines combined with high-fidelity camera direction." },
              { num: "03", label: "Scale Architecture", desc: "Secured n8n database integrations that automate customer conversations and workflows." },
            ].map((stat, i) => (
              <div key={i} className="flex gap-6 items-start border-b border-white/5 pb-6">
                <span className="font-cormorant font-light text-5xl text-[#c5a880] italic leading-none">{stat.num}</span>
                <div className="space-y-1">
                  <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white font-bold">{stat.label}</h4>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-8">
            <span className="inline-block text-[8px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
              Visakhapatnam Brand Ecosystem
            </span>
            <h2 className="font-serif font-light text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Redefining growth with{" "}
              <em className="text-[#c5a880] italic font-cormorant font-normal">coastal-tech caliber</em>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Grovice 2.0 bridges technical AI systems with cinematic brand photography. We own the software infrastructure that scales your lead conversion, and the creative media assets that command consumer trust.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["AI Integrations", "Software Dev", "Luxury Brand Design", "Automated Booking"].map((pill) => (
                <span key={pill} className="text-[8px] font-mono uppercase tracking-wider bg-white/2 border border-white/5 px-3 py-1.5 rounded-none text-zinc-400">
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
        className="bg-[#09090b]/98 backdrop-blur-md border-t border-white/5"
        zIndex={30}
      >
        <div className="space-y-12">
          <div className="max-w-xl space-y-4">
            <span className="inline-block text-[8px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
              CASE STUDIES & ARCHIVE
            </span>
            <h2 className="font-serif font-light text-3xl md:text-5xl text-white leading-tight">
              Select Architectural Deployments
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              A brief preview of systems deployed for luxury automotive, premium beauty brands, and logistics pipelines.
            </p>
          </div>

          <div className="border-t border-white/10">
            {[
              {
                num: "01",
                title: "Oceana Perfume Campaign",
                type: "Brand Film / Creative (Engine B)",
                desc: "High-fidelity editorial content and video campaigns filmed on Visakhapatnam beaches, delivering luxury positioning.",
                metric: "5M+ Campaign Views",
                tag: "Creative Calibration",
              },
              {
                num: "02",
                title: "Apex Logistics Platform",
                type: "Custom ERP & Automation (Engine A)",
                desc: "Autonomous workflow system syncing customer inquiries, voice dialers, and automated schedules into a single panel.",
                metric: "140% Booking Uplift",
                tag: "AI Architecture",
              },
              {
                num: "03",
                title: "V-Motors Launch Shoot",
                type: "Automotive Campaigns (Engine B)",
                desc: "Commercial cinematography sets, color-graded reels, and professional brand portraits showcasing auto catalogs.",
                metric: "98% Retainment",
                tag: "High Fidelity",
              },
              {
                num: "04",
                title: "Vizag Homes Portal",
                type: "SaaS Portal / n8n System (Engine A)",
                desc: "An intelligent database routing WhatsApp, Instagram, and web leads straight into CRM modules without human latency.",
                metric: "0% Lead Loss",
                tag: "Automation System",
              },
            ].map((proj, idx) => (
              <div
                key={idx}
                className="border-b border-white/10 py-6 md:py-8 transition-all duration-300 hover:bg-white/[0.02] px-4 group"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Column 1: Num */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-xs text-[#c5a880] tracking-widest">{proj.num}</span>
                  </div>

                  {/* Column 2: Title & Type */}
                  <div className="md:col-span-4 space-y-1">
                    <h3 className="font-serif text-lg text-white group-hover:text-[#c5a880] transition-colors duration-300">
                      {proj.title}
                    </h3>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                      {proj.type}
                    </span>
                  </div>

                  {/* Column 3: Description */}
                  <div className="md:col-span-4">
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Column 4: Metric */}
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase">
                      {proj.metric}
                    </span>
                  </div>

                  {/* Column 5: Arrow */}
                  <div className="md:col-span-1 flex justify-end">
                    <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white transition-colors duration-300" />
                  </div>
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
        className="bg-[#0e0e10]/98 backdrop-blur-md border-t border-white/5"
        zIndex={40}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-[8px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
              ENGINE A · SOFTWARE & AI
            </span>
            <h2 className="font-serif font-light text-3xl md:text-5xl text-white tracking-tight leading-none">
              Your Infrastructure<br />
              <em className="text-[#c5a880] italic font-cormorant font-normal">Always Active</em>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Custom AI voice agents, n8n databases, and smart lead routers. Instantly scale customer communication and book meetings automatically.
            </p>
            <Link
              href="/engine-a"
              className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-[#c5a880] hover:bg-[#b5976f] px-6 py-3.5 transition"
            >
              Configure Engine A <ArrowRight size={12} />
            </Link>
          </div>

          <div className="lg:col-span-7 bg-[#121214]/65 border border-white/5 p-6 md:p-8 rounded-none relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#c5a880] block">Live Pipeline Blueprint</span>
              <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 border border-emerald-400/25">SYS STATUS: OPTIMAL</span>
            </div>
            
            <div className="space-y-4">
              {[
                { step: "NODE 01", title: "Omnichannel Lead Ingestion", desc: "Websites, social networks, calls captured automatically" },
                { step: "NODE 02", title: "n8n Qualification Router", desc: "Automated verification and smart routing pipelines" },
                { step: "NODE 03", title: "CRM Logging & Automated Booking", desc: "Syncs directly with your team calendar" },
              ].map((flow, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-none bg-white/[0.01] border border-white/5 items-start transition duration-300 hover:bg-white/2">
                  <span className="text-[8px] font-mono text-[#c5a880] border border-[#c5a880]/30 px-1.5 py-0.5 bg-[#c5a880]/5">{flow.step}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{flow.title}</h4>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{flow.desc}</p>
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
        className="bg-[#09090b]/98 backdrop-blur-md border-t border-white/5"
        zIndex={50}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-[8px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
              Engine B · Creative Muscle
            </span>
            <h2 className="font-serif font-light text-3xl md:text-5xl text-white tracking-tight leading-none">
              High-Fidelity<br />
              <em className="text-[#c5a880] italic font-cormorant font-normal">Brand Production</em>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Premium brand photography, cinematic video campaigns, and complete visual guidelines designed to command luxury-tier trust.
            </p>
            <Link
              href="/engine-b"
              className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-[#c5a880] hover:bg-[#b5976f] px-6 py-3.5 transition"
            >
              Configure Engine B <ArrowRight size={12} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {[
              { label: "Commercial Films", ratio: "2.39 : 1 AR", camera: "Arri Alexa LF", client: "Luxury Auto" },
              { label: "Coastal Editorials", ratio: "4 : 5 Portrait", camera: "Hasselblad H6D", client: "Oceana Parfum" },
              { label: "Brand Identity", ratio: "12-Col System", camera: "Typography Guides", client: "Grovice Labs" },
              { label: "Social Campaign Reels", ratio: "9 : 16 Vertical", camera: "Sony FX3 / 60fps", client: "Coastal Resorts" },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-none border border-white/5 bg-[#121214]/60 flex flex-col justify-between aspect-[16/10] hover:border-[#c5a880]/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">{p.ratio}</span>
                  <span className="text-[7px] font-mono text-[#c5a880] uppercase tracking-wider">{p.camera}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#c5a880] transition-colors duration-300">{p.label}</h4>
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-mono mt-1 block">Client: {p.client}</span>
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
        className="bg-[#0e0e10]/98 backdrop-blur-md border-t border-white/5"
        zIndex={60}
      >
        <div className="space-y-12">
          <div className="max-w-xl space-y-4">
            <span className="inline-block text-[8px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
              Ecosystem Feedback
            </span>
            <h2 className="font-serif font-light text-3xl md:text-5xl text-white leading-tight">
              Ecosystem Feedback
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Honest validation from founders who integrated our Software and Creative Engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Grovice completely integrated our client acquisition setup. We automated booking workflows via WhatsApp, resulting in an 80% decrease in manual call answering time.",
                author: "Siripuram Properties",
                role: "Director of Operations",
              },
              {
                quote: "The visual photography and cinematic automobile set production delivered for our auto launch captured the premium feel we wanted. They are the best creative agency in Vizag.",
                author: "V-Motors Auto Group",
                role: "Marketing Lead",
              },
              {
                quote: "Our backend API and custom databases developed by Grovice have run with zero latency for six months. Outstanding software engineering support.",
                author: "Vizag Maritime Logistics",
                role: "Systems Specialist",
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-none border border-white/5 bg-[#121214]/40 flex flex-col justify-between space-y-6 relative"
              >
                <div className="space-y-4 relative z-10">
                  <div className="text-[7px] font-mono text-[#c5a880] tracking-widest uppercase">
                    [ SYSTEM VERIFIED // 5/5 ]
                  </div>
                  <p className="font-cormorant text-base md:text-lg text-zinc-300 leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-[9px] font-mono font-bold text-white uppercase tracking-widest">{rev.author}</h4>
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-mono block mt-0.5">{rev.role}</span>
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
        className="bg-[#09090b]/98 backdrop-blur-md border-t border-white/5 pb-32"
        zIndex={70}
      >
        <div className="max-w-xl space-y-6">
          <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c5a880] block">
            Configure Your Ecosystem
          </span>
          <h2 className="font-serif font-light text-4xl sm:text-6xl text-white tracking-tight leading-none">
            Scale Your<br />
            <em className="text-[#c5a880] italic font-cormorant font-normal">Business OS Today</em>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed font-light">
            One partner. One operating system. We coordinate your technical automation layers and your entire creative content output.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="tel:+917396621004"
              className="px-8 py-4 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-[#c5a880] transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#b5976f";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#c5a880";
              }}
            >
              Book Scoping Call
            </a>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
              className="px-8 py-4 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest border border-white/10 bg-white/2 text-white transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
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
            background: "rgba(18, 18, 20, 0.9)",
            color: "var(--white)",
            border: "1px solid rgba(197, 168, 128, 0.3)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: 0,
            padding: "0.75rem 1.75rem",
            fontSize: "0.7rem",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#c5a880";
            (e.currentTarget as HTMLElement).style.color = "#000000";
            (e.currentTarget as HTMLElement).style.borderColor = "#c5a880";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            const dot = (e.currentTarget as HTMLElement).querySelector("span");
            if (dot) dot.style.background = "#000000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(18, 18, 20, 0.9)";
            (e.currentTarget as HTMLElement).style.color = "var(--white)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(197, 168, 128, 0.3)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            const dot = (e.currentTarget as HTMLElement).querySelector("span");
            if (dot) dot.style.background = "#c5a880";
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#c5a880",
              animation: "pulse-dot 2.5s ease-in-out infinite",
              display: "inline-block",
              transition: "background 0.3s",
            }}
          />
          Start a Project
        </button>
      </div>
    </motion.div>
  );
}
