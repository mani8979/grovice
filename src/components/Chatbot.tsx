"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, Mail, Award, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

interface Message {
  sender: "bot" | "user";
  text: string | React.ReactNode;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Welcome to GROVICE 2.0. What do you need right now?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState<"chat" | "lead" | "submitted">("chat");
  const [leadInfo, setLeadInfo] = useState({ name: "", email: "", phone: "", service: "" });

  React.useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-chatbot", handleOpenChat);
    return () => {
      window.removeEventListener("open-chatbot", handleOpenChat);
    };
  }, []);

  const addMessage = (sender: "bot" | "user", text: string | React.ReactNode) => {
    setMessages((prev) => [...prev, { sender, text, timestamp: new Date() }]);
  };

  const handleOptionClick = (option: string, value: string) => {
    addMessage("user", option);

    setTimeout(() => {
      if (value === "engine_a") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2 font-semibold text-[#00D2FF]">Engine A: AI Automation & Software</p>
            <p className="mb-2 text-zinc-300">We design and integrate smart infrastructure:</p>
            <ul className="list-disc pl-4 mb-3 text-xs space-y-1 text-zinc-400 font-light">
              <li>AI Automation Systems & Workflows</li>
              <li>LLM Voice Agents & Smart Dialers</li>
              <li>CRM & Lead Sync Database Pipelines</li>
              <li>Custom Next.js Dashboards & Client Portals</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link href="/engine-a" className="text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-600 text-black px-3 py-1.5 transition" onClick={() => setIsOpen(false)}>
                Explore Engine A
              </Link>
              <button 
                onClick={() => handleOptionClick("Book AI Consultation", "request_audit")}
                className="text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-3 py-1.5 transition"
              >
                Book AI Audit
              </button>
            </div>
          </div>
        );
      } else if (value === "engine_b") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2 font-semibold text-[#FF4FD8]">Engine B: Cinematic Creative Muscle</p>
            <p className="mb-2 text-zinc-300">Premium branding, campaign shoots, and content scales:</p>
            <ul className="list-disc pl-4 mb-3 text-xs space-y-1 text-zinc-400 font-light">
              <li>Cinematic Commercial Films & Reels</li>
              <li>Premium Brand Photography (Vizag Coast)</li>
              <li>Logo Visual Branding & Guidelines</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link href="/engine-b" className="text-[10px] font-mono font-bold uppercase tracking-wider bg-pink-500 hover:bg-pink-600 text-black px-3 py-1.5 transition" onClick={() => setIsOpen(false)}>
                Explore Engine B
              </Link>
              <button 
                onClick={() => handleOptionClick("Book Creative Consult", "creative_package")}
                className="text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-3 py-1.5 transition"
              >
                Inquire Scoping
              </button>
            </div>
          </div>
        );
      } else if (value === "guide_me") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2 font-semibold text-[#7A5CFF]">Let us map the right engine.</p>
            <p className="mb-3 text-zinc-300 text-xs leading-relaxed font-light">
              Depending on whether you need custom backend tools (Engine A) or elite creative film production (Engine B), we will formulate a personalized coordinate blueprint.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button 
                onClick={() => handleOptionClick("Book a Discovery Call", "book_call")}
                className="text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-4 py-2 transition"
              >
                Book a Call 📞
              </button>
            </div>
          </div>
        );
      } else if (value === "request_audit" || value === "creative_package") {
        setLeadInfo((prev) => ({ ...prev, service: value === "request_audit" ? "AI Scoping Call" : "Creative Scoping Call" }));
        setFormStep("lead");
        addMessage(
          "bot",
          "Excellent choice. Please fill in your details below, and our coordinator will schedule the strategy briefing."
        );
      } else if (value === "book_call") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2 text-xs">Let&apos;s coordinate a strategy call! You can reach us instantly at:</p>
            <div className="space-y-1.5 text-[11px] text-zinc-300 font-mono">
              <p className="flex items-center gap-2"><Phone size={12} className="text-cyan-400" /> +91-7396621004</p>
              <p className="flex items-center gap-2"><Mail size={12} className="text-[#FF4FD8]" /> grovicedigital@gmail.com</p>
              <p className="flex items-center gap-2"><Award size={12} className="text-[#7A5CFF]" /> Vizag (Siripuram & Gajuwaka)</p>
            </div>
            <p className="mt-3 text-zinc-400 text-xs">Or drop contact details to request an immediate call back:</p>
            <button 
              onClick={() => {
                setLeadInfo((prev) => ({ ...prev, service: "General Scoping Call" }));
                setFormStep("lead");
              }}
              className="mt-2.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-600 text-black py-2 rounded transition w-full text-center"
            >
              Request Call Back
            </button>
          </div>
        );
      }
    }, 600);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    addMessage("user", userText);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Chat offline");
      }

      const data = await response.json();
      addMessage("bot", data.text);
    } catch (err) {
      console.error(err);
      addMessage(
        "bot",
        "Systems offline. You can connect with our founders at +91-7396621004 or email grovicedigital@gmail.com."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.name || !leadInfo.email) return;

    setFormStep("submitted");
    setTimeout(() => {
      addMessage(
        "bot",
        <div className="flex flex-col items-center text-center p-2">
          <CheckCircle2 size={36} className="text-emerald-400 mb-2" />
          <p className="font-semibold text-sm">Brief Received!</p>
          <p className="text-xs text-zinc-400 mt-1">Our strategist will contact you at {leadInfo.email} shortly.</p>
        </div>
      );
      setFormStep("chat");
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end gap-3">
      
      {/* Messages panel wrapper */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[340px] sm:w-[380px] h-[500px] rounded-xl flex flex-col overflow-hidden text-slate-100 shadow-2xl"
            style={{
              background: "rgba(10, 11, 16, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00D2FF] to-[#7A5CFF] flex items-center justify-center relative">
                    <div className="absolute inset-0.5 rounded-full bg-[#0A0B10] flex items-center justify-center">
                      <span className="w-3 h-3 rounded-full bg-[#00D2FF] animate-pulse" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0A0B10]" />
                </div>
                <div>
                  <h4 className="font-mono text-xs tracking-wider uppercase text-white font-bold">Grovice Assistant</h4>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Systems Ready</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content (Messages / Forms) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded px-3.5 py-2.5 text-xs shadow-md whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-[#7A5CFF] text-white font-semibold"
                        : "bg-white/5 border border-white/5 text-zinc-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/5 text-slate-400 rounded px-3.5 py-2.5 text-xs flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-[#00D2FF]" />
                    Processing...
                  </div>
                </motion.div>
              )}

              {/* Lead Form Overlay */}
              {formStep === "lead" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0A0B10]/95 border border-white/10 rounded p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xs text-[#00D2FF] uppercase tracking-wider">Brief Booking Form</p>
                    <button onClick={() => setFormStep("chat")} className="text-[10px] text-zinc-500 hover:text-white">Cancel</button>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <div>
                      <label className="text-[9px] text-zinc-400 block mb-1 uppercase font-bold tracking-wider">Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00D2FF]"
                        value={leadInfo.name}
                        onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                        placeholder="Sarah Connor"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-zinc-400 block mb-1 uppercase font-bold tracking-wider">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00D2FF]"
                        value={leadInfo.email}
                        onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                        placeholder="sarah@skynet.com"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-zinc-400 block mb-1 uppercase font-bold tracking-wider">Phone</label>
                      <input
                        type="tel"
                        className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00D2FF]"
                        value={leadInfo.phone}
                        onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 bg-[#7A5CFF] hover:bg-purple-600 text-white text-xs font-bold py-2 rounded transition"
                    >
                      Book Scoping Call
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Bot Quick Option Choices */}
              {formStep === "chat" && !isLoading && (
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => handleOptionClick("Engine A Info", "engine_a")}
                    className="self-start text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 px-3.5 py-2 rounded transition text-left"
                  >
                    Engine A (AI / Software / Systems) ⚡
                  </button>
                  <button
                    onClick={() => handleOptionClick("Engine B Info", "engine_b")}
                    className="self-start text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 px-3.5 py-2 rounded transition text-left"
                  >
                    Engine B (Creative / Branding / Video) 🎬
                  </button>
                  <button
                    onClick={() => handleOptionClick("Not sure — guide me", "guide_me")}
                    className="self-start text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 px-3.5 py-2 rounded transition text-left"
                  >
                    Not sure — guide me 🧭
                  </button>
                </div>
              )}
            </div>

            {/* Input Form footer */}
            {formStep === "chat" && (
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-white/5 bg-black/40 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  disabled={isLoading}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isLoading ? "Please wait..." : "Ask anything..."}
                  className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#7A5CFF] transition disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2 rounded bg-[#7A5CFF] hover:bg-purple-600 text-white transition flex items-center justify-center disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle and small label inline */}
      <div className="flex items-center gap-3 justify-end pointer-events-auto">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 0.5 }}
              className="bg-black/60 border border-white/10 backdrop-blur-md px-3.5 py-2 rounded-full text-[10px] font-mono tracking-wider text-white uppercase shadow-lg select-none"
            >
              What are you looking for?
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Glass Orb Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative cursor-pointer"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 0 20px rgba(122, 92, 255, 0.25)",
          }}
        >
          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full border border-[#7A5CFF]/40 animate-ping opacity-45 pointer-events-none" />

          {/* Center Orb */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00D2FF] to-[#FF4FD8] flex items-center justify-center relative">
            <div className="absolute inset-0.5 rounded-full bg-[#0A0B10] flex items-center justify-center">
              {isOpen ? (
                <X size={16} className="text-white" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A5CFF] animate-pulse" />
              )}
            </div>
          </div>
        </motion.button>
      </div>

    </div>
  );
}
