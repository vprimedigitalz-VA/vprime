import { useState } from "react";
import { 
  History, 
  Target, 
  Eye, 
  Heart, 
  CheckCircle, 
  Linkedin, 
  Twitter, 
  Github, 
  TrendingUp,
  Award,
  Clock,
  Sliders,
  Sparkles,
  Zap,
  MousePointer,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Activity,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { teamData } from "../data";

interface AboutSectionProps {
  onBookCall?: () => void;
}

export default function AboutSection({ onBookCall }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<"story" | "timeline" | "values">("story");
  const [agencyModel, setAgencyModel] = useState<"traditional" | "vprime">("vprime");
  
  // Interactive Sliders for Victor's Design Dial Simulator
  const [minimalistStyle, setMinimalistStyle] = useState(85);
  const [microInteractions, setMicroInteractions] = useState(90);
  const [pageSpeed, setPageSpeed] = useState(98);

  // Interactive Playbook Specialties state
  const [selectedSpecialty, setSelectedSpecialty] = useState("Figma Design Systems");

  const victor = teamData[0] || {
    name: "Victor Adebayo",
    role: "Lead UI/UX and Website Designer",
    image: "/src/assets/images/victor_adebayo_portrait_1784640425553.jpg",
    bio: "Victor is a world-class UI/UX and website designer with an obsessive eye for detail. He masterfully blends high-fashion aesthetics, structural grid systems, and micro-animations to engineer digital experiences that convert visitors into brand advocates.",
    specialties: ["Figma Design Systems", "Bespoke Web Design", "React Interfaces", "Art Direction", "Micro-interactions", "Brand Identity"],
    social: { linkedin: "https://linkedin.com/in/victor-adebayo", twitter: "https://twitter.com/victoradebayo", github: "https://github.com/victoradebayo" }
  };

  const timelineEvents = [
    { year: "2021", title: "The Inception", desc: "VprimeDigitalz founded by Victor Adebayo to bridge the painful disconnect between visual art and high-speed technical code." },
    { year: "2022", title: "Going Bespoke Full-Stack", desc: "Completely abandoned visual page-builder templates to deploy custom-coded React & TypeScript systems." },
    { year: "2023", title: "High-Authority Performance", desc: "Expanded into high-velocity SEO and cloud hosting optimizations, scaling 50+ clients globally." },
    { year: "2024", title: "Award Nominations", desc: "Awwwards & CSS Design Awards nominations for our bespoke glassmorphic grids." },
    { year: "2025", title: "$45M Client Milestone", desc: "Tracked aggregate client revenue directly driven by Victor's UX funnels crossed $45 Million." },
    { year: "2026", title: "Boutique Prestige", desc: "Ranked as the premium choice for founders who demand lightning-fast, high-end visual systems." }
  ];

  const coreValues = [
    { 
      title: "Surgical Pixel Precision", 
      desc: "Every tracking spacing, padding, line-height, and typographic anchor is reviewed pixel-by-pixel. Standard templates are our enemy.",
      metric: "100% Perfect Grids"
    },
    { 
      title: "Active Motion Dynamics", 
      desc: "Static screens feel dead. We leverage physical friction spring parameters to design organic micro-interactions that delight.",
      metric: "60 FPS Physics"
    },
    { 
      title: "Zero-Latency Performance", 
      desc: "Design means nothing if the page takes seconds to render. Every asset is highly compressed, lazy-loaded, and CDN-cached.",
      metric: "100/100 PageSpeed"
    },
    { 
      title: "Conversion-Led Psychology", 
      desc: "Pretty layouts that don't convert are expensive failures. We map consumer hot zones and eye-tracking layouts to drive sales.",
      metric: "CRO Focused"
    }
  ];

  const whyChooseUsPoints = [
    "No pre-made templates or visual bloat — 100% bespoke craft.",
    "Integrated elite workflow covering UI/UX, React code, and Technical SEO.",
    "Direct contact with Victor Adebayo — zero middleman account managers.",
    "Data-driven design backed by behavioral psychology and heatmaps.",
    "Lightning-fast green mobile performance and SEO keyword indexing.",
    "Highly collaborative, real-time Slack syncing, and weekly video walk-throughs."
  ];

  // Specialty playbook details
  const playbookInsights: Record<string, { summary: string; tech: string; icon: string }> = {
    "Figma Design Systems": {
      summary: "Standardizes fully documented color palettes, variable typographies, nested interactive components, and responsive auto-layout tokens, empowering instant developers handoff with zero layout drift.",
      tech: "Auto-layout v5, Design Tokens, Interactive Components",
      icon: "🎨"
    },
    "Bespoke Web Design": {
      summary: "Zero cookie-cutter layouts. Every client gets a custom identity that showcases visual prestige, using clean Swiss grids, editorial fonts, and premium glassmorphic cards.",
      tech: "Premium Swiss Grids, CSS Variables, SVG Layouts",
      icon: "📐"
    },
    "React Interfaces": {
      summary: "Translates designs into modular, blazing-fast React code, utilizing smooth state managers, custom hooks, and zero client-side layout shifts.",
      tech: "React 18+, Vite, ES Modules, Tailwind CSS",
      icon: "💻"
    },
    "Art Direction": {
      summary: "Establishes a distinctive conceptual theme (minimal, technical, bold, warm) first, hand-picking typography pairings and asset palettes to convey immediate premium authority.",
      tech: "Typographic Pairings, Color Theory, Brand Architecture",
      icon: "👑"
    },
    "Micro-interactions": {
      summary: "Powers smooth physical spring physics for hover transitions, drag inputs, navigation panels, and interactive elements. Transition curves follow natural momentum.",
      tech: "Framer Motion, CSS Bezier Spring Physics [0.16, 1, 0.3, 1]",
      icon: "⚡"
    },
    "Brand Identity": {
      summary: "Sculpts vector logos, customized visual brand books, styling guidelines, and high-contrast digital stationery designed for immediate corporate prestige.",
      tech: "Vector Masters, Brand Guidelines, Asset Systems",
      icon: "✨"
    }
  };

  // Dynamic strings based on Victor's Design Dial Sliders
  const getStyleDialText = () => {
    if (minimalistStyle < 30) return { title: "Brutalist Editorial", desc: "Heavy typography, sharp borders, absolute high-contrast grid lines." };
    if (minimalistStyle < 70) return { title: "Sleek Corporate Swiss", desc: "Inter font, generous balanced negative space, subtle gray dividing rules." };
    return { title: "Glassmorphic Prestige", desc: "Delicate light blurs, soft radial ambient glows, elegant modern floating layers." };
  };

  const getMotionDialText = () => {
    if (microInteractions < 30) return { title: "Static Precision", desc: "No animations. Instant loading, standard browser state rendering." };
    if (microInteractions < 70) return { title: "Linear Transitions", desc: "Standard CSS eases for clean hover triggers and fade-ins." };
    return { title: "Fluid Spring Physics", desc: "Dynamic non-linear spring curves [0.16, 1, 0.3, 1] reacting organically to touch and cursors." };
  };

  const getSpeedDialText = () => {
    if (pageSpeed < 30) return { title: "Standard Shared Hosting", desc: "Standard asset weights, uncompressed images, 4.2s fully loaded time." };
    if (pageSpeed < 70) return { title: "Optimized Web Server", desc: "Gzip compressed assets, responsive image sets, 1.8s fully loaded." };
    return { title: "Edge Hydra CDN Speed", desc: "WebP images, cloudflare static cache, zero layout shift, 0.4s fully loaded." };
  };

  return (
    <section id="about-section" className="py-24 bg-[#121520] text-slate-100 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -left-40 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-28">
        
        {/* 1. Header Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-slate-800 pb-14">
          <div className="lg:col-span-8 space-y-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-1.5 bg-brand/10 border border-brand/20 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider"
            >
              <Sparkles size={11} className="animate-pulse" />
              <span>THE DESIGN MANIFESTO</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-none"
            >
              Where pixel-perfect art meets high-speed engineering.
            </motion.h2>
          </div>
          <div className="lg:col-span-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-300 text-sm md:text-base leading-relaxed"
            >
              We reject boring, laggy templates. Led by Victor Adebayo, we build immersive, elite digital experiences crafted with extreme visual precision and optimized to load instantly.
            </motion.p>
          </div>
        </div>

        {/* 2. Interactive Workflow Comparison */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-widest">INTERACTIVE AUDIT</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">How we differ from traditional agencies</h3>
            </div>
            
            {/* Interactive Toggle Switch */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0 select-none">
              <button 
                onClick={() => setAgencyModel("traditional")}
                className={`px-4 py-2 rounded-lg font-display text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  agencyModel === "traditional" 
                    ? "bg-slate-800 text-white shadow-sm" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Traditional Agency
              </button>
              <button 
                onClick={() => setAgencyModel("vprime")}
                className={`px-4 py-2 rounded-lg font-display text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  agencyModel === "vprime" 
                    ? "bg-brand text-slate-950 font-black shadow-md shadow-brand/10" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Vprime Workflow
              </button>
            </div>
          </div>

          {/* Interactive Cards Transition */}
          <div className="relative z-10 min-h-[220px]">
            <AnimatePresence mode="wait">
              {agencyModel === "traditional" ? (
                <motion.div 
                  key="traditional"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-3.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs font-mono font-bold">01</div>
                    <h4 className="font-display font-bold text-white text-sm">Boring Web Templates</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Slow visual builder templates heavy with unneeded plugins. Yields low mobile speeds (30-45 score) and constant layout shifts.
                    </p>
                  </div>
                  <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-3.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs font-mono font-bold">02</div>
                    <h4 className="font-display font-bold text-white text-sm">Low-Cost Outsourcing</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Creative files are sent to cheap junior coders. Resulting sites lose all their initial design polish and look generic.
                    </p>
                  </div>
                  <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-3.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs font-mono font-bold">03</div>
                    <h4 className="font-display font-bold text-white text-sm">Middleman Bloat</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Three layers of junior account managers who copy and paste emails. Requests take days and lead to painful miscommunications.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="vprime"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="bg-slate-950/80 rounded-2xl border border-emerald-500/30 p-6 space-y-3.5 shadow-sm hover:border-emerald-500/60 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-mono font-bold">01</div>
                    <h4 className="font-display font-bold text-white text-sm flex items-center space-x-1.5">
                      <span>100% Bespoke Layouts</span>
                      <Sparkles size={12} className="text-brand" />
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Every single interface is engineered on clean, customized grids. Mobile speed scores reach an average of 95+ with instant loading.
                    </p>
                  </div>
                  <div className="bg-slate-950/80 rounded-2xl border border-emerald-500/30 p-6 space-y-3.5 shadow-sm hover:border-emerald-500/60 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-mono font-bold">02</div>
                    <h4 className="font-display font-bold text-white text-sm">Obsessive Creative Code</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      No shortcuts. The design grids are translated directly into high-fidelity modular React code with absolute visual integrity.
                    </p>
                  </div>
                  <div className="bg-slate-950/80 rounded-2xl border border-emerald-500/30 p-6 space-y-3.5 shadow-sm hover:border-emerald-500/60 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-mono font-bold">03</div>
                    <h4 className="font-display font-bold text-white text-sm">Direct Expert Access</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You collaborate directly with our lead designer Victor Adebayo in shared Slack channels. Fast responses, zero delays.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Interactive Hub (Story, Timeline, Values Tabs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Navigation Tabs */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-slate-800">
            {[
              { id: "story", label: "OUR CORE STORY", icon: <History size={15} /> },
              { id: "timeline", label: "DEVELOPMENT TIMELINE", icon: <Clock size={15} /> },
              { id: "values", label: "OUR DESIGN VALUES", icon: <Heart size={15} /> }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="relative flex items-center space-x-3 px-5 py-3.5 rounded-xl font-display text-xs font-bold tracking-widest text-left whitespace-nowrap transition-all duration-300 cursor-pointer select-none"
                >
                  {/* Sliding Background Pill */}
                  {isSelected && (
                    <motion.div 
                      layoutId="activeAboutTab"
                      className="absolute inset-0 bg-brand rounded-xl shadow-md shadow-brand/10"
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${isSelected ? "text-slate-950 font-bold" : "text-slate-400 group-hover:text-white"}`}>
                    {tab.icon}
                  </span>
                  <span className={`relative z-10 transition-colors duration-300 ${isSelected ? "text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="lg:col-span-9 min-h-[340px]">
            <AnimatePresence mode="wait">
              {activeTab === "story" && (
                <motion.div
                  key="story-tab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-display font-bold text-white tracking-tight">Bridging the Creative Gap</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Traditional web agencies construct beautiful screens that load slowly and suffer poor conversion pathways. Technical dev shops write solid security lines but generate sterile, generic layouts.
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          VprimeDigitalz was engineered to dissolve this compromise. Under Victor Adebayo's artistic direction, we assemble elite responsive designs and custom React environments to run flawlessly on modern edge CDNs.
                        </p>
                      </div>
                      <div className="aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-md relative group cursor-crosshair">
                        <img 
                          src="/src/assets/images/agency_collaboration_1784639816337.jpg" 
                          alt="Bespoke Design & Code at Vprime" 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-brand/5 group-hover:bg-transparent transition-all duration-300" />
                        <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-xs text-white font-mono text-[8px] px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/10">
                          Interactive Preview
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3.5 transition-all"
                      >
                        <div className="flex items-center space-x-3 text-brand">
                          <Target size={18} />
                          <h4 className="font-display font-bold text-white text-sm">Our Mission</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          To empower fast-growing brands by executing stunning visual art, bulletproof customer portals, and optimized organic SEO architectures that actively boost revenue.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3.5 transition-all"
                      >
                        <div className="flex items-center space-x-3 text-brand">
                          <Eye size={18} />
                          <h4 className="font-display font-bold text-white text-sm">Our Vision</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          To establish the global gold standard for custom web design—proving that uncompromising artistic aesthetics and bleeding-edge system speeds can co-exist perfectly.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "timeline" && (
                <motion.div
                  key="timeline-tab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative border-l border-slate-800 pl-6 space-y-8"
                >
                  {timelineEvents.map((evt, idx) => (
                    <motion.div 
                      key={idx} 
                      className="relative group cursor-default"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      {/* Active line point */}
                      <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-950 border-2 border-brand group-hover:bg-brand group-hover:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(0,55,253,0.3)]" />
                      
                      <div className="space-y-1 bg-slate-900/50 group-hover:bg-slate-900 border border-slate-800/80 p-4 rounded-xl transition-all">
                        <span className="font-mono text-[10px] font-bold text-brand">{evt.year}</span>
                        <h4 className="font-display font-bold text-white text-sm">{evt.title}</h4>
                        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">{evt.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "values" && (
                <motion.div
                  key="values-tab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {coreValues.map((val, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.01, y: -4 }}
                      className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 transition-all relative group cursor-default overflow-hidden"
                    >
                      {/* Decorative slide glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-brand uppercase">VALUE 0{idx + 1}</span>
                        <span className="text-[9px] font-mono font-bold bg-brand/10 border border-brand/20 text-brand px-2 py-0.5 rounded">
                          {val.metric}
                        </span>
                      </div>
                      
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-white text-sm tracking-tight">{val.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">{val.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. The Masterpiece Spotlight - Victor Adebayo Column Showcase */}
        <div className="space-y-14 pt-8 border-t border-slate-800">
          
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">THE CREATIVE LEAD</span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
              The Mastermind Behind the Design
            </h3>
            <div className="h-[2px] w-12 bg-brand mx-auto" />
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We operate as a highly integrated premium boutique, giving your project direct access to elite creative vision with no organizational dilution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left Column: Portrait and Interactive Dial Simulator */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Giant Perfect Portrait Container */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group select-none">
                <img 
                  src={victor.image} 
                  alt={victor.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-103 brightness-95 group-hover:brightness-100" 
                  referrerPolicy="no-referrer" 
                />
                
                {/* Micro Ambient Glow Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                
                {/* Interactive State Indicators Floating */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 font-mono text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE IN FIGMA</span>
                </div>

                <div className="absolute top-4 right-4 inline-flex items-center space-x-1 bg-brand/20 backdrop-blur-md border border-brand/30 text-white font-mono text-[8px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  <Activity size={10} className="animate-spin" />
                  <span>LATENCY OBSESSED</span>
                </div>

                {/* Social Handles overlay on bottom of card */}
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-wider block">VICTOR'S PROFILE</span>
                    <h4 className="text-white text-lg font-display font-black leading-none">{victor.name}</h4>
                  </div>
                  
                  <div className="flex space-x-2">
                    {victor.social.linkedin && (
                      <a href={victor.social.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-brand hover:text-slate-950 transition-all flex items-center justify-center">
                        <Linkedin size={14} />
                      </a>
                    )}
                    {victor.social.twitter && (
                      <a href={victor.social.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-brand hover:text-slate-950 transition-all flex items-center justify-center">
                        <Twitter size={14} />
                      </a>
                    )}
                    {victor.social.github && (
                      <a href={victor.social.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-brand hover:text-slate-950 transition-all flex items-center justify-center">
                        <Github size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* DESIGN DIALS INTERACTIVE SIMULATOR CARD */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2 text-brand">
                    <Sliders size={15} />
                    <span className="text-[10px] font-mono font-black tracking-widest uppercase">VICTOR'S DESIGN DIALS</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded uppercase font-semibold">Interactive Widget</span>
                </div>

                {/* Slider 1: Minimalist style */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-400 font-bold uppercase">Minimalist Aesthetic</span>
                    <span className="text-brand font-black">{minimalistStyle}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={minimalistStyle}
                    onChange={(e) => setMinimalistStyle(Number(e.target.value))}
                    className="w-full h-[3.5px] bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand"
                  />
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                    <div className="text-[9px] font-mono font-bold text-white">{getStyleDialText().title}</div>
                    <p className="text-[9px] text-slate-400 leading-tight">{getStyleDialText().desc}</p>
                  </div>
                </div>

                {/* Slider 2: Micro interactions */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-400 font-bold uppercase">Micro-Interaction Friction</span>
                    <span className="text-brand font-black">{microInteractions}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={microInteractions}
                    onChange={(e) => setMicroInteractions(Number(e.target.value))}
                    className="w-full h-[3.5px] bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand"
                  />
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                    <div className="text-[9px] font-mono font-bold text-white">{getMotionDialText().title}</div>
                    <p className="text-[9px] text-slate-400 leading-tight">{getMotionDialText().desc}</p>
                  </div>
                </div>

                {/* Slider 3: Page speed goal */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-400 font-bold uppercase">Page Speed Priority</span>
                    <span className="text-brand font-black">{pageSpeed}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={pageSpeed}
                    onChange={(e) => setPageSpeed(Number(e.target.value))}
                    className="w-full h-[3.5px] bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand"
                  />
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                    <div className="text-[9px] font-mono font-bold text-white">{getSpeedDialText().title}</div>
                    <p className="text-[9px] text-slate-400 leading-tight">{getSpeedDialText().desc}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Bio, Philosophy & Interactive Playbook Specialty Explorer */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-brand font-black uppercase tracking-widest block">CREATIVE DIRECTOR & LEAD WEB DESIGNER</span>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-slate-800 pb-3">
                  <h4 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">Victor Adebayo</h4>
                  <span className="font-serif italic text-slate-400 text-sm tracking-wide sm:text-base">Victor Adebayo</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {victor.bio}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  "I believe web interfaces should behave like luxury timepieces: structurally immaculate, beautiful to witness, and engineered to function with effortless physical momentum. Every site I code and layout is treated as a signature masterpiece designed for organic dominance."
                </p>
              </div>

              {/* INTERACTIVE SPECIALTY EXPLORER */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                <div className="flex items-center space-x-2 text-brand border-b border-slate-800 pb-3">
                  <Terminal size={14} />
                  <span className="text-[10px] font-mono font-black tracking-widest uppercase">VICTOR'S DESIGN PLAYBOOK</span>
                </div>

                {/* Clickable Pills Grid */}
                <div className="flex flex-wrap gap-2">
                  {victor.specialties.map((spec) => {
                    const isSelected = selectedSpecialty === spec;
                    return (
                      <button
                        key={spec}
                        onClick={() => setSelectedSpecialty(spec)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-brand text-slate-950 font-bold shadow-sm" 
                            : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                        }`}
                      >
                        {playbookInsights[spec]?.icon || "✨"} {spec}
                      </button>
                    );
                  })}
                </div>

                {/* Active Playbook Insight Display Panel with transition */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 min-h-[140px] flex flex-col justify-between relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedSpecialty}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{playbookInsights[selectedSpecialty]?.icon}</span>
                        <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">{selectedSpecialty} Standards</h5>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {playbookInsights[selectedSpecialty]?.summary}
                      </p>
                      
                      <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-800 text-[9px] font-mono font-bold text-slate-400">
                        <span>UTILITIES:</span>
                        <span className="text-brand bg-brand/10 px-2 py-0.5 rounded border border-brand/20">
                          {playbookInsights[selectedSpecialty]?.tech}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Achievements counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Design Sprints", val: "120+" },
                  { label: "CRO Increase", val: "AOV +35%" },
                  { label: "Average Mobile", val: "98/100" },
                  { label: "Bespoke React", val: "100%" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-0.5 hover:border-brand/30 transition-all">
                    <div className="text-lg font-display font-black text-brand">{item.val}</div>
                    <span className="text-[9px] font-mono text-slate-400 font-bold block uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Call to action Trigger with signature */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">DIRECT COLLABORATION</span>
                  <h5 className="font-display font-bold text-white text-sm">Want Victor to review your current website design?</h5>
                </div>
                
                {onBookCall && (
                  <button
                    onClick={onBookCall}
                    className="group bg-brand text-slate-950 font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-dark transition-all shadow-md shadow-brand/10 shrink-0 inline-flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Schedule Review</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* 5. Why Choose Us Checklist Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 overflow-hidden">
          
          {/* Achievements Metrics column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-2xl font-display font-bold text-white tracking-tight">
              Agency Milestones
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Our dedication to pristine custom design and server-side performance optimization delivers substantial direct-tracked revenue results for our high-end business clients.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "120+", desc: "Active brands scaled globally" },
                { value: "98%", desc: "Direct customer satisfaction" },
                { value: "$45M+", desc: "Tracked customer revenue" },
                { value: "14", desc: "Design & speed nominations" }
              ].map((achievement, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-1 hover:border-slate-700 transition-all">
                  <div className="text-2xl font-display font-bold text-brand">{achievement.value}</div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide leading-tight">
                    {achievement.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us Checklist Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-8 md:p-10 rounded-3xl space-y-6"
          >
            <h3 className="text-2xl font-display font-bold text-white tracking-tight">
              Why Choose VprimeDigitalz?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              We completely eliminate standard visual page builders, bloated scripts, and communication barriers, letting you collaborate directly with your creative director.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyChooseUsPoints.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle size={15} className="text-brand shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-200 leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
