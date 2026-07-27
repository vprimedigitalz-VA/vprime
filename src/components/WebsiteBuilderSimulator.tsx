import React, { useState } from "react";
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Monitor, 
  Smartphone, 
  ShoppingBag, 
  Calendar, 
  MessageSquareCode, 
  Zap, 
  Layers, 
  Globe, 
  ShieldCheck, 
  Star, 
  Copy, 
  Bot, 
  Moon, 
  Sun,
  Palette,
  Briefcase,
  Wand2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WebsiteBuilderSimulatorProps {
  onBookCall: () => void;
}

// Data Options
const BUSINESS_TYPES = [
  {
    id: "ecommerce",
    name: "E-Commerce / Store",
    icon: ShoppingBag,
    tagline: "High-Converting Digital Storefront",
    heroHeading: "Elevate Your Brand's Online Retail",
    heroSubtext: "Lightning-fast custom shop with seamless checkout, real-time inventory, and mobile perfection.",
    ctaText: "Shop New Collection",
    badge: "3.2x Faster Checkout",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "saas",
    name: "SaaS & Tech Product",
    icon: Zap,
    tagline: "AI-Powered SaaS Platform",
    heroHeading: "Scale Your Workflow with Intelligent Automation",
    heroSubtext: "Unified analytics dashboard, enterprise-grade APIs, and frictionless customer onboarding.",
    ctaText: "Start 14-Day Free Trial",
    badge: "99.99% Uptime SLA",
    image: "https://res.cloudinary.com/iuczvp68/image/upload/v1784648495/25332547_web_pages_presentation_mock_up_051_ajiuts.jpg"
  },
  {
    id: "agency",
    name: "Agency & Studio",
    icon: Briefcase,
    tagline: "Award-Winning Creative Studio",
    heroHeading: "We Craft Iconic Digital Experiences",
    heroSubtext: "Bespoke digital design, brand engineering, and immersive interactive digital products.",
    ctaText: "Explore Our Work",
    badge: "Site of the Day Winner",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "wellness",
    name: "Health & Wellness",
    icon: ShieldCheck,
    tagline: "Modern Aesthetic Clinic & Care",
    heroHeading: "Premium Healthcare Engineered for Patients",
    heroSubtext: "Frictionless patient scheduling, secure tele-consultations, and holistic care management.",
    ctaText: "Book Consultation",
    badge: "HIPAA Compliant",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "hospitality",
    name: "Dining & Hospitality",
    icon: Globe,
    tagline: "Boutique Hospitality & Dining",
    heroHeading: "A Taste of Architectural Culinary Excellence",
    heroSubtext: "Interactive tasting menus, instant VIP table reservations, and private event bookings.",
    ctaText: "Reserve Table Online",
    badge: "Michelin Guide Featured",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
  }
];

const STYLES = [
  {
    id: "modern-minimal",
    name: "Modern Minimalist",
    desc: "Crisp typography, clean line borders, generous breathing space.",
    cardBg: "bg-white",
    cardText: "text-slate-900",
    borderStyle: "border-slate-200",
    fontFamily: "font-sans"
  },
  {
    id: "dark-futuristic",
    name: "Dark Cyberpunk",
    desc: "Deep dark canvas, glassmorphic panels, vivid neon glows.",
    cardBg: "bg-slate-950",
    cardText: "text-white",
    borderStyle: "border-slate-800",
    fontFamily: "font-sans font-semibold"
  },
  {
    id: "editorial-luxury",
    name: "Editorial Luxury",
    desc: "Serif display headlines, warm neutral tones, refined posture.",
    cardBg: "bg-stone-50",
    cardText: "text-stone-900",
    borderStyle: "border-stone-200",
    fontFamily: "font-serif"
  },
  {
    id: "neo-brutalist",
    name: "Neo-Brutalist",
    desc: "Thick outlines, high-contrast geometry, punchy energy.",
    cardBg: "bg-amber-50",
    cardText: "text-slate-950",
    borderStyle: "border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    fontFamily: "font-mono font-bold"
  }
];

const COLOR_PALETTES = [
  {
    id: "emerald",
    name: "Vprime Emerald",
    primary: "#06cf9c",
    primaryDark: "#04a27a",
    textOnPrimary: "#000000",
    accentBg: "bg-[#06cf9c]",
    accentText: "text-[#06cf9c]",
    accentBorder: "border-[#06cf9c]"
  },
  {
    id: "royal-blue",
    name: "Royal Blue & Gold",
    primary: "#3b82f6",
    primaryDark: "#1d4ed8",
    textOnPrimary: "#ffffff",
    accentBg: "bg-blue-600",
    accentText: "text-blue-500",
    accentBorder: "border-blue-500"
  },
  {
    id: "crimson-sunset",
    name: "Crimson Sunset",
    primary: "#f43f5e",
    primaryDark: "#e11d48",
    textOnPrimary: "#ffffff",
    accentBg: "bg-rose-500",
    accentText: "text-rose-500",
    accentBorder: "border-rose-500"
  },
  {
    id: "amber-glow",
    name: "Amber Gold",
    primary: "#f59e0b",
    primaryDark: "#d97706",
    textOnPrimary: "#000000",
    accentBg: "bg-amber-500",
    accentText: "text-amber-500",
    accentBorder: "border-amber-500"
  },
  {
    id: "monochrome",
    name: "Obsidian Slate",
    primary: "#0f172a",
    primaryDark: "#020617",
    textOnPrimary: "#ffffff",
    accentBg: "bg-slate-900",
    accentText: "text-slate-900",
    accentBorder: "border-slate-900"
  }
];

const FEATURES_LIST = [
  { id: "booking", name: "Live Booking Engine", icon: Calendar, desc: "Real-time calendar slot reservations" },
  { id: "ai-chat", name: "AI Chat Assistant", icon: Bot, desc: "24/7 intelligent sales assistant" },
  { id: "cart", name: "1-Click Checkout", icon: ShoppingBag, desc: "Frictionless payment gateway" },
  { id: "3d-motion", name: "3D & Motion FX", icon: Sparkles, desc: "Smooth scroll animations & micro-interactions" },
  { id: "seo-blog", name: "SEO Article Hub", icon: Globe, desc: "High-ranking growth blog engine" },
  { id: "reviews", name: "Social Proof Feed", icon: Star, desc: "Real-time client reviews & ratings" }
];

export default function WebsiteBuilderSimulator({ onBookCall }: WebsiteBuilderSimulatorProps) {
  const [selectedType, setSelectedType] = useState(BUSINESS_TYPES[1]); // Default SaaS
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]); // Default Minimalist
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0]); // Default Emerald
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["booking", "ai-chat", "3d-motion"]);
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [isCopied, setIsCopied] = useState(false);
  const [mockPreviewTab, setMockPreviewTab] = useState<"hero" | "features">("hero");

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleCopySpec = () => {
    const spec = `Vprime Website Prototype Specs:\n- Industry: ${selectedType.name}\n- Style: ${selectedStyle.name}\n- Color Palette: ${selectedPalette.name}\n- Features: ${selectedFeatures.join(", ")}`;
    navigator.clipboard.writeText(spec);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div id="see-your-future-website" className="bg-slate-950 text-white rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden my-16">
      {/* Background Ambient Lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Headline */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 text-brand font-mono text-[11px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
          <Wand2 size={13} className="animate-spin-slow" />
          <span>Interactive Simulator</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">
          See Your <span className="text-brand">Future Website</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Configure your business type, visual aesthetic, color palette, and feature stack below. Watch your custom live website mockup update in real time!
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT CONTROLS (5 cols) ================= */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 md:p-6 shadow-xl">
          
          {/* STEP 1: Business Type */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Select Business Type</span>
              </label>
              <span className="text-[10px] text-slate-500 font-mono">{selectedType.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BUSINESS_TYPES.map((bt) => {
                const Icon = bt.icon;
                const isSelected = selectedType.id === bt.id;
                return (
                  <button
                    key={bt.id}
                    onClick={() => setSelectedType(bt)}
                    className={`flex items-center space-x-2.5 p-2.5 rounded-xl text-left border text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-brand/15 border-brand text-brand font-semibold shadow-xs"
                        : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <Icon size={16} className={isSelected ? "text-brand" : "text-slate-500"} />
                    <span className="truncate">{bt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Style */}
          <div className="space-y-3 border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand text-[10px] flex items-center justify-center font-bold">2</span>
                <span>Select Visual Style</span>
              </label>
              <span className="text-[10px] text-slate-500 font-mono">{selectedStyle.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {STYLES.map((st) => {
                const isSelected = selectedStyle.id === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStyle(st)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-brand/15 border-brand text-brand font-semibold"
                        : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <div className="font-medium text-slate-200">{st.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Colors */}
          <div className="space-y-3 border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand text-[10px] flex items-center justify-center font-bold">3</span>
                <span>Select Color Palette</span>
              </label>
              <span className="text-[10px] text-slate-500 font-mono">{selectedPalette.name}</span>
            </div>
            <div className="flex items-center space-x-3 overflow-x-auto pb-1">
              {COLOR_PALETTES.map((cp) => {
                const isSelected = selectedPalette.id === cp.id;
                return (
                  <button
                    key={cp.id}
                    onClick={() => setSelectedPalette(cp)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl border text-xs cursor-pointer shrink-0 transition-all ${
                      isSelected
                        ? "bg-slate-800 border-brand ring-2 ring-brand/30"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20 shadow-xs" 
                      style={{ backgroundColor: cp.primary }} 
                    />
                    <span className="text-slate-300 font-medium text-[11px]">{cp.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Features (Multi-select) */}
          <div className="space-y-3 border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand text-[10px] flex items-center justify-center font-bold">4</span>
                <span>Include Key Features</span>
              </label>
              <span className="text-[10px] text-brand font-mono font-bold">{selectedFeatures.length} Active</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {FEATURES_LIST.map((feat) => {
                const Icon = feat.icon;
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`flex items-center space-x-2 p-2 rounded-lg text-left border text-[11px] cursor-pointer transition-all ${
                      isChecked
                        ? "bg-brand/10 border-brand/60 text-white font-medium"
                        : "bg-slate-950/40 border-slate-800/60 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isChecked ? "bg-brand border-brand text-slate-950" : "border-slate-700 bg-slate-900"}`}>
                      {isChecked && <Check size={10} strokeWidth={3} />}
                    </div>
                    <span className="truncate">{feat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTA */}
          <div className="border-t border-slate-800/80 pt-4 space-y-2">
            <button
              onClick={onBookCall}
              className="w-full py-3 px-4 rounded-xl bg-brand hover:bg-brand-dark text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg shadow-brand/10 hover:scale-[1.01]"
            >
              <span>Build This Concept With Victor</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={handleCopySpec}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-mono text-[11px] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer border border-slate-800"
            >
              {isCopied ? (
                <>
                  <Check size={13} className="text-brand" />
                  <span className="text-brand font-bold">Specs Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Configuration Specs</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* ================= RIGHT LIVE MOCKUP PREVIEW (7 cols) ================= */}
        <div className="lg:col-span-7 space-y-3 sticky top-24">
          
          {/* Top Mockup Controls Bar */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
              </span>
              <span className="text-[11px] font-mono text-slate-300 font-bold tracking-wider uppercase">
                REAL-TIME LIVE PREVIEW
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDeviceView("desktop")}
                className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${deviceView === "desktop" ? "bg-slate-800 text-brand" : "text-slate-500 hover:text-slate-300"}`}
                title="Desktop View"
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setDeviceView("mobile")}
                className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${deviceView === "mobile" ? "bg-slate-800 text-brand" : "text-slate-500 hover:text-slate-300"}`}
                title="Mobile View"
              >
                <Smartphone size={16} />
              </button>
            </div>
          </div>

          {/* SIMULATED DEVICE FRAME */}
          <motion.div
            layout
            transition={{ duration: 0.3 }}
            className={`mx-auto transition-all duration-500 ${
              deviceView === "mobile" 
                ? "max-w-[340px] rounded-[36px] p-3 border-4 border-slate-800 bg-slate-900 shadow-2xl" 
                : "w-full rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-2 md:p-3"
            }`}
          >
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between bg-slate-950/80 rounded-t-xl px-3 py-2 border-b border-slate-800/80 mb-1">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[9px] font-mono text-slate-400 bg-slate-900 px-3 py-0.5 rounded-full border border-slate-800/60 truncate max-w-[200px]">
                https://yourbrand.vprime.app
              </div>
              <div className="w-10" />
            </div>

            {/* LIVE WEBSITE CANVAS */}
            <div 
              className={`relative overflow-hidden rounded-b-xl transition-all duration-500 ${selectedStyle.cardBg} ${selectedStyle.cardText} ${selectedStyle.fontFamily} min-h-[460px] flex flex-col justify-between p-4 md:p-6 shadow-inner`}
            >
              
              {/* Simulated Navigation inside Canvas */}
              <div className={`flex items-center justify-between pb-3 border-b ${selectedStyle.borderStyle}`}>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shadow-xs"
                    style={{ backgroundColor: selectedPalette.primary, color: selectedPalette.textOnPrimary }}
                  >
                    V
                  </div>
                  <span className="font-bold text-xs uppercase tracking-tight">
                    {selectedType.id.toUpperCase()} BRAND
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[10px]">
                  <span className="opacity-70">Solutions</span>
                  <span className="opacity-70">About</span>
                  <button
                    style={{ backgroundColor: selectedPalette.primary, color: selectedPalette.textOnPrimary }}
                    className="px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider"
                  >
                    Contact
                  </button>
                </div>
              </div>

              {/* Simulated Hero Body */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${selectedType.id}-${selectedStyle.id}-${selectedPalette.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="my-auto py-6 space-y-4"
                >
                  <div className="space-y-2">
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border"
                      style={{ 
                        borderColor: selectedPalette.primary, 
                        color: selectedPalette.primary,
                        backgroundColor: `${selectedPalette.primary}15`
                      }}
                    >
                      <span>{selectedType.badge}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold leading-tight">
                      {selectedType.heroHeading}
                    </h3>

                    <p className="text-xs opacity-80 leading-relaxed max-w-md">
                      {selectedType.heroSubtext}
                    </p>
                  </div>

                  {/* Dynamic CTA Button & Image Container */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        style={{ backgroundColor: selectedPalette.primary, color: selectedPalette.textOnPrimary }}
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity flex items-center space-x-1.5"
                      >
                        <span>{selectedType.ctaText}</span>
                        <ArrowRight size={13} />
                      </button>
                      <button className={`px-3 py-2 rounded-xl text-xs font-medium border ${selectedStyle.borderStyle} opacity-80 hover:opacity-100`}>
                        Learn More
                      </button>
                    </div>

                    {/* Image / Graphic Mock Preview */}
                    <div className="relative aspect-video rounded-xl overflow-hidden border shadow-sm group"
                      style={{ borderColor: `${selectedPalette.primary}30` }}
                    >
                      <img 
                        src={selectedType.image} 
                        alt={selectedType.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-3">
                        <span className="text-[10px] text-white font-mono font-bold uppercase tracking-wider">
                          LIVE CONCEPT PREVIEW • {selectedStyle.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Active Features Pills Bar */}
              <div className={`pt-3 border-t ${selectedStyle.borderStyle} flex flex-wrap items-center gap-1.5`}>
                <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest font-bold mr-1">
                  FEATURES:
                </span>
                {selectedFeatures.map((featId) => {
                  const feat = FEATURES_LIST.find(f => f.id === featId);
                  if (!feat) return null;
                  const Icon = feat.icon;
                  return (
                    <div 
                      key={featId}
                      className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[9px] font-medium border bg-black/10 backdrop-blur-xs"
                      style={{ borderColor: `${selectedPalette.primary}40`, color: selectedPalette.primary }}
                    >
                      <Icon size={10} />
                      <span>{feat.name}</span>
                    </div>
                  );
                })}
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
