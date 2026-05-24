"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN PAGE - SIDEWAVE AESTHETIC EDITION
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);


  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dismiss loader immediately on mobile and safely trigger video play
  useEffect(() => {
    if (!mounted) return;
    if (isMobile) {
      setLoading(false);
      const video = videoRef.current;
      if (video) {
        video.play().catch((err) => {
          console.warn("Autoplay blocked, user interaction may be required:", err);
        });
      }
    }
  }, [mounted, isMobile]);



  // ── CANVAS SCROLL SCRUBBING ──
  // IMPORTANT: dependency is [mounted] not [] ── the video/canvas elements only exist
  // in the DOM after mounted=true. With [], the effect runs when refs are null.
  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let active = true;
    let rafId = 0;
    let lastDrawnTime = -1;
    let blobUrl = "";
    let scrollTimeout: NodeJS.Timeout | null = null;

    // Velocity tracking for smooth, momentum-aware scrubbing
    let targetProgress = 0;         // 0–1 from scroll

    // Size canvas to fill viewport
    const sizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };
    sizeCanvas();

    // Draw current video frame to canvas with cover-fit
    const drawFrame = () => {
      if (!active || video.readyState < 2) return;
      if (video.currentTime === lastDrawnTime) return;
      lastDrawnTime = video.currentTime;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / vw, ch / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      ctx.drawImage(video, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    // ── RAF LOOP: Bidirectional smooth playback ──
    // Forward  → native play() with velocity-driven playbackRate (buttery GPU decode)
    // Backward → lerp seek (fast because Blob is in-memory RAM, no network)
    const loop = () => {
      if (active && video.duration) {
        const target = targetProgress * video.duration;
        const diff = target - video.currentTime;
        const absDiff = Math.abs(diff);

        if (diff > 0.015) {
          // ── FORWARD: drive playbackRate by how far behind we are ──
          // Base: 1.0x. Each 0.5s of lag adds ~1x speed. Capped at 6x for fast flings.
          const rate = Math.max(0.5, Math.min(6.0, 1.0 + absDiff * 2.0));
          video.playbackRate = rate;
          if (video.paused) video.play().catch(() => {});

        } else if (diff < -0.015) {
          // ── BACKWARD: smooth lerp seek ──
          // Seek size scales with how far behind we are (min 0.06s, max 0.25s per frame)
          // Blob URL means seeks are instant in-memory with no HTTP round-trip.
          video.pause();
          if (!video.seeking) {
            const step = Math.max(0.06, Math.min(0.25, absDiff * 0.35));
            video.currentTime = video.currentTime - step;
          }

        } else {
          // ── IN ZONE: stop playing, maintain exact target frame ──
          if (!video.paused) {
            video.pause();
            if (Math.abs(video.currentTime - target) > 0.01) {
              video.currentTime = target;
            }
          }
        }
      }

      drawFrame();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ── SCROLL HANDLER: track velocity & update target progress ──
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const total = container.offsetHeight - window.innerHeight;
      targetProgress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;

      // Debounce: when scroll stops, snap perfectly to target frame
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (active && video.duration) {
          video.pause();
          video.playbackRate = 1.0;
          video.currentTime = targetProgress * video.duration;
        }
      }, 150);
    };

    // ── INIT: warm-up decoder then dismiss loader ──
    const initVideo = () => {
      if (!active) return;
      sizeCanvas();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            video.currentTime = 0;
            drawFrame();
            setLoading(false);
          })
          .catch(() => {
            video.currentTime = 0;
            drawFrame();
            setLoading(false);
          });
      } else {
        video.pause();
        video.currentTime = 0;
        drawFrame();
        setLoading(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => { sizeCanvas(); lastDrawnTime = -1; drawFrame(); };
    window.addEventListener("resize", onResize);

    video.addEventListener("loadedmetadata", initVideo);
    video.addEventListener("loadeddata", drawFrame);
    video.addEventListener("seeked", drawFrame);
    video.addEventListener("timeupdate", drawFrame);

    // ── BLOB PRELOAD: eliminate all HTTP range-request seek latency ──
    fetch("/videos/beach-bg.mp4")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
        video.load();
      })
      .catch(() => {
        if (active) { video.src = "/videos/beach-bg.mp4"; video.load(); }
      });

    const fallbackTimeout = setTimeout(() => { if (active) setLoading(false); }, 5000);

    return () => {
      active = false;
      clearTimeout(fallbackTimeout);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      video.removeEventListener("loadedmetadata", initVideo);
      video.removeEventListener("loadeddata", drawFrame);
      video.removeEventListener("seeked", drawFrame);
      video.removeEventListener("timeupdate", drawFrame);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
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
    else if (latest < 0.75) setActiveSection(2);
    else setActiveSection(3);
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                style={{ width: "60px", height: "60px", border: "1px solid rgba(255,158,0,0.3)", borderTopColor: "#FF9E00", borderRadius: "50%" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-outfit), monospace",
                  fontSize: "0.8rem",
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  color: "#F0F2FF",
                }}
              >
                LOADING CONTENT
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isMobile ? "relative min-h-screen w-full" : "sticky top-0 left-0 w-full h-screen overflow-hidden"}>

        {/* ── BACKGROUND VIDEO ── */}
        <div className={isMobile ? "fixed inset-0 z-0 bg-[#040308]" : "absolute inset-0 z-0 bg-[#040308]"}>
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: bgOpacity, scale: bgScale }}
          >
            {isMobile ? (
              <video
                ref={videoRef}
                src="/videos/beach-bg.mp4"
                muted
                playsInline
                loop
                autoPlay
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.5,
                  pointerEvents: "none"
                }}
              />
            ) : (
              <>
                {/* Video: opacity 0.001 NOT 0 ── Chrome only decodes frames for visible, laid-out elements */}
                <video
                  ref={videoRef}
                  src="/videos/beach-bg.mp4"
                  muted
                  playsInline
                  preload="auto"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "1px",
                    height: "1px",
                    opacity: 0.001,
                    pointerEvents: "none",
                    overflow: "hidden"
                  }}
                />
                {/* Canvas — renders exact video frames driven by scroll */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ display: "block" }}
                />
              </>
            )}
          </motion.div>
          
          {/* Light cinematic overlays — keeps video clearly visible */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(4,3,8,0.6)_100%)] pointer-events-none" />
        </div>

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
                    background: activeSection === sec.id ? "#FF9E00" : "rgba(255,255,255,0.2)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                />
                <span 
                  style={{
                    fontFamily: "var(--font-outfit), monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    fontWeight: 700,
                    color: activeSection === sec.id ? "#F0F2FF" : "rgba(240,242,255,0.3)",
                    transition: "color 0.4s ease",
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
          <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center mix-blend-screen">
            <div className="md:w-1/3 flex flex-col gap-4 text-center md:text-left">
               <h2 style={{ fontSize: isMobile ? "clamp(2rem, 6vw, 3rem)" : "clamp(2rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>WHERE FORM<br/>BEGINS.</h2>
               <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Two distinct engines. One unified operating framework deployed from Visakhapatnam.</p>
            </div>

            <div className="md:w-2/3 flex flex-col gap-8 md:gap-12 w-full">
              {/* Floating Engine A */}
              <div 
                className="group cursor-pointer flex flex-col gap-3 pb-8" 
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                onClick={() => router.push("/engine-a")}
              >
                <div className="flex justify-between items-end">
                  <span style={{ fontSize: "0.7rem", color: "#FF9E00", letterSpacing: "0.2em" }}>ENGINE A</span>
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all text-[#FF9E00]" />
                </div>
                <h3 style={{ fontSize: isMobile ? "clamp(1.5rem, 4vw, 2.5rem)" : "clamp(2rem, 4vw, 3rem)", fontWeight: 800, textTransform: "uppercase", transition: "color 0.3s" }} className="group-hover:text-[#FF9E00]">
                  SOFTWARE &amp; AI SYSTEMS
                </h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>Intelligence unfolds, absorbing the unseen. AI workflows, voice bots, CRMs, and custom pipelines.</p>
              </div>

              {/* Floating Engine B */}
              <div 
                className="group cursor-pointer flex flex-col gap-3 pb-8" 
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                onClick={() => router.push("/engine-b")}
              >
                <div className="flex justify-between items-end">
                  <span style={{ fontSize: "0.7rem", color: "#FF4069", letterSpacing: "0.2em" }}>ENGINE B</span>
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all text-[#FF4069]" />
                </div>
                <h3 style={{ fontSize: isMobile ? "clamp(1.5rem, 4vw, 2.5rem)" : "clamp(2rem, 4vw, 3rem)", fontWeight: 800, textTransform: "uppercase", transition: "color 0.3s" }} className="group-hover:text-[#FF4069]">
                  CREATIVE MUSCLE
                </h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>Aesthetic converted to gravity. Cinematics, brand identity, fashion editorial, and premium visual assets.</p>
              </div>
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
                  transition: "transform 0.3s"
                }}
                className="hover:scale-105"
              >
                Book Strategic Scoping
                <ArrowRight size={16} />
              </Link>
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
