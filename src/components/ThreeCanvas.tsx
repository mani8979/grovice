"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the ThreeCanvasInner with SSR disabled to prevent server-side errors
const ThreeCanvasInner = dynamic(() => import("./ThreeCanvasInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-transparent">
      {/* Premium glowing skeleton loader */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full border-t-2 border-cyan-400 animate-spin" />
        <div className="absolute w-24 h-24 rounded-full border-b-2 border-violet-500 animate-spin [animation-duration:1.5s]" />
        <span className="font-display font-bold text-xs tracking-widest text-cyan-400 animate-pulse">
          INITIALIZING 3D ENGINE
        </span>
      </div>
    </div>
  ),
});

export default function ThreeCanvas() {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] relative z-10 select-none">
      <ThreeCanvasInner />
    </div>
  );
}
