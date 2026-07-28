import { useState, useEffect } from "react";
import brandWorkspaceImg from "../assets/images/brand_workspace_1784638515102.jpg";
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
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Pause,
  Play,
  Quote
} from "lucide-react";
import Hero from "./Hero";
import PricingSection from "./PricingSection";
import BlogSection from "./BlogSection";
import FaqSection from "./FaqSection";
import { servicesData, projectsData, testimonialsData } from "../data";

interface HomeViewProps {
  onPageChange: (page: string) => void;
  onSelectService: (slug: string) => void;
  onBookCall: () => void;
}

export default function HomeView({ onPageChange, onSelectService, onBookCall }: HomeViewProps) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const featuredServices = servicesData.slice(0, 3); // Website Design, Webflow Dev, WordPress Dev
  const featuredProjects = projectsData.slice(0, 3); // Starlight, Apex, Solis
  
  const activeTestimonial = testimonialsData[activeTestimonialIdx];

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // Slideshow Auto-play Timer
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered]);

  const technologies = [
    { name: "Figma", category: "Design" },
    { name: "React", category: "Development" },
    { name: "TypeScript", category: "Development" },
    { name: "Webflow", category: "Development" },
    { name: "WordPress", category: "Development" },
    { name: "Shopify Liquid", category: "Development" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Motion (Framer)", category: "Animation" },
    { name: "Ahrefs", category: "SEO" },
    { name: "SEMrush", category: "SEO" },
    { name: "Cloudflare", category: "Security" },
    { name: "Google Analytics 4", category: "Tracking" }
  ];

  return (
    <div id="home-view-container" className="space-y-0">
      
      {/* 1. Immersive Hero */}
      <Hero onPageChange={onPageChange} onBookCall={onBookCall} />

      {/* 2. Featured Services Preview Grid */}
      <section id="home-services-preview" className="py-20 bg-[#0f121d] border-y border-slate-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12"
          >
            <div className="space-y-3.5">
              <span className="text-[10px] font-mono tracking-widest text-brand uppercase font-bold bg-brand/10 px-3.5 py-1.5 rounded-full border border-brand/20 shadow-xs">
                Featured Capabilities
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                Our core growth services.
              </h2>
            </div>
            <button
              onClick={() => onPageChange("services")}
              className="group text-xs font-mono tracking-wider text-slate-300 hover:text-brand font-bold uppercase mt-4 md:mt-0 cursor-pointer flex items-center space-x-1"
            >
              <span>Explore All 13 Capabilities</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                variants={{
                  hover: { y: -8, scale: 1.015 }
                }}
                className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-brand/20 hover:border-brand/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                onClick={() => onSelectService(service.slug)}
              >
                {/* Motion Accent Bar on Hover */}
                <motion.div
                  variants={{
                    hover: { scaleX: 1, opacity: 1 },
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand via-emerald-400 to-brand origin-left z-20"
                />

                {/* Card Top Header Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                  {service.image ? (
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center">
                      <Sparkles size={32} className="text-brand/50" />
                    </div>
                  )}
                  
                  {/* Dark gradient overlay for text contrast & depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 font-mono text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                    {service.category}
                  </div>

                  {/* Floating Glassmorphic Icon Badge */}
                  <motion.div
                    variants={{
                      hover: { scale: 1.1, rotate: 3, y: -2 },
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="absolute bottom-3 left-4 w-11 h-11 bg-slate-800 text-brand group-hover:bg-brand group-hover:text-slate-950 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-md border border-slate-700"
                  >
                    {service.id === "web-design" ? <Layout size={20} /> : service.id === "webflow-dev" ? <Code size={20} /> : <Sparkles size={20} />}
                  </motion.div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-slate-900/90 text-white">
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-black text-white group-hover:text-brand transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-normal leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Tech Chips - Dark Background Badges with WHITE Text */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech}
                          className="bg-slate-800/90 text-white border border-slate-700/80 font-mono text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs hover:border-brand/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-white group-hover:text-brand transition-colors cursor-pointer self-start relative z-10">
                    <span>Explore Service</span>
                    <motion.div
                      variants={{
                        hover: { x: 5 },
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    >
                      <ArrowRight size={14} className="text-brand" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. About Bento Preview */}
      <section id="home-about-preview" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">ABOUT THE BRAND</span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
              A premium team built on craft & performance.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              VprimeDigitalz represents an integrated boutique collective of award-winning digital artists, full-stack engineers, and search conversion analysts. We dismantle corporate overhead structures to work directly with ambitious creators and deliver clean, responsive digital experiences.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <div className="text-xl font-display font-bold text-brand">100% Custom</div>
                <p className="text-[11px] text-slate-500">Zero template files or sluggish plugin wrappers.</p>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-display font-bold text-brand">Data-Driven</div>
                <p className="text-[11px] text-slate-500">Designs structured purely for user conversion.</p>
              </div>
            </div>

            <button
              onClick={() => onPageChange("about")}
              className="group relative inline-flex items-center justify-center bg-brand text-white font-sans text-xs font-semibold uppercase tracking-widest px-7 py-3.5 rounded-lg overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>About Our Manifesto</span>
                <ArrowRight size={12} />
              </span>
            </button>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Slot Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 aspect-square flex flex-col justify-end p-6 md:p-8 min-h-[320px] shadow-sm hover:shadow-md transition-shadow"
            >
              <img 
                src={brandWorkspaceImg} 
                alt="VprimeDigitalz Creative Operations Studio" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
              
              <div className="relative z-10 space-y-2">
                <span className="text-[9px] font-mono tracking-widest text-brand-light font-bold uppercase block">
                  CRAFT ENVIRONMENT
                </span>
                <h4 className="text-base font-display font-bold text-white tracking-tight leading-snug">
                  Our Operations Studio
                </h4>
                <p className="text-[10px] text-slate-200 leading-normal font-normal max-w-[220px]">
                  Where pixel-perfect design grids meet production-grade React engineering workflows.
                </p>
              </div>
            </motion.div>

            {/* Core Promises Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 className="font-display font-extrabold text-slate-900 text-sm mb-4">Our Core Promises</h3>
                <div className="space-y-4">
                  {[
                    { title: "Surgical Code Quality", desc: "No bulky, slow WordPress layers. We build optimized class structures yielding 0.8s load times." },
                    { title: "Complete Source Ownership", desc: "Our clients receive 100% Figma master source files, CMS passwords, and code repositories." },
                    { title: "Durable Strategy Alignment", desc: "We map local SEO, schemas, and tracking pixels into our design grids from day one." }
                  ].map((promise, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-slate-100/50">
                      <CheckCircle size={14} className="text-brand shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-display font-bold text-slate-900 leading-tight">{promise.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-normal">{promise.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. Portfolio Showcase Previews */}
      <section id="home-portfolio-preview" className="py-20 bg-brand-light/15 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between"
          >
            <div className="space-y-3.5">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">Portfolios Highlight</span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Success stories related to design.
              </h2>
            </div>
            <button
              onClick={() => onPageChange("portfolio")}
              className="group text-xs font-mono tracking-wider text-slate-400 hover:text-brand font-semibold uppercase mt-4 md:mt-0 cursor-pointer flex items-center space-x-1"
            >
              <span>View All Case Studies</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                onClick={() => onPageChange("portfolio")}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-brand/20 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-50">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-brand/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center space-x-1">
                      <span>View Case Study</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-[9px] font-mono text-brand uppercase font-bold">{project.category}</div>
                  <h4 className="font-display font-bold text-slate-900 group-hover:text-brand transition-colors text-base tracking-tight line-clamp-1">
                    {project.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Client Testimonials Slideshow */}
      <section id="home-testimonials" className="py-24 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          
          {/* Header & Slideshow Controls Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3 py-1 rounded-full text-brand text-[10px] font-mono font-bold uppercase tracking-widest">
                <Sparkles size={12} />
                <span>CLIENT REVIEWS ({testimonialsData.length} VERIFIED PARTNERS)</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-none">
                Trusted by founders & leaders.
              </h2>
            </div>

            {/* Top Autoplay Toggle & Slide Counter */}
            <div className="flex items-center space-x-3 self-start md:self-auto">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="inline-flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold text-slate-600 transition-colors cursor-pointer"
                title={isAutoPlay ? "Pause automatic slideshow" : "Play automatic slideshow"}
              >
                {isAutoPlay ? (
                  <>
                    <Pause size={12} className="text-brand animate-pulse" />
                    <span>AUTOPLAY ON</span>
                  </>
                ) : (
                  <>
                    <Play size={12} className="text-slate-400" />
                    <span className="text-slate-400">PAUSED</span>
                  </>
                )}
              </button>

              <div className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                0{activeTestimonialIdx + 1} / 0{testimonialsData.length}
              </div>
            </div>
          </motion.div>

          {/* Main Slideshow Container Box */}
          <div 
            className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden backdrop-blur-xs"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Top progress line indicating slideshow timer */}
            {isAutoPlay && !isHovered && (
              <motion.div 
                key={`progress-${activeTestimonialIdx}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute top-0 left-0 right-0 h-1 bg-brand z-20"
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Client Avatar Card with Metric Highlight */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xl group select-none">
                  
                  {/* Avatar Image Transition */}
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeTestimonial.id}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      src={activeTestimonial.avatar} 
                      alt={activeTestimonial.name} 
                      className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-90 pointer-events-none" />

                  {/* Top Badge: Company Name */}
                  <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 bg-brand/90 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeTestimonial.company}</span>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-5 left-5 right-5 space-y-1.5 text-white">
                    <span className="text-[9px] font-mono text-brand font-bold uppercase tracking-widest block">VERIFIED PARTNER</span>
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-lg font-display font-black leading-none">{activeTestimonial.name}</h4>
                      <span className="text-[10px] font-mono text-slate-300 font-bold uppercase">{activeTestimonial.logo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Quote Content */}
              <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
                
                {/* Header: Star Rating + Key Result Metric Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                  <div className="flex space-x-1 text-amber-400">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  {activeTestimonial.metric && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1">
                      <TrendingUp size={12} className="text-emerald-600" />
                      <span>{activeTestimonial.metric}</span>
                    </span>
                  )}
                </div>

                {/* Animated Testimonial Quote */}
                <div className="min-h-[140px] relative">
                  <Quote size={48} className="text-brand/10 absolute -top-4 -left-3 pointer-events-none" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4 relative z-10"
                    >
                      <p className="text-slate-800 text-lg sm:text-xl font-medium italic leading-relaxed">
                        "{activeTestimonial.quote}"
                      </p>
                      
                      <div>
                        <h4 className="text-slate-900 font-display font-extrabold text-base sm:text-lg leading-none">
                          {activeTestimonial.name}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-500 uppercase font-semibold mt-1.5 tracking-wider">
                          {activeTestimonial.role} &mdash; <span className="text-brand font-bold">{activeTestimonial.company}</span>
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Controls Footer: Slide Indicators & Navigation Arrows */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Slide Pill Dots Indicator */}
                  <div className="flex items-center space-x-2">
                    {testimonialsData.map((_, index) => {
                      const isCurrent = index === activeTestimonialIdx;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveTestimonialIdx(index)}
                          className={`transition-all duration-300 cursor-pointer ${
                            isCurrent 
                              ? "w-8 h-2.5 bg-brand rounded-full shadow-xs" 
                              : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 rounded-full"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                          title={`Testimonial ${index + 1} of ${testimonialsData.length}`}
                        />
                      );
                    })}
                  </div>

                  {/* Previous & Next Buttons */}
                  <div className="flex items-center space-x-2.5">
                    <button
                      onClick={handlePrevTestimonial}
                      className="w-10 h-10 border border-slate-300 hover:border-brand text-slate-700 hover:text-white bg-white hover:bg-brand rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                      aria-label="Previous Testimonial"
                      title="Previous Testimonial"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNextTestimonial}
                      className="w-10 h-10 border border-slate-300 hover:border-brand text-slate-700 hover:text-white bg-white hover:bg-brand rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                      aria-label="Next Testimonial"
                      title="Next Testimonial"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Quick Avatar Select Strip - All 9 Client Thumbnails */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-center sm:justify-between gap-3">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest shrink-0">
              JUMP TO CLIENT ({testimonialsData.length}):
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {testimonialsData.map((test, index) => {
                const isSelected = index === activeTestimonialIdx;
                return (
                  <button
                    key={test.id}
                    onClick={() => setActiveTestimonialIdx(index)}
                    className={`group relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected 
                        ? "border-brand scale-110 shadow-md ring-2 ring-brand/30" 
                        : "border-slate-200 hover:border-slate-400 opacity-60 hover:opacity-100"
                    }`}
                    title={`${test.name} — ${test.company}`}
                  >
                    <img 
                      src={test.avatar} 
                      alt={test.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Abbreviated Process Pipeline Preview */}
      <section id="home-process-preview" className="py-20 bg-brand-light/15 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3.5"
          >
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">OUR METHODOLOGY</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              An engineered roadmap to delivery.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              We structure your projects around a meticulous 9-step development timeline. Explore how we manage delivery milestones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { id: "01", title: "Discovery", desc: "Understanding objectives, brand vibes, and competitors." },
              { id: "04", title: "Wireframing", desc: "Building spatial structures inside Figma for click paths." },
              { id: "06", title: "Development", desc: "Engineering high-speed, secure, custom code solutions." },
              { id: "08", title: "Deployment", desc: "DNS, SSL activation, schemas configuration, and live launch." }
            ].map((step, idx) => (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white border border-slate-100 p-6 rounded-2xl relative space-y-2 text-left shadow-xs hover:shadow-lg transition-all"
              >
                <span className="text-3xl font-display font-black text-slate-100 absolute top-4 right-4">{step.id}</span>
                <span className="text-[10px] font-mono text-brand font-semibold block uppercase">STAGE {step.id}</span>
                <h4 className="font-display font-bold text-slate-900 text-sm">{step.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed pr-6">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => onPageChange("process")}
              className="group inline-flex items-center space-x-2 text-xs font-mono font-bold text-brand uppercase tracking-widest cursor-pointer"
            >
              <span>VIEW DETAILED 9-STAGE TIMELINE</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* 7. Technologies stack catalog */}
      <section id="home-technologies" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">DIGITAL TOOLKIT</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-none">
              High-performance technologies.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              We leverage the world's most robust digital platforms to design, code, secure, and index custom enterprise solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {technologies.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-slate-50 border border-slate-100/50 p-5 rounded-2xl text-center space-y-1 hover:border-brand/25 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="font-display font-bold text-slate-800 text-sm">{tech.name}</div>
                <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">{tech.category}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Pricing Section */}
      <PricingSection onBookCall={onBookCall} />

      {/* 9. Blog Insights Section */}
      <BlogSection onBookCall={onBookCall} />

      {/* 10. Frequently Asked Questions Section */}
      <FaqSection onBookCall={onBookCall} />

      {/* 11. Call to Action Banner section */}
      <section id="home-cta" className="py-12 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
            
            <div className="inline-flex items-center space-x-1.5 bg-brand/10 border border-brand/20 text-brand font-mono text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              <span>BOOK FREE STRATEGY CALL</span>
            </div>

            <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight">
              Ready to double your search conversions?
            </h3>
            
            <p className="text-white/70 max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-normal">
              Get in touch with Vikram Malhotra for a free 30-minute discovery workshop. We will draft custom layout, sitemap, and organic traffic targets for your business with zero obligations.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <button
                onClick={onBookCall}
                className="group inline-flex items-center justify-center bg-brand text-white font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand/25 cursor-pointer"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Book Strategy Call</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <button
                onClick={onBookCall}
                className="inline-flex items-center justify-center border border-white/20 hover:border-white/55 bg-transparent text-white font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer"
              >
                <span>Schedule Workshop</span>
              </button>
            </div>

            {/* Quick trust metrics checklist */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6 border-t border-white/5 text-[10px] font-mono text-white/50">
              <span className="flex items-center space-x-1">
                <CheckCircle size={10} className="text-brand shrink-0" />
                <span>ZERO OUTSOURCING</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle size={10} className="text-brand shrink-0" />
                <span>100% bespoke CRAFT</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle size={10} className="text-brand shrink-0" />
                <span>COMPLETE SOURCE ASSETS Handoff</span>
              </span>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
