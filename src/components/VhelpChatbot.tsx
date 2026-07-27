import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Clock, 
  Bot, 
  User, 
  CheckCheck, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const WHATSAPP_LINK = "https://wa.me/message/XE2GLIKLK5LUO1";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionUrl?: string;
  actionText?: string;
}

export default function VhelpChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [secondsOpen, setSecondsOpen] = useState(0);
  const [hasAutoRedirected, setHasAutoRedirected] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Welcome Message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! 👋 I'm Vhelp, the AI assistant for Vprime Digitalz. How can I help you build your future website, boost your SEO, or scale your business today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Quick preset questions
  const quickPrompts = [
    "What services do you offer?",
    "How much does a website cost?",
    "Tell me about Vanalyst SEO",
    "Chat on WhatsApp directly 💬"
  ];

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  // Timer logic when chatbot is opened
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && !hasAutoRedirected) {
      timer = setInterval(() => {
        setSecondsOpen((prev) => {
          const next = prev + 1;

          // 30 Seconds Milestone Notification message
          if (next === 30) {
            setMessages((msgs) => [
              ...msgs,
              {
                id: Date.now().toString(),
                sender: "bot",
                text: "⚡ Need instant human assistance? You can jump straight to Victor's WhatsApp DM right now!",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actionUrl: WHATSAPP_LINK,
                actionText: "Open WhatsApp DM Now 💬"
              }
            ]);
          }

          // 60 Seconds (1 minute) Auto-Redirection
          if (next >= 60) {
            setHasAutoRedirected(true);
            setShowRedirectModal(true);
            setMessages((msgs) => [
              ...msgs,
              {
                id: Date.now().toString(),
                sender: "bot",
                text: "🎉 You've been chatting with Vhelp for 1 minute! Let's connect you directly with Victor Adebayo on WhatsApp to finalize your strategy and project quote.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actionUrl: WHATSAPP_LINK,
                actionText: "Continue Chat on WhatsApp 💬"
              }
            ]);
            clearInterval(timer);
          }

          return next;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, hasAutoRedirected]);

  // Knowledge base response generator for Vhelp
  const generateVhelpResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("whatsapp") || q.includes("dm") || q.includes("chat on whatsapp")) {
      return "Sure thing! Connecting you straight to Victor's official WhatsApp DM. Click the button below to start chatting directly!";
    }

    if (q.includes("service") || q.includes("what do you do") || q.includes("offer")) {
      return "At Vprime Digitalz, we specialize in 4 core pillars:\n1. Custom Full-Stack Web App Development\n2. High-Converting E-Commerce Platforms\n3. Technical SEO & Vanalyst Auditing\n4. Mobile Apps & API Architecture. What project are you planning?";
    }

    if (q.includes("cost") || q.includes("price") || q.includes("pricing") || q.includes("rate")) {
      return "Our transparent packages start at:\n- Essential Web: $1,200\n- Growth Full-Stack / SaaS: $2,800\n- Enterprise Custom App: $5,000+\nWe can also customize a bespoke quote for your exact requirements!";
    }

    if (q.includes("vanalyst") || q.includes("seo") || q.includes("audit") || q.includes("speed")) {
      return "Vanalyst is our built-in SEO & Performance Auditor powered by Google PageSpeed Insights! You can test any domain URL on our Services page to get a real-time 100-point SEO score!";
    }

    if (q.includes("who") || q.includes("victor") || q.includes("about") || q.includes("team")) {
      return "Vprime Digitalz is led by Victor Adebayo, a Full-Stack Engineer and Digital Architect dedicated to building high-performance web software that drives revenue for businesses globally.";
    }

    if (q.includes("how long") || q.includes("timeline") || q.includes("delivery") || q.includes("time")) {
      return "Typical delivery timelines:\n- Landing Pages & Essential Web: 5 - 10 Days\n- Full-Stack Web Apps & E-Commerce: 2 - 4 Weeks\n- Enterprise Platforms: Tailored sprint milestones.";
    }

    return `Thanks for asking! Vprime Digitalz delivers bespoke, high-performance web & software engineering. Would you like to discuss your specific requirements directly with Victor on WhatsApp?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const isWhatsAppTrigger = messageText.toLowerCase().includes("whatsapp");
      const botReplyText = generateVhelpResponse(messageText);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionUrl: isWhatsAppTrigger ? WHATSAPP_LINK : undefined,
        actionText: isWhatsAppTrigger ? "Chat on WhatsApp DM 💬" : undefined
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickPromptClick = (prompt: string) => {
    if (prompt.includes("WhatsApp")) {
      window.open(WHATSAPP_LINK, "_blank");
      return;
    }
    handleSendMessage(prompt);
  };

  return (
    <>
      {/* FLOATING CHATBOT TRIGGER BUTTON (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative group"
            >
              {/* Floating Tooltip Pill */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-slate-900 border border-slate-800 text-white text-xs font-medium px-3.5 py-2 rounded-2xl shadow-xl whitespace-nowrap hidden sm:flex items-center space-x-2 pointer-events-none group-hover:block transition-all">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ask <b>Vhelp AI</b> or Chat on WhatsApp</span>
              </div>

              {/* Main Circular Button */}
              <button
                id="vhelp-chatbot-trigger"
                onClick={() => setIsOpen(true)}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-950 text-brand border-2 border-brand/80 shadow-2xl shadow-brand/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer relative"
                aria-label="Open Vhelp AI Chatbot"
              >
                <div className="absolute inset-0 rounded-full bg-brand/20 animate-ping opacity-30" />
                <Bot size={28} className="text-brand relative z-10" />

                {/* Live Online Badge */}
                <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full z-20" />

                {/* Unread Indicator */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -left-1 bg-rose-500 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 z-20">
                    {unreadCount}
                  </span>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLOATING CHATBOT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="vhelp-chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-32px)] sm:w-[380px] md:w-[410px] h-[550px] max-h-[85vh] z-50 bg-slate-950/98 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* 1. CHAT HEADER */}
            <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-brand/20 border border-brand/50 flex items-center justify-center text-brand font-bold">
                    <Bot size={22} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-display font-bold text-sm text-white">Vhelp AI</h3>
                    <span className="text-[9px] font-mono uppercase bg-brand/20 text-brand px-1.5 py-0.5 rounded font-semibold">Online</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">Vprime Digitalz Virtual Assistant</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Direct WhatsApp Header Icon */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-colors text-xs font-mono font-bold flex items-center space-x-1 border border-emerald-500/30"
                  title="Direct WhatsApp Chat"
                >
                  <span>WhatsApp</span>
                  <ExternalLink size={12} />
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 2. TOP TIMER BANNER / 30S & 60S WHATSAPP NOTIFIER */}
            <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-300">
              <div className="flex items-center space-x-1.5">
                <Clock size={13} className="text-brand animate-spin-slow" />
                <span>Conversation Time: {secondsOpen}s</span>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-bold flex items-center space-x-1"
              >
                <span>30s WhatsApp DM</span>
                <ArrowRight size={11} />
              </a>
            </div>

            {/* 3. MESSAGES FEED */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brand text-slate-950 font-medium rounded-tr-none shadow-md"
                        : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md"
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Action Button inside message if present */}
                    {msg.actionUrl && (
                      <a
                        href={msg.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[11px] px-3 py-1.5 rounded-xl transition-all shadow-md"
                      >
                        <span>{msg.actionText || "Open WhatsApp"}</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 text-slate-400 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-none w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] font-mono ml-1">Vhelp is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 4. QUICK PROMPT PILLS */}
            <div className="px-3 py-2 bg-slate-900/40 border-t border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPromptClick(prompt)}
                  className={`text-[10px] font-medium px-2.5 py-1 rounded-full border shrink-0 transition-colors cursor-pointer ${
                    prompt.includes("WhatsApp")
                      ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* 5. INPUT BAR & WHATSAPP DIRECT CTA */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask Vhelp anything..."
                className="flex-1 bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-brand transition-colors"
              />

              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 bg-brand hover:bg-brand-dark text-slate-950 rounded-xl transition-colors cursor-pointer shrink-0"
                title="Send Message"
              >
                <Send size={15} />
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl transition-colors cursor-pointer shrink-0 font-bold"
                title="Instant WhatsApp DM"
              >
                <PhoneCall size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1-MINUTE WHATSAPP AUTO-REDIRECT MODAL */}
      <AnimatePresence>
        {showRedirectModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative"
            >
              <button
                onClick={() => setShowRedirectModal(false)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-full"
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <PhoneCall size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-display font-bold text-white">
                  Continue on <span className="text-emerald-400">WhatsApp DM</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You've been chatting with Vhelp AI for 1 minute! Let's connect you directly to Victor Adebayo's personal WhatsApp DM to finalize your website quote and project roadmap.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowRedirectModal(false)}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Chat With Victor on WhatsApp</span>
                  <ExternalLink size={15} />
                </a>

                <button
                  onClick={() => setShowRedirectModal(false)}
                  className="w-full py-2 text-slate-400 hover:text-white text-xs font-mono cursor-pointer"
                >
                  Stay on Website Chat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
