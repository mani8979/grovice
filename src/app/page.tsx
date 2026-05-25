"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

import HUD from "@/components/HUD";
import EngineCard from "@/components/EngineCard";
import Magnetic from "@/components/Magnetic";

/* ══════════════════════════════════════════════════════════
   MAIN PAGE - SIDEWAVE AESTHETIC EDITION
   ══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [activeEngine, setActiveEngine] = useState<"A" | "B">("A");

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload all 300 background frames
  useEffect(() => {
    if (!mounted) return;

    const totalFrames = 300;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/images/bg-frames/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        loadedCount++;
        setPreloadProgress(Math.floor((loadedCount / totalFrames) * 100));

        // Draw the first frame immediately once it loads so the page isn't blank
        if (i === 1) {
          requestAnimationFrame(() => {
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                const vw = img.naturalWidth;
                const vh = img.naturalHeight;
                const cw = canvas.width = window.innerWidth;
                const ch = canvas.height = window.innerHeight;
                const scale = Math.max(cw / vw, ch / vh);
                const dw = vw * scale;
                const dh = vh * scale;
                ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
              }
            }
          });
        }

        if (loadedCount === totalFrames) {
          setLoading(false);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setPreloadProgress(Math.floor((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setLoading(false);
        }
      };

      loadedImages[i - 1] = img;
    }

    imagesRef.current = loadedImages;
  }, [mounted]);

  // ── CANVAS SCROLL SCRUBBING ──
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let active = true;
    let rafId = 0;

    // Smooth scroll position tracking
    let targetProgress = 0;
    let currentFrame = 0;
    const totalFrames = 300;

    // Size canvas to fill viewport
    const sizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };
    sizeCanvas();

    // Draw current image frame to canvas with cover-fit
    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const vw = img.naturalWidth;
      const vh = img.naturalHeight;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / vw, ch / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    // Smooth loop with linear interpolation (lerp)
    const loop = () => {
      if (!active) return;

      const targetFrame = targetProgress * (totalFrames - 1);
      // Smoothen the frame transitions
      currentFrame += (targetFrame - currentFrame) * 0.12;

      const frameToDraw = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrame)));
      drawFrame(frameToDraw);

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // Track scroll velocity/position
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const total = container.offsetHeight - window.innerHeight;
      targetProgress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    const onResize = () => {
      sizeCanvas();
      const frameToDraw = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrame)));
      drawFrame(frameToDraw);
    };
    window.addEventListener("resize", onResize);

    // Initial positioning
    onScroll();

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted]);

  // â”€â”€ FRAMER MOTION Scroll for UI Transforms â”€â”€
  // Use window-level scroll (no target ref) to avoid hydration timing issues.
  // Since containerRef is the full-page 400vh element, window progress == container progress.
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  // HUD active section tracking
  useMotionValueEvent(smoothScroll, "change", (latest) => {
    if (latest < 0.25) setActiveSection(0);
    else if (latest < 0.5) setActiveSection(1);
    else if (latest < 0.75) {
      setActiveSection(2);
      // Determine active engine based on mid-point of Section 2 (Engines)
      if (latest < 0.625) setActiveEngine("A");
      else setActiveEngine("B");
    }
    else {
      setActiveSection(3);
    }
  });

  /* â”€â”€ Scroll Transforms â”€â”€ */
  // Scene 1: HERO
  const s1Opacity = useTransform(smoothScroll, [0, 0.15, 0.25], [1, 1, 0]);
  const s1Y = useTransform(smoothScroll, [0, 0.15, 0.25], ["0vh", "-10vh", "-30vh"]);
  const s1PointerEvents = useTransform(smoothScroll, (v) => (v < 0.2) ? "auto" : "none");

  // Scene 2: INTEGRATED CORE
  const s2Opacity = useTransform(smoothScroll, [0.20, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothScroll, [0.20, 0.35, 0.45, 0.55], ["30vh", "0vh", "0vh", "-30vh"]);

  // Scene 3: ENGINES
  const s3Opacity = useTransform(smoothScroll, [0.50, 0.60, 0.70, 0.80], [0, 1, 1, 0]);
  const s3Y = useTransform(smoothScroll, [0.50, 0.60, 0.70, 0.80], ["30vh", "0vh", "0vh", "-30vh"]);
  const s3PointerEvents = useTransform(smoothScroll, (v) => (v >= 0.50 && v <= 0.75) ? "auto" : "none");

  // Scene 4: CONVERSION
  const s4Opacity = useTransform(smoothScroll, [0.75, 0.85], [0, 1]);
  const s4Y = useTransform(smoothScroll, [0.75, 0.85], ["30vh", "0vh"]);
  const s4PointerEvents = useTransform(smoothScroll, (v) => (v >= 0.75) ? "auto" : "none");

  const bgOpacity = useTransform(smoothScroll, [0, 1], [0.85, 0.7]);
  const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.1]);

  // Avoid rendering scroll-driven scenes until client is mounted (prevents SSR mismatch)
  if (!mounted) return <div className="relative w-full min-h-screen bg-[#040308]" />;

  const HUD_SECTIONS = [
    { id: 0, label: "ORIGIN" },
    { id: 1, label: "CORE" },
    { id: 2, label: "ENGINES" },
    { id: 3, label: "INITIATE" }
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#040308] text-[#F0F2FF]"
      style={{ height: isMobile ? "auto" : "400vh" }}
    >
      {/* ── Loader ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040308]"
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", width: "280px" }}>
              {/* Spinner */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                style={{ width: "60px", height: "60px", border: "1px solid rgba(255,158,0,0.3)", borderTopColor: "#FF9E00", borderRadius: "50%" }}
              />
              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-outfit), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  color: "#F0F2FF",
                }}
              >
                LOADING FRAMES — {preloadProgress}%
              </span>
              {/* Progress bar */}
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                <motion.div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #FF9E00, #FF4069)",
                    borderRadius: "2px",
                  }}
                  animate={{ width: `${preloadProgress}%` }}
                  transition={{ ease: "linear", duration: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isMobile ? "relative min-h-screen w-full" : "sticky top-0 left-0 w-full h-screen overflow-hidden"}>

        {/* ── BACKGROUND FRAMES (Canvas) ── */}
        <div className="absolute inset-0 z-0 bg-[#040308]">
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: bgOpacity, scale: bgScale }}
          >
            {/* Unified canvas for both mobile & desktop — draws preloaded image frames */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ display: "block" }}
            />
          </motion.div>
          
          {/* Light cinematic overlays — keeps video clearly visible */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(4,3,8,0.6)_100%)] pointer-events-none" />
        </div>

        {/* ── PREMIUM HUD OVERLAY ── */}
        <HUD activeEngine={activeEngine} />

        {/* ── LATERAL HUD NAVIGATION (DESKTOP) ── */}
        {!isMobile && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 mix-blend-difference pointer-events-auto">
            {HUD_SECTIONS.map((sec) => (
              <div 
                key={sec.id}
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => {
                  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                  const targetScroll = sec.id * 0.33;
                  window.scrollTo({ top: maxScroll * targetScroll, behavior: "smooth" });
                }}
              >
                <div 
                  style={{
                    width: "2px",
                    height: activeSection === sec.id ? "32px" : "12px",
                    background: activeSection === sec.id 
                      ? (sec.id === 2 ? (activeEngine === 'A' ? 'var(--engine-a-accent)' : 'var(--engine-b-accent)') : "#FF9E00")
                      : "rgba(255,255,255,0.2)",
                    boxShadow: activeSection === sec.id 
                      ? `0 0 10px ${sec.id === 2 ? (activeEngine === 'A' ? 'var(--engine-a-accent)' : 'var(--engine-b-accent)') : "#FF9E00"}`
                      : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                />
                <span 
                  style={{
                    fontFamily: "var(--font-outfit), monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    fontWeight: 700,
                    color: activeSection === sec.id 
                      ? (sec.id === 2 ? (activeEngine === 'A' ? 'var(--engine-a-accent)' : 'var(--engine-b-accent)') : "#F0F2FF") 
                      : "rgba(240,242,255,0.3)",
                    transition: "all 0.4s ease",
                    transform: activeSection === sec.id ? "translateX(4px)" : "translateX(0)",
                  }}
                  className="group-hover:text-white group-hover:translate-x-1"
                >
                  {sec.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            SCENE 01 ── ORIGIN
            ═══════════════════════════════════════════════════ */}
        <motion.div
          className={`${isMobile ? 'relative min-h-screen py-16' : 'absolute inset-0'} z-10 flex flex-col items-center justify-center text-center px-6`}
          style={{ opacity: isMobile ? 1 : s1Opacity, y: isMobile ? "0vh" : s1Y, pointerEvents: isMobile ? "auto" : s1PointerEvents }}
        >
          <div className="flex flex-col items-center gap-8 max-w-5xl mix-blend-screen">
            <span style={{ fontFamily: "var(--font-outfit), monospace", fontSize: "0.6rem", letterSpacing: "0.4em", color: "#FF9E00" }} className="uppercase">
              Dual-Engine OS · Visakhapatnam
            </span>
            <h1
              style={{
                fontFamily: "var(--font-outfit), system-ui",
                fontSize: isMobile ? "clamp(2.2rem, 8vw, 4rem)" : "clamp(3.5rem, 10vw, 8rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#F0F2FF",
                textTransform: "uppercase"
              }}
            >
              A DIGITAL OS<br/>BEYOND THE<br/><span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>ORDINARY</span>
            </h1>
            <p
              style={{
                fontSize: isMobile ? "0.95rem" : "clamp(0.9rem, 2vw, 1.2rem)",
                color: "rgba(240,242,255,0.7)",
                maxWidth: "600px",
                lineHeight: 1.6,
                fontFamily: "var(--font-outfit), monospace",
              }}
            >
              Layer after layer, complexity distilled into dual-engine systems that unlock new levels of creative and technical value.
            </p>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            SCENE 02 ── CORE
            ═══════════════════════════════════════════════════ */}
        <motion.div
          className={`${isMobile ? 'relative min-h-screen py-20' : 'absolute inset-0'} z-10 flex flex-col items-center justify-center text-center px-6`}
          style={{ opacity: isMobile ? 1 : s2Opacity, y: isMobile ? "0vh" : s2Y, pointerEvents: isMobile ? "auto" : "none" }}
        >
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 mix-blend-screen">
            <div className="text-center md:text-left md:w-1/2">
              <h2
                style={{
                  fontSize: isMobile ? "clamp(2rem, 7vw, 3.5rem)" : "clamp(2.5rem, 6vw, 5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  fontFamily: "var(--font-outfit), system-ui",
                  textTransform: "uppercase"
                }}
              >
                RHYTHM IN CHAOS.<br/>ORDER IN FLUX.
              </h2>
            </div>
            <div className="text-center md:text-left md:w-1/3 flex flex-col gap-6 items-center md:items-start">
              <p style={{ fontSize: isMobile ? "0.95rem" : "1rem", color: "rgba(240,242,255,0.6)", lineHeight: 1.7 }}>
                Emphasis on human contact by converting complex engineering ideas into structures that expand possibilities. AI Automation meets Creative Excellence.
              </p>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.2)" }} />
              <div className="grid grid-cols-2 gap-8 w-full">
                <div>
                  <p style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: "#FF9E00", fontFamily: "var(--font-outfit), monospace", lineHeight: 1 }}>99.9%</p>
                  <p style={{ fontSize: "0.6rem", color: "rgba(240,242,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "8px" }}>AUTOPILOT UPTIME</p>
                </div>
                <div>
                  <p style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: "#FF4069", fontFamily: "var(--font-outfit), monospace", lineHeight: 1 }}>8K</p>
                  <p style={{ fontSize: "0.6rem", color: "rgba(240,242,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "8px" }}>CINE RESOLUTION</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            SCENE 03 ── ENGINES
            ═══════════════════════════════════════════════════ */}
        <motion.div
          className={`${isMobile ? 'relative min-h-screen py-20' : 'absolute inset-0'} z-10 flex flex-col justify-center px-6`}
          style={{ opacity: isMobile ? 1 : s3Opacity, y: isMobile ? "0vh" : s3Y, pointerEvents: isMobile ? "auto" : s3PointerEvents }}
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 items-center mix-blend-screen">
            <div className="flex flex-col gap-4 text-center max-w-2xl">
               <span 
                 className="font-mono-tech text-[10px] tracking-[0.4em] uppercase transition-colors duration-700"
                 style={{ color: activeEngine === 'A' ? 'var(--engine-a-accent)' : 'var(--engine-b-accent)' }}
               >
                 Core Engines
               </span>
               <h2 
                 style={{ 
                   fontSize: isMobile ? "clamp(2.5rem, 6vw, 4rem)" : "clamp(3rem, 5vw, 6rem)", 
                   fontWeight: 900, 
                   lineHeight: 0.9, 
                   textTransform: "uppercase", 
                   letterSpacing: "-0.04em" 
                 }}
               >
                 CHOOSE YOUR<br/>
                 <span 
                   className="transition-all duration-700"
                   style={{ 
                     color: "transparent", 
                     WebkitTextStroke: `1px ${activeEngine === 'A' ? 'var(--engine-a-accent)' : 'var(--engine-b-accent)'}` 
                   }}
                 >
                   FREQUENCY.
                 </span>
               </h2>
               <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", maxWidth: "500px", margin: "0 auto" }}>
                 Two distinct operating engines built to handle the spectrum of modern digital value—from deep technical architecture to high-end cinematic aesthetics.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mt-8">
              <EngineCard 
                engineType="A"
                title="Software AI Systems"
                description="Deep technical architecture meets intelligent automation. We build the pipelines that power the future of business operations."
                href="/engine-a"
              />
              <EngineCard 
                engineType="B"
                title="Creative Visual Muscle"
                description="Premium cinematic aesthetics and high-fidelity brand systems designed to command attention in a saturated digital landscape."
                href="/engine-b"
              />
            </div>
          </div>
        </motion.div>

        {/* ── SCENE 04 — INITIATE ── */}
        <motion.div
          className={`${isMobile ? 'relative min-h-screen py-20' : 'absolute inset-0'} z-10 flex flex-col items-center justify-center text-center px-6`}
          style={{ opacity: isMobile ? 1 : s4Opacity, y: isMobile ? "0vh" : s4Y, pointerEvents: isMobile ? "auto" : s4PointerEvents }}
        >
          <div className="max-w-4xl mx-auto space-y-12 relative flex flex-col items-center mix-blend-screen">
            <h2
              style={{
                fontSize: isMobile ? "clamp(2rem, 7vw, 4rem)" : "clamp(3rem, 8vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontFamily: "var(--font-outfit), system-ui",
                color: "#F0F2FF",
                textTransform: "uppercase"
              }}
            >
              LIMITS NOT FOUND.<br/>
              <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>INITIATE SYSTEMS.</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-8 w-full justify-center">
              <Magnetic>
                <Link
                  href="/book"
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "12px", 
                    background: "#F0F2FF", 
                    color: "#040308", 
                    padding: "16px 32px", 
                    borderRadius: "99px", 
                    fontSize: "0.8rem", 
                    fontWeight: 800, 
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-outfit), monospace",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                  }}
                  className="hover:scale-105 transition-transform active:scale-95"
                >
                  Book Deployment <ArrowRight size={18} />
                </Link>
              </Magnetic>

              <Magnetic strength={0.3}>
                <button
                  onClick={() => router.push("/engine-a")}
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "12px", 
                    background: "rgba(255,255,255,0.05)", 
                    color: "#F0F2FF", 
                    padding: "16px 32px", 
                    borderRadius: "99px", 
                    fontSize: "0.8rem", 
                    fontWeight: 800, 
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "var(--font-outfit), monospace",
                  }}
                  className="hover:bg-white/10 transition-colors"
                >
                  Explore Systems
                </button>
              </Magnetic>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
              <a href="tel:+917396621004" className="flex items-center gap-3 text-[rgba(255,255,255,0.5)] hover:text-[#FF9E00] transition-colors" style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                <Phone size={14} /> +91-7396621004
              </a>
              <a href="mailto:grovicedigital@gmail.com" className="flex items-center gap-3 text-[rgba(255,255,255,0.5)] hover:text-[#FF4069] transition-colors" style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                <Mail size={14} /> grovicedigital@gmail.com
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-3 mix-blend-screen"
            style={{ fontSize: "0.6rem", color: "rgba(240,242,255,0.3)", fontFamily: "var(--font-outfit), monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={10} color="#F0F2FF" />
              Visakhapatnam â€” Siripuram
            </div>
            <p>Â© {new Date().getFullYear()} GROVICE. SYSTEMS SYNCED.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
