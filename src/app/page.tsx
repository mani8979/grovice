"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

/* ── Dynamic 3D imports (no SSR — WebGL needs browser) ── */
const DNABackground = dynamic(() => import("@/components/DNABackground"), {
  ssr: false,
});

/* ═════════════════════════════════════════════
    SPOTLIGHT CARD COMPONENT
   ═════════════════════════════════════════════ */
function SpotlightCard({
  children,
  className = "",
  hoverBorder = true,
  onClick,
  style
}: {
  children: React.ReactNode;
  className?: string;
  hoverBorder?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`spotlight-card ${hoverBorder ? "spotlight-border" : ""} ${className}`}
      style={{ cursor: onClick ? "pointer" : "default", ...style }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out scroll progress using spring dynamics for cinematic deceleration
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 18,
    mass: 0.8,
    restDelta: 0.001
  });

  /* ── Scroll-driven DNA rotation ── */
  const dnaRotation = useTransform(smoothScroll, [0, 1], [0, 360]);

  /* ── Scene 1: Arrival (0–25%) ── */
  const bgY = useTransform(smoothScroll, [0, 0.25], ["0px", "-20px"]);
  const logoOpacity = useTransform(smoothScroll, [0, 0.20, 0.25], [1, 1, 0]);
  // Start fully visible (opacity 1, no offset) — fade + rise out as user scrolls past 18%
  const welcomeOpacity = useTransform(smoothScroll, [0, 0.18, 0.24], [1, 1, 0]);
  const welcomeY = useTransform(smoothScroll, [0, 0.18, 0.24], ["0px", "0px", "-20px"]);

  /* ── Scene 2: Identity Lock (25–50%) ── */
  const s2Opacity = useTransform(smoothScroll, [0.24, 0.29, 0.44, 0.49], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothScroll, [0.24, 0.29, 0.44, 0.49], ["24px", "0px", "0px", "-24px"]);
  const s2Blur = useTransform(smoothScroll, [0.24, 0.30, 0.42, 0.49], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  /* ── Scene 3: Engine Gateway (50–80%) ── */
  const s3Opacity = useTransform(smoothScroll, [0.49, 0.55, 0.76, 0.81], [0, 1, 1, 0]);
  const s3Y = useTransform(smoothScroll, [0.49, 0.55, 0.76, 0.81], ["24px", "0px", "0px", "-24px"]);
  const s3Blur = useTransform(smoothScroll, [0.49, 0.56, 0.74, 0.81], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  const s3PointerEvents = useTransform(smoothScroll, (v) => (v >= 0.49 && v <= 0.80) ? "auto" : "none");

  /* ── Scene 4: Conversion (80–100%) ── */
  const s4Opacity = useTransform(smoothScroll, [0.80, 0.86], [0, 1]);
  const s4Y = useTransform(smoothScroll, [0.80, 0.86], ["24px", "0px"]);
  const s4GlowSize = useTransform(smoothScroll, [0.80, 0.98], ["300px", "120px"]);
  const s4PointerEvents = useTransform(smoothScroll, (v) => (v >= 0.80) ? "auto" : "none");

  /* ── Engine B cycling preview frames ── */
  const [activeFrame, setActiveFrame] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveFrame(p => (p + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#05060A] text-[#F6F7FB]"
      style={{ height: "400vh" }}
    >
      {/* ╔══════════════════════════════════════════════╗
          ║  STICKY VIEWPORT — everything lives inside  ║
          ╚══════════════════════════════════════════════╝ */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* ── LAYER 0: DNA Background (full screen, z-0) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DNABackground rotation={dnaRotation} />
          {/* Dark vignette over the DNA so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060A]/70 via-[#05060A]/40 to-[#05060A]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060A]/60 via-transparent to-[#05060A]/60" />
        </div>

        {/* ── LAYER 1: Ambient fog particles (z-1) ── */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ y: bgY }}
        >
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-[110px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-[130px]" />
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00D2FF]/15 to-transparent" />
        </motion.div>

        {/* ══════════════════════════════════════════════
            SCENE 01 — ARRIVAL  (opacity fades 0→25%)
            ══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: logoOpacity, pointerEvents: "none" }}
        >
          {/* Brand label centered */}
          <motion.div
            style={{ opacity: welcomeOpacity, y: welcomeY }}
            className="flex flex-col items-center gap-3"
          >
            <h1 className="text-6xl md:text-8xl tracking-tighter font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F6F7FB] via-[#F6F7FB] to-[#00D2FF] drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] select-none leading-none">
              GROVICE 2.0
            </h1>
            <p className="text-[12px] md:text-sm uppercase tracking-[0.3em] text-[#00D2FF] font-mono font-bold mt-2">
              Visakhapatnam&apos;s First Business Operating System
            </p>
            <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse mt-2" />
          </motion.div>

          {/* Looping premium scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] text-[#00D2FF] tracking-[0.25em] opacity-80 select-none">
            <span>SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]"
            />
          </div>
        </motion.div>


        {/* ══════════════════════════════════════════════
            SCENE 02 — IDENTITY LOCK  (25–50%)
            ══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: s2Opacity, y: s2Y, filter: s2Blur, pointerEvents: "none" }}
        >
          <div className="max-w-3xl space-y-6 pointer-events-none">
            <span className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-[#7A5CFF] border border-[#7A5CFF]/30 bg-[#7A5CFF]/10 px-3 py-1">
              INTEGRATED CORE
            </span>
            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-[#F6F7FB]">
              One Stop Business Solution
            </h2>
            <p className="text-sm md:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              Where AI Automation Meets Creative Excellence. Robust code repositories and brand photography timelines under one coordinate grid.
            </p>
          </div>
        </motion.div>


        {/* ══════════════════════════════════════════════
            SCENE 03 — ENGINE GATEWAY  (50–80%)
            ══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center px-6 py-20"
          style={{ opacity: s3Opacity, y: s3Y, filter: s3Blur, pointerEvents: s3PointerEvents }}
        >
          <div className="w-full max-w-5xl flex flex-col items-center gap-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF4FD8]">
                DECISION GATEWAY
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
                Pick your engine.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* ENGINE A */}
              <SpotlightCard
                onClick={() => router.push("/engine-a")}
                className="glass-card p-6 rounded-[20px] border-white/10 flex flex-col justify-between group relative overflow-hidden"
                style={{ minHeight: "260px" } as React.CSSProperties}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#00D2FF]/10 to-transparent blur-[40px] pointer-events-none" />

                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-[#00D2FF] font-bold uppercase tracking-wider">ENGINE A</span>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mt-0.5 group-hover:text-[#00D2FF] transition-colors duration-300">
                        Software & AI Systems
                      </h3>
                    </div>
                    <span className="text-[8px] font-mono border border-cyan-500/30 text-cyan-400 bg-cyan-950/20 px-2 py-0.5 font-bold whitespace-nowrap">AUTOMATION_READY</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                    AI workflows, voice bots, CRMs, dashboards and custom software pipelines—built to scale.
                  </p>
                </div>

                <div className="mt-4 p-3 bg-black/40 border border-white/5 rounded-lg font-mono text-[8px] text-zinc-500 space-y-2">
                  <div className="flex justify-between text-[7px] text-zinc-600 pb-1 border-b border-white/5">
                    <span>LIVE NODE MAP</span>
                    <span className="text-[#00D2FF]">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white font-bold">INBOUND</span>
                    <svg className="flex-1 mx-2 h-3" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                      <path d="M 0 6 L 100 6" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <path d="M 0 6 L 100 6" stroke="#00D2FF" strokeWidth="1.5" className="animate-stroke-flow" />
                    </svg>
                    <span className="px-1.5 py-0.5 bg-[#7A5CFF]/20 border border-[#7A5CFF]/35 text-[#7A5CFF] font-bold">AI_ROUTE</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#00D2FF] font-bold mt-3">
                  Launch Engine A <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </SpotlightCard>

              {/* ENGINE B */}
              <SpotlightCard
                onClick={() => router.push("/engine-b")}
                className="glass-card p-6 rounded-[20px] border-white/10 flex flex-col justify-between group relative overflow-hidden"
                style={{ minHeight: "260px" } as React.CSSProperties}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF4FD8]/10 to-transparent blur-[40px] pointer-events-none" />

                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-[#FF4FD8] font-bold uppercase tracking-wider">ENGINE B</span>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mt-0.5 group-hover:text-[#FF4FD8] transition-colors duration-300">
                        Creative Muscle
                      </h3>
                    </div>
                    <span className="text-[8px] font-mono border border-pink-500/30 text-pink-400 bg-pink-950/20 px-2 py-0.5 font-bold whitespace-nowrap">STUDIO_ACTIVE</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                    Cinematics, photography, branding, and social visuals—built to look premium and convert.
                  </p>
                </div>

                <div className="mt-4 h-12 rounded-lg border border-white/5 overflow-hidden relative bg-black/40 flex gap-1.5 p-1.5">
                  {[
                    { bg: "from-slate-900 to-indigo-900", label: "CAM_01" },
                    { bg: "from-slate-900 to-purple-900", label: "CAM_02" },
                    { bg: "from-slate-900 to-pink-900", label: "CAM_03" },
                  ].map((f, i) => (
                    <div
                      key={i}
                      className={`flex-1 bg-gradient-to-tr ${f.bg} border border-white/10 flex items-center justify-center text-[7px] font-mono text-zinc-400 transition-opacity duration-700 ${activeFrame === i ? "opacity-100" : "opacity-25"}`}
                    >
                      {f.label}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF4FD8] font-bold mt-3">
                  Launch Engine B <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </SpotlightCard>
            </div>
          </div>
        </motion.div>


        {/* ══════════════════════════════════════════════
            SCENE 04 — CONVERSION  (80–100%)
            ══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: s4Opacity, y: s4Y, pointerEvents: s4PointerEvents }}
        >
          <div className="max-w-2xl mx-auto space-y-8 relative flex flex-col items-center">
            {/* Shrinking glow target */}
            <motion.div
              style={{ width: s4GlowSize, height: s4GlowSize }}
              className="absolute rounded-full bg-[#7A5CFF]/15 blur-[60px] pointer-events-none"
            />

            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#00D2FF]">
              ORCHESTRATE YOUR OS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
              Tell us what you&apos;re building. We&apos;ll map the right engine.
            </h2>

            <div className="flex flex-col items-center gap-5 pt-2">
              <Link
                href="/book"
                className="px-10 py-4 text-xs font-mono font-bold uppercase tracking-widest text-black transition-all duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(122,92,255,0.25)]"
                style={{ background: "linear-gradient(135deg, #00D2FF 0%, #7A5CFF 50%, #FF4FD8 100%)" }}
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Book a Call <ArrowRight size={13} />
                </span>
              </Link>

              <div className="flex flex-col sm:flex-row items-center gap-5 font-mono text-[11px] text-zinc-400">
                <a href="tel:+917396621004" className="hover:text-white transition flex items-center gap-2">
                  <Phone size={11} className="text-[#00D2FF]" /> +91-7396621004
                </a>
                <span className="hidden sm:inline text-zinc-700">|</span>
                <a href="mailto:grovicedigital@gmail.com" className="hover:text-white transition flex items-center gap-2">
                  <Mail size={11} className="text-[#FF4FD8]" /> grovicedigital@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Micro footer */}
          <div className="absolute bottom-8 left-0 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[9px] text-zinc-600 font-mono">
            <div className="flex items-center gap-1.5">
              <MapPin size={9} className="text-[#7A5CFF]" />
              <span>Visakhapatnam — Siripuram & Gajuwaka</span>
            </div>
            <p>&copy; {new Date().getFullYear()} GROVICE. ALL SYSTEMS SYNCED.</p>
            <a href="https://www.instagram.com/grovice2.0" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4FD8] transition">
              @grovice2.0
            </a>
          </div>
        </motion.div>

      </div>{/* end sticky */}
    </div>
  );
}
