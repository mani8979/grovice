"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Cpu, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Engine A", href: "/engine-a", icon: Cpu, desc: "AI & Automation" },
    { name: "Engine B", href: "/engine-b", icon: Film, desc: "Creative Muscle" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "glass-panel-dark py-3 shadow-lg border-b border-white/5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display font-black text-xl tracking-wider text-white flex items-center gap-1.5">
              GROVICE <span className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300">2.0</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-sans tracking-wide transition-colors ${
                pathname === "/" ? "text-cyan-400" : "text-slate-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-sans tracking-wide flex items-center gap-1.5 transition-colors ${
                    isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-cyan-400" : "text-slate-400"} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+917396621004"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition-all duration-300 px-4 py-2.5 rounded-full"
            >
              Book a Call <ArrowUpRight size={14} />
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 md:hidden glass-panel-dark border-b border-slate-800 shadow-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-2 border-b border-slate-800/60 ${
                  pathname === "/" ? "text-cyan-400 font-bold" : "text-slate-300"
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-2.5 border-b border-slate-800/60 ${
                      pathname === link.href ? "text-cyan-400 font-bold" : "text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-cyan-400" />
                      <div>
                        <p className="text-sm font-semibold">{link.name}</p>
                        <p className="text-[10px] text-slate-400">{link.desc}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-500" />
                  </Link>
                );
              })}

              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="tel:+917396621004"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 py-3 rounded-xl transition active:scale-95"
                >
                  Call Strategist (+91-7396621004)
                </a>
                <a
                  href="mailto:grovicedigital@gmail.com"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-xs font-semibold text-slate-300 border border-slate-700 py-3 rounded-xl hover:bg-white/5 transition"
                >
                  Email grovicedigital@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
