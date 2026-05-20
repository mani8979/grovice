"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Film, Phone, Mail, MapPin } from "lucide-react";
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen flex flex-col justify-between">
      {/* Premium Coastal Sunset Canvas Background */}
      <WaveGrid />

      {/* Overlay to ensure readability and luxury lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020914]/40 via-transparent to-[#020914]/90 pointer-events-none z-0" />

      {/* Main Brand Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-16 relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full text-center space-y-4"
        >
          {/* Main 3D Centered Text Canvas */}
          <motion.div variants={itemVariants} className="w-full max-w-3xl mx-auto">
            <ThreeCanvas />
          </motion.div>

          {/* Under-Title Tagline */}
          <motion.div variants={itemVariants} className="space-y-3 -mt-6">
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              One Stop Business Solution
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
              Where <span className="text-cyan-400 font-medium">AI Automation</span> Meets{" "}
              <span className="text-violet-400 font-medium">Creative Excellence</span>.
            </p>
          </motion.div>

          {/* Gateway Section - Two Engine Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-10"
          >
            {/* ENGINE A CARD */}
            <Link href="/engine-a" className="group block text-left">
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                className="h-full rounded-2xl glass-panel-dark p-6 sm:p-8 relative overflow-hidden transition-all duration-300 border border-slate-800/80 group-hover:border-cyan-500/30 group-hover:shadow-glow"
              >
                {/* Visual indicators */}
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
              </motion.div>
            </Link>

            {/* ENGINE B CARD */}
            <Link href="/engine-b" className="group block text-left">
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                className="h-full rounded-2xl glass-panel-dark p-6 sm:p-8 relative overflow-hidden transition-all duration-300 border border-slate-800/80 group-hover:border-violet-500/30 group-hover:shadow-glow-violet"
              >
                {/* Visual indicators */}
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
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick Info bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-10 text-xs sm:text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-cyan-400" />
              <a href="tel:+917396621004" className="hover:text-white transition">
                +91-7396621004
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-cyan-400" />
              <a href="mailto:grovicedigital@gmail.com" className="hover:text-white transition">
                grovicedigital@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-cyan-400" />
              <span>Visakhapatnam, AP</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
