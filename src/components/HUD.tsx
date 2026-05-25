'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HUDProps {
  activeEngine?: 'A' | 'B';
}

const HUD: React.FC<HUDProps> = ({ activeEngine = 'A' }) => {
  const accentColor = activeEngine === 'A' ? 'var(--engine-a-accent)' : 'var(--engine-b-accent)';

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden">
      {/* Scanner Animation Overlay */}
      <div 
        className="hud-scanner" 
        style={{ 
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 15px ${accentColor}, 0 0 30px ${accentColor}`
        } as React.CSSProperties} 
      />

      {/* Top Left: System Status */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 left-8 flex flex-col gap-1"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          <span className="font-terminal text-[10px] text-white/50 tracking-widest">OS_VERSION_2.0.4</span>
        </div>
        <div className="flex flex-col">
          <span className="font-terminal text-[10px] text-white/30">SYSTEM STATUS:</span>
          <span className="font-terminal text-xs font-bold tracking-[0.25em]" style={{ color: accentColor }}>OPTIMAL_FLOW</span>
        </div>
      </motion.div>

      {/* Top Right: Engine Link */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute top-8 right-8 text-right flex flex-col gap-1"
      >
        <span className="font-terminal text-[10px] text-white/30 text-right">NEURAL_LINK_ESTABLISHED</span>
        <div className="flex flex-col items-end">
          <span className="font-terminal text-[10px] text-white/30 text-right">DUAL ENGINE LINK:</span>
          <span className="font-terminal text-xs font-bold tracking-[0.25em]" style={{ color: accentColor }}>ACTIVE_STABLE</span>
        </div>
      </motion.div>

      {/* Bottom Left: Data Stream */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute bottom-8 left-8 flex flex-col gap-1"
      >
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="font-terminal text-[8px] text-white/20">LATENCY</span>
            <span className="font-terminal text-[10px] text-white/50">12MS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-terminal text-[8px] text-white/20">FREQ</span>
            <span className="font-terminal text-[10px] text-white/50">60.00HZ</span>
          </div>
          <div className="flex flex-col">
            <span className="font-terminal text-[8px] text-white/20">MEM_USAGE</span>
            <span className="font-terminal text-[10px] text-white/50">42%</span>
          </div>
        </div>
        <span className="font-terminal text-[9px] text-white/30 mt-2">COORDS: 34.0522° N, 118.2437° W</span>
      </motion.div>

      {/* Bottom Right: Uptime */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 right-8 text-right flex flex-col gap-1"
      >
        <span className="font-terminal text-[10px] text-white/30">UPTIME_SESSION:</span>
        <span className="font-terminal text-[10px] text-white/50 tabular-nums">00:42:15:09</span>
        <div className="flex justify-end gap-1 mt-1">
          {[1,2,3,4,5].map(i => (
            <div 
              key={i} 
              className="w-3 h-1" 
              style={{ backgroundColor: i <= 3 ? accentColor : 'rgba(255,255,255,0.1)', opacity: 0.5 }} 
            />
          ))}
        </div>
      </motion.div>

      {/* Subtle Grid Overlay (Optional, but adds to the tech feel) */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
      
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/10" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/10" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/10" />
    </div>
  );
};

export default HUD;
