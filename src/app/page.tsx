"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

/* ══════════════════════════════════════════════════
   MAIN PAGE - SIDEWAVE AESTHETIC EDITION
   ══════════════════════════════════════════════════ */
export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    if (latest < 0.25) setActiveSection(0);
    else if (latest < 0.5) setActiveSection(1);
    else if (latest < 0.75) setActiveSection(2);
    else setActiveSection(3);

    if (videoRef.current && videoDuration > 0) {
      videoRef.current.currentTime = latest * videoDuration;
    }
  });

  /* ── Scroll Transforms ── */
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

  const bgOpacity = useTransform(smoothScroll, [0, 1], [0.6, 0.3]);
  const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.1]);

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
      style={{ height: isMobile ? "auto" : "400vh", overflowX: "hidden" }}
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
        <div className="absolute inset-0 z-0 bg-[#040308]">
          <motion.div
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: bgOpacity, scale: bgScale }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              className="w-full h-full object-cover"
              onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration)}
            >
              {/* NOTE: Place your generated beach video in public/videos/beach-bg.mp4 */}
              <source src="/videos/beach-bg.mp4" type="video/mp4" />
            </video>
          </motion.div>
          
          {/* Sidewave-style heavy cinematic gradient overlays */}
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#040308_100%)] opacity-80 pointer-events-none" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#040308]/60 via-transparent to-[#040308]/90 pointer-events-none" />
          
          {/* Ambient color light leaks */}
          <div className="absolute top-[20%] left-0 right-0 h-px z-[3] pointer-events-none" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,158,0,0.1) 50%, transparent 100%)", filter: "blur(8px)" }} />
        </div>

        {/* ── LATERAL HUD NAVIGATION (DESKTOP) ── */}
        {!isMobile && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 mix-blend-difference pointer-events-auto">
            {HUD_SECTIONS.map((sec) => (
              <div 
                key={sec.id}
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => {
                  const targetScroll = sec.id * 0.33;
                  window.scrollTo({ top: document.body.scrollHeight * targetScroll, behavior: "smooth" });
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

        {/* ══════════════════════════════════════════════════════════
            SCENE 01 — ORIGIN
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 ${isMobile ? 'relative h-screen' : ''}`}
          style={{ opacity: isMobile ? 1 : s1Opacity, y: isMobile ? "0vh" : s1Y, pointerEvents: isMobile ? "auto" : s1PointerEvents }}
        >
          <div className="flex flex-col items-center gap-8 max-w-5xl mix-blend-screen">
            <span style={{ fontFamily: "var(--font-outfit), monospace", fontSize: "0.6rem", letterSpacing: "0.4em", color: "#FF9E00" }} className="uppercase">
              Dual-Engine OS · Visakhapatnam
            </span>
            <h1
              style={{
                fontFamily: "var(--font-outfit), system-ui",
                fontSize: "clamp(3rem, 10vw, 8rem)",
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
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
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

        {/* ══════════════════════════════════════════════════════════
            SCENE 02 — CORE
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 ${isMobile ? 'relative h-screen' : ''}`}
          style={{ opacity: isMobile ? 1 : s2Opacity, y: isMobile ? "0vh" : s2Y, pointerEvents: "none" }}
        >
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 mix-blend-screen">
            <div className="text-left md:w-1/2">
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
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
            <div className="text-left md:w-1/3 flex flex-col gap-6">
              <p style={{ fontSize: "1rem", color: "rgba(240,242,255,0.6)", lineHeight: 1.7 }}>
                Emphasis on human contact by converting complex engineering ideas into structures that expand possibilities. AI Automation meets Creative Excellence.
              </p>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.2)" }} />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FF9E00", fontFamily: "var(--font-outfit), monospace", lineHeight: 1 }}>99.9%</p>
                  <p style={{ fontSize: "0.6rem", color: "rgba(240,242,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "8px" }}>AUTOPILOT UPTIME</p>
                </div>
                <div>
                  <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FF4069", fontFamily: "var(--font-outfit), monospace", lineHeight: 1 }}>8K</p>
                  <p style={{ fontSize: "0.6rem", color: "rgba(240,242,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "8px" }}>CINE RESOLUTION</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 03 — ENGINES
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className={`absolute inset-0 z-10 flex flex-col justify-center px-6 ${isMobile ? 'relative h-screen' : ''}`}
          style={{ opacity: isMobile ? 1 : s3Opacity, y: isMobile ? "0vh" : s3Y, pointerEvents: isMobile ? "auto" : s3PointerEvents }}
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center mix-blend-screen">
            <div className="md:w-1/3 flex flex-col gap-4 text-center md:text-left">
               <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>WHERE FORM<br/>BEGINS.</h2>
               <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Two distinct engines. One unified operating framework deployed from Visakhapatnam.</p>
            </div>

            <div className="md:w-2/3 flex flex-col gap-12 w-full">
              {/* Floating Engine A */}
              <div 
                className="group cursor-pointer flex flex-col gap-3 pb-8" 
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                onClick={() => router.push("/engine-a")}
              >
                <div className="flex justify-between items-end">
                  <span style={{ fontSize: "0.7rem", color: "#FF9E00", letterSpacing: "0.2em" }}>ENGINE A</span>
                  <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all text-[#FF9E00]" />
                </div>
                <h3 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, textTransform: "uppercase", transition: "color 0.3s" }} className="group-hover:text-[#FF9E00]">
                  SOFTWARE & AI SYSTEMS
                </h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>Intelligence unfolds, absorbing the unseen. AI workflows, voice bots, CRMs, and custom pipelines.</p>
              </div>

              {/* Floating Engine B */}
              <div 
                className="group cursor-pointer flex flex-col gap-3 pb-8" 
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                onClick={() => router.push("/engine-b")}
              >
                <div className="flex justify-between items-end">
                  <span style={{ fontSize: "0.7rem", color: "#FF4069", letterSpacing: "0.2em" }}>ENGINE B</span>
                  <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all text-[#FF4069]" />
                </div>
                <h3 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, textTransform: "uppercase", transition: "color 0.3s" }} className="group-hover:text-[#FF4069]">
                  CREATIVE MUSCLE
                </h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>Aesthetic converted to gravity. Cinematics, brand identity, fashion editorial, and premium visual assets.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            SCENE 04 — INITIATE
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 ${isMobile ? 'relative min-h-[90vh]' : ''}`}
          style={{ opacity: isMobile ? 1 : s4Opacity, y: isMobile ? "0vh" : s4Y, pointerEvents: isMobile ? "auto" : s4PointerEvents }}
        >
          <div className="max-w-4xl mx-auto space-y-12 relative flex flex-col items-center mix-blend-screen">
            <h2
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
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
              Visakhapatnam — Siripuram
            </div>
            <p>© {new Date().getFullYear()} GROVICE. SYSTEMS SYNCED.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
