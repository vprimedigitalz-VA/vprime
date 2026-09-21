import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Star, 
  CheckCircle, 
  Sparkles, 
  Code, 
  Layout, 
  TrendingUp, 
  ChevronLeft,
  ChevronRight,
  Quote,
  Zap,
  Target,
  Layers,
  ShieldCheck,
  Award
} from "lucide-react";
import Hero, { clientLogos } from "./Hero";
import brandWorkspaceImg from "../assets/images/brand_workspace_1784638515102.jpg";
import { projectsData, testimonialsData } from "../data";

interface HomeViewProps {
  onPageChange: (page: string) => void;
  onSelectService: (slug: string) => void;
  onBookCall: () => void;
}

export default function HomeView({ onPageChange, onSelectService, onBookCall }: HomeViewProps) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Featured 4 strongest projects for the homepage
  const featuredProjects = projectsData.slice(0, 4);
  
  // Testimonials list
  const activeTestimonial = testimonialsData[activeTestimonialIdx];

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // Slideshow Auto-play Timer (paused on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // The 4 Core Growth Services requested by user
  const coreServices = [
    {
      id: "webflow",
      slug: "webflow-development",
      title: "Webflow Development",
      category: "CMS & Development",
      icon: <Layers size={22} className="text-brand" />,
      badge: "Webflow Expert",
      description: "Custom-coded, lightning-fast Webflow websites with clean Client-First architecture, dynamic CMS collections, and zero plugin bloat.",
      highlights: [
        "Client-First CSS architecture",
        "Sub-0.8s global load speeds",
        "Empowering client CMS editor",
        "Clean, semantic SEO markup"
      ],
      actionText: "Explore Webflow"
    },
    {
      id: "framer",
      slug: "website-design",
      title: "Framer Development",
      category: "Interactive & Motion",
      icon: <Layout size={22} className="text-brand" />,
      badge: "Framer Certified",
      description: "Immersive, motion-driven websites with interactive micro-animations, silky responsive grids, and rapid deployment engineered for modern brands.",
      highlights: [
        "Fluid motion & micro-interactions",
        "Rapid go-to-market speed",
        "High-converting UX hierarchy",
        "Pixel-perfect responsive design"
      ],
      actionText: "Explore Framer"
    },
    {
      id: "kajabi",
      slug: "digital-strategy",
      title: "Kajabi Platforms & Funnels",
      category: "Funnels & Memberships",
      icon: <Zap size={22} className="text-brand" />,
      badge: "Kajabi Specialist",
      description: "High-converting sales funnels, course platforms, membership portals, and automated digital product infrastructure designed to maximize revenue.",
      highlights: [
        "Optimized checkout & upsell paths",
        "Custom course & membership UI",
        "Automated email marketing flows",
        "Built-in affiliate & analytics setup"
      ],
      actionText: "Explore Kajabi"
    },
    {
      id: "cro-redesign",
      slug: "conversion-rate-optimization",
      title: "Website Redesign & CRO",
      category: "Growth & Conversion",
      icon: <Target size={22} className="text-brand" />,
      badge: "Conversion Focused",
      description: "Transforming dated, underperforming websites into modern, high-converting growth engines engineered for customer acquisition and trust.",
      highlights: [
        "Data-driven UX & friction audit",
        "95+ Google Core Web Vitals score",
        "Bespoke Figma design system",
        "A/B tested conversion funnels"
      ],
      actionText: "Explore Redesign"
    }
  ];

  // 4 Simple Process Steps
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      desc: "Deep analysis of your market, target audience, conversion goals, and technical requirements to create a high-impact roadmap."
    },
    {
      step: "02",
      title: "UI/UX & Prototyping",
      desc: "Crafting bespoke, high-converting Figma interfaces, typography scales, design systems, and clickable interactive prototypes."
    },
    {
      step: "03",
      title: "Development & Speed",
      desc: "Engineering clean, semantic code in Webflow, Framer, or custom React with rigorous responsiveness, security, and speed tests."
    },
    {
      step: "04",
      title: "Launch & Optimization",
      desc: "Flawless deployment with DNS routing, schema structured data, analytics setup, and step-by-step video training for your team."
    }
  ];

  return (
    <div id="home-view-container" className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <Hero onPageChange={onPageChange} onBookCall={onBookCall} />

      {/* 2. QUICK TRUST / RESULTS SECTION */}
      <section id="home-quick-trust" className="py-14 md:py-18 bg-[#0c1017] border-y border-slate-800/80 text-white relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-brand/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          
          {/* Consolidated 4 Primary Proof Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            {[
              { value: "120+", label: "BRANDS SCALED", sub: "Global clients across tech & commerce" },
              { value: "98%", label: "CLIENT RETENTION", sub: "Long-term growth partners" },
              { value: "$45M+", label: "REVENUE GENERATED", sub: "Driven by conversion-first layouts" },
              { value: "4.9★", label: "VERIFIED CLIENT RATING", sub: "Top rated on Clutch & Trustpilot" }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`space-y-1.5 ${idx > 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                  <span className="text-gradient-brand">{stat.value}</span>
                </div>
                <div className="text-[11px] font-mono tracking-widest text-slate-300 font-bold uppercase">
                  {stat.label}
                </div>
                <p className="text-[11px] text-slate-400 font-normal">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Trusted Brand Platforms Marquee Ticker */}
          <div className="border-t border-slate-800/80 pt-10">
            <div className="text-center text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold mb-6">
              TRUSTED PLATFORMS & CLIENT ECOSYSTEMS
            </div>

            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
              <div className="flex w-[200%] gap-12 items-center animate-marquee">
                {clientLogos.concat(clientLogos).map((logo, i) => (
                  <div key={i} className="flex-1 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 py-2 shrink-0 px-4">
                    {logo.svg}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE SERVICES SECTION */}
      <section id="home-services" className="py-20 md:py-28 bg-[#0f121d] border-b border-slate-800/80 overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3.5 py-1.5 rounded-full text-brand text-[10px] font-mono font-bold uppercase tracking-widest">
                <Sparkles size={12} />
                <span>Core Growth Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                Specialized platforms. Measurable impact.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                We focus on the modern platforms that produce the highest ROI, fastest load speeds, and cleanest client autonomy.
              </p>
            </div>
            
            <button
              onClick={() => onPageChange("services")}
              className="group text-xs font-mono tracking-wider text-slate-300 hover:text-brand font-bold uppercase cursor-pointer flex items-center space-x-2 shrink-0"
            >
              <span>Explore All 13 Capabilities</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 text-brand" />
            </button>
          </motion.div>

          {/* 4 Core Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {coreServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectService(service.slug)}
                className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-xl hover:shadow-2xl hover:shadow-brand/15 hover:border-brand/40 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Top Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-emerald-400 to-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center group-hover:bg-brand group-hover:text-slate-950 transition-colors">
                      {service.icon}
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-display font-black text-white group-hover:text-brand transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    {service.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center space-x-2 text-[11px] text-slate-300">
                        <CheckCircle size={12} className="text-brand shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-white group-hover:text-brand transition-colors">
                  <span>{service.actionText}</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 text-brand" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FEATURED WORK / PORTFOLIO SECTION */}
      <section id="home-featured-work" className="py-20 md:py-28 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                PROVEN RESULTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Featured client work.
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-xl leading-relaxed">
                A selection of high-performance websites engineered for speed, conversion, and undeniable brand authority.
              </p>
            </div>

            <button
              onClick={() => onPageChange("portfolio")}
              className="group text-xs font-mono tracking-wider text-slate-500 hover:text-brand font-semibold uppercase cursor-pointer flex items-center space-x-1.5 shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 text-brand" />
            </button>
          </motion.div>

          {/* 4 Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                onClick={() => onPageChange("portfolio")}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-brand/30 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white font-mono text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-white/15">
                    {project.category}
                  </div>

                  {/* Top Key Result Metric Pill */}
                  {project.results && project.results.length > 0 && (
                    <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white font-mono text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1 shadow-md">
                      <TrendingUp size={10} />
                      <span>{project.results[0]}</span>
                    </div>
                  )}

                  {/* Hover Overlay Prompt */}
                  <div className="absolute inset-0 bg-brand/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center space-x-1.5 bg-slate-950/40 px-4 py-2 rounded-lg backdrop-blur-xs">
                      <span>View Case Study</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-3 bg-white">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-semibold uppercase">
                    <span>{project.client}</span>
                    <span>{project.duration}</span>
                  </div>

                  <h3 className="font-display font-bold text-slate-900 group-hover:text-brand transition-colors text-lg sm:text-xl tracking-tight leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-brand uppercase tracking-wider">
                    <span>Read Study & Metrics</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Centered Primary CTA to Full Portfolio */}
          <div className="text-center pt-4">
            <button
              id="featured-work-view-all-btn"
              onClick={() => onPageChange("portfolio")}
              className="group inline-flex items-center justify-center bg-brand hover:bg-[#048F6C] text-white font-sans text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-xl hover:shadow-brand/35 hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="flex items-center space-x-2">
                <span>View All Projects</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* 5. ABOUT / WHY WORK WITH ME (ONE CONCISE SECTION) */}
      <section id="home-about" className="py-20 md:py-28 bg-[#0c1017] border-b border-slate-800/80 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3.5 py-1.5 rounded-full text-brand text-[10px] font-mono font-bold uppercase tracking-widest">
              <ShieldCheck size={12} />
              <span>Why Work With VprimeDigitalz</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight">
              Senior craft. Proven execution. Zero agency bloat.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Ambitious businesses deserve direct collaboration with elite digital designers and engineers without the sluggish layers, inflated invoices, and junior delegation of traditional agencies.
            </p>

            {/* 4 Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  title: "Direct Senior Partnership",
                  desc: "Work directly with lead builders. Fast feedback loops and clear communication with zero middle managers."
                },
                {
                  title: "Conversion & Speed First",
                  desc: "Sub-0.8s load times, perfect Core Web Vitals, and layouts scientifically structured to convert traffic into revenue."
                },
                {
                  title: "100% Asset Ownership",
                  desc: "You own all Figma master files, Webflow/code repositories, and CMS credentials with comprehensive handover videos."
                },
                {
                  title: "Multi-Platform Mastery",
                  desc: "Certified expertise across Webflow, Framer, Kajabi, and React—selecting the exact right tool for your model."
                }
              ].map((pillar, pIdx) => (
                <div key={pIdx} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={14} className="text-brand shrink-0" />
                    <h4 className="text-xs font-display font-bold text-white">{pillar.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onPageChange("about")}
                className="group inline-flex items-center space-x-2 text-xs font-mono font-bold text-brand uppercase tracking-widest cursor-pointer hover:underline"
              >
                <span>Learn More About Our Philosophy</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Right Visual Studio Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img 
                src={brandWorkspaceImg} 
                alt="VprimeDigitalz Operations Studio" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[9px] font-mono tracking-widest text-brand font-bold uppercase block">
                  CRAFT & DEDICATION
                </span>
                <h3 className="text-lg font-display font-bold text-white tracking-tight">
                  Engineered in our creative operations studio.
                </h3>
                <p className="text-[11px] text-slate-300 max-w-sm">
                  Every interaction, breakpoint, and conversion path is sculpted to perfection before launch.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 6. PROCESS SECTION (ONE SIMPLE 4-STEP PIPELINE) */}
      <section id="home-process" className="py-20 md:py-28 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3 max-w-2xl mx-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
              HOW WE WORK
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              A transparent, 4-step delivery pipeline.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              No guesswork or unexpected delays. We structure your project into clear, weekly milestones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={step.step} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-slate-50 border border-slate-100 p-6 rounded-2xl relative space-y-3 text-left shadow-xs hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-brand font-bold uppercase tracking-wider">
                    STAGE {step.step}
                  </span>
                  <span className="text-3xl font-display font-black text-slate-200">
                    {step.step}
                  </span>
                </div>
                <h4 className="font-display font-bold text-slate-900 text-base">{step.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onPageChange("process")}
              className="group inline-flex items-center space-x-2 text-xs font-mono font-bold text-brand uppercase tracking-widest cursor-pointer"
            >
              <span>Explore Detailed 9-Stage Methodology</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS / CLIENT RESULTS SECTION */}
      <section id="home-testimonials" className="py-20 md:py-28 bg-[#090E12] border-b border-slate-800/80 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 space-y-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3.5 py-1.5 rounded-full text-brand text-[10px] font-mono font-bold uppercase tracking-widest">
              <Award size={12} />
              <span>Verified Client Social Proof</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
              Trusted by founders & executives.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Real testimonials and measurable performance improvements from our verified clients.
            </p>
          </motion.div>

          {/* Testimonial Presentation Card */}
          <div 
            className="bg-[#0e131b] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Quote size={56} className="text-brand/10 absolute top-6 right-6 pointer-events-none" />

            <div className="space-y-6">
              
              {/* Rating + Metric Tag */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex space-x-1 text-amber-400">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                {activeTestimonial.metric && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1">
                    <TrendingUp size={12} className="text-emerald-400" />
                    <span>{activeTestimonial.metric}</span>
                  </span>
                )}
              </div>

              {/* Animated Quote */}
              <div className="min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <p className="text-slate-100 text-base sm:text-xl font-medium italic leading-relaxed">
                      "{activeTestimonial.quote}"
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <img 
                        src={activeTestimonial.avatar} 
                        alt={activeTestimonial.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand/40"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-white font-display font-extrabold text-base leading-none">
                          {activeTestimonial.name}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400 uppercase font-semibold mt-1 tracking-wider">
                          {activeTestimonial.role} &mdash; <span className="text-brand font-bold">{activeTestimonial.company}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls Footer */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {testimonialsData.slice(0, 5).map((_, index) => {
                    const isCurrent = index === (activeTestimonialIdx % 5);
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonialIdx(index)}
                        className={`transition-all duration-300 cursor-pointer ${
                          isCurrent 
                            ? "w-7 h-2 bg-brand rounded-full" 
                            : "w-2 h-2 bg-slate-700 hover:bg-slate-600 rounded-full"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevTestimonial}
                    className="w-9 h-9 border border-slate-700 hover:border-brand text-slate-300 hover:text-white bg-slate-800/90 rounded-full flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="w-9 h-9 border border-slate-700 hover:border-brand text-slate-300 hover:text-white bg-slate-800/90 rounded-full flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. FINAL CTA / CONTACT SECTION (ONE STRONG FINAL CTA) */}
      <section id="home-final-cta" className="py-20 md:py-28 bg-[#0b0e14] text-white relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
          
          <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 text-brand font-mono text-[10px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
            <span>START YOUR PROJECT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
            Ready to elevate your digital presence and double your conversions?
          </h2>
          
          <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-normal">
            Schedule a free 30-minute discovery call with Vikram Malhotra. We'll audit your current site, uncover conversion bottlenecks, and draft an actionable roadmap with zero obligations.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={onBookCall}
              className="group inline-flex items-center justify-center bg-brand text-white font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand/25 cursor-pointer"
            >
              <span className="flex items-center space-x-2">
                <span>Book Free Strategy Call</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            <button
              onClick={() => onPageChange("pricing")}
              className="inline-flex items-center justify-center border border-white/20 hover:border-white/50 bg-transparent text-white font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4.5 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer"
            >
              <span>Explore Pricing & Plans</span>
            </button>
          </div>

          {/* Quick trust reassurance checkmarks */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6 border-t border-slate-800 text-[10px] font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <CheckCircle size={12} className="text-brand shrink-0" />
              <span>30-MIN DISCOVERY SESSION</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle size={12} className="text-brand shrink-0" />
              <span>100% BESPOKE ARCHITECTURE</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle size={12} className="text-brand shrink-0" />
              <span>COMPLETE SOURCE ASSETS HANDOFF</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle size={12} className="text-brand shrink-0" />
              <span>ZERO JUNIOR DELEGATION</span>
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
