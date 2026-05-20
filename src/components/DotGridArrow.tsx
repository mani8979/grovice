"use client";

import React from "react";

interface DotGridArrowProps {
  colorClass?: string;
}

export default function DotGridArrow({ colorClass = "fill-cyan-400" }: DotGridArrowProps) {
  const rows = 7;
  const cols = 7;
  const spacing = 8;
  const radius = 1.5;

  // Arrow dots coordinates (row, col)
  const arrowDots = [
    { r: 1, c: 2 },
    { r: 2, c: 3 },
    { r: 3, c: 0 },
    { r: 3, c: 1 },
    { r: 3, c: 2 },
    { r: 3, c: 3 },
    { r: 3, c: 4 },
    { r: 4, c: 3 },
    { r: 5, c: 2 },
  ];

  const isArrowDot = (r: number, c: number) => {
    return arrowDots.some((d) => d.r === r && d.c === c);
  };

  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * spacing + 4;
      const cy = r * spacing + 4;
      const isArrow = isArrowDot(r, c);
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={cx}
          cy={cy}
          r={radius}
          className={`${
            isArrow
              ? `${colorClass} opacity-100 transition-all duration-300`
              : "fill-slate-700 opacity-25 group-hover:opacity-40 transition-opacity duration-300"
          }`}
        />
      );
    }
  }

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
    >
      {dots}
    </svg>
  );
}
