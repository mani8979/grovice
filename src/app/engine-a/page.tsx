"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Bot,
  LayoutDashboard,
  Database,
  CheckCircle,
  Activity
} from "lucide-react";

export default function EngineAPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", website: "", desc: "" });

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", website: "", desc: "" });
    }, 5000);
  };

  const services = [
    {
      icon: Cpu,
      title: "AI Automation & Workflows",
      desc: "Connect your tools and automate routine operations. We design custom n8n and Make workflows that link your email, database, Slack, and calendars together. No human error, no delays.",
    },
    {
      icon: Bot,
      title: "Conversational AI & Voice Agents",
      desc: "Deploy next-generation voice agents and smart chatbots powered by advanced LLMs. Handle inbound calls, qualify leads, and schedule appointments autonomously with human-like vocal quality.",
    },
    {
      icon: LayoutDashboard,
      title: "Custom Dashboards & Software",
      desc: "SaaS projects, internal tools, and client portals built exactly for your operations. We design responsive, high-performance dashboards that aggregate data and provide clear business intelligence.",
    },
    {
      icon: Database,
      title: "CRM Integrations & Lead Pipelines",
      desc: "Keep databases in absolute sync. We construct structured data schemas, qualify leads automatically, and build API pipes between HubSpot, Salesforce, Airtable, and custom platforms.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#020914] text-slate-100 font-sans grid-bg-tech py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Absolute neon glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Breadcrumb / Meta */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
            <Activity size={12} className="animate-pulse" /> ENGINE A
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
            Software + AI <br className="sm:hidden" />
            <span className="metallic-blue-text glow-text">& Automation Systems</span>
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl font-light">
            Adapting AI and building custom software infrastructure to turn manual business tasks into scalable, autonomous systems.
          </p>
        </div>

        {/* INTERACTIVE WORKFLOW CANVAS (N8N STYLE ANIMATION) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Live Infrastructure Sandbox</span>
          </div>

          <div className="pt-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Node 1: Trigger */}
            <div className="w-full lg:w-64 glass-panel border-slate-800 p-4 rounded-xl relative">
              <span className="absolute -top-2 left-4 text-[9px] px-2 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold rounded-full uppercase">Trigger</span>
              <p className="font-display font-bold text-sm text-white mb-1">Lead Submission</p>
              <p className="text-[10px] text-slate-400">Incoming web form, call, or email interest from a customer.</p>
              <div className="mt-3 flex items-center justify-between text-[9px] text-cyan-500 font-mono">
                <span>STATUS: READY</span>
                <span>ID: TRG-809</span>
              </div>
            </div>

            {/* Connecting Arrow/Line 1 */}
            <div className="hidden lg:block relative flex-1 h-1">
              <div className="w-full h-[2px] bg-gradient-to-r from-cyan-500 to-violet-500 relative">
                <span className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-[ping_2s_infinite]" style={{ animationDelay: "0s" }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-[drift_3s_linear_infinite]" />
              </div>
            </div>

            {/* Node 2: AI Agent Classifier */}
            <div className="w-full lg:w-64 glass-panel border-cyan-800/40 p-4 rounded-xl relative shadow-glow">
              <span className="absolute -top-2 left-4 text-[9px] px-2 py-0.5 bg-violet-950 border border-violet-800 text-violet-400 font-bold rounded-full uppercase">Cognitive Process</span>
              <p className="font-display font-bold text-sm text-white mb-1 flex items-center gap-1.5"><Bot size={14} className="text-violet-400" /> AI Agent Router</p>
              <p className="text-[10px] text-slate-400">Extracts service intent, rates lead score, drafts personalized response drafts.</p>
              <div className="mt-3 flex items-center justify-between text-[9px] text-violet-400 font-mono">
                <span>MODEL: GPT-4O</span>
                <span>SPEED: 240ms</span>
              </div>
            </div>

            {/* Connecting Arrow/Line 2 */}
            <div className="hidden lg:block relative flex-1 h-1">
              <div className="w-full h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 relative">
                <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-[drift_3s_linear_infinite]" style={{ animationDelay: "1.5s" }} />
              </div>
            </div>

            {/* Node 3: Custom Actions / Database */}
            <div className="w-full lg:w-64 glass-panel border-slate-800 p-4 rounded-xl relative">
              <span className="absolute -top-2 left-4 text-[9px] px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold rounded-full uppercase">Action Output</span>
              <p className="font-display font-bold text-sm text-white mb-1">CRM Sync & Slack</p>
              <p className="text-[10px] text-slate-400">Creates lead profile in Hubspot, schedules call, alerts sales reps via Slack.</p>
              <div className="mt-3 flex items-center justify-between text-[9px] text-emerald-400 font-mono">
                <span>SLACK API: OK</span>
                <span>HUBSPOT: UPDATED</span>
              </div>
            </div>
          </div>
        </div>

        {/* CORE CORE SERVICES GRID */}
        <div className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Full-Stack Business Capabilities</h2>
            <p className="text-sm text-slate-400 max-w-2xl font-light">
              We design custom tools and build backend APIs so your business runs continuously without friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel-dark border-slate-900 hover:border-cyan-500/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                        {svc.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI AUDIT CALL TO ACTION FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-10 border-t border-slate-900 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Accelerate Growth
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide">
              Request a Free AI & Software Audit
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Our team will analyze your current software setup, identify bottleneck operations, and deliver a customized automation strategy roadmap. Zero obligations.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">✔ Custom Node Roadmap Blueprint</p>
              <p className="flex items-center gap-2">✔ Tools Cost & Efficiency Calculation</p>
              <p className="flex items-center gap-2">✔ 30-minute Consultation Walkthrough</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800 relative">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="audit-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleAuditSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Business Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@business.com"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Company Website URL</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="e.g. https://mycompany.com"
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Describe Your Operation Bottlenecks</label>
                      <textarea
                        rows={3}
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        placeholder="e.g. We spend 10 hours a week copying data from our webforms to HubSpot, and calling customers back is too slow..."
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-950 font-bold uppercase tracking-wider text-xs py-3 rounded-lg transition"
                    >
                      Submit Audit Request
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="submitted-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle size={28} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-lg text-white">Strategy Request Received!</h4>
                      <p className="text-xs text-slate-400 max-w-sm">
                        Our software engineer will evaluate your company URL and contact you within 24 hours to schedule the audit call.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
