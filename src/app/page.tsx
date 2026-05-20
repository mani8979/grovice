"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

/* Dynamically import 3D viewer — no SSR (WebGL requires browser) */
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="w-6 h-6 rounded-full border-2 border-[#00D2FF] border-t-transparent animate-spin" />
    </div>
  ),
});

/* ═════════════════════════════════════════════
    SPOTLIGHT CARD COMPONENT
   ═════════════════════════════════════════════ */
function SpotlightCard({
  children,
  className = "",
  hoverBorder = true,
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  hoverBorder?: boolean;
  onClick?: () => void;
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
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for 4 scenes
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scene 1: Arrival (0% -> 25%)
  const bgY = useTransform(scrollYProgress, [0, 0.25], ["0px", "-20px"]);
  const logoScale = useTransform(scrollYProgress, [0, 0.25], [0.92, 1.0]);
  const logoRotateY = useTransform(scrollYProgress, [0, 0.25], [-10, 0]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.20, 0.25], [1, 1, 0]);
  
  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.04, 0.18, 0.24], [0, 1, 1, 0]);
  const welcomeY = useTransform(scrollYProgress, [0, 0.06, 0.18, 0.24], ["15px", "0px", "0px", "-15px"]);

  // Scene 2: Identity Lock (25% -> 50%)
  const s2Opacity = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.49], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.49], ["20px", "0px", "0px", "-20px"]);
  const s2Blur = useTransform(
    scrollYProgress, 
    [0.24, 0.29, 0.42, 0.49], 
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  // Scene 3: Engine Gateway (50% -> 80%)
  const s3Opacity = useTransform(scrollYProgress, [0.49, 0.54, 0.76, 0.80], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.49, 0.54, 0.76, 0.80], ["20px", "0px", "0px", "-20px"]);
  const s3Blur = useTransform(
    scrollYProgress, 
    [0.49, 0.55, 0.74, 0.80], 
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  // Engine B Preview Frame Cycles
  const [activeFrame, setActiveFrame] = useState(0);
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(frameInterval);
  }, []);

  // Scene 4: Decision/Conversion (80% -> 100%)
  const s4Opacity = useTransform(scrollYProgress, [0.80, 0.85], [0, 1]);
  const s4Y = useTransform(scrollYProgress, [0.80, 0.85], ["20px", "0px"]);
  const s4GlowSize = useTransform(scrollYProgress, [0.80, 0.98], ["300px", "120px"]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#05060A] text-[#F6F7FB]" style={{ height: "400vh" }}>
      {/* STICKY CONTAINER VIEWPORT */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">
        
        {/* ── BACKGROUNDS & COASTAL FOG LAYER ── */}
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ y: bgY }}
        >
          {/* Vizag ocean indigo & blue glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060A] via-[#071C3D]/40 to-[#05060A]" />
          
          {/* Subtle slow drifting dust glow particles */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px]" />
          {/* Horizon sea line glow accent */}
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00D2FF]/20 to-transparent" />
        </motion.div>

        {/* ═════════════════════════════════════════════
            SCENE 01: ARRIVAL (0% -> 25%)
            ═════════════════════════════════════════════ */}
        <motion.div 
          className="absolute flex flex-col items-center justify-center text-center z-10 px-6 w-full max-w-5xl"
          style={{ opacity: logoOpacity }}
        >
          {/* Ambient glow ring behind the 3D model */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#00D2FF]/8 blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#7A5CFF]/8 blur-[100px] pointer-events-none" />

          {/* 3D MODEL CENTREPIECE */}
          <motion.div
            style={{ scale: logoScale, rotateY: logoRotateY }}
            className="relative w-full select-none"
          >
            <ModelViewer
              style={{
                width: "100%",
                height: "clamp(280px, 45vw, 500px)",
              }}
            />
            {/* Reflection shimmer pass */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D2FF]/10 to-transparent mix-blend-color-dodge pointer-events-none" />
          </motion.div>

          {/* Brand name below the 3D model */}
          <motion.div
            style={{ opacity: welcomeOpacity, y: welcomeY }}
            className="-mt-4 flex flex-col items-center gap-2"
          >
            <h1 className="text-5xl md:text-7xl tracking-tighter font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F6F7FB] via-[#F6F7FB] to-[#00D2FF] drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] select-none">
              GROVICE 2.0
            </h1>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#00D2FF] font-mono font-bold">
              Visakhapatnam&apos;s First Business Operating System
            </p>
            <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse mt-1" />
          </motion.div>
        </motion.div>

        {/* ═════════════════════════════════════════════
            SCENE 02: IDENTITY LOCK (25% -> 50%)
            ═════════════════════════════════════════════ */}
        <motion.div
          className="absolute text-center max-w-4xl px-6 z-10 space-y-6"
          style={{ opacity: s2Opacity, y: s2Y, filter: s2Blur }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#7A5CFF] border border-[#7A5CFF]/30 bg-[#7A5CFF]/10 px-3 py-1 rounded-none">
            INTEGRATED CORE
          </span>
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-[#F6F7FB]">
            One Stop Business Solution
          </h2>
          <p className="text-md md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Where AI Automation Meets Creative Excellence. We deploy robust code repositories and manage brand photography timelines under a single coordinate grid.
          </p>
        </motion.div>


        {/* ═════════════════════════════════════════════
            SCENE 03: ENGINE GATEWAY (50% -> 80%)
            ═════════════════════════════════════════════ */}
        <motion.div
          className="absolute w-full max-w-6xl px-6 z-10 flex flex-col items-center gap-12"
          style={{ opacity: s3Opacity, y: s3Y, filter: s3Blur }}
        >
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF4FD8]">
              DECISION GATEWAY
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Pick your engine.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* PORTAL CARD: ENGINE A */}
            <SpotlightCard
              onClick={() => router.push("/engine-a")}
              className="glass-card p-8 rounded-[24px] border-white/10 flex flex-col justify-between aspect-[4/3] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00D2FF]/10 to-transparent blur-[40px] pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-[#00D2FF] font-bold uppercase tracking-wider">ENGINE A</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1 group-hover:text-[#00D2FF] transition-colors duration-300">
                      Software & AI Systems
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono border border-cyan-500/30 text-cyan-400 bg-cyan-950/20 px-2 py-0.5 font-bold">AUTOMATION_READY</span>
                </div>
                
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Adapting AI into your workflow. Custom software pipelines, smart voice bots, automated CRMs, and performance analytics.
                </p>
              </div>

              {/* Engine A Live Workflow preview mock */}
              <div className="my-6 p-4 bg-black/40 border border-white/5 rounded-xl font-mono text-[9px] text-zinc-500 space-y-2.5">
                <div className="flex justify-between items-center text-[7px] text-zinc-600 pb-1.5 border-b border-white/5">
                  <span>LIVE NODE MAP</span>
                  <span className="text-[#00D2FF]">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white font-bold">INBOUND_LEAD</span>
                  <svg className="flex-1 mx-2 h-4" fill="none" viewBox="0 0 100 16" preserveAspectRatio="none">
                    <path d="M 0 8 L 100 8" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <path d="M 0 8 L 100 8" stroke="#00D2FF" strokeWidth="1.5" className="animate-stroke-flow" />
                  </svg>
                  <span className="px-2 py-0.5 bg-[#7A5CFF]/20 border border-[#7A5CFF]/35 text-[#7A5CFF] font-bold">AI_DISPATCH</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00D2FF] font-bold mt-2">
                Launch Engine A <ArrowRight size={14} className="group-hover:translate-x-1.5 duration-300" />
              </div>
            </SpotlightCard>

            {/* PORTAL CARD: ENGINE B */}
            <SpotlightCard
              onClick={() => router.push("/engine-b")}
              className="glass-card p-8 rounded-[24px] border-white/10 flex flex-col justify-between aspect-[4/3] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF4FD8]/10 to-transparent blur-[40px] pointer-events-none" />

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF4FD8] font-bold uppercase tracking-wider">ENGINE B</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1 group-hover:text-[#FF4FD8] transition-colors duration-300">
                      Creative Muscle
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono border border-pink-500/30 text-pink-400 bg-pink-950/20 px-2 py-0.5 font-bold">STUDIO_ACTIVE</span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Elite brand cinematography, professional product campaigns, photography, marketing design assets, and full creative production.
                </p>
              </div>

              {/* Engine B Preview Crossfading Frames */}
              <div className="my-6 h-16 rounded-xl border border-white/5 overflow-hidden relative bg-black/40">
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-widest text-zinc-600 z-10 select-none">
                  [ PORTFOLIO_PREVIEW_FRAMES ]
                </div>
                
                {/* Simulated images or high-end visuals cycling */}
                <div className="absolute inset-0 flex gap-2 p-1.5 z-20">
                  <div className={`flex-1 bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-900 border border-white/10 transition-opacity duration-700 flex items-center justify-center text-[8px] font-mono text-zinc-400 ${activeFrame === 0 ? "opacity-100" : "opacity-30"}`}>
                    CAM_01
                  </div>
                  <div className={`flex-1 bg-gradient-to-tr from-slate-900 via-slate-800 to-purple-900 border border-white/10 transition-opacity duration-700 flex items-center justify-center text-[8px] font-mono text-zinc-400 ${activeFrame === 1 ? "opacity-100" : "opacity-30"}`}>
                    CAM_02
                  </div>
                  <div className={`flex-1 bg-gradient-to-tr from-slate-900 via-slate-800 to-pink-900 border border-white/10 transition-opacity duration-700 flex items-center justify-center text-[8px] font-mono text-zinc-400 ${activeFrame === 2 ? "opacity-100" : "opacity-30"}`}>
                    CAM_03
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF4FD8] font-bold mt-2">
                Launch Engine B <ArrowRight size={14} className="group-hover:translate-x-1.5 duration-300" />
              </div>
            </SpotlightCard>
          </div>
        </motion.div>


        {/* ═════════════════════════════════════════════
            SCENE 04: DECISION / CONVERSION (80% -> 100%)
            ═════════════════════════════════════════════ */}
        <motion.div
          className="absolute w-full max-w-4xl px-6 z-10 flex flex-col items-center text-center justify-between h-[80vh] py-12"
          style={{ opacity: s4Opacity, y: s4Y }}
        >
          {/* CTA Area */}
          <div className="my-auto space-y-8 relative flex flex-col items-center">
            {/* Target glow ring */}
            <motion.div 
              style={{ width: s4GlowSize, height: s4GlowSize }}
              className="absolute rounded-full bg-[#7A5CFF]/15 blur-[60px] pointer-events-none" 
            />

            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#00D2FF]">
              ORCHESTRATE YOUR OS
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-2xl text-white">
              Tell us what you’re building. We’ll map the right engine.
            </h2>

            <div className="flex flex-col items-center gap-6 pt-4">
              <Link
                href="/book"
                className="px-10 py-5 text-xs font-mono font-bold uppercase tracking-widest text-black transition-all duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(122,92,255,0.25)]"
                style={{
                  background: "linear-gradient(135deg, #00D2FF 0%, #7A5CFF 50%, #FF4FD8 100%)"
                }}
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Book a Call <ArrowRight size={14} />
                </span>
              </Link>

              {/* Direct Info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 font-mono text-xs text-zinc-400">
                <a href="tel:+917396621004" className="hover:text-white transition flex items-center gap-2">
                  <Phone size={12} className="text-[#00D2FF]" /> +91-7396621004
                </a>
                <span className="hidden sm:inline text-zinc-700">|</span>
                <a href="mailto:grovicedigital@gmail.com" className="hover:text-white transition flex items-center gap-2">
                  <Mail size={12} className="text-[#FF4FD8]" /> grovicedigital@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Scene 4 Micro Footer */}
          <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-mono">
            <div className="flex items-center gap-2">
              <MapPin size={10} className="text-[#7A5CFF]" />
              <span>Visakhapatnam — Siripuram & Gajuwaka</span>
            </div>
            <p>&copy; {new Date().getFullYear()} GROVICE. ALL SYSTEMS SYNCED.</p>
            <a 
              href="https://www.instagram.com/grovice2.0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#FF4FD8] transition"
            >
              @grovice2.0
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
