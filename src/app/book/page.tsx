"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Check, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

/* ── SPOTLIGHT CARD HELPER ── */
function SpotlightCard({
  children,
  className = "",
  hoverBorder = true
}: {
  children: React.ReactNode;
  className?: string;
  hoverBorder?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${hoverBorder ? "spotlight-border" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export default function BookPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    engine: "engine-a",
    message: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        engine: "engine-a",
        message: ""
      });
    }, 6000);
  };

  return (
    <div className="bg-[#040308] text-[#F6F7FB] min-h-screen relative font-sans pt-28 overflow-hidden flex flex-col">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-15%] w-[60%] h-[60%] rounded-full bg-[#FF9E00]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[60%] h-[60%] rounded-full bg-[#FF4069]/5 blur-[130px] pointer-events-none" />

      <main className="flex-grow max-w-7xl mx-auto px-6 w-full z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Panel: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF4069]/20 bg-[#FF4069]/10 w-fit">
                <Sparkles size={12} className="text-[#FF4069]" />
                <span className="text-[10px] font-mono text-[#FF4069] uppercase tracking-widest font-bold">
                  SCHEDULING PORTAL
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-white font-sans">
                Book a Call with GROVICE 2.0
              </h1>
              
              <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md">
                Tell us about your project requirements and operational pipelines. We will evaluate details and guide you to the perfect engine solution.
              </p>
            </div>

            {/* Direct Information Box */}
            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#0b0912] border border-white/5 flex items-center justify-center text-[#FF9E00]">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-zinc-600 text-[9px] uppercase tracking-wider font-bold">Direct Hotline</p>
                  <a href="tel:+917396621004" className="hover:text-white transition">+91-7396621004</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#0b0912] border border-white/5 flex items-center justify-center text-[#FF4069]">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="text-zinc-600 text-[9px] uppercase tracking-wider font-bold">Email Inquiry</p>
                  <a href="mailto:grovicedigital@gmail.com" className="hover:text-white transition">grovicedigital@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#0b0912] border border-white/5 flex items-center justify-center text-[#FF4069]">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-zinc-600 text-[9px] uppercase tracking-wider font-bold">HQ Location</p>
                  <span className="text-zinc-300">Visakhapatnam — Siripuram & Gajuwaka</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Short Form */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-8 md:p-10 bg-[#0b0912] border-white/5 rounded-[24px] relative">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] text-zinc-500 font-mono block mb-1.5 uppercase font-bold tracking-wider">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Sarah Connor"
                          className="w-full bg-[#040308] border border-white/10 rounded px-4.5 py-3 text-xs text-white focus:outline-none focus:border-[#FF9E00] transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="text-[10px] text-zinc-500 font-mono block mb-1.5 uppercase font-bold tracking-wider">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#040308] border border-white/10 rounded px-4.5 py-3 text-xs text-white focus:outline-none focus:border-[#FF9E00] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono block mb-1.5 uppercase font-bold tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@skynet.com"
                        className="w-full bg-[#040308] border border-white/10 rounded px-4.5 py-3 text-xs text-white focus:outline-none focus:border-[#FF9E00] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono block mb-1.5 uppercase font-bold tracking-wider">Preferred Engine</label>
                      <select
                        value={formData.engine}
                        onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                        className="w-full bg-[#040308] border border-white/10 rounded px-4.5 py-3 text-xs text-white focus:outline-none focus:border-[#FF9E00] cursor-pointer"
                      >
                        <option value="engine-a">Engine A (AI / Software / Systems)</option>
                        <option value="engine-b">Engine B (Creative / Branding / Video)</option>
                        <option value="undecided">Not sure — Guide me</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono block mb-1.5 uppercase font-bold tracking-wider">Describe what you are building</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Explain project requirements, goals, and desired schedule timeline..."
                        className="w-full bg-[#040308] border border-white/10 rounded px-4.5 py-3 text-xs text-white focus:outline-none focus:border-[#FF9E00] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4.5 text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FF9E00] via-[#FF4069] to-[#7000FF] hover:opacity-90 transition-all duration-300"
                    >
                      Request Consultation
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Check size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xl font-sans">Call Request Confirmed!</h4>
                      <p className="text-xs text-zinc-400 max-w-sm mt-2 leading-relaxed font-light">
                        Thank you, {formData.name}. Our strategy coordinator will evaluate your selection and contact you at {formData.email} within 2 hours to finalize booking time slots.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
