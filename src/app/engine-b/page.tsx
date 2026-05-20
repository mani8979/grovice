"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Camera,
  Layers,
  Sparkles,
  Eye,
  CheckCircle2
} from "lucide-react";

export default function EngineBPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", email: "", budget: "$2k - $5k", desc: "" });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email) return;

    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingData({ name: "", email: "", budget: "$2k - $5k", desc: "" });
    }, 5000);
  };

  const portfolioItems = [
    {
      id: 1,
      title: "Commercial Film Set",
      category: "cinema",
      img: "/images/cinema.png",
      client: "Luxury Auto Brand",
      ratio: "16:9",
    },
    {
      id: 2,
      title: "Coastal Perfume Editorial",
      category: "photography",
      img: "/images/product.png",
      client: "Oceana Parfum",
      ratio: "4:5",
    },
    {
      id: 3,
      title: "Identity Guide Mockup",
      category: "branding",
      img: "/images/brand.png",
      client: "Grovice Labs",
      ratio: "1:1",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const services = [
    {
      icon: Film,
      title: "Cinematic Videography",
      desc: "Stunning advertising reels, commercial campaigns, and social media media assets. We handle the full pipeline: scriptwriting, coastal location scouting, lighting, directing, and high-end color-graded editing.",
    },
    {
      icon: Camera,
      title: "Premium Brand Photography",
      desc: "Editorial products, high-fashion branding shoots, and premium corporate portraits. Every image is carefully retouched to reflect a luxury tier placement, matching Vizag's finest coastal lighting.",
    },
    {
      icon: Layers,
      title: "Visual Branding & Identity",
      desc: "We shape your business’s soul. Complete logo suites, typography grids, cohesive color charts, presentation templates, and digital guidelines that make your audience instantly trust your name.",
    },
    {
      icon: Sparkles,
      title: "Social Growth Management",
      desc: "Content schedules, premium reel templates, Instagram aesthetic layouts, and algorithmic growth tactics. We make sure your creative output matches the high caliber of your operations.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#020914] text-slate-100 font-sans py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background radial sunset glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Breadcrumb / Meta */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-400 text-xs font-semibold uppercase tracking-widest">
            <Sparkles size={12} /> ENGINE B
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
            Creative Muscle <br className="sm:hidden" />
            <span className="metallic-creative-text">& Brand Production</span>
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl font-light">
            Elevating companies through high-fidelity photography, cinematic video campaigns, and luxury brand positioning.
          </p>
        </div>

        {/* PORTFOLIO GRID SYSTEM */}
        <div className="space-y-8">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {["all", "cinema", "photography", "branding"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs uppercase tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-white text-slate-950 border-white font-bold"
                    : "bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid display */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-2xl border border-slate-900 bg-slate-950/40 overflow-hidden relative"
                >
                  {/* Photo Canvas wrapper */}
                  <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
                        <Eye size={18} />
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-5 space-y-1 relative border-t border-slate-900/60">
                    <span className="text-[9px] uppercase tracking-widest text-violet-400 font-bold block">
                      {item.category}
                    </span>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-violet-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500">Client: {item.client}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* SERVICE CARDS */}
        <div className="space-y-8 pt-10 border-t border-slate-900">
          <div className="text-center md:text-left space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Production Deliverables</h2>
            <p className="text-sm text-slate-400 max-w-2xl font-light">
              Crafting cohesive brand storytelling assets that command premium trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel-dark border-slate-900 hover:border-violet-500/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-violet-400 group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-lg text-white group-hover:text-violet-400 transition-colors">
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

        {/* BOOKING STRATEGY CALL / BRIEF */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-10 border-t border-slate-900 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-400 text-xs font-semibold uppercase tracking-wider">
              Work With Us
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide">
              Initiate Creative Brief
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Let&apos;s create something extraordinary. Tell us your creative requirements, and our production coordinator will schedule a detailed brief scoping call with you.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">✔ Coastal Location Scouting Blueprint</p>
              <p className="flex items-center gap-2">✔ Moodboard Design Concept</p>
              <p className="flex items-center gap-2">✔ Custom Campaign Timeline Outline</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800 relative">
              <AnimatePresence mode="wait">
                {!bookingSubmitted ? (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          placeholder="e.g. Sarah Smith"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Your Email *</label>
                        <input
                          type="email"
                          required
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          placeholder="e.g. sarah@brand.com"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Project Budget Category</label>
                      <select
                        value={bookingData.budget}
                        onChange={(e) => setBookingData({ ...bookingData, budget: e.target.value })}
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20"
                      >
                        <option value="$1k - $2k">$1,000 - $2,000</option>
                        <option value="$2k - $5k">$2,000 - $5,000 (Recommended)</option>
                        <option value="$5k+">$5,000+ Premium Campaign</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Tell us about your brand & scope</label>
                      <textarea
                        rows={3}
                        value={bookingData.desc}
                        onChange={(e) => setBookingData({ ...bookingData, desc: e.target.value })}
                        placeholder="e.g. We need a commercial cinematic video for our resort launch in Vizag, along with 20 product photos for social campaigns..."
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-violet-400 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-600 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-lg transition"
                    >
                      Request Campaign Scoping Call
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={28} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-lg text-white">Creative Brief Received!</h4>
                      <p className="text-xs text-slate-400 max-w-sm">
                        Our campaign manager will review your submission and connect within 12 hours with moodboard options.
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
