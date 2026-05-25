"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface EngineCardProps {
  title: string;
  description: string;
  engineType: "A" | "B";
  href: string;
}

export default function EngineCard({ title, description, engineType, href }: EngineCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = engineType === "A" ? "var(--engine-a-accent)" : "var(--engine-b-accent)";
  
  // Create a grid of bits for Engine A
  const bits = Array.from({ length: 200 }).map(() => (Math.random() > 0.5 ? "1" : "0"));

  return (
    <Link href={href} className="block w-full">
      <motion.div
        className="glass-card relative p-8 md:p-10 rounded-[2rem] group cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Border Override Layer (since globals.css before is static) */}
        <div 
          className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            padding: "1.5px",
            background: `conic-gradient(from var(--border-angle), transparent 50%, ${accentColor})`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            borderRadius: "inherit",
          } as React.CSSProperties}
        />

        {/* Specialized Hover Effects Background Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {engineType === "A" ? (
                  /* Data Stream Effect */
                  <div className="absolute inset-0 flex flex-wrap gap-2 p-6 font-mono text-[8px] text-cyan-400/40 mix-blend-screen overflow-hidden">
                    {bits.map((bit, i) => (
                      <motion.span
                        key={i}
                        animate={{ 
                          opacity: [0.2, 1, 0.2],
                          color: [ "rgba(0,229,255,0.2)", "rgba(0,229,255,1)", "rgba(0,229,255,0.2)" ]
                        }}
                        transition={{ 
                          duration: 1 + Math.random() * 2, 
                          repeat: Infinity, 
                          delay: Math.random() * 2 
                        }}
                      >
                        {bit}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  /* Cinematic Glitch / Frame Flicker */
                  <div className="absolute inset-0 mix-blend-overlay">
                    <motion.div 
                      className="absolute inset-0 bg-pink-500/20"
                      animate={{ 
                        clipPath: [
                          "inset(20% 0 70% 0)",
                          "inset(40% 0 10% 0)",
                          "inset(10% 0 85% 0)",
                          "inset(70% 0 5% 0)",
                          "inset(30% 0 40% 0)"
                        ],
                        x: [0, -5, 5, -2, 0],
                        opacity: [0, 0.4, 0.1, 0.6, 0]
                      }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.1 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-white/10"
                      animate={{ 
                        opacity: [0, 0.2, 0, 0.1, 0],
                        scaleY: [1, 1.1, 1, 1.2, 1]
                      }}
                      transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 0.05 }}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col h-full min-h-[280px] justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span 
                className="font-mono-tech text-[10px] tracking-[0.3em] uppercase block"
                style={{ color: accentColor }}
              >
                SYSTEM ENGINE
              </span>
              <span className="text-4xl font-black text-white/10 select-none">
                0{engineType === "A" ? "1" : "2"}
              </span>
            </div>
            
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-lg"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.85] tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
              {title.split(' ').map((word, i) => (
                <span key={i} className="block last:text-transparent last:[-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">
                  {word}
                </span>
              ))}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed max-w-[260px] font-medium">
              {description}
            </p>
          </div>

          <div className="pt-6">
            <div 
              className="w-12 h-[3px] rounded-full transition-all duration-700 group-hover:w-full group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              style={{ background: accentColor }}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
