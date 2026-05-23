"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Sparkles, Cpu, Camera, Compass } from "lucide-react";

/* ── SPOTLIGHT CARD COMPONENT ── */
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
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Responsive device width listener (runs only on client mount)
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fade out loading screen overlay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();

  // Snappy spring dynamics for ultra-fast responsive storytelling transitions
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001
  });

  // Track active section index (Desktop only)
  useEffect(() => {
    if (isMobile) return;
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.22) {
        setActiveSection(0);
      } else if (latest >= 0.22 && latest < 0.48) {
        setActiveSection(1);
      } else if (latest >= 0.48 && latest < 0.78) {
        setActiveSection(2);
      } else {
        setActiveSection(3);
      }
    });
  }, [scrollYProgress, isMobile]);

  /* ── Scroll transforms (Calculated for Desktop storytelling) ── */
  const bgY = useTransform(smoothScroll, [0, 0.25], ["0px", "-30px"]);
  const logoOpacity = useTransform(smoothScroll, [0, 0.20, 0.25], [1, 1, 0]);
  const welcomeOpacity = useTransform(smoothScroll, [0, 0.18, 0.24], [1, 1, 0]);
  const welcomeY = useTransform(smoothScroll, [0, 0.18, 0.24], ["0px", "-20px"]);

  const s2Opacity = useTransform(smoothScroll, [0.24, 0.29, 0.44, 0.49], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothScroll, [0.24, 0.29, 0.44, 0.49], ["30px", "0px", "0px", "-30px"]);
  const s2Blur = useTransform(smoothScroll, [0.24, 0.30, 0.42, 0.49], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  const s3Opacity = useTransform(smoothScroll, [0.49, 0.55, 0.76, 0.81], [0, 1, 1, 0]);
  const s3Y = useTransform(smoothScroll, [0.49, 0.55, 0.76, 0.81], ["30px", "0px", "0px", "-30px"]);
  const s3Blur = useTransform(smoothScroll, [0.49, 0.56, 0.74, 0.81], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  const s3PointerEvents = useTransform(smoothScroll, (v) => (v >= 0.49 && v <= 0.80) ? "auto" : "none");

  const s4Opacity = useTransform(smoothScroll, [0.80, 0.86], [0, 1]);
  const s4Y = useTransform(smoothScroll, [0.80, 0.86], ["30px", "0px"]);
  const s4GlowSize = useTransform(smoothScroll, [0.80, 0.98], ["350px", "150px"]);
  const s4PointerEvents = useTransform(smoothScroll, (v) => (v >= 0.80) ? "auto" : "none");

  const [activeFrame, setActiveFrame] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveFrame(p => (p + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  const sections = [
    { label: "Origin", desc: "Starting coordinate: Convergence of form & automation.", href: 0 },
    { label: "Identity", desc: "Integrated Core: Where software engineering meets luxury visual assets.", href: 0.3 },
    { label: "Engines", desc: "Decision Gateway: Activate custom backend code or production visuals.", href: 0.6 },
    { label: "Systems", desc: "Operating System sync: Book strategy consultations & roadmap scoping.", href: 0.9 }
  ];

  const handleScrollTo = (progress: number) => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: scrollHeight * progress,
        behavior: "smooth"
      });
    }
  };

  // SSR loading placeholder (avoids page flashes before mount)
  if (!mounted) {
    return (
      <div className="relative w-full min-h-screen bg-[#040308] text-[#F6F7FB]" />
    );
  }

  /* ══════════════════════════════════════════════╗
     ║  BRANCH 1: MOBILE LANDING PAGE VIEW         ║
     ╚══════════════════════════════════════════════╝ */
  if (isMobile) {
    return (
      <div className="relative w-full min-h-screen bg-[#040308] text-[#F6F7FB] overflow-x-hidden">
        {/* ── LOADING SCREEN OVERLAY ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loop-loader-overlay"
            >
              <div className="loader-spinner mb-5" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#FF9E00] uppercase font-bold">
                INITIALIZING GROVICE OS...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── LAYER 0: Fixed Sunset Video Background ── */}
        <div className="fixed inset-0 z-0 pointer-events-none h-screen w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.38 }}
          >
            <source src="/sunset-beach.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#040308]/90 via-[#040308]/20 to-[#040308]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040308]/85 via-transparent to-[#040308]/85" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9E00]/12 via-transparent to-[#7000FF]/15 mix-blend-color-dodge" />
        </div>

        {/* ── LAYER 1: Ambient Glowing Sun Glare Orbs (Mobile Optimized) ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[-20%] w-72 h-72 bg-[#FF9E00]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: "8s" }} />
          <div className="absolute top-[35%] right-[-25%] w-80 h-80 bg-[#7000FF]/12 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="absolute top-[60%] left-[-15%] w-72 h-72 bg-[#FF4069]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-80 h-80 bg-[#FF9E00]/8 rounded-full blur-[110px]" />
        </div>

        {/* ── LAYER 2: Content Stack ── */}
        <div className="relative z-10 w-full flex flex-col">
          
          {/* SCENE 01 — HERO / ARRIVAL */}
          <section className="relative min-h-screen flex flex-col items-center justify-center px-5 py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center gap-6 max-w-xl text-center w-full"
            >
              {/* Siripuram Badge */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF9E00]/30 bg-[#FF9E00]/10 text-[#FF9E00] text-[8px] font-mono tracking-[0.25em] font-bold uppercase backdrop-blur-md">
                <Sparkles size={9} className="animate-spin" style={{ animationDuration: "6s" }} /> Siripuram Coastal Node
              </div>

              {/* Glowing Hero Title Container */}
              <div className="relative w-full py-6 px-4 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-[4px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                {/* Tech corner accents */}
                <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t border-l border-[#FF9E00]/60 rounded-tl" />
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t border-r border-[#FF9E00]/60 rounded-tr" />
                <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b border-l border-[#FF4069]/60 rounded-bl" />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b border-r border-[#FF4069]/60 rounded-br" />

                {/* Coordinate text overlays */}
                <span className="absolute top-2 left-3 font-mono text-[7px] text-zinc-600 tracking-wider">17.7226° N</span>
                <span className="absolute top-2 right-3 font-mono text-[7px] text-zinc-600 tracking-wider">83.3152° E</span>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter leading-none select-none text-white font-sans mt-2">
                  GROVICE <span className="font-serif-elegant text-gradient-neon font-light">2.0</span>
                </h1>
                
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#FF4069] font-mono font-bold mt-3 leading-relaxed">
                  Visakhapatnam&apos;s First Business Operating System
                </p>
              </div>

              <p className="text-[11px] text-zinc-400 font-light max-w-sm leading-relaxed mt-1">
                Integrating autonomous software pipelines with elite visual studio production to scale local enterprises globally.
              </p>

              {/* Call to action arrow */}
              <motion.button 
                onClick={() => handleScrollTo(0.26)}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-6 py-2.5 rounded-full border border-white/10 hover:border-[#FF9E00]/50 bg-white/5 hover:bg-[#FF9E00]/10 text-white font-mono text-[9px] tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
              >
                Launch System <ArrowRight size={10} className="text-[#FF9E00]" />
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[8px] text-zinc-500 tracking-[0.3em] opacity-80 select-none">
              <span>EXPLORE</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#FF4069] shadow-[0_0_8px_#FF4069]"
              />
            </div>
          </section>

          {/* SCENE 02 — IDENTITY BENTO PILLARS */}
          <section className="relative min-h-screen flex flex-col justify-center px-5 py-24 bg-black/35 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
              className="max-w-xl mx-auto w-full space-y-8"
            >
              <div className="text-center space-y-2.5">
                <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#FFD700] border border-[#FFD700]/30 bg-[#FFD700]/10 px-3.5 py-1">
                  INTEGRATED CORE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                  The Dual-Engine Blueprint
                </h2>
                <p className="text-[11px] text-zinc-400 max-w-sm mx-auto font-light">
                  Bridging pure software capability and high-aesthetic brand design on one unified grid coordinate.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 gap-4 w-full">
                
                {/* Bento Card 1: AI & Software */}
                <div className="glass-card p-5 rounded-2xl border-white/5 flex gap-4 items-start relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF9E00]/5 blur-[20px] rounded-full" />
                  <div className="p-2.5 rounded-xl bg-[#FF9E00]/10 border border-[#FF9E00]/20 text-[#FF9E00] shrink-0 mt-0.5">
                    <Cpu size={16} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <h4 className="font-mono text-[10px] tracking-wider text-white font-bold uppercase">Software Core</h4>
                      <span className="font-mono text-[7px] text-[#FF9E00] bg-[#FF9E00]/15 px-1.5 py-0.5 font-semibold">99.9% AUTOPILOT</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                      Lead automations, database synchronizers, CRM endpoints, and voice synthesis pipelines. Custom code running on zero-downtime micro-clouds.
                    </p>
                  </div>
                </div>

                {/* Bento Card 2: Visual Production */}
                <div className="glass-card p-5 rounded-2xl border-white/5 flex gap-4 items-start relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4069]/5 blur-[20px] rounded-full" />
                  <div className="p-2.5 rounded-xl bg-[#FF4069]/10 border border-[#FF4069]/20 text-[#FF4069] shrink-0 mt-0.5">
                    <Camera size={16} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <h4 className="font-mono text-[10px] tracking-wider text-white font-bold uppercase">Creative Muscle</h4>
                      <span className="font-mono text-[7px] text-[#FF4069] bg-[#FF4069]/15 px-1.5 py-0.5 font-semibold">RED CINE ENGINE</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                      Cinematic commercials, editorial fashion photography, vector styling, and high-fidelity social assets curated for conversion.
                    </p>
                  </div>
                </div>

                {/* Bento Card 3: Strategic Scoping */}
                <div className="glass-card p-5 rounded-2xl border-white/5 flex gap-4 items-start relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#7000FF]/5 blur-[20px] rounded-full" />
                  <div className="p-2.5 rounded-xl bg-[#7000FF]/10 border border-[#7000FF]/20 text-[#7000FF] shrink-0 mt-0.5">
                    <Compass size={16} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <h4 className="font-mono text-[10px] tracking-wider text-white font-bold uppercase">Siripuram Grid</h4>
                      <span className="font-mono text-[7px] text-[#7000FF] bg-[#7000FF]/15 px-1.5 py-0.5 font-semibold">LOCAL DEPLOYMENT</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                      Synchronized locally out of Visakhapatnam. We build close, direct roadmap audits with immediate engineering support.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </section>

          {/* SCENE 03 — ENGINE GATEWAY */}
          <section className="relative min-h-screen flex flex-col justify-center px-5 py-24 bg-black/10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl flex flex-col items-center gap-8 mx-auto"
            >
              <div className="text-center space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#FF9E00] font-bold">
                  DECISION GATEWAY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                  Choose Your Workspace
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 w-full">
                
                {/* ENGINE A CARD */}
                <SpotlightCard
                  onClick={() => router.push("/engine-a")}
                  className="glass-card p-6 rounded-[24px] border-white/5 flex flex-col justify-between group relative overflow-hidden"
                  style={{ minHeight: "270px" }}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF9E00]/10 to-transparent blur-[40px] pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8px] font-mono text-[#FF9E00] font-bold uppercase tracking-wider">ENGINE A</span>
                        <h3 className="text-lg font-extrabold tracking-tight text-white mt-0.5 group-hover:text-[#FF9E00] transition-colors duration-300">
                          Software & AI Systems
                        </h3>
                      </div>
                      <span className="text-[7px] font-mono border border-[#FF9E00]/30 text-[#FF9E00] bg-[#FF9E00]/10 px-2 py-0.5 font-bold whitespace-nowrap">AUTOMATION_READY</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                      AI workflows, voice bots, CRMs, dashboards and custom software pipelines—built to scale.
                    </p>
                  </div>

                  {/* High Tech simulated node map */}
                  <div className="mt-4 p-3.5 bg-black/50 border border-white/5 rounded-2xl font-mono text-[8px] text-zinc-500 space-y-2.5">
                    <div className="flex justify-between text-[7px] text-zinc-600 pb-1.5 border-b border-white/5 font-bold">
                      <span>LIVE PROCESS STACK</span>
                      <span className="text-[#FF9E00] animate-pulse">● RUNNING</span>
                    </div>
                    
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white font-bold rounded">INBOUND</span>
                      <svg className="flex-1 h-3" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                        <path d="M 0 6 L 100 6" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        <path d="M 0 6 L 100 6" stroke="#FF9E00" strokeWidth="1.5" className="animate-stroke-flow" />
                      </svg>
                      <span className="px-1.5 py-0.5 bg-[#7000FF]/20 border border-[#7000FF]/35 text-[#7000FF] font-bold rounded">AI_AGENT</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#FF9E00] font-bold mt-4">
                    Launch Engine A <ArrowRight size={10} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </SpotlightCard>

                {/* ENGINE B CARD */}
                <SpotlightCard
                  onClick={() => router.push("/engine-b")}
                  className="glass-card p-6 rounded-[24px] border-white/5 flex flex-col justify-between group relative overflow-hidden"
                  style={{ minHeight: "270px" }}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF4069]/10 to-transparent blur-[40px] pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8px] font-mono text-[#FF4069] font-bold uppercase tracking-wider">ENGINE B</span>
                        <h3 className="text-lg font-extrabold tracking-tight text-white mt-0.5 group-hover:text-[#FF4069] transition-colors duration-300">
                          Creative Muscle
                        </h3>
                      </div>
                      <span className="text-[7px] font-mono border border-[#FF4069]/30 text-[#FF4069] bg-[#FF4069]/10 px-2 py-0.5 font-bold whitespace-nowrap">STUDIO_ACTIVE</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                      Cinematics, photography, branding, and social visuals—built to look premium and convert.
                    </p>
                  </div>

                  {/* Interactive Camera feed strip */}
                  <div className="mt-4 h-12 rounded-2xl border border-white/5 overflow-hidden relative bg-black/50 flex gap-2 p-1.5">
                    {[
                      { bg: "from-amber-900/40 to-[#FF4069]/30", label: "CINE_01" },
                      { bg: "from-[#FF4069]/30 to-[#7000FF]/30", label: "CINE_02" },
                      { bg: "from-[#7000FF]/30 to-slate-900", label: "RAW_FEED" },
                    ].map((f, i) => (
                      <div
                        key={i}
                        className={`flex-1 bg-gradient-to-tr ${f.bg} border border-white/10 rounded-lg flex items-center justify-center text-[7px] font-mono text-zinc-400 transition-opacity duration-700 ${activeFrame === i ? "opacity-100 border-[#FF4069]/55" : "opacity-30"}`}
                      >
                        <span className="flex items-center gap-1">
                          {activeFrame === i && <span className="w-1 h-1 rounded-full bg-[#FF4069] animate-ping" />}
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#FF4069] font-bold mt-4">
                    Launch Engine B <ArrowRight size={10} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </SpotlightCard>

              </div>
            </motion.div>
          </section>

          {/* SCENE 04 — CONVERSION */}
          <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-5 py-24 pb-40 bg-black/30">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
              className="max-w-xl mx-auto space-y-8 flex flex-col items-center text-center w-full"
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#FF9E00] font-bold">
                ORCHESTRATE YOUR SYSTEM
              </span>
              
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-white">
                  Tell us what you&apos;re building. We&apos;ll map the right engine.
                </h2>
                <p className="text-[11px] text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">
                  Scoping roadmap calls are scheduled out of our Siripuram hub. Receive an in-depth systems audit.
                </p>
              </div>

              {/* Conversion box panel */}
              <div className="w-full glass-card p-6 rounded-[28px] border-white/5 space-y-6 relative overflow-hidden max-w-sm">
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-tr from-[#7000FF]/15 to-transparent blur-xl rounded-full" />
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-gradient-to-br from-[#FF9E00]/10 to-transparent blur-xl rounded-full" />

                <Link
                  href="/book"
                  className="w-full py-4 text-[10px] font-mono font-bold uppercase tracking-widest text-black transition-all duration-300 relative overflow-hidden group shadow-[0_8px_25px_rgba(255,158,0,0.2)] rounded-xl flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #FF9E00 0%, #FF4069 50%, #7000FF 100%)" }}
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <span className="relative z-10 flex items-center gap-2 font-black">
                    Book Strategic Scoping <ArrowRight size={11} />
                  </span>
                </Link>

                <div className="w-full h-px bg-white/5" />

                <div className="flex flex-col items-center gap-3 font-mono text-[9px] text-zinc-400">
                  <a href="tel:+917396621004" className="hover:text-white transition flex items-center gap-2.5 py-1 px-3 bg-white/[0.03] border border-white/5 rounded-full">
                    <Phone size={10} className="text-[#FF9E00]" /> +91-7396621004
                  </a>
                  <a href="mailto:grovicedigital@gmail.com" className="hover:text-white transition flex items-center gap-2.5 py-1 px-3 bg-white/[0.03] border border-white/5 rounded-full">
                    <Mail size={10} className="text-[#FF4069]" /> grovicedigital@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Micro footer */}
            <div className="absolute bottom-8 left-0 w-full px-5 flex flex-col justify-between items-center gap-3.5 text-[9px] text-zinc-500 font-mono text-center">
              <div className="flex items-center gap-1.5">
                <MapPin size={9} className="text-[#FF4069]" />
                <span>Visakhapatnam — Siripuram & Gajuwaka</span>
              </div>
              <p className="opacity-70">&copy; {new Date().getFullYear()} GROVICE. ALL SYSTEMS SYNCED.</p>
              <a href="https://www.instagram.com/grovice2.0" target="_blank" rel="noopener noreferrer" className="text-[#FF4069]/80 hover:text-[#FF4069] transition uppercase tracking-widest text-[8px] font-bold">
                @grovice2.0
              </a>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════╗
     ║  BRANCH 2: DESKTOP LANDING PAGE VIEW        ║
     ╚══════════════════════════════════════════════╝ */
  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#040308] text-[#F6F7FB]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* ── LOADING SCREEN OVERLAY ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loop-loader-overlay"
            >
              <div className="loader-spinner mb-5" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#FF9E00] uppercase font-bold">
                INITIALIZING GROVICE OS...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── LAYER 0: Sunset Beach Video Background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
            style={{ opacity: 0.35 }}
          >
            <source src="/sunset-beach.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#040308]/90 via-[#040308]/30 to-[#040308]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040308]/85 via-transparent to-[#040308]/85" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9E00]/12 via-transparent to-[#7000FF]/15 mix-blend-color-dodge" />
        </div>

        {/* ── LAYER 1: Ambient warm sun glare particles ── */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ y: bgY }}
        >
          <div className="absolute top-[15%] left-[20%] w-[320px] h-[320px] bg-[#FF9E00]/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-[20%] right-[15%] w-[380px] h-[380px] bg-[#7000FF]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF4069]/15 to-transparent" />
        </motion.div>

        {/* ── SIDEWAVE-STYLE LEFT LATERAL NAVIGATION MENU ── */}
        <div className="lateral-menu">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              onClick={() => handleScrollTo(sec.href)}
              className={`lateral-menu-item ${activeSection === idx ? "active" : ""}`}
            >
              <div className="lateral-menu-line" />
              <div className="flex flex-col gap-0.5">
                <span className="lateral-menu-label">{sec.label}</span>
                {activeSection === idx && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    className="text-[8px] text-zinc-500 font-mono tracking-wider max-w-[200px]"
                  >
                    {sec.desc}
                  </motion.span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── SIDEWAVE-STYLE ROTATING SCROLL DISCOVER TAG ── */}
        <div className="scroll-discover">
          <span>Scroll to Navigate</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9E00] animate-pulse" />
        </div>

        {/* ══════════════════════════════════════════════
            SCENE 01 — ARRIVAL  (Hero / First section)
            ══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: logoOpacity, pointerEvents: "none" }}
        >
          <motion.div
            style={{ opacity: welcomeOpacity, y: welcomeY }}
            className="flex flex-col items-center gap-5 max-w-4xl"
          >
            {/* Small Beach Vibe Tag */}
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#FF9E00]/25 bg-[#FF9E00]/10 text-[#FF9E00] text-[9px] font-mono tracking-[0.25em] font-bold uppercase">
              <Sparkles size={10} /> Siripuram Coastal Hub
            </div>

            <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-none select-none text-white font-sans">
              GROVICE <span className="font-serif-elegant text-[#FF9E00] font-light">2.0</span>
            </h1>

            <p className="text-[11px] md:text-sm uppercase tracking-[0.35em] text-[#FF4069] font-mono font-bold mt-2 leading-relaxed">
              Visakhapatnam&apos;s First Business Operating System
            </p>
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#FF9E00] to-transparent mt-4" />
          </motion.div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] text-[#FF9E00] tracking-[0.3em] opacity-80 select-none">
            <span>SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#FF4069]"
            />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════
            SCENE 02 — IDENTITY LOCK  (Core Info)
            ══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: s2Opacity, y: s2Y, filter: s2Blur, pointerEvents: "none" }}
        >
          <div className="max-w-4xl space-y-6 pointer-events-none">
            <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#FFD700] border border-[#FFD700]/30 bg-[#FFD700]/10 px-4 py-1.5">
              INTEGRATED CORE
            </span>
            <h2 className="text-4xl md:text-8xl font-extrabold tracking-tight leading-[1.02] text-white">
              One Stop Business Solution
            </h2>
            <div className="w-16 h-[2px] bg-[#FF4069] mx-auto my-4" />
            <p className="text-sm md:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed font-sans">
              Where AI Automation Meets Creative Excellence. Robust code repositories and brand photography timelines under one coordinate grid.
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════
            SCENE 03 — ENGINE GATEWAY  (Gateway picker)
            ══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center px-6 py-20"
          style={{ opacity: s3Opacity, y: s3Y, filter: s3Blur, pointerEvents: s3PointerEvents }}
        >
          <div className="w-full max-w-5xl flex flex-col items-center gap-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF9E00] font-bold">
                DECISION GATEWAY
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
                Pick your engine.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* ENGINE A */}
              <SpotlightCard
                onClick={() => router.push("/engine-a")}
                className="glass-card p-7 rounded-[24px] border-white/5 flex flex-col justify-between group relative overflow-hidden"
                style={{ minHeight: "280px" }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF9E00]/10 to-transparent blur-[40px] pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-[#FF9E00] font-bold uppercase tracking-wider">ENGINE A</span>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mt-0.5 group-hover:text-[#FF9E00] transition-colors duration-300">
                        Software & AI Systems
                      </h3>
                    </div>
                    <span className="text-[8px] font-mono border border-[#FF9E00]/30 text-[#FF9E00] bg-[#FF9E00]/10 px-2 py-0.5 font-bold whitespace-nowrap">AUTOMATION_READY</span>
                  </div>
                  <p className="text-[12px] text-zinc-400 leading-relaxed font-light">
                    AI workflows, voice bots, CRMs, dashboards and custom software pipelines—built to scale.
                  </p>
                </div>
                <div className="mt-4 p-3 bg-black/40 border border-white/5 rounded-xl font-mono text-[8px] text-zinc-500 space-y-2">
                  <div className="flex justify-between text-[7px] text-zinc-600 pb-1 border-b border-white/5">
                    <span>LIVE NODE MAP</span>
                    <span className="text-[#FF9E00]">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white font-bold">INBOUND</span>
                    <svg className="flex-1 mx-2 h-3" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                      <path d="M 0 6 L 100 6" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <path d="M 0 6 L 100 6" stroke="#FF9E00" strokeWidth="1.5" className="animate-stroke-flow" />
                    </svg>
                    <span className="px-1.5 py-0.5 bg-[#7000FF]/20 border border-[#7000FF]/35 text-[#7000FF] font-bold">AI_ROUTE</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF9E00] font-bold mt-4">
                  Launch Engine A <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </SpotlightCard>

              {/* ENGINE B */}
              <SpotlightCard
                onClick={() => router.push("/engine-b")}
                className="glass-card p-7 rounded-[24px] border-white/5 flex flex-col justify-between group relative overflow-hidden"
                style={{ minHeight: "280px" }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF4069]/10 to-transparent blur-[40px] pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-[#FF4069] font-bold uppercase tracking-wider">ENGINE B</span>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mt-0.5 group-hover:text-[#FF4069] transition-colors duration-300">
                        Creative Muscle
                      </h3>
                    </div>
                    <span className="text-[8px] font-mono border border-[#FF4069]/30 text-[#FF4069] bg-[#FF4069]/10 px-2 py-0.5 font-bold whitespace-nowrap">STUDIO_ACTIVE</span>
                  </div>
                  <p className="text-[12px] text-zinc-400 leading-relaxed font-light">
                    Cinematics, photography, branding, and social visuals—built to look premium and convert.
                  </p>
                </div>
                <div className="mt-4 h-12 rounded-xl border border-white/5 overflow-hidden relative bg-black/40 flex gap-1.5 p-1.5">
                  {[
                    { bg: "from-amber-900/60 to-[#FF4069]/50", label: "CAM_01" },
                    { bg: "from-[#FF4069]/50 to-[#7000FF]/50", label: "CAM_02" },
                    { bg: "from-[#7000FF]/50 to-slate-900", label: "CAM_03" },
                  ].map((f, i) => (
                    <div
                      key={i}
                      className={`flex-1 bg-gradient-to-tr ${f.bg} border border-white/10 flex items-center justify-center text-[7px] font-mono text-zinc-300 transition-opacity duration-700 ${activeFrame === i ? "opacity-100" : "opacity-25"}`}
                    >
                      {f.label}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF4069] font-bold mt-4">
                  Launch Engine B <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </SpotlightCard>
            </div>
          </div>
        </motion.div>

        {/* ── SCENE 04 — CONVERSION ── */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: s4Opacity, y: s4Y, pointerEvents: s4PointerEvents }}
        >
          <div className="max-w-3xl mx-auto space-y-8 relative flex flex-col items-center">
            {/* Sunset glowing background target */}
            <motion.div
              style={{ width: s4GlowSize, height: s4GlowSize }}
              className="absolute rounded-full bg-[#FF4069]/10 blur-[80px] pointer-events-none"
            />

            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF9E00] font-bold">
              ORCHESTRATE YOUR OS
            </span>
            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Tell us what you&apos;re building. <br/>We&apos;ll map the right engine.
            </h2>

            <div className="flex flex-col items-center gap-6 pt-4">
              <Link
                href="/book"
                className="px-12 py-4.5 text-xs font-mono font-bold uppercase tracking-widest text-black transition-all duration-300 relative overflow-hidden group shadow-[0_12px_35px_rgba(255,158,0,0.25)]"
                style={{ background: "linear-gradient(135deg, #FF9E00 0%, #FF4069 50%, #7000FF 100%)" }}
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Book a Call <ArrowRight size={13} />
                </span>
              </Link>

              <div className="flex flex-col sm:flex-row items-center gap-5 font-mono text-[11px] text-zinc-400">
                <a href="tel:+917396621004" className="hover:text-white transition flex items-center gap-2">
                  <Phone size={11} className="text-[#FF9E00]" /> +91-7396621004
                </a>
                <span className="hidden sm:inline text-zinc-700">|</span>
                <a href="mailto:grovicedigital@gmail.com" className="hover:text-white transition flex items-center gap-2">
                  <Mail size={11} className="text-[#FF4069]" /> grovicedigital@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Micro footer */}
          <div className="absolute bottom-8 left-0 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[9px] text-zinc-500 font-mono">
            <div className="flex items-center gap-1.5">
              <MapPin size={9} className="text-[#FF4069]" />
              <span>Visakhapatnam — Siripuram & Gajuwaka</span>
            </div>
            <p>&copy; {new Date().getFullYear()} GROVICE. ALL SYSTEMS SYNCED.</p>
            <a href="https://www.instagram.com/grovice2.0" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4069] transition">
              @grovice2.0
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
