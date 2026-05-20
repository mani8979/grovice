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
      text: "What are you looking for?",
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
      if (value === "ai_automation") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2 font-semibold">Engine A: AI Automation</p>
            <p className="mb-2 text-slate-300">We design and integrate smart infrastructure:</p>
            <ul className="list-disc pl-4 mb-2 text-xs space-y-1 text-slate-300">
              <li>Voice Agents & Smart Dialers</li>
              <li>CRM & Lead Routing Workflows (n8n/Make)</li>
              <li>Automated Customer Support Chatbots</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link href="/engine-a" className="text-xs bg-[#2F6BFF] hover:bg-blue-600 text-white font-semibold px-3 py-1.5 rounded transition" onClick={() => setIsOpen(false)}>
                Explore Engine A
              </Link>
              <button 
                onClick={() => handleOptionClick("Book AI Consultation", "request_audit")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3 py-1.5 rounded transition"
              >
                Inquire Scoping
              </button>
            </div>
          </div>
        );
      } else if (value === "creative_services") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2 font-semibold">Engine B: Creative Muscle</p>
            <p className="mb-2 text-slate-300">Premium branding, campaign shoots, and content scales:</p>
            <ul className="list-disc pl-4 mb-2 text-xs space-y-1 text-slate-300">
              <li>Cinematic Commercial Films & Reels</li>
              <li>Premium Brand Photography (Vizag Coast)</li>
              <li>Full Corporate Identity Guides</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link href="/engine-b" className="text-xs bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1.5 rounded transition" onClick={() => setIsOpen(false)}>
                Explore Engine B
              </Link>
              <button 
                onClick={() => handleOptionClick("Inquire Creative Brief", "creative_package")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3 py-1.5 rounded transition"
              >
                Inquire Packages
              </button>
            </div>
          </div>
        );
      } else if (value === "software_projects") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2 font-semibold">Custom Software Development</p>
            <p className="mb-2 text-slate-300">High-performance web apps, custom client portal systems, and database systems:</p>
            <ul className="list-disc pl-4 mb-2 text-xs space-y-1 text-slate-300">
              <li>Next.js Web Platforms & Admin Panels</li>
              <li>Robust Client Management Dashboards</li>
              <li>Custom Database Integrations</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link href="/engine-a" className="text-xs bg-[#2F6BFF] hover:bg-blue-600 text-white font-semibold px-3 py-1.5 rounded transition" onClick={() => setIsOpen(false)}>
                Software Details
              </Link>
              <button 
                onClick={() => handleOptionClick("Book Call", "book_call")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3 py-1.5 rounded transition"
              >
                Let&apos;s Connect
              </button>
            </div>
          </div>
        );
      } else if (value === "request_audit" || value === "creative_package") {
        setLeadInfo((prev) => ({ ...prev, service: value === "request_audit" ? "AI Scoping Call" : "Creative Scoping Call" }));
        setFormStep("lead");
        addMessage(
          "bot",
          "Excellent choice. Please fill in your name and email below, and our coordinator will schedule the strategy briefing."
        );
      } else if (value === "book_call") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2">Let&apos;s coordinate a strategy call! You can reach us instantly at:</p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="flex items-center gap-2"><Phone size={12} className="text-blue-400" /> +91-7396621004</p>
              <p className="flex items-center gap-2"><Mail size={12} className="text-blue-400" /> grovicedigital@gmail.com</p>
              <p className="flex items-center gap-2"><Award size={12} className="text-blue-400" /> Vizag (Siripuram & Gajuwaka)</p>
            </div>
            <p className="mt-2 text-slate-400">Or drop your contact info here to receive a call back within 2 hours:</p>
            <button 
              onClick={() => {
                setLeadInfo((prev) => ({ ...prev, service: "General Scoping Call" }));
                setFormStep("lead");
              }}
              className="mt-2 text-xs bg-[#2F6BFF] hover:bg-blue-600 text-white font-semibold px-3 py-1.5 rounded transition w-full text-center"
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
        "Offline. You can connect with our founders at +91-7396621004 or email grovicedigital@gmail.com."
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
          <p className="text-xs text-slate-400 mt-1">Our strategist will contact you at {leadInfo.email} shortly.</p>
        </div>
      );
      setFormStep("chat");
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[340px] sm:w-[380px] h-[500px] rounded-xl flex flex-col overflow-hidden text-slate-100 shadow-2xl"
            style={{
              background: "rgba(7, 28, 61, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2F6BFF] to-[#DCEBFF] flex items-center justify-center relative">
                    {/* Glass pulsing orb look inside header */}
                    <div className="absolute inset-0.5 rounded-full bg-[#071C3D] flex items-center justify-center">
                      <span className="w-3 h-3 rounded-full bg-[#2F6BFF] animate-pulse" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#071C3D]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs tracking-wider uppercase text-white">Grovice OS Assistant</h4>
                  <p className="text-[9px] text-[#BFD4FF]/60 uppercase tracking-widest font-bold">Systems Ready</p>
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
                    className={`max-w-[85%] rounded px-3.5 py-2.5 text-xs md:text-sm shadow-md whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-[#2F6BFF] text-white font-medium"
                        : "bg-white/5 border border-white/5 text-slate-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Server loading state indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/5 text-slate-400 rounded px-3.5 py-2.5 text-xs flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-[#2F6BFF]" />
                    Processing...
                  </div>
                </motion.div>
              )}

              {/* Lead Form Overlay */}
              {formStep === "lead" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#071C3D]/95 border border-white/10 rounded p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xs text-[#2F6BFF] uppercase tracking-wider">Brief Booking Form</p>
                    <button onClick={() => setFormStep("chat")} className="text-[10px] text-slate-400 hover:text-white">Cancel</button>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <div>
                      <label className="text-[9px] text-[#BFD4FF]/60 block mb-1 uppercase font-bold tracking-wider">Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#2F6BFF]"
                        value={leadInfo.name}
                        onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                        placeholder="Sarah Connor"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-[#BFD4FF]/60 block mb-1 uppercase font-bold tracking-wider">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#2F6BFF]"
                        value={leadInfo.email}
                        onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                        placeholder="sarah@skynet.com"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-[#BFD4FF]/60 block mb-1 uppercase font-bold tracking-wider">Phone</label>
                      <input
                        type="tel"
                        className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#2F6BFF]"
                        value={leadInfo.phone}
                        onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 bg-[#2F6BFF] hover:bg-blue-600 text-white text-xs font-bold py-2 rounded transition"
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
                    onClick={() => handleOptionClick("AI Automation Info", "ai_automation")}
                    className="self-start text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 px-3.5 py-2 rounded transition text-left"
                  >
                    AI Automation ⚡
                  </button>
                  <button
                    onClick={() => handleOptionClick("Creative Services Info", "creative_services")}
                    className="self-start text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 px-3.5 py-2 rounded transition text-left"
                  >
                    Creative Services 🎬
                  </button>
                  <button
                    onClick={() => handleOptionClick("Software Projects Info", "software_projects")}
                    className="self-start text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 px-3.5 py-2 rounded transition text-left"
                  >
                    Software Projects 💻
                  </button>
                  <button
                    onClick={() => handleOptionClick("Book a Scoping Call", "book_call")}
                    className="self-start text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 px-3.5 py-2 rounded transition text-left"
                  >
                    Book a Call 📞
                  </button>
                </div>
              )}
            </div>

            {/* Input Form footer */}
            {formStep === "chat" && (
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-white/5 bg-[#071C3D]/40 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  disabled={isLoading}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isLoading ? "Please wait..." : "Ask anything..."}
                  className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2F6BFF] transition disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2 rounded bg-[#2F6BFF] hover:bg-blue-600 text-white transition flex items-center justify-center disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
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
          boxShadow: "0 0 20px rgba(47, 107, 255, 0.25)",
        }}
      >
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full border border-[#2F6BFF]/40 animate-ping opacity-45 pointer-events-none" />

        {/* Center Orb */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2F6BFF] to-[#DCEBFF] flex items-center justify-center relative">
          <div className="absolute inset-0.5 rounded-full bg-[#071C3D] flex items-center justify-center">
            {isOpen ? (
              <X size={16} className="text-white" />
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F6BFF] animate-pulse" />
            )}
          </div>
        </div>
      </motion.button>
    </div>
  );
}
