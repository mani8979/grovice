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
} from "lucide-react";

/* ─────────────────────────────────────────────
   COMPOSABLE ORBITING CARD 1: ENGINE A
───────────────────────────────────────────── */
function EngineACard() {
  return (
    <div
      className="p-5 rounded-xl border transition-all duration-500 shadow-lg relative overflow-hidden"
      style={{
        background: "rgba(7, 28, 61, 0.75)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(47, 107, 255, 0.25)",
        boxShadow: "0 10px 30px rgba(47, 107, 255, 0.15)",
        minWidth: 260,
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
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        minWidth: 260,
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
        background: "rgba(7, 28, 61, 0.75)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        minWidth: 260,
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

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background values
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.8, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(220, 235, 255, 0.95) 0%, rgba(249, 251, 255, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(220, 235, 255, 0.6) 0%, rgba(7, 28, 61, 0.9) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(7, 28, 61, 1) 0%, rgba(2, 9, 20, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(7, 28, 61, 1) 0%, rgba(2, 9, 20, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(8, 12, 18, 1) 0%, rgba(2, 9, 20, 1) 100%)",
    ]
  );

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroPointerEvents = useTransform(scrollYProgress, [0, 0.2], ["auto", "none"]);

  // Section visibility controls
  const visionOpacity = useTransform(scrollYProgress, [0.15, 0.28, 0.42], [0, 1, 0]);
  const visionScale = useTransform(scrollYProgress, [0.15, 0.28], [0.95, 1]);
  const visionPointerEvents = useTransform(scrollYProgress, [0.15, 0.28, 0.42], ["none", "auto", "none"]);

  const engineAOpacity = useTransform(scrollYProgress, [0.38, 0.52, 0.72], [0, 1, 0]);
  const engineAScale = useTransform(scrollYProgress, [0.38, 0.52], [0.95, 1]);
  const engineAPointerEvents = useTransform(scrollYProgress, [0.38, 0.52, 0.72], ["none", "auto", "none"]);

  const engineBOpacity = useTransform(scrollYProgress, [0.68, 0.82, 0.96], [0, 1, 0]);
  const engineBScale = useTransform(scrollYProgress, [0.68, 0.82], [0.95, 1]);
  const engineBPointerEvents = useTransform(scrollYProgress, [0.68, 0.82, 0.96], ["none", "auto", "none"]);

  const ctaOpacity = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);
  const ctaPointerEvents = useTransform(scrollYProgress, [0.88, 0.96], ["none", "auto"]);

  // Mouse tilt logic for 3D title & floating UI cards
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30; // degrees max tilt
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
        minHeight: "450vh",
        position: "relative",
      }}
      className="relative text-slate-900"
    >
      {/* ── NOISE & MIST TEXTURE LAYER ── */}
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

      {/* ── GIANT BACKGROUND WATERMARK "GROVICE" ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          fontFamily: "var(--font-archivo), system-ui, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(120px, 20vw, 320px)",
          color: "var(--ocean)",
          opacity: 0.02,
          left: "-5%",
          top: "40%",
          transform: "translateY(-50%)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
        className="animate-float-slow"
      >
        GROVICE
      </div>

      {/* ═════════════════════════════════════════════
          SECTION 1: IMMERSIVE HERO VIEWPORT (STICKY)
          ═════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          opacity: heroOpacity,
          scale: heroScale,
          pointerEvents: heroPointerEvents,
          zIndex: 2,
        }}
        className="px-6 sm:px-12 md:px-20"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-auto">
          {/* LEFT COLUMN: HERO ESSENTIALS */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            {/* Tiny Label */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#2F6BFF] block" />
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#2F6BFF]">
                Visakhapatnam’s First Business Operating System
              </span>
            </div>

            {/* Title / Main Headline */}
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
              className="text-[#071C3D]"
            >
              GROVICE 2.0
            </motion.h1>

            {/* Subline & Editorial tag */}
            <div className="space-y-2">
              <h2 className="font-display font-black text-xl md:text-2xl text-[#071C3D] tracking-tight">
                One Stop Business Solution
              </h2>
              <p className="font-cormorant font-normal text-lg md:text-xl text-[#2F6BFF] italic">
                “Where AI Infrastructure Meets Creative Power.”
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#engine-a-section"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: window.innerHeight * 2.2, behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300"
                style={{
                  background: "#071C3D",
                  border: "1px solid rgba(47, 107, 255, 0.15)",
                  boxShadow: "0 8px 30px rgba(7, 28, 61, 0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#2F6BFF";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 35px rgba(47, 107, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#071C3D";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(7, 28, 61, 0.2)";
                }}
              >
                Explore Engine A
              </a>

              <a
                href="#engine-b-section"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: window.innerHeight * 3.4, behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider border text-[#071C3D] bg-white/20 backdrop-blur-md transition-all duration-300"
                style={{
                  borderColor: "rgba(7, 28, 61, 0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(7, 28, 61, 0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "white/20";
                }}
              >
                Explore Engine B
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: FLOATING SYSTEM UI CARDS */}
          <div className="lg:col-span-5 relative h-[360px] md:h-[420px] hidden md:block">
            {/* Card 1: Engine A */}
            <motion.div
              style={{
                position: "absolute",
                top: "5%",
                left: "10%",
                x: springX,
                y: springY,
                zIndex: 10,
              }}
              whileHover={{ scale: 1.03, rotate: 1 }}
            >
              <EngineACard />
            </motion.div>

            {/* Card 2: Engine B */}
            <motion.div
              style={{
                position: "absolute",
                bottom: "5%",
                right: "5%",
                x: useTransform(springX, (val) => val * -0.8),
                y: useTransform(springY, (val) => val * -0.8),
                zIndex: 8,
              }}
              whileHover={{ scale: 1.03, rotate: -1 }}
            >
              <EngineBCard />
            </motion.div>

            {/* Card 3: Software Projects */}
            <motion.div
              style={{
                position: "absolute",
                top: "45%",
                right: "12%",
                x: useTransform(springX, (val) => val * 1.2),
                y: useTransform(springY, (val) => val * 1.2),
                zIndex: 9,
              }}
              whileHover={{ scale: 1.03, rotate: 0.5 }}
            >
              <SoftwareCard />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ═════════════════════════════════════════════
          SECTION 2: VISION / MISSION (SCROLL TRIGGERED)
          ═════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          opacity: visionOpacity,
          scale: visionScale,
          zIndex: 3,
          pointerEvents: visionPointerEvents,
        }}
        className="px-6 sm:px-12 md:px-20 text-slate-100"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-auto">
          {/* Counters */}
          <div className="space-y-6">
            {[
              { num: "1", label: "Unified OS", desc: "AI engine + creative powerhouse integrated" },
              { num: "2", label: "Core Engines", desc: "Engine A (Software) & Engine B (Content)" },
              { num: "∞", label: "Brand Scale", desc: "Unlimited automated infrastructure growth" },
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

          {/* Details */}
          <div className="space-y-4">
            <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-bold text-[#2F6BFF] bg-[#2F6BFF]/10 px-3 py-1 rounded">
              Visakhapatnam Brand Ecosystem
            </span>
            <h2 className="font-serif font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Redefining local scale with{" "}
              <em className="text-[#BFD4FF] italic">global caliber</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#BFD4FF]/80 leading-relaxed font-light">
              Grovice 2.0 bridges technical AI integrations with custom videography campaigns. We own the software infrastructure that collects and qualifies your leads, and the creative engine that converts them.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["AI Automation", "Software Development", "Cinematic Films", "Corporate Branding"].map((pill) => (
                <span key={pill} className="text-[9px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded text-[#BFD4FF]">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═════════════════════════════════════════════
          SECTION 3: ENGINE A (SCROLL TRIGGERED)
          ═════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          opacity: engineAOpacity,
          scale: engineAScale,
          zIndex: 4,
          pointerEvents: engineAPointerEvents,
        }}
        className="px-6 sm:px-12 md:px-20 text-slate-100"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
          {/* Left Column info */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-bold text-[#2F6BFF] bg-[#2F6BFF]/10 px-3 py-1 rounded">
              Engine A · Software & AI
            </span>
            <h2 className="font-serif font-black text-3xl md:text-5xl text-white tracking-tight leading-none">
              Your Systems<br />
              <em className="text-[#BFD4FF] italic">Always Active</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#BFD4FF]/70 leading-relaxed font-light">
              Autonomous AI voice agents, smart booking workflows, and database integrations. Capture leads instantly and schedule conversions 24/7.
            </p>
            <Link
              href="/engine-a"
              className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-white bg-[#2F6BFF] hover:bg-blue-600 px-4 py-2.5 rounded transition"
            >
              Configure Engine A <ArrowRight size={12} />
            </Link>
          </div>

          {/* Right Column Diagram */}
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
      </motion.div>

      {/* ═════════════════════════════════════════════
          SECTION 4: ENGINE B (SCROLL TRIGGERED)
          ═════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          opacity: engineBOpacity,
          scale: engineBScale,
          zIndex: 5,
          pointerEvents: engineBPointerEvents,
        }}
        className="px-6 sm:px-12 md:px-20 text-slate-100"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
          {/* Left info */}
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

          {/* Right portfolio showcase preview */}
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
      </motion.div>

      {/* ═════════════════════════════════════════════
          SECTION 5: FINAL CALL TO ACTION (SCROLL TRIGGERED)
          ═════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: ctaOpacity,
          zIndex: 6,
          pointerEvents: ctaPointerEvents,
        }}
        className="px-6 text-slate-100"
      >
        <div className="max-w-xl text-center space-y-6 pointer-events-auto">
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#2F6BFF] block">
            Configure Your Ecosystem
          </span>
          <h2 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-tight leading-none">
            Scale Your<br />
            <em className="text-[#BFD4FF] italic">Business OS Today</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#BFD4FF]/60 max-w-md mx-auto leading-relaxed font-light">
            One partner. One operating system. We coordinate your technical automation layers and your entire creative content output.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a
              href="tel:+917396621004"
              className="px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-slate-950 bg-white transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#DCEBFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#white";
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
      </motion.div>
    </motion.div>
  );
}
