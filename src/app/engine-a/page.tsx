"use client";

import React, { useState, useRef } from "react";
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
  Users
} from "lucide-react";
import Footer from "@/components/Footer";

/* ── SPOTLIGHT CARD HELPER ── */
function SpotlightCard({
  children,
  className = "",
  hoverBorder = true
}: {
  children: React.ReactNode;
  className?: string;
  hoverBorder?: boolean;
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
    >
      {children}
    </div>
  );
}

export default function EngineAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", website: "", desc: "" });

  const auditSectionRef = useRef<HTMLDivElement>(null);
  const buildSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAudit = () => {
    auditSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBuild = () => {
    buildSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    {
      icon: Cpu,
      title: "AI Automation Systems",
      desc: "Autopilot operations. We link n8n processes to lead triggers so data moves without human intervention.",
      color: "text-[#FF9E00]"
    },
    {
      icon: Bot,
      title: "AI Voice Agents",
      desc: "Autonomous smart dialers. Handle inbound lead classification with natural vocal syntax.",
      color: "text-[#FF4069]"
    },
    {
      icon: Database,
      title: "CRM + Lead Systems",
      desc: "Structured pipes syncing lead entries between database replicas and master CRM records.",
      color: "text-amber-500"
    },
    {
      icon: LayoutDashboard,
      title: "Dashboards & Analytics",
      desc: "Clean client admin views. High-performance Next.js panels visualizing key business metrics.",
      color: "text-rose-400"
    },
    {
      icon: Layers,
      title: "Custom Software Projects",
      desc: "Full stack engineering. Robust repositories built to solve specialized administrative requirements.",
      color: "text-[#FF9E00]"
    },
    {
      icon: Workflow,
      title: "Workflow Orchestration",
      desc: "Complex conditional loops routing customer inquiries based on active qualification metrics.",
      color: "text-[#FF4069]"
    },
    {
      icon: Globe,
      title: "AI Integrations",
      desc: "Direct endpoints connecting custom applications to GPT-4 API pipelines seamlessly.",
      color: "text-amber-500"
    },
    {
      icon: Users,
      title: "Internal Ops Tools",
      desc: "Employee portals and resource managers built to optimize team productivity.",
      color: "text-rose-400"
    }
  ];

  return (
    <div className="bg-[#040308] text-[#F6F7FB] min-h-screen relative font-sans pt-24 overflow-hidden">
      
      {/* Glow backgrounds */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF9E00]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF4069]/5 blur-[120px] pointer-events-none" />

      {/* ── HERO SECTION ── */}
      <section className="relative py-20 md:py-28 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF9E00]/20 bg-[#FF9E00]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9E00] animate-pulse" />
              <span className="text-[10px] font-mono text-[#FF9E00] uppercase tracking-widest font-bold">
                ENGINE A // ENTERPRISE CODE
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none text-white font-sans">
              Engine A: Future-ready Business Infrastructure
            </h1>
            
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl font-light">
              AI systems, automation, CRMs, dashboards, and custom software—built to scale. We turn manual administrative tasks into high-fidelity autonomous code assets.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={scrollToAudit}
                className="px-8 py-4 rounded-none text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FF9E00] to-[#FF4069] hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Book an AI Audit
              </button>
              <button
                onClick={scrollToBuild}
                className="px-8 py-4 rounded-none text-xs font-mono font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
              >
                See what we build
              </button>
            </div>
          </div>

          {/* Graphical Mockup Dashboard */}
          <div className="lg:col-span-6">
            <SpotlightCard className="p-6 bg-[#0b0912] border-white/5 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">INFRASTRUCTURE STATUS</span>
                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 border border-emerald-400/20 font-bold">ACTIVE SYSTEM</span>
              </div>

              {/* Mock Dashboard flow */}
              <div className="space-y-4 font-mono text-[9px] text-zinc-400">
                <div className="p-3 bg-black/60 border border-white/5 flex items-center justify-between rounded-xl">
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-[#FF9E00]" />
                    <span>Edge API Endpoints</span>
                  </div>
                  <span className="text-[#FF9E00] font-bold">SYNCED (8.4ms)</span>
                </div>

                {/* Animated Line Connection */}
                <div className="p-4 bg-black/60 border border-white/5 space-y-3 rounded-xl">
                  <div className="flex justify-between text-[8px] text-zinc-500 font-bold">
                    <span>TRANSACT TRIGGER</span>
                    <span>AI PIPELINE GATES</span>
                  </div>
                  <div className="h-10 flex items-center justify-between relative bg-black/40 border border-white/5 px-3 rounded-lg">
                    <span className="text-white">Webhook</span>
                    <svg className="flex-1 mx-4 h-4" fill="none" viewBox="0 0 100 16" preserveAspectRatio="none">
                      <path d="M 0 8 L 100 8" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                      <path d="M 0 8 L 100 8" stroke="#FF4069" strokeWidth="2" className="animate-stroke-flow" />
                    </svg>
                    <span className="text-[#FF4069]">GPT-4 Classifier</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD (BENTO GRID) ── */}
      <section ref={buildSectionRef} className="relative py-20 bg-[#0b0912]/50 border-t border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF9E00] font-bold">
              SYSTEM SPECIFICATIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Full-Stack Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {bentoCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <SpotlightCard key={i} className="p-6 bg-black/40 border-white/5 flex flex-col justify-between min-h-[200px] hover:border-[#FF9E00]/20 rounded-2xl">
                  <div className={`p-3 rounded-xl bg-[#040308] border border-white/5 ${cap.color} w-fit`}>
                    <Icon size={20} />
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="text-md font-bold text-white uppercase tracking-wide font-sans">{cap.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">{cap.desc}</p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (TIMELINE) ── */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto z-10">
        <div className="space-y-16">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF4069] font-bold">
              ORCHESTRATION PIPELINE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Integration Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Timeline connector track */}
            <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[#FF9E00]/20 via-[#FF4069]/20 to-transparent z-0" />

            {[
              { step: "01", name: "AI Audit", desc: "Identify operational bottlenecks & cost loss points." },
              { step: "02", name: "Blueprint", desc: "Design data schemas & system architecture." },
              { step: "03", name: "Build", desc: "Deploy workflow modules, APIs, & software repos." },
              { step: "04", name: "Deploy", desc: "Activate client staging environment gates." },
              { step: "05", name: "Optimize", desc: "Continuous iteration under real client loads." },
            ].map((t, idx) => (
              <div key={idx} className="space-y-4 text-center z-10">
                <div className="w-14 h-14 rounded-full bg-[#0b0912] border border-white/10 flex items-center justify-center font-mono font-bold text-md text-[#FF9E00] mx-auto shadow-md">
                  {t.step}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase font-sans">{t.name}</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF / OUTCOMES ── */}
      <section className="relative py-20 bg-[#0b0912]/50 border-t border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-5xl font-extrabold text-white font-mono">140k+</p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1 font-bold">LEADS PROCESSED</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-extrabold text-white font-mono">&lt; 8.4ms</p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1 font-bold">EDGE SYNC LATENCY</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-extrabold text-white font-mono">99.98%</p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1 font-bold">DEPLOY UPTIME</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-extrabold text-white font-mono">80%</p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1 font-bold">MANUAL TASK REDUCTION</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <SpotlightCard className="p-6 bg-black/40 border-white/5 rounded-2xl flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[9px] font-mono text-[#FF9E00] font-bold">CASE STUDY 01 // PROPERTIES</span>
                <h4 className="text-lg font-bold text-white mt-1 font-sans">Siripuram Lands Automation</h4>
              </div>
              <div className="space-y-2 mt-4">
                <p className="text-xs text-zinc-400 font-light"><strong className="text-white font-medium">Problem:</strong> 12 hours/week manually routing Whatsapp chat logs to CRM.</p>
                <p className="text-xs text-zinc-400 font-light"><strong className="text-white font-medium">System:</strong> Implemented n8n hooks translating chat audio to text pipeline.</p>
                <p className="text-xs text-[#FF9E00] font-mono font-bold"><strong className="text-white font-medium">Result:</strong> Sync time reduced from 4 hours to sub-10 seconds.</p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-black/40 border-white/5 rounded-2xl flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[9px] font-mono text-[#FF4069] font-bold">CASE STUDY 02 // LOGISTICS</span>
                <h4 className="text-lg font-bold text-white mt-1 font-sans">Vizag Maritime Database Sync</h4>
              </div>
              <div className="space-y-2 mt-4">
                <p className="text-xs text-zinc-400 font-light"><strong className="text-white font-medium">Problem:</strong> API cluster dropouts during coordinate updates.</p>
                <p className="text-xs text-zinc-400 font-light"><strong className="text-white font-medium">System:</strong> Created custom Edge replication node gate with auto-failovers.</p>
                <p className="text-xs text-[#FF4069] font-mono font-bold"><strong className="text-white font-medium">Result:</strong> 100% data preservation over 6 months deployment.</p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ── START HERE (AI AUDIT FORM OFFER) ── */}
      <section ref={auditSectionRef} className="relative py-20 md:py-28 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF9E00] font-bold">
              TAKE ACTION
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-none font-sans">
              Book an AI & Infrastructure Audit
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Get a custom software blueprint identifying automation loopholes & data pipelines for your company. Zero pressure.
            </p>

            <div className="space-y-3 text-xs text-zinc-300 font-mono">
              <p className="flex items-center gap-2.5"><Check size={12} className="text-[#FF9E00]" /> Custom Node Blueprint Roadmap</p>
              <p className="flex items-center gap-2.5"><Check size={12} className="text-[#FF9E00]" /> Operational Loop Cost Estimates</p>
              <p className="flex items-center gap-2.5"><Check size={12} className="text-[#FF9E00]" /> 30-min strategy review call</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SpotlightCard className="p-8 bg-[#0b0912] border-white/5 rounded-2xl relative">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleAuditSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-zinc-500 font-mono block mb-1 uppercase font-bold">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Sarah Connor"
                          className="w-full bg-[#040308] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9E00] transition"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 font-mono block mb-1 uppercase font-bold">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sarah@skynet.com"
                          className="w-full bg-[#040308] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9E00] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono block mb-1 uppercase font-bold">Website URL</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://mycompany.com"
                        className="w-full bg-[#040308] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9E00] transition"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono block mb-1 uppercase font-bold">Operations bottleneck description</label>
                      <textarea
                        rows={3}
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        placeholder="Explain what workflows are running slow or manually..."
                        className="w-full bg-[#040308] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF9E00] transition"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FF9E00] to-[#FF4069] hover:opacity-90 transition"
                    >
                      Request Audit Blueprint
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Check size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Audit Requested!</h4>
                      <p className="text-xs text-zinc-400 max-w-sm mt-1">
                        We will analyze your website URL and contact you at {formData.email} within 2 hours to confirm details.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-20 bg-[#040308] border-t border-white/5 z-10">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white text-center font-sans">
            Engine A FAQ
          </h2>

          <div className="border-t border-white/10 divide-y divide-white/10">
            {[
              {
                q: "What tools do you configure automations in?",
                a: "We natively build on n8n and Make pipelines, syncing raw logs to HubSpot, Salesforce, Airtable, or custom SQL databases."
              },
              {
                q: "What is the average setup timeline?",
                a: "Minor automation connections take 1-2 weeks. Sophisticated Next.js client systems or multi-replica database sync gates require 4-6 weeks."
              },
              {
                q: "How does the voice agent coordinate calls?",
                a: "Our smart voice agents use custom LLMs configured to capture customer phone prompts, query booking charts, and push updates straight to CRM systems."
              },
              {
                q: "Do you offer operational retainers?",
                a: "Yes. We manage database logs and workflow updates on monthly retainers so you don't experience pipeline downtime."
              },
              {
                q: "Can we migrate from manual Excel processes?",
                a: "Absolutely. We import legacy records, design structured SQL schemas, and build APIs to automate imports."
              },
              {
                q: "Is there support for custom software codebases?",
                a: "Yes. Everything we build is pushed to clean GitHub repositories with documented guidelines for your technical teams."
              }
            ].map((faq, idx) => (
              <div key={idx} className="py-4 font-sans">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-sm font-bold text-white group-hover:text-[#FF9E00] transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-zinc-500">
                    {openFaq === idx ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-zinc-400 leading-relaxed font-light mt-2.5">
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

      <Footer />
    </div>
  );
}
