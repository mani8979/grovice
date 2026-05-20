"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Film, Zap, Globe, Sparkles } from "lucide-react";
import ThreeCanvas from "@/components/ThreeCanvas";
import WaveGrid from "@/components/WaveGrid";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const strengthItems = [
    {
      icon: Zap,
      color: "text-cyan-400 border-cyan-800/40 bg-cyan-950/20",
      title: "Automated Workflows",
      desc: "Connect n8n pipelines, databases, and custom LLMs to run your business tasks 24/7 without manual lag.",
    },
    {
      icon: Sparkles,
      color: "text-violet-400 border-violet-800/40 bg-violet-950/20",
      title: "Cinema-Tier Visuals",
      desc: "Produce cinematic commercials, luxury brand photos, and social media reels that capture attention instantly.",
    },
    {
      icon: Globe,
      color: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20",
      title: "Visakhapatnam Hub",
      desc: "Direct local coordination and studio access in Siripuram & Gajuwaka for high-impact execution.",
    },
  ];

  return (
    <div className="relative w-full bg-[#020914] text-slate-100 overflow-x-hidden">
      {/* Premium Coastal Sunset Canvas Background */}
      <div className="absolute inset-0 w-full h-[120vh] z-0 pointer-events-none">
        <WaveGrid />
      </div>

      {/* Overlay to ensure readability and luxury lighting */}
      <div className="absolute top-0 inset-x-0 h-[120vh] bg-gradient-to-b from-[#020914]/40 via-transparent to-[#020914] pointer-events-none z-0" />

      {/* HERO SECTION (FIRST FOLD) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 z-10 pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full text-center space-y-6 max-w-4xl mx-auto"
        >
          {/* Main 3D Centered Text Canvas */}
          <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto">
            <ThreeCanvas />
          </motion.div>

          {/* Under-Title Tagline */}
          <motion.div variants={itemVariants} className="space-y-4 -mt-10 sm:-mt-14">
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-5xl text-white tracking-tight leading-tight">
              One Stop Business Solution
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
              Where <span className="text-cyan-400 font-medium">AI Automation & Software</span> Meets{" "}
              <span className="text-violet-400 font-medium">Creative Muscle</span>.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition duration-300">
          <span className="text-[9px] uppercase tracking-widest font-bold font-display opacity-60">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-slate-800/80 flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* DUAL ENGINE BLUEPRINT GATEWAY SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900/60 bg-[#020914]">
        <div className="text-center space-y-4 mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-cyan-400 uppercase font-bold tracking-widest">
            The Growth Engines
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Select Your Blueprint
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-light">
            Choose the infrastructure engine that aligns with your immediate scaling strategy.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* ENGINE A CARD */}
          <Link href="/engine-a" className="group block text-left">
            <div className="h-full rounded-2xl glass-panel-dark p-6 sm:p-8 relative overflow-hidden transition-all duration-300 border border-slate-900 hover:border-cyan-500/20 hover:shadow-glow">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/10 transition-all duration-500" />
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Cpu size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 block">
                    Engine A
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide">
                    AI & Automation
                  </h3>
                </div>
              </div>

              <p className="text-xs uppercase font-medium tracking-wider text-slate-400 mb-3 group-hover:text-cyan-300/80 transition-colors">
                {"\"Adapting AI Into Your Business\""}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-light">
                Deploy custom software dashboards, automated n8n workflows, smart AI voice agents,
                CRM integrations, and complete lead capturing systems.
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:translate-x-1.5 transition-transform">
                Enter Engine A <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* ENGINE B CARD */}
          <Link href="/engine-b" className="group block text-left">
            <div className="h-full rounded-2xl glass-panel-dark p-6 sm:p-8 relative overflow-hidden transition-all duration-300 border border-slate-900 hover:border-violet-500/20 hover:shadow-glow-violet">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-bl-full group-hover:bg-violet-500/10 transition-all duration-500" />
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-800/40 text-violet-400 group-hover:scale-110 transition-transform">
                  <Film size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 block">
                    Engine B
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide">
                    Creative Muscle
                  </h3>
                </div>
              </div>

              <p className="text-xs uppercase font-medium tracking-wider text-slate-400 mb-3 group-hover:text-violet-300/80 transition-colors">
                {"\"Creative Growth & Assets\""}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-light">
                Elevate your visual positioning. Premium brand videography, editorial
                photography, social media growth, production workflows, and creative assets.
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 group-hover:translate-x-1.5 transition-transform">
                Enter Engine B <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CORE STRENGTHS / VALUES SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900/60 bg-[#020914]">
        <div className="text-center space-y-4 mb-14">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Operational Excellence
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-light">
            How we partner with companies to scale operations and brand value in tandem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {strengthItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel-dark border-slate-900 relative"
              >
                <div className={`p-2.5 rounded-xl border w-fit mb-4 ${item.color}`}>
                  <Icon size={18} />
                </div>
                <h4 className="font-display font-bold text-lg text-white mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
