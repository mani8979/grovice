"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Plus,
  Minus,
  Activity,
  Star
} from "lucide-react";

export default function Page() {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mock active pipeline tab for Showcase Section
  const [activeTab, setActiveTab] = useState<"ingest" | "process" | "sync">("ingest");

  // Ping log simulation for Dashboard mockup
  const [logs, setLogs] = useState<string[]>([
    "SYS_INIT: Autonomic kernel resolved [0.0.1]",
    "GATE_SYNC: n8n active webhook listener enabled",
    "DB_PING: Local replica latency 8.2ms",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        "DB_PING: Syncing replicated database gates",
        "LEAD_INGEST: Captured new incoming profile request",
        "AGENT_DISPATCH: Executing qualification script [v2.4]",
        "CRM_SYNC: Logging workspace updates to dashboard",
        "SYS_OK: Memory heap resolution optimized [99.98%]",
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setLogs((prev) => [randomAction, prev[0], prev[1]].slice(0, 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black text-white relative min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden"
    >
      {/* ── BACKGROUND GLOW DECORATIONS ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-cyan-500/10 via-blue-600/15 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-purple-600/10 via-pink-600/5 to-transparent blur-[150px] pointer-events-none" />

      {/* ═════════════════════════════════════════════
          SECTION 1: HERO SECTION
          ═════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold">
                GROVICE OS v2.0 // DEPLOYED
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-gradient-neon">
              The Command Center for Modern Enterprise.
            </h1>

            <p className="text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed font-light">
              One unified Operating System. Automatically ingest leads, run autonomous n8n workflows, coordinate brand cinematography, and sync custom databases under 8ms.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/engine-a"
                className="px-8 py-4 rounded-none text-xs font-mono uppercase tracking-widest text-black font-bold transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
                }}
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Launch Engine <ArrowRight size={14} />
                </span>
              </Link>

              <button
                onClick={() => {
                  const targetEl = document.getElementById("features-section");
                  targetEl?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-none text-xs font-mono uppercase tracking-widest border border-white/15 text-white bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                Read Specs
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">8ms</p>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1">LATENCY GATE</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">99.99%</p>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1">SYSTEM UPTIME</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">24/7</p>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1">ACTIVE PILOTS</p>
              </div>
            </div>
          </div>

          {/* Hero Right Interactive Mockup */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end relative">
            {/* Glowing blur shape directly behind card */}
            <div className="absolute w-72 h-72 rounded-full bg-indigo-500/20 blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="w-full max-w-[480px] glass-card p-6 rounded-none relative overflow-hidden group border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-2">GROVICE // PLATFORM_STAT</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-[9px] uppercase">
                  <Activity size={10} className="animate-pulse" /> Live Status
                </div>
              </div>

              {/* Mockup Dashboard Grid */}
              <div className="space-y-6">
                {/* Metric row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-none space-y-1">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">INPUT BANDWIDTH</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-white">412.8</span>
                      <span className="text-[10px] text-cyan-400 font-mono font-bold">MB/S</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-none space-y-1">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">ACTIVE CONNECTIONS</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-white">1,489</span>
                      <span className="text-[10px] text-purple-400 font-mono font-bold">LIVE</span>
                    </div>
                  </div>
                </div>

                {/* Simulated active graph */}
                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-none space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">AUTONOMIC LATENCY (REAL-TIME)</span>
                    <span className="text-[8px] font-mono text-cyan-400">8.2ms AVG</span>
                  </div>
                  <div className="h-20 flex items-end gap-1 pt-4">
                    {[35, 45, 60, 25, 40, 55, 75, 45, 30, 65, 80, 45, 30, 20, 35, 50, 45, 60].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-none bg-gradient-to-t from-cyan-500/20 via-blue-500/50 to-indigo-500"
                        style={{ height: `${h}%` }}
                        animate={{
                          height: [
                            `${h}%`,
                            `${Math.max(10, Math.min(100, h + (Math.random() * 30 - 15)))}%`,
                            `${h}%`
                          ]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Simulated Live Console Logs */}
                <div className="bg-black/80 border border-white/5 p-4 font-mono text-[9px] text-zinc-400 space-y-1.5 rounded-none relative">
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[7px] text-green-500 uppercase tracking-widest">ACTIVE CONSOLE</span>
                  </div>
                  <p className="text-[8px] text-zinc-600 pb-1 border-b border-white/5 mb-1.5 uppercase">SYSTEM KERNEL FEED</p>
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1.5 text-zinc-300"
                    >
                      <span className="text-zinc-600 font-bold">&gt;</span>
                      <span className={log.includes("LEAD") ? "text-cyan-400" : log.includes("AGENT") ? "text-purple-400" : "text-zinc-300"}>
                        {log}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 2: TRUSTED BY SECTION
          ═════════════════════════════════════════════ */}
      <section className="relative py-12 border-t border-b border-white/5 bg-[#050507] overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <p className="text-center text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            ENGINEERING ORCHESTRATIONS DEPLOYED GLOBALLY FOR LEADING TEAMS
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-24 py-4">
            {[
              "APEX LOGISTICS",
              "VERTEX LABS",
              "PRISMA DIGITAL",
              "QUANTUM AUTOMATION",
              "NOVA ARCHITECTS",
              "SIRIPURAM GROUP",
              "V-MOTORS AUTO",
              "OCEANA BEAUTY",
            ].map((company, i) => (
              <div key={i} className="flex items-center gap-2.5 text-zinc-500 font-bold font-mono tracking-widest text-xs uppercase hover:text-white transition duration-300">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-none" />
                {company}
              </div>
            ))}
          </div>

          <div className="animate-marquee flex items-center gap-24 py-4" aria-hidden="true">
            {[
              "APEX LOGISTICS",
              "VERTEX LABS",
              "PRISMA DIGITAL",
              "QUANTUM AUTOMATION",
              "NOVA ARCHITECTS",
              "SIRIPURAM GROUP",
              "V-MOTORS AUTO",
              "OCEANA BEAUTY",
            ].map((company, i) => (
              <div key={i} className="flex items-center gap-2.5 text-zinc-500 font-bold font-mono tracking-widest text-xs uppercase hover:text-white transition duration-300">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-none" />
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 3: FEATURES BENTO GRID
          ═════════════════════════════════════════════ */}
      <section id="features-section" className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto z-10">
        <div className="space-y-4 text-center max-w-xl mx-auto mb-16">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 border border-cyan-500/20 bg-cyan-950/20 px-3 py-1 rounded-none">
            Unified Core Engines
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Designed for execution. <br />
            <span className="text-gradient-purple">Optimized for scale.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Four specialized modules coordinating automations, brand cinematography, and database sync.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 2-column span */}
          <div className="md:col-span-2 glass-card p-6 rounded-none relative overflow-hidden group flex flex-col justify-between aspect-[16/9] border-white/5 hover:border-cyan-500/35">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">MODULE 01 // DATA INGEST</span>
              <span className="text-[8px] font-mono text-green-400 bg-green-950/20 px-1.5 py-0.5 border border-green-400/20">OPERATIONAL</span>
            </div>

            {/* Content Display */}
            <div className="space-y-4 z-10">
              <h3 className="text-2xl font-bold text-white tracking-tight">Omnichannel Lead Ingestion Engine</h3>
              <p className="text-xs text-zinc-400 max-w-md leading-relaxed font-light">
                Capture WhatsApp transcripts, Instagram DMs, web forms, and voice conversations automatically. Process raw audio and text instantly through autonomous AI modules.
              </p>
            </div>

            {/* Widget Mockup inside card */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5 font-mono text-[9px] text-zinc-400 z-10">
              <div className="bg-black/50 border border-white/5 p-3 rounded-none flex items-center justify-between">
                <div>
                  <p className="text-zinc-500 text-[8px] uppercase">LATEST TRANSACT</p>
                  <p className="text-white font-bold mt-0.5">Siripuram Lands</p>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div className="bg-black/50 border border-white/5 p-3 rounded-none flex items-center justify-between">
                <div>
                  <p className="text-zinc-500 text-[8px] uppercase">PIPELINE ROUTE</p>
                  <p className="text-white font-bold mt-0.5">CRM System A</p>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              </div>
            </div>
          </div>

          {/* Card 2: 1-column span */}
          <div className="md:col-span-1 glass-card p-6 rounded-none relative overflow-hidden group flex flex-col justify-between aspect-[16/10] border-white/5 hover:border-purple-500/35">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent blur-xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">MODULE 02 // LATENCY</span>
              <span className="text-[9px] font-mono text-zinc-500">v2.4.1</span>
            </div>

            <div className="space-y-2 z-10">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">8.4ms</span>
                <span className="text-[10px] text-purple-400 font-mono font-bold">LATENCY</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Edge Database Gate</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Global syncing protocols replicate lead changes globally within milliseconds, maintaining zero system loss.
              </p>
            </div>

            <div className="w-full bg-black/40 border border-white/5 p-3 font-mono text-[9px] text-zinc-500 flex items-center justify-between rounded-none mt-4 z-10">
              <span>DB STATE</span>
              <span className="text-emerald-400 font-bold uppercase">REPLICATED ACTIVE ✓</span>
            </div>
          </div>

          {/* Card 3: 1-column span */}
          <div className="md:col-span-1 glass-card p-6 rounded-none relative overflow-hidden group flex flex-col justify-between aspect-[16/10] border-white/5 hover:border-cyan-500/35">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">MODULE 03 // LENS</span>
              <span className="text-[9px] font-mono text-zinc-500">ENGINE B</span>
            </div>

            <div className="space-y-2 z-10">
              <h3 className="text-lg font-bold text-white tracking-tight">Creative Cinema Presets</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                High-end metadata controls matching Arri Alexa and Hasselblad aspect parameters for luxury brand film grading.
              </p>
            </div>

            {/* Custom Camera slider widget */}
            <div className="space-y-2 bg-black/40 border border-white/5 p-3 rounded-none text-[8px] font-mono text-zinc-400 z-10">
              <div className="flex justify-between">
                <span>RATIO: 2.39:1 AR</span>
                <span className="text-cyan-400">ANAMORPHIC</span>
              </div>
              <div className="w-full bg-white/10 h-1">
                <div className="bg-cyan-400 h-full w-[70%]" />
              </div>
            </div>
          </div>

          {/* Card 4: 2-column span */}
          <div className="md:col-span-2 glass-card p-6 rounded-none relative overflow-hidden group flex flex-col justify-between aspect-[16/9] border-white/5 hover:border-purple-500/35">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-500/10 to-transparent blur-xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">MODULE 04 // PIPELINE</span>
              <span className="text-[8px] font-mono text-cyan-400 bg-cyan-950/20 px-1.5 py-0.5 border border-cyan-400/20">QUALIFIER STATUS</span>
            </div>

            <div className="space-y-4 z-10">
              <h3 className="text-2xl font-bold text-white tracking-tight">n8n Qualification Architectures</h3>
              <p className="text-xs text-zinc-400 max-w-md leading-relaxed font-light">
                Build sophisticated routing sequences. Standardized webhooks run deep checks through AI classifiers, assigning live scores to CRM metrics automatically.
              </p>
            </div>

            {/* Flow line node mock */}
            <div className="flex justify-between items-center bg-black/50 border border-white/5 p-4 rounded-none font-mono text-[9px] mt-6 z-10">
              <div className="px-2.5 py-1 bg-white/5 border border-white/10">WEBHOOK</div>
              <div className="flex-1 border-t border-dashed border-white/20 mx-4 relative">
                <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              </div>
              <div className="px-2.5 py-1 bg-purple-950/30 border border-purple-400/35 text-purple-400">GPT-4 NODE</div>
              <div className="flex-1 border-t border-dashed border-white/20 mx-4" />
              <div className="px-2.5 py-1 bg-cyan-950/30 border border-cyan-400/35 text-cyan-400">CRM SYNC</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 4: STATS SECTION
          ═════════════════════════════════════════════ */}
      <section className="relative py-20 bg-[#050507] border-t border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "99.98%", title: "Production Uptime", desc: "Constant database connection with automated failover gates." },
              { stat: "140%", title: "Lead Conversion Increase", desc: "Immediate webhook responders prevent conversation dropouts." },
              { stat: "< 8.4ms", title: "Edge Network Synced", desc: "Data is synced instantly between Visakhapatnam & Global clouds." },
            ].map((s, i) => (
              <div key={i} className="space-y-3 p-6 glass-card rounded-none border-white/5 flex flex-col justify-between">
                <span className="text-4xl md:text-5xl font-extrabold text-gradient-neon font-mono tracking-tight">{s.stat}</span>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{s.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 5: SHOWCASE / PIPELINE PREVIEW
          ═════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Showcase Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400">
              Interactive Dashboard Mockup
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-none text-white">
              Absolute Control.<br />
              <span className="text-gradient-cyan">Pixel-Perfect Metrics.</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Toggle the mock workflow tabs to preview how Grovice OS ingests, processes, and pushes lead synchronization tasks in real-time.
            </p>

            {/* Interactive Tabs */}
            <div className="flex flex-col gap-2 pt-4">
              {([
                { id: "ingest", title: "Omnichannel Ingestion Stream" },
                { id: "process", title: "n8n Classifier & Automation" },
                { id: "sync", title: "Sub-8ms Database Replica Sync" },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-5 py-4 rounded-none font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 flex items-center justify-between ${
                    activeTab === tab.id
                      ? "border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold"
                      : "border-white/5 bg-white/[0.01] text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  {tab.title}
                  <ArrowRight size={12} className={activeTab === tab.id ? "translate-x-1 duration-300" : ""} />
                </button>
              ))}
            </div>
          </div>

          {/* Showcase Render Widget */}
          <div className="lg:col-span-7 bg-[#0b0b0e] border border-white/5 p-6 md:p-8 rounded-none relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/5 via-purple-500/5 to-transparent blur-2xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {activeTab === "ingest" && (
                <motion.div
                  key="ingest"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">{'// WEBHOOK TRIGGER INGESTION'}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  
                  <div className="space-y-3 font-mono text-[10px] text-zinc-400">
                    <div className="p-3 bg-black/60 border border-white/5 flex justify-between items-center rounded-none">
                      <span>WhatsApp Transcript Capture:</span>
                      <span className="text-emerald-400">[ CAPTURED ]</span>
                    </div>
                    <div className="p-3 bg-black/60 border border-white/5 flex justify-between items-center rounded-none">
                      <span>Instagram DM Message Webhook:</span>
                      <span className="text-emerald-400">[ CAPTURED ]</span>
                    </div>
                    <div className="p-3 bg-black/60 border border-white/5 flex justify-between items-center rounded-none">
                      <span>Voice Lead Call Inbound Audio stream:</span>
                      <span className="text-yellow-400">[ PROCESS_RUNNING ]</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "process" && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">{'// GPT-4 CLASSIFICATION PIPELINE'}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  </div>

                  <div className="p-4 bg-black/60 border border-white/5 font-mono text-[9px] text-zinc-400 rounded-none space-y-2">
                    <p className="text-zinc-600">INPUT: &ldquo;Looking to view luxury apartment this Friday&rdquo;</p>
                    <p className="text-purple-400 font-bold">CLASSIFICATION RESPONSE:</p>
                    <p className="pl-3">Intent: Apartment_Tour_Booking</p>
                    <p className="pl-3">Score: 94% Qualified</p>
                    <p className="pl-3">Assigned Agent: n8n_Automatic_Dialer</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "sync" && (
                <motion.div
                  key="sync"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">{'// LATENCY SYNCHRONIZATION OVER EDGE'}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-mono text-[9px] text-zinc-400">
                    <div className="p-4 bg-black/60 border border-white/5 space-y-1">
                      <p className="text-zinc-500">LOCAL GATE</p>
                      <p className="text-xl font-bold text-white">8.4ms</p>
                    </div>
                    <div className="p-4 bg-black/60 border border-white/5 space-y-1">
                      <p className="text-zinc-500">CLOUD GATEWAY</p>
                      <p className="text-xl font-bold text-emerald-400">SYNC_OK</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-zinc-500">
              <span>SYSTEM ARCHITECTURE: STABLE</span>
              <span className="text-[#c5a880] tracking-widest">[ ENGINE_ACTIVE ]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 6: TESTIMONIALS
          ═════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#050507] border-t border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="space-y-4 text-center max-w-xl mx-auto">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
              Ecosystem Feedback
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Honest validation. <br />
              <span className="text-gradient-purple">Engineered performance.</span>
            </h2>
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
                className="p-6 rounded-none border border-white/5 bg-black/40 flex flex-col justify-between space-y-6 relative hover:border-cyan-500/35 transition duration-300"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center font-bold text-xs text-black">
                    {rev.author[0]}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">{rev.author}</h4>
                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-mono block mt-0.5">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 7: PRICING SECTION
          ═════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto z-10">
        <div className="space-y-4 text-center max-w-xl mx-auto mb-16">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400">
            PRICING OPTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Transparent options. <br />
            <span className="text-gradient-cyan">Bespoke scaling models.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="p-8 rounded-none border border-white/5 bg-[#0b0b0e] flex flex-col justify-between min-h-[420px] transition duration-300 hover:border-white/10">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">DEV ENVIRONMENT</span>
                <h3 className="text-xl font-bold text-white">Sandbox Core</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-zinc-500 font-mono">/ FOREVER</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Best for testing local webhooks, basic database pings, and pipeline qualification logs.
              </p>
              <ul className="space-y-2.5 font-mono text-[9px] text-zinc-400 border-t border-white/5 pt-6">
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> 1 Sandbox Lead Ingestion Node</li>
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> Latency up to 100ms</li>
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> Basic CRM Log Export</li>
              </ul>
            </div>
            <button className="w-full py-3.5 mt-8 border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase font-bold tracking-widest text-white transition">
              Launch Sandbox
            </button>
          </div>

          {/* Plan 2: HIGHLIGHTED */}
          <div className="p-8 rounded-none border border-cyan-500/40 bg-[#09090c] flex flex-col justify-between min-h-[420px] relative neon-shadow-blue">
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-none border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 font-mono text-[8px] font-bold uppercase tracking-widest">
              POPULAR DEPLOY
            </div>
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider">ENTERPRISE SCALE</span>
                <h3 className="text-xl font-bold text-white">Autonomous Pro</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$149</span>
                <span className="text-xs text-zinc-500 font-mono">/ MONTH</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Complete automated pipeline. Ideal for growing brands scaling WhatsApp, calls, and CRM syncing.
              </p>
              <ul className="space-y-2.5 font-mono text-[9px] text-zinc-300 border-t border-white/5 pt-6">
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> Unlimited Ingestion Nodes</li>
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> Guaranteed &lt; 8.4ms Sync</li>
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> Custom AI Qualification Scripting</li>
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> 24/7 Engine Monitoring</li>
              </ul>
            </div>
            <button
              className="w-full py-3.5 mt-8 text-xs font-mono uppercase font-bold tracking-widest text-black transition group relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
              }}
            >
              Deploy Pro Engine
            </button>
          </div>

          {/* Plan 3 */}
          <div className="p-8 rounded-none border border-white/5 bg-[#0b0b0e] flex flex-col justify-between min-h-[420px] transition duration-300 hover:border-white/10">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">BESPOKE SYSTEM</span>
                <h3 className="text-xl font-bold text-white">Custom Enterprise</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">Bespoke</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Custom media production shoot calendars combined with dedicated multi-database replication clusters.
              </p>
              <ul className="space-y-2.5 font-mono text-[9px] text-zinc-400 border-t border-white/5 pt-6">
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> Custom Camera Shoot Set Packages</li>
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> Dedicated Local Replica Clusters</li>
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> Custom API Integrations</li>
                <li className="flex items-center gap-2"><Check size={10} className="text-cyan-400" /> SLA Response Guarantees</li>
              </ul>
            </div>
            <a
              href="tel:+917396621004"
              className="w-full py-3.5 mt-8 border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase font-bold tracking-widest text-white transition text-center block"
            >
              Contact Scoping Team
            </a>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 8: FAQ ACCORDION
          ═════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#050507] border-t border-b border-white/5 z-10">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="space-y-4 text-center">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
              SYSTEM FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Frequently Asked Specs
            </h2>
          </div>

          <div className="border-t border-white/10 divide-y divide-white/10">
            {[
              {
                q: "What is sub-8ms replication sync?",
                a: "Our core software replica nodes use optimized websockets that push data between local database clusters and primary cloud servers within milliseconds of capture, guaranteeing zero pipeline lag."
              },
              {
                q: "How does the n8n Qualification system work?",
                a: "Once a client messages or requests a tour, n8n qualifications ingest coordinates, push logs through GPT-4 classifiers, and route results directly to CRM databases."
              },
              {
                q: "Can we integrate custom camera setups with Engine B?",
                a: "Yes. Our team aligns cinematic camera parameters (Alexa LF anamorphic configs) to match custom brand campaigns and high-fidelity video sets."
              },
              {
                q: "What database backends are supported?",
                a: "We natively support Postgres, SQLite, MongoDB replicas, and direct webhook integrations for n8n databases."
              }
            ].map((faq, idx) => (
              <div key={idx} className="py-5 font-sans">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {faq.q}
                  </span>
                  <span className="text-zinc-500 ml-4">
                    {openFaq === idx ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-zinc-400 leading-relaxed font-light mt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 9: FINAL CTA
          ═════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 px-6 max-w-7xl mx-auto text-center z-10">
        {/* Glow shape directly behind CTA text */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-600/10 to-purple-600/10 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-8 relative">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 block">
            DEPLOY GROVICE OS TODAY
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Ready to orchestrate your <span className="text-gradient-purple">Business OS?</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
            Align your custom automations, lead pipelines, and cinematography sets into one cohesive operating structure.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="tel:+917396621004"
              className="px-8 py-4 rounded-none text-xs font-mono font-bold uppercase tracking-widest text-black transition-all duration-300 relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
              }}
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Deploy System <ArrowRight size={12} />
              </span>
            </a>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
              className="px-8 py-4 rounded-none text-xs font-mono font-bold uppercase tracking-widest border border-white/10 bg-white/2 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30"
            >
              Talk to Specialist
            </button>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 10: FOOTER
          ═════════════════════════════════════════════ */}
      <footer className="relative border-t border-white/5 bg-[#030305] pt-16 pb-12 z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Column */}
          <div className="col-span-2 space-y-4">
            <Link
              href="/"
              className="font-mono font-extrabold text-sm tracking-widest text-white flex items-center gap-1.5"
            >
              GROVICE <span className="text-cyan-400">2.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </Link>
            <p className="text-[10px] text-zinc-500 max-w-xs leading-relaxed font-mono">
              Visakhapatnam’s autonomous business operating system. Automating customer lifecycles and creative set directions.
            </p>
          </div>

          {/* Link Col 1 */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">MODULES</h4>
            <ul className="space-y-2 text-[10px] text-zinc-500 font-mono">
              <li><Link href="/engine-a" className="hover:text-cyan-400 transition">ENGINE A // SOFTWARE</Link></li>
              <li><Link href="/engine-b" className="hover:text-cyan-400 transition">ENGINE B // CREATIVE</Link></li>
              <li><span className="text-zinc-700">ENGINE C // SCALE (WIP)</span></li>
            </ul>
          </div>

          {/* Link Col 2 */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">PLATFORM</h4>
            <ul className="space-y-2 text-[10px] text-zinc-500 font-mono">
              <li><a href="#features-section" className="hover:text-cyan-400 transition">CORE SPECIFICATIONS</a></li>
              <li><a href="#reviews-section" className="hover:text-cyan-400 transition">CLIENT VALIDATIONS</a></li>
              <li><span className="hover:text-cyan-400 transition cursor-pointer" onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}>SYS_CONSULTING</span></li>
            </ul>
          </div>

          {/* Link Col 3 */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">CONTACT</h4>
            <ul className="space-y-2 text-[10px] text-zinc-500 font-mono">
              <li><a href="tel:+917396621004" className="hover:text-cyan-400 transition">+91 73966 21004</a></li>
              <li><span className="text-zinc-600">VIZAG OPERATIONAL SITE</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-mono text-zinc-600">
            &copy; {new Date().getFullYear()} GROVICE. NETWORKS REPLICATED OVER SYSTEM GATES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4 font-mono text-[9px] text-zinc-600">
            <span className="hover:text-white transition cursor-pointer">PRIVACY POLICY</span>
            <span>/</span>
            <span className="hover:text-white transition cursor-pointer">TERMS OF SERVICE</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
