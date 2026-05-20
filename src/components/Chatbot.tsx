"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Phone, Mail, Award, CheckCircle2, Loader2 } from "lucide-react";
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
      text: "Hi! Welcome to GROVICE 2.0. I'm your digital growth partner. What are you looking to achieve today?",
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
            <p className="mb-2"><strong>Engine A</strong> is our business infrastructure core. We build:</p>
            <ul className="list-disc pl-4 mb-2 text-xs space-y-1">
              <li>Custom Enterprise Software & Dashboards</li>
              <li>AI Automation & Workflow Systems (n8n/Make)</li>
              <li>AI Voice Agents & Smart Chatbots</li>
              <li>CRM Integrations & Lead Automations</li>
            </ul>
            <p className="mb-2">Would you like to explore Engine A services or request a free consultation?</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link href="/engine-a" className="text-xs bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-3 py-1.5 rounded-full transition" onClick={() => setIsOpen(false)}>
                Go to Engine A Page
              </Link>
              <button 
                onClick={() => handleOptionClick("Book Engine A Consultation", "request_audit")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3 py-1.5 rounded-full transition"
              >
                Request AI Audit
              </button>
            </div>
          </div>
        );
      } else if (value === "engine_b") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2"><strong>Engine B</strong> is our creative muscle. We elevate your brand with:</p>
            <ul className="list-disc pl-4 mb-2 text-xs space-y-1">
              <li>Cinematic Videography & Reels</li>
              <li>Premium Brand Photography & Production</li>
              <li>Full Brand Identity Design & Content Management</li>
            </ul>
            <p className="mb-2">Would you like to view our creative portfolio or contact our media lead?</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link href="/engine-b" className="text-xs bg-violet-500 hover:bg-violet-600 text-white font-semibold px-3 py-1.5 rounded-full transition" onClick={() => setIsOpen(false)}>
                Go to Engine B Portfolio
              </Link>
              <button 
                onClick={() => handleOptionClick("Inquire about Creative Packages", "creative_package")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3 py-1.5 rounded-full transition"
              >
                Inquire Packages
              </button>
            </div>
          </div>
        );
      } else if (value === "request_audit" || value === "creative_package") {
        setLeadInfo((prev) => ({ ...prev, service: value === "request_audit" ? "Engine A (AI Audit)" : "Engine B (Creative Packages)" }));
        setFormStep("lead");
        addMessage(
          "bot",
          "Awesome choice! Let's get some basic details so our team can prepare a custom strategy for you. Please fill out the brief form below."
        );
      } else if (value === "book_call") {
        addMessage(
          "bot",
          <div>
            <p className="mb-2">Let&apos;s coordinate a strategy call! You can reach us instantly at:</p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="flex items-center gap-2"><Phone size={12} className="text-cyan-400" /> +91-7396621004</p>
              <p className="flex items-center gap-2"><Mail size={12} className="text-cyan-400" /> grovicedigital@gmail.com</p>
              <p className="flex items-center gap-2"><Award size={12} className="text-cyan-400" /> Visakhapatnam (Siripuram & Gajuwaka)</p>
            </div>
            <p className="mt-2">Or, leave your contact details here and we will reach out within 2 hours!</p>
            <button 
              onClick={() => {
                setLeadInfo((prev) => ({ ...prev, service: "General Consult" }));
                setFormStep("lead");
              }}
              className="mt-2 text-xs bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-3 py-1.5 rounded-full transition w-full text-center"
            >
              Leave Contact Details
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
        throw new Error("Chat service status error");
      }

      const data = await response.json();
      addMessage("bot", data.text);
    } catch (err) {
      console.error("Chatbot response error:", err);
      addMessage(
        "bot",
        "Apologies, my systems are currently running offline. You can connect directly with our founders at +91-7396621004 or email grovicedigital@gmail.com."
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
          <p className="font-semibold text-sm">Lead Submitted Successfully!</p>
          <p className="text-xs text-slate-400 mt-1">Our strategist will contact you at {leadInfo.email} (or phone) shortly.</p>
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
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[360px] md:w-[380px] h-[500px] rounded-2xl glass-panel-dark shadow-2xl flex flex-col overflow-hidden border border-slate-800 text-slate-100"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-600 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm tracking-wide">GROVICE Assistant</h4>
                  <p className="text-[10px] text-slate-400">Online | Powered by Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
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
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm shadow-md whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-tr-none"
                        : "bg-slate-900/60 border border-slate-800/80 text-slate-200 rounded-tl-none"
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
                  <div className="bg-slate-900/60 border border-slate-800/80 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-cyan-400" />
                    GROVICE is processing your request...
                  </div>
                </motion.div>
              )}

              {/* Lead Form Overlay */}
              {formStep === "lead" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xs text-cyan-400">Consultation Request</p>
                    <button onClick={() => setFormStep("chat")} className="text-[10px] text-slate-400 hover:text-white">Cancel</button>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950/80 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                        value={leadInfo.name}
                        onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-950/80 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                        value={leadInfo.email}
                        onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                        placeholder="e.g. john@company.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full bg-slate-950/80 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                        value={leadInfo.phone}
                        onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-950 text-xs font-bold py-2 rounded transition"
                    >
                      Submit Strategy Request
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Bot Quick Option Choices */}
              {formStep === "chat" && !isLoading && (
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => handleOptionClick("Explain Engine A (Software + AI)", "engine_a")}
                    className="self-start text-xs border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-950/40 px-3 py-2 rounded-full transition text-left"
                  >
                    Engine A: Software & AI Automation ⚙️
                  </button>
                  <button
                    onClick={() => handleOptionClick("Explain Engine B (Creative Muscle)", "engine_b")}
                    className="self-start text-xs border border-violet-500/20 bg-violet-950/20 text-violet-400 hover:bg-violet-950/40 px-3 py-2 rounded-full transition text-left"
                  >
                    Engine B: Creative Muscle 🎥
                  </button>
                  <button
                    onClick={() => handleOptionClick("How do I contact Grovice?", "book_call")}
                    className="self-start text-xs border border-slate-700 bg-slate-800/40 text-slate-200 hover:bg-slate-800/60 px-3 py-2 rounded-full transition text-left"
                  >
                    Direct Contact Details 📞
                  </button>
                </div>
              )}
            </div>

            {/* Input Form footer */}
            {formStep === "chat" && (
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  disabled={isLoading}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isLoading ? "Please wait..." : "Ask anything..."}
                  className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 transition flex items-center justify-center disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-600 flex items-center justify-center shadow-glow text-white border border-cyan-300/20 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={24} />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border border-slate-950 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
