"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Cpu, Camera, Compass, Calendar, Users, Zap, TrendingUp, Shield } from "lucide-react";

/* ══════════════════════════════════════════════════
   SPOTLIGHT CARD COMPONENT
   ══════════════════════════════════════════════════ */
function SpotlightCard({
  children,
  className = "",
  hoverBorder = true,
  onClick,
  style,
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



/* ══════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════ */
export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFrame, setActiveFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax tracking (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Camera frame cycling
  useEffect(() => {
    const interval = setInterval(() => setActiveFrame(p => (p + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 150;

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const frames: HTMLImageElement[] = [];
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/images/frames/frame-${i.toString().padStart(3, '0')}.jpg`;
        frames.push(img);
      }
      framesRef.current = frames;

      // Draw initial frame if available
      const drawInitial = () => {
        setImagesLoaded(true);
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.drawImage(frames[0], 0, 0, 1280, 720);
        }
      };

      if (frames[0].complete) {
        drawInitial();
      } else {
        frames[0].onload = drawInitial;
      }
    };
    loadImages();
  }, []);

  // Ensure initial frame is drawn after hydration when canvas becomes available
  useEffect(() => {
    if (mounted && framesRef.current.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx && framesRef.current[0].complete) {
        ctx.drawImage(framesRef.current[0], 0, 0, 1280, 720);
      }
    }
  }, [mounted, imagesLoaded]);

  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    if (framesRef.current.length === frameCount && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Map 0-1 to frame 1-150 (array index 0-149)
        let frameIndex = Math.floor(latest * (frameCount - 1));
        frameIndex = Math.max(0, Math.min(frameIndex, frameCount - 1));
        
        requestAnimationFrame(() => {
          ctx.drawImage(framesRef.current[frameIndex], 0, 0, 1280, 720);
        });
      }
    }
  });



  /* ── Scroll Transforms ── */
  const bgY = useTransform(smoothScroll, [0, 0.25], ["0px", "-40px"]);
  const logoOpacity = useTransform(smoothScroll, [0, 0.20, 0.25], [1, 1, 0]);
  const welcomeOpacity = useTransform(smoothScroll, [0, 0.18, 0.24], [1, 1, 0]);
  const welcomeY = useTransform(smoothScroll, [0, 0.18, 0.24], ["0px", "-25px", "-40px"]);
  const s1PointerEvents = useTransform(smoothScroll, (v) => (v < 0.2) ? "auto" : "none");
  const bgOpacity = useTransform(smoothScroll, [0.16, 0.25], [1, 0.8]);
  const bgScale = useTransform(smoothScroll, [0, 0.25], [1, 1.06]);

  const s2Opacity = useTransform(smoothScroll, [0.24, 0.29, 0.44, 0.49], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothScroll, [0.24, 0.29, 0.44, 0.49], ["35px", "0px", "0px", "-35px"]);
  const s2Blur = useTransform(smoothScroll, [0.24, 0.30, 0.42, 0.49], ["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"]);

  const s3Opacity = useTransform(smoothScroll, [0.49, 0.55, 0.76, 0.81], [0, 1, 1, 0]);
  const s3Y = useTransform(smoothScroll, [0.49, 0.55, 0.76, 0.81], ["35px", "0px", "0px", "-35px"]);
  const s3Blur = useTransform(smoothScroll, [0.49, 0.56, 0.74, 0.81], ["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"]);
  const s3PointerEvents = useTransform(smoothScroll, (v) => (v >= 0.49 && v <= 0.80) ? "auto" : "none");

  const s4Opacity = useTransform(smoothScroll, [0.80, 0.86], [0, 1]);
  const s4Y = useTransform(smoothScroll, [0.80, 0.86], ["35px", "0px"]);
  const s4PointerEvents = useTransform(smoothScroll, (v) => (v >= 0.80) ? "auto" : "none");



  const handleScrollTo = (progress: number) => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
      window.scrollTo({ top: scrollHeight * progress, behavior: "smooth" });
    }
  };

  if (!mounted) {
    return <div className="relative w-full min-h-screen bg-[#040308]" />;
  }

  /* ══════════════════════════════════════════════════════════
     MOBILE VIEW
     ══════════════════════════════════════════════════════════ */
  if (isMobile) {
    return (
      <div className="relative w-full min-h-screen bg-[#040308] text-[#F0F2FF] overflow-x-hidden">
        {/* Loader */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.7 } }}
              className="loop-loader-overlay"
            >
              <div className="loader-ring" />
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-outfit), monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #FF9E00, #FF4069)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GROVICE OS
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-outfit), monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(240,242,255,0.3)",
                  }}
                >
                  Initializing Systems...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MOBILE: Scroll-driven hero video (fixed behind all content) ── */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="w-full h-full object-cover"
            style={{ opacity: 1 }}
          />
          {/* Gradient overlay so text is always readable */}
          <div style={{ position: "absolute", inset: 0, background: "transparent" }} />
          <div style={{ position: "absolute", inset: 0, background: "transparent" }} />
        </div>

        {/* Ambient Glows */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="absolute top-[8%] left-[-25%] w-80 h-80 bg-[#FF9E00]/8 rounded-full blur-[120px]" style={{ animationDuration: "8s" }} />
          <div className="absolute top-[40%] right-[-30%] w-96 h-96 bg-[#7000FF]/10 rounded-full blur-[130px]" />
          <div className="absolute top-[65%] left-[-20%] w-80 h-80 bg-[#FF4069]/8 rounded-full blur-[110px]" />
        </div>

        <div className="relative z-10 w-full flex flex-col">

          {/* ── SCENE 01: HERO ── */}
          <section
            className="relative min-h-screen flex flex-col items-center justify-center px-5 py-28 overflow-hidden"
          >
            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-transparent z-0" />
            <div className="absolute inset-0" style={{ background: "transparent" }} />
            {/* Light leak */}
            <div className="absolute top-[15%] left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.12), transparent)", filter: "blur(4px)" }} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6 max-w-xl text-center w-full relative z-10"
            >
              {/* Badge */}
              <div className="label-badge label-badge-orange">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9E00] animate-pulse" />
                Dual-Engine OS · Visakhapatnam
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "2.4rem",
                  fontWeight: 700,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "#F0F2FF",
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
              >
                GROVICE{" "}
                <span className="text-gradient-shimmer">2.0</span>
                <br />
                <span
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 400,
                    fontStyle: "italic",
                    opacity: 0.85,
                    display: "block",
                    marginTop: "0.4rem",
                    letterSpacing: "0",
                  }}
                >
                  The Dual-Engine Operating System
                </span>
              </h1>

              <p
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(240,242,255,0.8)",
                  maxWidth: "320px",
                  lineHeight: 1.7,
                  textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                }}
              >
                Visakhapatnam&apos;s elite business OS bridging software & creative muscle. Powered by Engine A (AI & Automation) and Engine B (Creative Brand Production).
              </p>

              {/* Configurator Capsule */}
              <div
                className="w-full max-w-md"
                style={{
                  background: "rgba(4,3,8,0.7)",
                  border: "1px solid rgba(255,158,0,0.15)",
                  borderRadius: "9999px",
                  padding: "0.6rem 0.6rem 0.6rem 0.5rem",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0",
                }}
              >
                {[
                  { icon: Cpu, label: "Engine", options: ["Engine A", "Engine B", "Both"] },
                  { icon: Compass, label: "Target", options: ["Automations", "Production", "System Audit"] },
                  { icon: Calendar, label: "Timeline", options: ["Immediate", "30 Days", "Future"] },
                  { icon: Users, label: "Scope", options: ["1-5 Devs", "6-15 Studio", "Enterprise"] },
                ].map(({ icon: Icon, label, options }, i) => (
                  <div
                    key={label}
                    className="flex-1 flex flex-col items-center px-1 text-center"
                    style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
                  >
                    <Icon size={10} color="#8EE3F5" style={{ marginBottom: "1px" }} />
                    <span style={{ fontSize: "0.45rem", color: "rgba(240,242,255,0.4)", fontFamily: "var(--font-outfit), monospace", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>
                      {label}
                    </span>
                    <select
                      className="bg-transparent border-0 text-white focus:outline-none w-full text-center cursor-pointer appearance-none"
                      style={{ fontSize: "0.58rem", fontFamily: "var(--font-outfit), monospace", padding: 0, lineHeight: 1.3 }}
                    >
                      {options.map(o => (
                        <option key={o} className="bg-[#040308]" value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}

                <button
                  onClick={() => handleScrollTo(0.66)}
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-1 transition-all hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #FF9E00, #FF4069)", boxShadow: "0 4px 14px rgba(255,158,0,0.3)" }}
                >
                  <ArrowRight size={12} color="#000" />
                </button>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span style={{ fontFamily: "var(--font-outfit), monospace", fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(240,242,255,0.4)" }}>
                EXPLORE
              </span>
              <div style={{ width: "22px", height: "36px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "11px", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4px" }}>
                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#FF9E00" }}
                />
              </div>
            </div>
          </section>

          {/* ── SCENE 02: IDENTITY ── */}
          <section className="relative min-h-screen flex flex-col justify-center px-5 py-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto w-full space-y-8"
            >
              <div className="text-center space-y-3">
                <span className="label-badge label-badge-gold">INTEGRATED CORE</span>
                <h2
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    color: "#F0F2FF",
                    fontFamily: "var(--font-outfit), system-ui",
                  }}
                >
                  Where Code Meets Canvas
                </h2>
                <p style={{ fontSize: "0.78rem", color: "rgba(240,242,255,0.45)", maxWidth: "280px", margin: "0 auto", lineHeight: 1.7 }}>
                  One unified grid coordinate bridging pure software capability with high-aesthetic brand design.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Cpu, title: "Software Core", badge: "99.9% AUTOPILOT", badgeClass: "label-badge-orange", desc: "Lead automations, database synchronizers, CRM endpoints, and voice synthesis pipelines built on zero-downtime micro-clouds.", color: "#FF9E00" },
                  { icon: Camera, title: "Creative Muscle", badge: "RED CINE ENGINE", badgeClass: "label-badge-pink", desc: "Cinematic commercials, editorial fashion photography, vector styling, and high-fidelity social assets curated for conversion.", color: "#FF4069" },
                  { icon: Compass, title: "Siripuram Grid", badge: "LOCAL DEPLOYMENT", badgeClass: "label-badge-purple", desc: "Synchronized locally out of Visakhapatnam. Direct roadmap audits with immediate engineering support on-ground.", color: "#9B7FFF" },
                ].map(({ icon: Icon, title, badge, badgeClass, desc, color }) => (
                  <div
                    key={title}
                    className="glass-card p-5 rounded-2xl flex gap-4 items-start"
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: `${color}15`,
                        border: `1px solid ${color}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: color,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                        <h4 style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-outfit), monospace", color: "#F0F2FF" }}>
                          {title}
                        </h4>
                        <span className={`label-badge ${badgeClass}`} style={{ fontSize: "0.45rem", padding: "0.15rem 0.5rem" }}>{badge}</span>
                      </div>
                      <p style={{ fontSize: "0.72rem", color: "rgba(240,242,255,0.45)", lineHeight: 1.65 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── SCENE 03: ENGINE GATEWAY ── */}
          <section className="relative min-h-screen flex flex-col justify-center px-5 py-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl flex flex-col items-center gap-8 mx-auto"
            >
              <div className="text-center space-y-2">
                <span className="label-badge label-badge-orange">DECISION GATEWAY</span>
                <h2
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "#F0F2FF",
                    fontFamily: "var(--font-outfit), system-ui",
                    marginTop: "0.5rem",
                  }}
                >
                  Choose Your Workspace
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 w-full">
                {/* ENGINE A CARD */}
                <SpotlightCard
                  onClick={() => router.push("/engine-a")}
                  className="glass-card p-6 rounded-[20px] flex flex-col justify-between group"
                  style={{ minHeight: "260px" }}
                >
                  {/* Top accent bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #FF9E00, rgba(255,158,0,0))", borderRadius: "20px 20px 0 0" }} />
                  <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(255,158,0,0.10), transparent 70%)" }} />

                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="label-badge label-badge-orange" style={{ fontSize: "0.5rem" }}>ENGINE A</span>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#F0F2FF", marginTop: "0.4rem", fontFamily: "var(--font-outfit), system-ui" }}
                          className="group-hover:text-[#FF9E00] transition-colors duration-300"
                        >
                          Software & AI Systems
                        </h3>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "rgba(240,242,255,0.5)", lineHeight: 1.65 }}>
                      AI workflows, voice bots, CRMs, dashboards and custom software pipelines—built to scale.
                    </p>
                  </div>

                  {/* Mock process stack */}
                  <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "0.75rem", fontFamily: "var(--font-outfit), monospace", fontSize: "0.62rem", display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(240,242,255,0.3)", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.55rem", letterSpacing: "0.1em" }}>
                      <span>LIVE PROCESS STACK</span>
                      <span style={{ color: "#FF9E00" }} className="animate-pulse">● RUNNING</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.4rem" }}>
                      <span style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "#F0F2FF", fontWeight: 700, fontSize: "0.55rem" }}>INBOUND</span>
                      <svg className="flex-1 h-3" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                        <path d="M 0 6 L 100 6" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        <path d="M 0 6 L 100 6" stroke="#FF9E00" strokeWidth="1.5" className="animate-stroke-flow" />
                      </svg>
                      <span style={{ background: "rgba(112,0,255,0.2)", border: "1px solid rgba(112,0,255,0.35)", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "#9B7FFF", fontWeight: 700, fontSize: "0.55rem" }}>AI_AGENT</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-outfit), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FF9E00", marginTop: "1rem" }}>
                    Launch Engine A <ArrowRight size={11} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </SpotlightCard>

                {/* ENGINE B CARD */}
                <SpotlightCard
                  onClick={() => router.push("/engine-b")}
                  className="glass-card p-6 rounded-[20px] flex flex-col justify-between group"
                  style={{ minHeight: "260px" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #FF4069, rgba(255,64,105,0))", borderRadius: "20px 20px 0 0" }} />
                  <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(255,64,105,0.10), transparent 70%)" }} />

                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="label-badge label-badge-pink" style={{ fontSize: "0.5rem" }}>ENGINE B</span>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#F0F2FF", marginTop: "0.4rem", fontFamily: "var(--font-outfit), system-ui" }}
                          className="group-hover:text-[#FF4069] transition-colors duration-300"
                        >
                          Creative Muscle
                        </h3>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "rgba(240,242,255,0.5)", lineHeight: 1.65 }}>
                      Cinematics, photography, branding, and social visuals—built to look premium and convert.
                    </p>
                  </div>

                  {/* Camera feed strip */}
                  <div style={{ height: "52px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", background: "rgba(0,0,0,0.5)", display: "flex", gap: "6px", padding: "6px", marginTop: "0.75rem" }}>
                    {[
                      { bg: "linear-gradient(135deg, rgba(120,60,0,0.6), rgba(255,64,105,0.4))", label: "CINE_01" },
                      { bg: "linear-gradient(135deg, rgba(255,64,105,0.4), rgba(112,0,255,0.4))", label: "CINE_02" },
                      { bg: "linear-gradient(135deg, rgba(112,0,255,0.4), rgba(15,15,30,1))", label: "RAW_FEED" },
                    ].map((f, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          background: f.bg,
                          border: `1px solid ${activeFrame === i ? "rgba(255,64,105,0.5)" : "rgba(255,255,255,0.06)"}`,
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: activeFrame === i ? 1 : 0.25,
                          transition: "all 0.7s ease",
                          fontFamily: "var(--font-outfit), monospace",
                          fontSize: "0.52rem",
                          color: "rgba(240,242,255,0.7)",
                          gap: "4px",
                        }}
                      >
                        {activeFrame === i && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF4069", animation: "blink 1s infinite" }} />}
                        {f.label}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-outfit), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FF4069", marginTop: "1rem" }}>
                    Launch Engine B <ArrowRight size={11} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          </section>

          {/* ── SCENE 04: CONVERSION ── */}
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-5 py-24 pb-44">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto space-y-8 flex flex-col items-center text-center w-full"
            >
              <span className="label-badge label-badge-orange">ORCHESTRATE YOUR SYSTEM</span>

              <div className="space-y-3">
                <h2
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    color: "#F0F2FF",
                    fontFamily: "var(--font-outfit), system-ui",
                  }}
                >
                  Tell us what you&apos;re building.<br />We&apos;ll map the right engine.
                </h2>
                <p style={{ fontSize: "0.78rem", color: "rgba(240,242,255,0.4)", maxWidth: "280px", margin: "0 auto", lineHeight: 1.7 }}>
                  Scoping roadmap calls are scheduled out of our Siripuram hub. Receive an in-depth systems audit.
                </p>
              </div>

              <div className="w-full glass-card p-6 rounded-[24px] space-y-5 max-w-sm">
                <Link
                  href="/book"
                  className="btn-primary w-full justify-center"
                  style={{ display: "flex", textDecoration: "none", fontSize: "0.65rem", borderRadius: "12px" }}
                >
                  <Zap size={13} />
                  Book Strategic Scoping
                  <ArrowRight size={13} />
                </Link>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                <div className="flex flex-col items-center gap-3">
                  {[
                    { href: "tel:+917396621004", icon: Phone, label: "+91-7396621004", color: "#FF9E00" },
                    { href: "mailto:grovicedigital@gmail.com", icon: Mail, label: "grovicedigital@gmail.com", color: "#FF4069" },
                  ].map(({ href, icon: Icon, label, color }) => (
                    <a
                      key={href}
                      href={href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.45rem 0.85rem",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "9999px",
                        color: "rgba(240,242,255,0.5)",
                        textDecoration: "none",
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-outfit), monospace",
                        transition: "all 0.2s",
                      }}
                    >
                      <Icon size={11} color={color} /> {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Micro footer */}
            <div className="absolute bottom-10 left-0 w-full px-5 flex flex-col items-center gap-2 text-center">
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.62rem", color: "rgba(240,242,255,0.25)", fontFamily: "var(--font-outfit), monospace" }}>
                <MapPin size={9} color="#FF4069" />
                Visakhapatnam — Siripuram & Gajuwaka
              </div>
              <p style={{ fontSize: "0.6rem", color: "rgba(240,242,255,0.2)", fontFamily: "var(--font-outfit), monospace" }}>
                © {new Date().getFullYear()} GROVICE. ALL SYSTEMS SYNCED.
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     DESKTOP VIEW
     ══════════════════════════════════════════════════════════ */
  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#040308] text-[#F0F2FF]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* ── Loader ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              className="loop-loader-overlay"
            >
              <div className="loader-ring" />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-outfit), monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #FF9E00, #FF4069, #7000FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GROVICE OS
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-outfit), monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(240,242,255,0.25)",
                  }}
                >
                  Initializing dual-engine systems...
                </span>
              </div>
              {/* Mini dot grid loader */}
              <div className="loader-dot-grid">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── DESKTOP: Scroll-driven hero video ── */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            zIndex: 2,
            opacity: bgOpacity,
            scale: bgScale,
          }}
        >
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── Cinematic overlays (above video, fade with scroll) ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3, opacity: bgOpacity }}
        >
          {/* Vignette */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(4,3,8,0.72) 100%)" }} />
          {/* Top-to-bottom gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(4,3,8,0.30) 0%, transparent 35%, rgba(4,3,8,0.88) 100%)" }} />
          {/* Warm light leak */}
          <div style={{ position: "absolute", top: "22%", left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.18) 35%, rgba(255,158,0,0.10) 55%, transparent 100%)", filter: "blur(6px)" }} />
        </motion.div>

        {/* ── Dark base — sits BEHIND video (z-index 1) ── */}
        <div className="absolute inset-0 pointer-events-none bg-[#040308]" style={{ zIndex: 1 }} />



        {/* ── Ambient Glows ── */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, y: bgY }}>
          <div style={{ position: "absolute", top: "12%", left: "18%", width: "380px", height: "380px", borderRadius: "50%", background: "rgba(255,158,0,0.07)", filter: "blur(140px)" }} />
          <div style={{ position: "absolute", bottom: "15%", right: "12%", width: "440px", height: "440px", borderRadius: "50%", background: "rgba(112,0,255,0.08)", filter: "blur(160px)" }} />
        </motion.div>

        {/* ── Mouse-parallax glow orb (desktop) ── */}
        <div
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,158,0,0.04) 0%, transparent 70%)",
            left: `${mousePos.x - 250}px`,
            top: `${mousePos.y - 250}px`,
            transition: "left 0.8s cubic-bezier(0.16,1,0.3,1), top 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />



        {/* ── Scroll Discover ── */}
        <div className="scroll-discover">
          <span>Scroll to Navigate</span>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF9E00", boxShadow: "0 0 8px rgba(255,158,0,0.6)" }} className="animate-pulse" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 01 — ARRIVAL
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: logoOpacity, pointerEvents: s1PointerEvents }}
        >
          <motion.div
            style={{ opacity: welcomeOpacity, y: welcomeY }}
            className="flex flex-col items-center gap-8 max-w-5xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="label-badge label-badge-orange">
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF9E00" }} className="animate-pulse" />
                Dual-Engine OS · Visakhapatnam
              </span>
            </motion.div>

            {/* Editorial Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                color: "#F0F2FF",
                textShadow: "0 4px 30px rgba(0,0,0,0.4)",
                maxWidth: "900px",
              }}
            >
              GROVICE{" "}
              <span className="text-gradient-shimmer">2.0</span>
              <br />
              <span
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  opacity: 0.9,
                  display: "block",
                  marginTop: "0.4rem",
                  letterSpacing: 0,
                }}
              >
                The Dual-Engine Operating System
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                color: "rgba(240,242,255,0.8)",
                maxWidth: "600px",
                lineHeight: 1.7,
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              }}
            >
              Visakhapatnam&apos;s elite business operating system bridging software & creative muscle.{" "}
              <br />
              Powered by Engine A (AI & Automation) and Engine B (Creative Brand Production).
            </motion.p>

            {/* Pill Configurator Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background: "rgba(4,3,8,0.65)",
                border: "1px solid rgba(255,158,0,0.15)",
                borderRadius: "9999px",
                padding: "0.6rem",
                gap: 0,
                maxWidth: "860px",
                width: "100%",
                backdropFilter: "blur(24px)",
                boxShadow: "0 16px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {[
                { icon: Cpu, label: "Work Engine", options: ["Engine A: Software & AI", "Engine B: Creative Muscle", "Integrated OS (Both)"] },
                { icon: Compass, label: "System Target", options: ["Lead Automations", "Cinematic Production", "Full System Audit"] },
                { icon: Calendar, label: "Launch Timeline", options: ["Immediate Scoping", "Within 30 Days", "Future Scaling"] },
                { icon: Users, label: "Operating Scope", options: ["1 - 5 Developer Nodes", "6 - 15 Studio Assets", "Enterprise Scale Sync"] },
              ].map(({ icon: Icon, label, options }, i) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "0.35rem 1.2rem",
                    borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    borderRadius: i === 0 ? "9999px 0 0 9999px" : i === 3 ? "0 9999px 9999px 0" : 0,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <Icon size={14} color="#8EE3F5" style={{ flexShrink: 0, marginRight: "0.6rem" }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ display: "block", fontSize: "0.55rem", fontFamily: "var(--font-outfit), monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(240,242,255,0.4)", fontWeight: 700, marginBottom: "1px" }}>
                      {label}
                    </span>
                    <select
                      className="bg-transparent border-0 text-white focus:outline-none w-full cursor-pointer appearance-none font-medium"
                      style={{ fontSize: "0.78rem", fontFamily: "var(--font-dm-sans), system-ui" }}
                    >
                      {options.map(o => (
                        <option key={o} className="bg-[#040308]" value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              <button
                onClick={() => handleScrollTo(0.55)}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF9E00, #FF4069)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginLeft: "0.5rem",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 16px rgba(255,158,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(255,158,0,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(255,158,0,0.3)";
                }}
              >
                <ArrowRight size={18} color="#000" />
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
          >
            <span style={{ fontFamily: "var(--font-outfit), monospace", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(240,242,255,0.4)" }}>
              SCROLL TO EXPLORE
            </span>
            <div style={{ width: "24px", height: "40px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "5px" }}>
              <motion.div
                animate={{ y: [0, 18, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#FF9E00", boxShadow: "0 0 6px rgba(255,158,0,0.6)" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 02 — IDENTITY LOCK
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: s2Opacity, y: s2Y, filter: s2Blur, pointerEvents: "none" }}
        >
          <div className="max-w-5xl space-y-8 pointer-events-none">
            <span className="label-badge label-badge-gold">INTEGRATED CORE</span>

            <h2
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                fontFamily: "var(--font-outfit), system-ui",
              }}
            >
              Where Code
              <br />
              <span className="text-gradient">Meets Canvas</span>
            </h2>

            {/* Animated divider */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "80px", height: "2px", background: "linear-gradient(90deg, #FF9E00, #FF4069)" }} />
            </div>

            <p
              style={{
                fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                color: "rgba(240,242,255,0.55)",
                maxWidth: "560px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              AI Automation meets Creative Excellence. Robust code repositories and brand photography timelines under one coordinate grid.
            </p>

            {/* Stat row */}
            <div style={{ display: "flex", justifyContent: "center", gap: "4rem", paddingTop: "1rem" }}>
              {[
                { val: "140k+", label: "Leads Processed", color: "#FF9E00" },
                { val: "99.98%", label: "Deploy Uptime", color: "#22c55e" },
                { val: "< 8ms", label: "Edge Latency", color: "#FF4069" },
              ].map(({ val, label, color }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 800, color, fontFamily: "var(--font-outfit), monospace", letterSpacing: "-0.02em" }}>{val}</p>
                  <p style={{ fontSize: "0.6rem", color: "rgba(240,242,255,0.3)", fontFamily: "var(--font-outfit), monospace", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "4px" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 03 — ENGINE GATEWAY
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center px-6 py-20"
          style={{ opacity: s3Opacity, y: s3Y, filter: s3Blur, pointerEvents: s3PointerEvents }}
        >
          <div className="w-full max-w-5xl flex flex-col items-center gap-8">
            <div className="text-center space-y-3">
              <span className="label-badge label-badge-orange">DECISION GATEWAY</span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  fontFamily: "var(--font-outfit), system-ui",
                  color: "#F0F2FF",
                  marginTop: "0.5rem",
                }}
              >
                Pick your engine.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* ENGINE A */}
              <SpotlightCard
                onClick={() => router.push("/engine-a")}
                className="glass-card p-7 rounded-[24px] flex flex-col justify-between group"
                style={{ minHeight: "300px", position: "relative" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #FF9E00, rgba(255,158,0,0))", borderRadius: "24px 24px 0 0" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: "220px", height: "220px", background: "radial-gradient(circle at 100% 0%, rgba(255,158,0,0.09), transparent 65%)", pointerEvents: "none" }} />

                <div className="space-y-3">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span className="label-badge label-badge-orange" style={{ fontSize: "0.55rem" }}>ENGINE A</span>
                      <h3
                        style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.025em", color: "#F0F2FF", marginTop: "0.5rem", fontFamily: "var(--font-outfit), system-ui", transition: "color 0.3s" }}
                        className="group-hover:text-[#FF9E00]"
                      >
                        Software & AI Systems
                      </h3>
                    </div>
                    <TrendingUp size={18} color="rgba(255,158,0,0.4)" />
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "rgba(240,242,255,0.45)", lineHeight: 1.7 }}>
                    AI workflows, voice bots, CRMs, dashboards and custom software pipelines—built to scale.
                  </p>
                </div>

                {/* Animated node map */}
                <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "0.85rem", fontFamily: "var(--font-outfit), monospace", fontSize: "0.65rem", marginTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(240,242,255,0.3)", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.55rem", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase" }}>
                    <span>LIVE NODE MAP</span>
                    <span style={{ color: "#FF9E00" }} className="animate-pulse">● ACTIVE</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginTop: "0.6rem" }}>
                    <span style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.25rem 0.6rem", borderRadius: "5px", color: "#F0F2FF", fontWeight: 700 }}>INBOUND</span>
                    <svg className="flex-1 h-3" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                      <path d="M 0 6 L 100 6" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <path d="M 0 6 L 100 6" stroke="#FF9E00" strokeWidth="1.5" className="animate-stroke-flow" />
                    </svg>
                    <span style={{ background: "rgba(112,0,255,0.2)", border: "1px solid rgba(112,0,255,0.35)", padding: "0.25rem 0.6rem", borderRadius: "5px", color: "#9B7FFF", fontWeight: 700 }}>AI_ROUTE</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-outfit), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FF9E00", marginTop: "1rem" }}>
                  Launch Engine A <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </SpotlightCard>

              {/* ENGINE B */}
              <SpotlightCard
                onClick={() => router.push("/engine-b")}
                className="glass-card p-7 rounded-[24px] flex flex-col justify-between group"
                style={{ minHeight: "300px", position: "relative" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #FF4069, rgba(255,64,105,0))", borderRadius: "24px 24px 0 0" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: "220px", height: "220px", background: "radial-gradient(circle at 100% 0%, rgba(255,64,105,0.09), transparent 65%)", pointerEvents: "none" }} />

                <div className="space-y-3">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span className="label-badge label-badge-pink" style={{ fontSize: "0.55rem" }}>ENGINE B</span>
                      <h3
                        style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.025em", color: "#F0F2FF", marginTop: "0.5rem", fontFamily: "var(--font-outfit), system-ui", transition: "color 0.3s" }}
                        className="group-hover:text-[#FF4069]"
                      >
                        Creative Muscle
                      </h3>
                    </div>
                    <Camera size={18} color="rgba(255,64,105,0.4)" />
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "rgba(240,242,255,0.45)", lineHeight: 1.7 }}>
                    Cinematics, photography, branding, and social visuals—built to look premium and convert.
                  </p>
                </div>

                {/* Camera feed strip */}
                <div style={{ height: "60px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", background: "rgba(0,0,0,0.5)", display: "flex", gap: "6px", padding: "6px", marginTop: "1rem" }}>
                  {[
                    { bg: "linear-gradient(135deg, rgba(140,70,0,0.7), rgba(255,64,105,0.5))", label: "CAM_01" },
                    { bg: "linear-gradient(135deg, rgba(255,64,105,0.5), rgba(112,0,255,0.5))", label: "CAM_02" },
                    { bg: "linear-gradient(135deg, rgba(112,0,255,0.5), rgba(10,10,20,1))", label: "CAM_03" },
                  ].map((f, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        background: f.bg,
                        border: `1px solid ${activeFrame === i ? "rgba(255,64,105,0.55)" : "rgba(255,255,255,0.06)"}`,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: activeFrame === i ? 1 : 0.2,
                        transition: "all 0.7s ease",
                        fontFamily: "var(--font-outfit), monospace",
                        fontSize: "0.6rem",
                        color: "rgba(240,242,255,0.8)",
                        gap: "4px",
                      }}
                    >
                      {activeFrame === i && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF4069", animation: "blink 1s infinite" }} />}
                      {f.label}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-outfit), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FF4069", marginTop: "1rem" }}>
                  Launch Engine B <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </SpotlightCard>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 04 — CONVERSION CTA
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: s4Opacity, y: s4Y, pointerEvents: s4PointerEvents }}
        >
          {/* Mouse-following background glow */}
          <div
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,64,105,0.06) 0%, transparent 70%)",
              left: `${mousePos.x - 300}px`,
              top: `${mousePos.y - 300}px`,
              transition: "left 0.6s cubic-bezier(0.16,1,0.3,1), top 0.6s cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: "none",
            }}
          />

          <div className="max-w-3xl mx-auto space-y-10 relative flex flex-col items-center">
            <span className="label-badge label-badge-orange">ORCHESTRATE YOUR OS</span>

            <h2
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                fontFamily: "var(--font-outfit), system-ui",
                color: "#F0F2FF",
              }}
            >
              Tell us what you&apos;re building.{" "}
              <br />
              <span className="text-gradient">We&apos;ll map the right engine.</span>
            </h2>

            <div className="flex flex-col items-center gap-6">
              <Link
                href="/book"
                className="btn-primary"
                style={{ textDecoration: "none", fontSize: "0.7rem", display: "inline-flex" }}
              >
                <Zap size={14} />
                Book a Strategy Call
                <ArrowRight size={14} />
              </Link>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {[
                  { href: "tel:+917396621004", icon: Phone, label: "+91-7396621004", color: "#FF9E00" },
                  { href: "mailto:grovicedigital@gmail.com", icon: Mail, label: "grovicedigital@gmail.com", color: "#FF4069" },
                ].map(({ href, icon: Icon, label, color }) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "9999px",
                      color: "rgba(240,242,255,0.5)",
                      textDecoration: "none",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-outfit), monospace",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = color;
                      el.style.borderColor = `${color}40`;
                      el.style.background = `${color}08`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "rgba(240,242,255,0.5)";
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                      el.style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    <Icon size={12} color={color} /> {label}
                  </a>
                ))}
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "0.5rem" }}>
                {[
                  { icon: Shield, label: "Zero Pressure Calls" },
                  { icon: TrendingUp, label: "Free Systems Audit" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(240,242,255,0.3)", fontSize: "0.65rem", fontFamily: "var(--font-outfit), monospace" }}>
                    <Icon size={11} color="rgba(255,158,0,0.5)" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Micro footer */}
          <div className="absolute bottom-8 left-0 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-3"
            style={{ fontSize: "0.6rem", color: "rgba(240,242,255,0.2)", fontFamily: "var(--font-outfit), monospace", letterSpacing: "0.06em" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <MapPin size={9} color="#FF4069" />
              Visakhapatnam — Siripuram & Gajuwaka
            </div>
            <p>© {new Date().getFullYear()} GROVICE. ALL SYSTEMS SYNCED.</p>
            <a
              href="https://www.instagram.com/grovice2.0"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,64,105,0.4)", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.1em", textTransform: "uppercase" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF4069"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,64,105,0.4)"; }}
            >
              @grovice2.0
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
