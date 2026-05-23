"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Plus,
  Minus,
  Cpu,
  Bot,
  LayoutDashboard,
  Database,
  Workflow,
  Globe,
  Activity,
  Layers,
  Users,
  Zap,
  ArrowRight,
  Shield,
  TrendingUp,
} from "lucide-react";
import Footer from "@/components/Footer";

/* ══════════════════════════════════════════════════
   SPOTLIGHT CARD
   ══════════════════════════════════════════════════ */
function SpotlightCard({
  children,
  className = "",
  hoverBorder = true,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  hoverBorder?: boolean;
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
      className={`spotlight-card ${hoverBorder ? "spotlight-border" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ANIMATED STAT COUNTER
   ══════════════════════════════════════════════════ */
function StatCounter({ value, label, color = "#FF9E00" }: { value: string; label: string; color?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          fontWeight: 800,
          fontFamily: "var(--font-outfit), monospace",
          letterSpacing: "-0.02em",
          color,
        }}
      >
        {value}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontSize: "0.6rem",
          color: "rgba(240,242,255,0.3)",
          fontFamily: "var(--font-outfit), monospace",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          marginTop: "4px",
          fontWeight: 700,
        }}
      >
        {label}
      </motion.p>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════ */
export default function EngineAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", website: "", desc: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const auditSectionRef = useRef<HTMLDivElement>(null);
  const buildSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAudit = () => auditSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToBuild = () => buildSectionRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", website: "", desc: "" });
    }, 6000);
  };

  const bentoCapabilities = [
    { icon: Cpu, title: "AI Automation Systems", desc: "Autopilot operations. Link n8n processes to lead triggers so data moves without human intervention.", color: "#FF9E00", glow: "rgba(255,158,0,0.12)" },
    { icon: Bot, title: "AI Voice Agents", desc: "Autonomous smart dialers. Handle inbound lead classification with natural vocal syntax.", color: "#FF4069", glow: "rgba(255,64,105,0.12)" },
    { icon: Database, title: "CRM + Lead Systems", desc: "Structured pipes syncing lead entries between database replicas and master CRM records.", color: "#FFD700", glow: "rgba(255,215,0,0.10)" },
    { icon: LayoutDashboard, title: "Dashboards & Analytics", desc: "Clean client admin views. High-performance Next.js panels visualizing key business metrics.", color: "#9B7FFF", glow: "rgba(112,0,255,0.12)" },
    { icon: Layers, title: "Custom Software Projects", desc: "Full stack engineering. Robust repositories built to solve specialized administrative requirements.", color: "#FF9E00", glow: "rgba(255,158,0,0.12)" },
    { icon: Workflow, title: "Workflow Orchestration", desc: "Complex conditional loops routing customer inquiries based on active qualification metrics.", color: "#FF4069", glow: "rgba(255,64,105,0.12)" },
    { icon: Globe, title: "AI Integrations", desc: "Direct endpoints connecting custom applications to GPT-4 API pipelines seamlessly.", color: "#00E5FF", glow: "rgba(0,229,255,0.10)" },
    { icon: Users, title: "Internal Ops Tools", desc: "Employee portals and resource managers built to optimize team productivity.", color: "#9B7FFF", glow: "rgba(112,0,255,0.12)" },
  ];

  const inputStyle = (field: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focusedField === field ? "#FF9E00" : "rgba(255,255,255,0.12)"}`,
    padding: "0.75rem 0",
    fontSize: "0.875rem",
    color: "#F0F2FF",
    fontFamily: "var(--font-dm-sans), system-ui",
    outline: "none",
    transition: "border-color 0.25s",
  });

  return (
    <div
      style={{ background: "#040308", color: "#F0F2FF", minHeight: "100vh", position: "relative", fontFamily: "var(--font-dm-sans), system-ui", paddingTop: "5.5rem", overflowX: "hidden" }}
    >
      {/* ── Dot grid background ── */}
      <div className="dot-grid fixed inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.4 }} />

      {/* ── Ambient glows ── */}
      <div style={{ position: "absolute", top: "8%", left: "-8%", width: "55%", height: "55%", borderRadius: "50%", background: "rgba(255,158,0,0.04)", filter: "blur(130px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "45%", right: "-8%", width: "50%", height: "50%", borderRadius: "50%", background: "rgba(255,64,105,0.04)", filter: "blur(130px)", pointerEvents: "none" }} />

      {/* ══════════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "5rem 1.5rem 5rem", maxWidth: "1280px", margin: "0 auto", zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-7"
          >
            <span className="label-badge label-badge-orange">
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF9E00" }} className="animate-pulse" />
              ENGINE A // ENTERPRISE CODE
            </span>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                fontFamily: "var(--font-outfit), system-ui",
                color: "#F0F2FF",
              }}
            >
              Future-ready{" "}
              <span className="text-gradient">Business</span>
              <br />
              Infrastructure
            </h1>

            <p style={{ fontSize: "0.9rem", color: "rgba(240,242,255,0.5)", lineHeight: 1.75, maxWidth: "480px" }}>
              AI systems, automation, CRMs, dashboards, and custom software—built to scale. We turn manual administrative tasks into high-fidelity autonomous code assets.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", paddingTop: "0.5rem" }}>
              <button onClick={scrollToAudit} className="btn-primary">
                <Zap size={14} />
                Book an AI Audit
              </button>
              <button onClick={scrollToBuild} className="btn-ghost">
                See What We Build
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Trust chips */}
            <div style={{ display: "flex", gap: "1.5rem", paddingTop: "0.5rem" }}>
              {[
                { icon: Shield, label: "Zero Pressure" },
                { icon: TrendingUp, label: "Free Audit Blueprint" },
                { icon: Check, label: "30-min Strategy Call" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.7rem", color: "rgba(240,242,255,0.35)", fontFamily: "var(--font-outfit), monospace" }}>
                  <Icon size={11} color="rgba(255,158,0,0.5)" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Animated Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <SpotlightCard className="glass-card p-7 rounded-[24px]">
              {/* Window bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                    <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.8 }} />
                  ))}
                </div>
                <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-outfit), monospace", color: "rgba(240,242,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  GROVICE ENGINE A — INFRASTRUCTURE STATUS
                </span>
                <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-outfit), monospace", color: "#22c55e", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>
                  ● ACTIVE SYSTEM
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontFamily: "var(--font-outfit), monospace", fontSize: "0.7rem", color: "rgba(240,242,255,0.4)" }}>
                {/* Status row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "0.7rem 1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Activity size={12} color="#FF9E00" />
                    <span>Edge API Endpoints</span>
                  </div>
                  <span style={{ color: "#FF9E00", fontWeight: 700 }}>SYNCED (8.4ms)</span>
                </div>

                {/* Pipeline row */}
                <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "0.7rem 1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.55rem", color: "rgba(240,242,255,0.25)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
                    <span>TRANSACT TRIGGER</span>
                    <span>AI PIPELINE GATES</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                    <span style={{ color: "#F0F2FF", fontWeight: 700, fontSize: "0.65rem" }}>Webhook</span>
                    <svg className="flex-1 h-4" fill="none" viewBox="0 0 100 16" preserveAspectRatio="none">
                      <path d="M 0 8 L 100 8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                      <path d="M 0 8 L 100 8" stroke="#FF4069" strokeWidth="2" className="animate-stroke-flow" />
                    </svg>
                    <span style={{ color: "#FF4069", fontWeight: 700, fontSize: "0.65rem" }}>GPT-4 Classifier</span>
                  </div>
                </div>

                {/* Metrics row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                  {[
                    { label: "Active Nodes", val: "12", color: "#FF9E00" },
                    { label: "Queue Depth", val: "847", color: "#9B7FFF" },
                    { label: "Success Rate", val: "99.97%", color: "#22c55e" },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "0.65rem 0.75rem", textAlign: "center" }}>
                      <p style={{ fontSize: "0.9rem", fontWeight: 800, color, letterSpacing: "-0.02em" }}>{val}</p>
                      <p style={{ fontSize: "0.5rem", color: "rgba(240,242,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "2px" }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Terminal log */}
                <div style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "10px", padding: "0.75rem 1rem", fontFamily: "monospace" }}>
                  <p style={{ fontSize: "0.55rem", color: "rgba(240,242,255,0.2)", marginBottom: "0.4rem", letterSpacing: "0.1em" }}>{"// LIVE LOG"}</p>
                  {[
                    { time: "16:22:41", msg: "Lead captured → CRM routed → GPT scored", ok: true },
                    { time: "16:22:38", msg: "Voice agent call completed (2m 14s)", ok: true },
                    { time: "16:22:35", msg: "Database sync ← 847 records updated", ok: true },
                  ].map(({ time, msg, ok }) => (
                    <div key={time} style={{ display: "flex", gap: "0.5rem", fontSize: "0.58rem", color: "rgba(240,242,255,0.4)", marginBottom: "0.2rem" }}>
                      <span style={{ color: "rgba(240,242,255,0.2)", flexShrink: 0 }}>{time}</span>
                      <span style={{ color: ok ? "rgba(34,197,94,0.7)" : "rgba(255,64,105,0.7)" }}>→</span>
                      <span>{msg}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", fontSize: "0.58rem", color: "rgba(240,242,255,0.3)", marginTop: "0.3rem" }}>
                    <span style={{ color: "#FF9E00" }}>$</span>
                    <span style={{ marginLeft: "0.35rem" }}>Awaiting next trigger</span>
                    <span className="terminal-cursor" />
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS BAR
          ══════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,6,17,0.6)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }} className="md:grid-cols-4">
            <StatCounter value="140k+" label="Leads Processed" color="#FF9E00" />
            <StatCounter value="< 8.4ms" label="Edge Sync Latency" color="#FF4069" />
            <StatCounter value="99.98%" label="Deploy Uptime" color="#22c55e" />
            <StatCounter value="80%" label="Manual Task Reduction" color="#9B7FFF" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BENTO GRID — CAPABILITIES
          ══════════════════════════════════════════════════════════ */}
      <section ref={buildSectionRef} style={{ position: "relative", padding: "6rem 1.5rem", zIndex: 10 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <span className="label-badge label-badge-orange" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              SYSTEM SPECIFICATIONS
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#F0F2FF",
                fontFamily: "var(--font-outfit), system-ui",
                marginTop: "1rem",
              }}
            >
              Full-Stack Capabilities
            </h2>
            <p style={{ fontSize: "0.85rem", color: "rgba(240,242,255,0.4)", maxWidth: "480px", margin: "1rem auto 0", lineHeight: 1.7 }}>
              Every service we offer runs on engineered precision — not guesswork. Here&apos;s what we deploy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {bentoCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SpotlightCard
                    className="glass-card p-6 rounded-[20px] flex flex-col justify-between h-full"
                    style={{ minHeight: "240px", position: "relative", overflow: "hidden" }}
                  >
                    {/* Top accent color bar */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: `linear-gradient(90deg, ${cap.color}, transparent)`, borderRadius: "20px 20px 0 0" }} />
                    {/* Corner glow */}
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100px", height: "100px", borderRadius: "50%", background: cap.glow, filter: "blur(30px)", pointerEvents: "none" }} />

                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        background: `${cap.color}12`,
                        border: `1px solid ${cap.color}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: cap.color,
                        position: "relative",
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
                      <h3
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.07em",
                          color: "#F0F2FF",
                          fontFamily: "var(--font-outfit), monospace",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {cap.title}
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "rgba(240,242,255,0.4)", lineHeight: 1.7 }}>
                        {cap.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROCESS TIMELINE
          ══════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "5rem 1.5rem", background: "rgba(8,6,17,0.5)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", zIndex: 10 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <span className="label-badge label-badge-pink" style={{ marginBottom: "1rem", display: "inline-flex" }}>ORCHESTRATION PIPELINE</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#F0F2FF",
                fontFamily: "var(--font-outfit), system-ui",
                marginTop: "1rem",
              }}
            >
              Integration Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Connector line */}
            <div
              className="hidden md:block"
              style={{ position: "absolute", top: "28px", left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, rgba(255,158,0,0.3), rgba(255,64,105,0.3), transparent)", zIndex: 0 }}
            />

            {[
              { step: "01", name: "AI Audit", desc: "Identify operational bottlenecks & cost loss points.", color: "#FF9E00" },
              { step: "02", name: "Blueprint", desc: "Design data schemas & system architecture.", color: "#FF9E00" },
              { step: "03", name: "Build", desc: "Deploy workflow modules, APIs, & software repos.", color: "#FF4069" },
              { step: "04", name: "Deploy", desc: "Activate client staging environment gates.", color: "#FF4069" },
              { step: "05", name: "Optimize", desc: "Continuous iteration under real client loads.", color: "#9B7FFF" },
            ].map(({ step, name, desc, color }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ textAlign: "center", position: "relative", zIndex: 10 }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(8,6,17,1)",
                    border: `1px solid ${color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-outfit), monospace",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    color,
                    margin: "0 auto 1.25rem",
                    boxShadow: `0 0 20px ${color}15`,
                  }}
                >
                  {step}
                </div>
                <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F0F2FF", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-outfit), monospace", marginBottom: "0.4rem" }}>
                  {name}
                </h4>
                <p style={{ fontSize: "0.72rem", color: "rgba(240,242,255,0.4)", lineHeight: 1.65 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CASE STUDIES
          ══════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "5rem 1.5rem", zIndex: 10 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "CASE STUDY 01 // PROPERTIES",
                title: "Siripuram Lands Automation",
                color: "#FF9E00",
                problem: "12 hours/week manually routing WhatsApp chat logs to CRM.",
                system: "Implemented n8n hooks translating chat audio to text pipeline.",
                result: "Sync time reduced from 4 hours to sub-10 seconds.",
              },
              {
                label: "CASE STUDY 02 // LOGISTICS",
                title: "Vizag Maritime Database Sync",
                color: "#FF4069",
                problem: "API cluster dropouts during coordinate updates.",
                system: "Created custom Edge replication node gate with auto-failovers.",
                result: "100% data preservation over 6 months deployment.",
              },
            ].map(({ label, title, color, problem, system, result }) => (
              <SpotlightCard
                key={title}
                className="glass-card p-7 rounded-[24px] flex flex-col justify-between"
                style={{ minHeight: "260px", position: "relative" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: "24px 24px 0 0" }} />
                <div>
                  <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-outfit), monospace", color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F0F2FF", marginTop: "0.5rem", letterSpacing: "-0.02em", fontFamily: "var(--font-outfit), system-ui" }}>{title}</h4>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.25rem" }}>
                  {[
                    { key: "Problem", val: problem, valColor: "rgba(240,242,255,0.45)" },
                    { key: "System", val: system, valColor: "rgba(240,242,255,0.45)" },
                    { key: "Result", val: result, valColor: color },
                  ].map(({ key, val, valColor }) => (
                    <p key={key} style={{ fontSize: "0.78rem", color: valColor, lineHeight: 1.65 }}>
                      <strong style={{ color: "#F0F2FF", fontWeight: 600 }}>{key}: </strong>
                      {val}
                    </p>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AI AUDIT FORM
          ══════════════════════════════════════════════════════════ */}
      <section
        ref={auditSectionRef}
        style={{ position: "relative", padding: "5rem 1.5rem 6rem", background: "rgba(8,6,17,0.5)", borderTop: "1px solid rgba(255,255,255,0.05)", zIndex: 10 }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="label-badge label-badge-orange">TAKE ACTION</span>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#F0F2FF",
                  lineHeight: 1.1,
                  fontFamily: "var(--font-outfit), system-ui",
                  marginTop: "0.75rem",
                }}
              >
                Book an AI & Infrastructure Audit
              </h2>
              <p style={{ fontSize: "0.85rem", color: "rgba(240,242,255,0.45)", lineHeight: 1.75 }}>
                Get a custom software blueprint identifying automation loopholes & data pipelines for your company. Zero pressure.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  "Custom Node Blueprint Roadmap",
                  "Operational Loop Cost Estimates",
                  "30-min Strategy Review Call",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.8rem", color: "rgba(240,242,255,0.6)", fontFamily: "var(--font-outfit), monospace" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(255,158,0,0.12)", border: "1px solid rgba(255,158,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={10} color="#FF9E00" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <SpotlightCard className="glass-card p-8 rounded-[28px]">
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleAuditSubmit}
                      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                          { field: "name", label: "Full Name *", placeholder: "Sarah Connor", type: "text", required: true },
                          { field: "email", label: "Email Address *", placeholder: "sarah@company.com", type: "email", required: true },
                        ].map(({ field, label, placeholder, type, required }) => (
                          <div key={field}>
                            <label style={{ display: "block", fontSize: "0.6rem", color: focusedField === field ? "#FF9E00" : "rgba(240,242,255,0.3)", fontFamily: "var(--font-outfit), monospace", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, marginBottom: "0.35rem", transition: "color 0.25s" }}>
                              {label}
                            </label>
                            <input
                              type={type}
                              required={required}
                              value={formData[field as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                              onFocus={() => setFocusedField(field)}
                              onBlur={() => setFocusedField(null)}
                              placeholder={placeholder}
                              style={inputStyle(field)}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.6rem", color: focusedField === "website" ? "#FF9E00" : "rgba(240,242,255,0.3)", fontFamily: "var(--font-outfit), monospace", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, marginBottom: "0.35rem", transition: "color 0.25s" }}>
                          Website URL
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          onFocus={() => setFocusedField("website")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="https://mycompany.com"
                          style={inputStyle("website")}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.6rem", color: focusedField === "desc" ? "#FF9E00" : "rgba(240,242,255,0.3)", fontFamily: "var(--font-outfit), monospace", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, marginBottom: "0.35rem", transition: "color 0.25s" }}>
                          Operations Bottleneck Description
                        </label>
                        <textarea
                          rows={3}
                          value={formData.desc}
                          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                          onFocus={() => setFocusedField("desc")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Describe what workflows are running slow or manually..."
                          style={{ ...inputStyle("desc"), resize: "none" }}
                        />
                      </div>

                      <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.7rem" }}>
                        <Zap size={14} />
                        Request Audit Blueprint
                        <ArrowRight size={14} />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "3rem 1rem", gap: "1.25rem" }}
                    >
                      <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={28} color="#22c55e" />
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 700, color: "#F0F2FF", fontSize: "1.2rem", letterSpacing: "-0.02em", fontFamily: "var(--font-outfit), system-ui" }}>
                          Audit Requested!
                        </h4>
                        <p style={{ fontSize: "0.8rem", color: "rgba(240,242,255,0.45)", maxWidth: "340px", marginTop: "0.5rem", lineHeight: 1.7 }}>
                          We&apos;ll analyze your website URL and contact you at {formData.email} within 2 hours to confirm details.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ
          ══════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", zIndex: 10 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <span className="label-badge label-badge-orange" style={{ marginBottom: "1rem", display: "inline-flex" }}>FAQ</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#F0F2FF",
                fontFamily: "var(--font-outfit), system-ui",
                marginTop: "1rem",
              }}
            >
              Engine A FAQ
            </h2>
          </motion.div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { q: "What tools do you configure automations in?", a: "We natively build on n8n and Make pipelines, syncing raw logs to HubSpot, Salesforce, Airtable, or custom SQL databases." },
              { q: "What is the average setup timeline?", a: "Minor automation connections take 1-2 weeks. Sophisticated Next.js client systems or multi-replica database sync gates require 4-6 weeks." },
              { q: "How does the voice agent coordinate calls?", a: "Our smart voice agents use custom LLMs configured to capture customer phone prompts, query booking charts, and push updates straight to CRM systems." },
              { q: "Do you offer operational retainers?", a: "Yes. We manage database logs and workflow updates on monthly retainers so you don't experience pipeline downtime." },
              { q: "Can we migrate from manual Excel processes?", a: "Absolutely. We import legacy records, design structured SQL schemas, and build APIs to automate imports." },
              { q: "Is there support for custom software codebases?", a: "Yes. Everything we build is pushed to clean GitHub repositories with documented guidelines for your technical teams." },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    outline: "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: openFaq === idx ? "#FF9E00" : "#F0F2FF",
                      fontFamily: "var(--font-dm-sans), system-ui",
                      transition: "color 0.2s",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span style={{ color: "rgba(240,242,255,0.3)", flexShrink: 0, marginLeft: "1rem" }}>
                    {openFaq === idx ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ fontSize: "0.82rem", color: "rgba(240,242,255,0.5)", lineHeight: 1.75, paddingBottom: "1.25rem" }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
