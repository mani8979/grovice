"use client";

import React, { useEffect, useRef } from "react";

export default function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates for subtle pull effect
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initialize particles representing coastal fog and sea spray
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      fadeSpeed: number;
      color: string;
      angle: number;
      spinSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 60;

    const colors = [
      "rgba(14, 165, 233, ", // Ocean light blue
      "rgba(56, 189, 248, ", // Sky blue
      "rgba(255, 255, 255, ", // Mist white
      "rgba(0, 229, 255, ", // Neon blue
    ];

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1, // Drifting upwards
        alpha: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    // Coastal Waves simulator lines
    interface WaveLine {
      y: number;
      length: number;
      amplitude: number;
      frequency: number;
      phase: number;
      speed: number;
      color: string;
    }

    const waveLines: WaveLine[] = [
      { y: height * 0.85, length: 0.002, amplitude: 25, frequency: 0.005, phase: 0, speed: 0.008, color: "rgba(0, 229, 255, 0.04)" },
      { y: height * 0.9, length: 0.003, amplitude: 15, frequency: 0.008, phase: 2, speed: 0.012, color: "rgba(139, 92, 246, 0.03)" },
      { y: height * 0.8, length: 0.001, amplitude: 35, frequency: 0.003, phase: 4, speed: 0.005, color: "rgba(255, 255, 255, 0.02)" },
    ];

    const render = () => {
      // Create radial ambient beach sunset glow in background
      // Ocean deep dark blue to subtle luxury cyan-mist
      ctx.fillStyle = "#020914";
      ctx.fillRect(0, 0, width, height);

      // Ambient radial sunset beach glow (Vizag Coastal luxury feeling)
      // Cyan and violet sun setting reflection on RK Beach
      const gradient = ctx.createRadialGradient(
        width * 0.5 + (mouse.x - width / 2) * 0.05,
        height * 0.65 + (mouse.y - height / 2) * 0.05,
        10,
        width * 0.5,
        height * 0.7,
        Math.max(width * 0.8, 600)
      );
      gradient.addColorStop(0, "rgba(2, 48, 82, 0.35)"); // Deep coastal marine
      gradient.addColorStop(0.5, "rgba(12, 10, 48, 0.2)"); // Deep purple haze
      gradient.addColorStop(1, "rgba(2, 9, 20, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw Wave lines (simulating sea tide)
      waveLines.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        // Draw wavy line from left to right
        for (let x = 0; x < width; x += 5) {
          // Adjust amplitude based on mouse height position slightly
          const mouseAmplitudeOffset = (mouse.y - height / 2) * 0.03;
          const currentY =
            wave.y +
            Math.sin(x * wave.length + wave.phase) * (wave.amplitude + mouseAmplitudeOffset);
          ctx.lineTo(x, currentY);
        }
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();

        // Increment wave phase for motion
        wave.phase += wave.speed;
      });

      // Update and draw particles (spray and sea mist)
      particles.forEach((p) => {
        // Move towards mouse pull slightly
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Apply slight gravity pull if mouse is close
        if (dist < 300) {
          p.x += (dx / dist) * 0.2;
          p.y += (dy / dist) * 0.2;
        }

        p.x += p.speedX + Math.sin(p.angle) * 0.1;
        p.y += p.speedY;
        p.angle += p.spinSpeed;

        // Reset if drifted off-screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.alpha = 0;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
        }

        // Fade particle in and out organicly
        p.alpha += p.fadeSpeed;
        if (p.alpha > 0.6 || p.alpha < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }
        p.alpha = Math.max(0, Math.min(0.6, p.alpha));

        ctx.beginPath();
        // Create glowing particle effect
        const particleGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        particleGlow.addColorStop(0, p.color + p.alpha + ")");
        particleGlow.addColorStop(1, p.color + "0)");
        
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = particleGlow;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
