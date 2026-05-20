"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Plus,
  Minus,
  Film,
  Camera,
  Layers,
  Sparkles,
  Play,
  Tv,
  Image as ImageIcon
} from "lucide-react";
import Footer from "@/components/Footer";

/* ═════════════════════════════════════════════
    SPOTLIGHT CARD HELPER
   ═════════════════════════════════════════════ */
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

export default function EngineBPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", scope: "", category: "video" });

  const portfolioRef = useRef<HTMLDivElement>(null);
  const consultRef = useRef<HTMLDivElement>(null);

  const scrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToConsult = () => {
    consultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", scope: "", category: "video" });
    }, 6000);
  };

  const capabilities = [
    { icon: Camera, title: "Photography", desc: "Premium editorial captures featuring coastal light and clean styling.", color: "text-[#FF4FD8]" },
    { icon: Film, title: "Videography", desc: "Commercial-grade cinema clips matching international brand benchmarks.", color: "text-purple-400" },
    { icon: Layers, title: "Branding", desc: "Complete visual identities built to look authoritative and premium.", color: "text-blue-400" },
    { icon: Sparkles, title: "Social Media", desc: "Algorithmic reels and aesthetic layouts tailored for high luxury.", color: "text-pink-400" },
    { icon: Tv, title: "Creative Production", desc: "Full-scale scriptwriting, location hunting, and casting workflows.", color: "text-[#FF4FD8]" },
    { icon: ImageIcon, title: "Marketing Visuals", desc: "Premium ad vectors and brochures built to look human-designed.", color: "text-[#00D2FF]" }
  ];

  const casePortfolios = [
    {
      title: "Coastal Luxury Perfume Editorial",
      tag: "PHOTOGRAPHY // RETOUCH",
      goal: "Reposition Vizag local fragrance line for premium national scale.",
      concept: "Minimalist bottles shot on natural RK Beach wet sands using early morning blue hour rays.",
      outputs: "32 high-resolution retouched assets + 3 campaign posters.",
      result: "42% increase in online boutique conversions.",
      accent: "border-[#FF4FD8]/25 text-[#FF4FD8]"
    },
    {
      title: "Siripuram Commercial Launch Film",
      tag: "CINEMATOGRAPHY // 4K",
      goal: "Launch high-end co-working hub with Apple-style event visual assets.",
      concept: "Cinematic frames following developers scrolling n8n node systems in glass cabins.",
      outputs: "60-sec master campaign cut + 3 optimized reels.",
      result: "100% workstation booking capacity reached in 14 days.",
      accent: "border-purple-500/25 text-purple-400"
    }
  ];

  return (
    <div className="bg-[#05060A] text-[#F6F7FB] min-h-screen relative font-sans pt-24 overflow-hidden">
      
      {/* Editorial glowing accents */}
      <div className="absolute top-[12%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/5 blur-[125px] pointer-events-none" />
      <div className="absolute top-[45%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7A5CFF]/5 blur-[125px] pointer-events-none" />

      {/* ═════════════════════════════════════════════
          B1 — HERO SECTION (EDITORIAL CINEMA)
          ═════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/20 bg-pink-950/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4FD8] animate-pulse" />
              <span className="text-[10px] font-mono text-[#FF4FD8] uppercase tracking-widest font-bold">
                ENGINE B // VISUAL LABS
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none text-white font-sans">
              Engine B: Cinematic Creative Muscle
            </h1>
            
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl font-light">
              Photography, video, branding, and social visuals—built to look premium and convert. We bring Figma-quality details and high-end editorial aesthetics to your business.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={scrollToConsult}
                className="px-8 py-4 rounded-none text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FF4FD8] to-[#7A5CFF] hover:opacity-90 transition-all duration-300"
              >
                Book a Creative Consult
              </button>
              <button
                onClick={scrollToPortfolio}
                className="px-8 py-4 rounded-none text-xs font-mono font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
              >
                View Portfolio
              </button>
            </div>
          </div>

          {/* Cinematic Editorial Mock Frames */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 relative overflow-hidden flex items-center justify-center">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">[ VIZAG_COAST_01 ]</span>
                <div className="absolute inset-0 bg-[#FF4FD8]/5 mix-blend-color-dodge" />
              </div>
              <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 relative overflow-hidden flex items-center justify-center">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">[ SHOT_02 ]</span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 relative overflow-hidden flex items-center justify-center">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">[ EDITORIAL_03 ]</span>
              </div>
              <div className="aspect-[3/4] bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 relative overflow-hidden flex items-center justify-center">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">[ SHOT_04 ]</span>
                <div className="absolute inset-0 bg-cyan-500/5 mix-blend-color-dodge" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          B2 — CAPABILITIES (EDITORIAL GRID)
          ═════════════════════════════════════════════ */}
      <section className="relative py-20 bg-[#0A0B10] border-t border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF4FD8]">
              STUDIO CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Capabilities Grid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <SpotlightCard key={i} className="p-6 bg-black/40 border-white/5 flex flex-col justify-between min-h-[180px] hover:border-pink-500/20">
                  <div className={`p-3 rounded-xl bg-[#05060A] border border-white/5 ${cap.color} w-fit`}>
                    <Icon size={20} />
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="text-md font-bold text-white uppercase tracking-wide">{cap.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">{cap.desc}</p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          B3 — PORTFOLIO (FEATURED + GALLERY)
          ═════════════════════════════════════════════ */}
      <section ref={portfolioRef} className="relative py-20 px-6 max-w-7xl mx-auto z-10">
        <div className="space-y-16">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400">
              PRODUCTION EXHIBITION
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Featured Campaigns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {casePortfolios.map((item, idx) => (
              <SpotlightCard key={idx} className="p-8 bg-[#0A0B10] border-white/5 rounded-2xl flex flex-col justify-between aspect-[4/3]">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded-none ${item.accent}`}>
                    {item.tag}
                  </span>
                  <Play size={14} className="text-zinc-600 hover:text-white transition-colors cursor-pointer" />
                </div>

                <div className="my-6 space-y-4">
                  <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                  <div className="grid grid-cols-1 gap-2 text-xs text-zinc-400 font-light">
                    <p><strong className="text-white font-medium">Goal:</strong> {item.goal}</p>
                    <p><strong className="text-white font-medium">Concept:</strong> {item.concept}</p>
                    <p><strong className="text-white font-medium">Outputs:</strong> {item.outputs}</p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-xs font-mono text-[#00D2FF] font-bold">
                  RESULT: {item.result}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          B4 — PROCESS
          ═════════════════════════════════════════════ */}
      <section className="relative py-20 bg-[#0A0B10] border-t border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF4FD8]">
              TIMELINE STEPS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Our Creative Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", name: "Concept", desc: "We design detailed moodboards and script frames based on your strategy goals." },
              { step: "02", name: "Shoot", desc: "Production crews deploy premium cameras using Vizag coastal sunrise." },
              { step: "03", name: "Edit", desc: "Elite color grading, sound scoring, and pacing adjustments." },
              { step: "04", name: "Launch", desc: "Asset formats packaged for direct conversion launch campaigns." },
            ].map((p, idx) => (
              <div key={idx} className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center font-mono font-bold text-md text-[#FF4FD8] mx-auto shadow-md">
                  {p.step}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase">{p.name}</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          B5 — PACKAGES (PREMIUM CARDS)
          ═════════════════════════════════════════════ */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto z-10">
        <div className="space-y-16">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400">
              PRICING SYSTEMS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Premium Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package Essentials */}
            <SpotlightCard className="p-8 bg-[#0A0B10] border-white/5 rounded-2xl flex flex-col justify-between min-h-[400px]">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 block uppercase">TIER 01</span>
                <h3 className="text-xl font-bold text-white mt-1">Essentials</h3>
                <p className="text-2xl font-extrabold text-white mt-3 font-mono">₹25,000<span className="text-xs text-zinc-500 font-normal"> / project</span></p>
                
                <ul className="mt-6 space-y-3 text-xs text-zinc-400 font-light">
                  <li className="flex items-center gap-2">✔ 12 Campaign Images</li>
                  <li className="flex items-center gap-2">✔ 3 Social Media Reels</li>
                  <li className="flex items-center gap-2">✔ Editorial Retouching</li>
                  <li className="flex items-center gap-2">✔ Location Scoping</li>
                </ul>
              </div>
              <button onClick={scrollToConsult} className="mt-8 py-3 w-full border border-white/10 text-xs font-mono font-bold uppercase text-white hover:bg-white/5 transition">
                Select Essentials
              </button>
            </SpotlightCard>

            {/* Package Studio */}
            <SpotlightCard className="p-8 bg-[#0A0B10] border-purple-500/30 rounded-2xl flex flex-col justify-between min-h-[400px] relative">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-purple-500 text-black text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1">
                RECOMMENDED
              </div>
              <div>
                <span className="text-[9px] font-mono text-purple-400 block uppercase">TIER 02</span>
                <h3 className="text-xl font-bold text-white mt-1">Studio</h3>
                <p className="text-2xl font-extrabold text-white mt-3 font-mono">₹60,000<span className="text-xs text-zinc-500 font-normal"> / project</span></p>

                <ul className="mt-6 space-y-3 text-xs text-zinc-400 font-light">
                  <li className="flex items-center gap-2">✔ 30 Campaign Images</li>
                  <li className="flex items-center gap-2">✔ 6 Social Media Reels</li>
                  <li className="flex items-center gap-2">✔ Full Brand Moodboard Concept</li>
                  <li className="flex items-center gap-2">✔ High-end sound editing</li>
                </ul>
              </div>
              <button onClick={scrollToConsult} className="mt-8 py-3 w-full bg-purple-600 text-xs font-mono font-bold uppercase text-white hover:bg-purple-700 transition">
                Select Studio
              </button>
            </SpotlightCard>

            {/* Package Campaign */}
            <SpotlightCard className="p-8 bg-[#0A0B10] border-white/5 rounded-2xl flex flex-col justify-between min-h-[400px]">
              <div>
                <span className="text-[9px] font-mono text-[#FF4FD8] block uppercase">TIER 03</span>
                <h3 className="text-xl font-bold text-white mt-1">Campaign</h3>
                <p className="text-2xl font-extrabold text-white mt-3 font-mono">₹1,50,000<span className="text-xs text-zinc-500 font-normal"> / project</span></p>

                <ul className="mt-6 space-y-3 text-xs text-zinc-400 font-light">
                  <li className="flex items-center gap-2">✔ Full Brand Photoshoot Suite</li>
                  <li className="flex items-center gap-2">✔ 4K Master Cinema Campaign Cut</li>
                  <li className="flex items-center gap-2">✔ 12 Social Media Reels</li>
                  <li className="flex items-center gap-2">✔ Continuous Retainer options</li>
                </ul>
              </div>
              <button onClick={scrollToConsult} className="mt-8 py-3 w-full border border-[#FF4FD8]/30 text-xs font-mono font-bold uppercase text-[#FF4FD8] hover:bg-[#FF4FD8]/5 transition">
                Select Campaign
              </button>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          B6 — ENGINE B FAQ & BRIEF SUBMIT
          ═════════════════════════════════════════════ */}
      <section ref={consultRef} className="relative py-20 bg-[#050507] border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Brief Form */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF4FD8]">
              WORK WITH US
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
              Initiate Creative Brief
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Send your parameters and our studio coordinators will outline visual concepts for your campaign.
            </p>

            <SpotlightCard className="p-6 bg-[#0A0B10] border-white/5 rounded-2xl">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="creative-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBriefSubmit}
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
                          className="w-full bg-[#05060A] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF4FD8]"
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
                          className="w-full bg-[#05060A] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF4FD8]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono block mb-1 uppercase font-bold">Campaign Type</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#05060A] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF4FD8]"
                      >
                        <option value="video">Cinematic Video</option>
                        <option value="photo">Brand Photography</option>
                        <option value="brand">Logo & Visual Branding</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono block mb-1 uppercase font-bold">Scope Parameters</label>
                      <textarea
                        rows={3}
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        placeholder="Explain your product campaign or brand refresh scope..."
                        className="w-full bg-[#05060A] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF4FD8]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FF4FD8] to-purple-500 hover:opacity-90 transition-opacity"
                    >
                      Submit Brief
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
                      <h4 className="font-bold text-white text-lg">Brief Sync Complete!</h4>
                      <p className="text-xs text-zinc-400 max-w-sm mt-1">
                        We will draft style proposals and contact you at {formData.email} within 2 hours.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-extrabold text-white">Engine B FAQ</h3>
            
            <div className="border-t border-white/10 divide-y divide-white/10">
              {[
                {
                  q: "Who owns visual copyrights?",
                  a: "Once final milestone payouts resolve, complete commercial copyrights assign to your brand."
                },
                {
                  q: "What is your standard turnaround?",
                  a: "Commercial photo briefs require 7-10 days. Edited campaign films require 2-3 weeks post-shoot."
                },
                {
                  q: "How do revisions work?",
                  a: "Every project tier includes 2 complete cycles of editing revisions to ensure exact brand alignment."
                },
                {
                  q: "Do you offer monthly retainers?",
                  a: "Yes. Retainers cover regular weekly photoshoot cycles at Siripuram studios to keep social calendars updated."
                },
                {
                  q: "Where do shoot productions take place?",
                  a: "We shoot primarily in Visakhapatnam, featuring coastal spots (Siripuram & Gajuwaka studios, beach landscapes)."
                }
              ].map((faq, idx) => (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="text-sm font-bold text-white group-hover:text-[#FF4FD8] transition-colors">
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
        </div>
      </section>

      {/* Render the unified footer at the bottom of the page */}
      <Footer />
    </div>
  );
}
