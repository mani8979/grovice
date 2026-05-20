import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Brand */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="font-display font-black text-2xl tracking-wider text-white">
            GROVICE <span className="text-cyan-400">2.0</span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm font-sans">
            Visakhapatnam’s First Business Operating System. Bridging high-performance AI Automation with world-class Creative Excellence.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://www.instagram.com/grovice2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center text-slate-400 transition"
              aria-label="Instagram"
            >
              <svg
                className="w-[18px] h-[18px] stroke-current fill-none stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Engines Gateway */}
        <div className="space-y-4">
          <h5 className="font-display font-bold text-sm uppercase tracking-widest text-slate-200">The Engines</h5>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/engine-a" className="hover:text-cyan-400 transition">
                Engine A: Software & AI
              </Link>
            </li>
            <li>
              <Link href="/engine-b" className="hover:text-cyan-400 transition">
                Engine B: Creative Muscle
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h5 className="font-display font-bold text-sm uppercase tracking-widest text-slate-200">Get In Touch</h5>
          <ul className="space-y-3 text-sm text-slate-400 font-sans">
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-cyan-400 shrink-0" />
              <a href="tel:+917396621004" className="hover:text-white transition">
                +91-7396621004
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-cyan-400 shrink-0" />
              <a href="mailto:grovicedigital@gmail.com" className="hover:text-white transition">
                grovicedigital@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-slate-200">Visakhapatnam, AP</p>
                <p className="text-xs text-slate-500">Siripuram & Gajuwaka</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} GROVICE 2.0. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Designed for Coastal Luxury & Business Automation
        </p>
      </div>
    </footer>
  );
}
