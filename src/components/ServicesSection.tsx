import React, { useState, useEffect } from "react";
import { 
  Layout, 
  Layers, 
  Code, 
  ShoppingBag, 
  Zap, 
  Smartphone, 
  Search, 
  TrendingUp, 
  Users, 
  Compass, 
  Globe, 
  ShieldCheck, 
  Target,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  Calendar,
  Terminal,
  Cpu,
  SlidersHorizontal,
  Code2,
  Activity,
  Gauge
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { servicesData, projectsData } from "../data";
import { Service } from "../types";
import ProcessSection from "./ProcessSection";
import WebsiteBuilderSimulator from "./WebsiteBuilderSimulator";
import VanalystSection from "./VanalystSection";

// Icon mapper helper
const getServiceIcon = (iconName: string, size = 24, className = "") => {
  switch (iconName) {
    case "Layout": return <Layout size={size} className={className} />;
    case "Layers": return <Layers size={size} className={className} />;
    case "Code": return <Code size={size} className={className} />;
    case "ShoppingBag": return <ShoppingBag size={size} className={className} />;
    case "Zap": return <Zap size={size} className={className} />;
    case "Smartphone": return <Smartphone size={size} className={className} />;
    case "Search": return <Search size={size} className={className} />;
    case "TrendingUp": return <TrendingUp size={size} className={className} />;
    case "Users": return <Users size={size} className={className} />;
    case "Compass": return <Compass size={size} className={className} />;
    case "Globe": return <Globe size={size} className={className} />;
    case "ShieldCheck": return <ShieldCheck size={size} className={className} />;
    case "Target": return <Target size={size} className={className} />;
    default: return <Zap size={size} className={className} />;
  }
};

interface ServicesSectionProps {
  selectedServiceSlug: string | null;
  onClearSelectedService: () => void;
  onPageChange: (page: string) => void;
  onBookCall: () => void;
}

export default function ServicesSection({ 
  selectedServiceSlug, 
  onClearSelectedService,
  onPageChange,
  onBookCall
}: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [cardTabState, setCardTabState] = useState<Record<string, "overview" | "architecture" | "specs">>({});

  // Categories list for filter bar
  const categories = ["ALL", "Design", "Development", "E-Commerce", "Strategy"];

  // Filtered services
  const filteredServices = selectedCategory === "ALL" 
    ? servicesData 
    : servicesData.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

  // Sync selectedService if a slug is passed from the parent
  useEffect(() => {
    if (selectedServiceSlug) {
      const match = servicesData.find(s => s.slug === selectedServiceSlug);
      if (match) {
        setSelectedService(match);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setSelectedService(null);
    }
  }, [selectedServiceSlug]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setSelectedService(null);
    onClearSelectedService();
  };

  const handleCardTabChange = (serviceId: string, tab: "overview" | "architecture" | "specs", e: React.MouseEvent) => {
    e.stopPropagation();
    setCardTabState(prev => ({ ...prev, [serviceId]: tab }));
  };

  // Find related projects for the detail view
  const getRelatedProjects = (serviceId: string) => {
    return projectsData.filter(p => 
      p.category.toLowerCase().includes(serviceId.replace("-dev", "").replace("-opt", ""))
    ).slice(0, 2);
  };

  return (
    <section id="services-section" className="py-24 bg-[#121520] text-white relative border-t border-slate-800">
      <div className="absolute inset-0 bg-radial-at-t from-slate-900/50 via-[#121520] to-[#121520] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <AnimatePresence mode="wait">
          {!selectedService ? (
            /* ================= SERVICES LIST VIEW ================= */
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 text-brand font-mono text-[10px] px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
                  <Terminal size={12} className="animate-pulse" />
                  <span>DEVELOPER ARCHITECTURE & SERVICES</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight leading-none">
                  Engineered for speed. Built for scale.
                </h2>
                <p className="text-slate-300 text-base md:text-lg font-normal leading-relaxed">
                  Explore our modular digital capabilities crafted with clean code, modern visual design systems, and enterprise reliability.
                </p>
              </div>

              {/* Developer Category Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 px-3 text-slate-400 font-mono text-xs">
                  <SlidersHorizontal size={14} className="text-brand" />
                  <span className="font-bold uppercase tracking-wider hidden sm:inline">FILTER ARCHITECTURE:</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center">
                  {categories.map((cat) => {
                    const count = cat === "ALL" 
                      ? servicesData.length 
                      : servicesData.filter(s => s.category.toLowerCase() === cat.toLowerCase()).length;
                    
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          isActive
                            ? "bg-brand text-slate-950 shadow-md shadow-brand/20 scale-102"
                            : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive ? "bg-slate-950/20 text-slate-950 font-black" : "bg-slate-950/40 text-slate-400"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Cards Grid - Rearranged to 2 CARDS PER ROW (grid-cols-1 lg:grid-cols-2) */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
                layout
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.05
                    }
                  }
                }}
              >
                {filteredServices.map((service) => {
                  const activeTab = cardTabState[service.id] || "overview";

                  return (
                    <motion.div
                      key={service.id}
                      layout
                      id={`service-card-${service.id}`}
                      variants={{
                        hidden: { opacity: 0, y: 35, scale: 0.97 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 110,
                            damping: 16
                          }
                        }
                      }}
                      whileHover={{ y: -6 }}
                      onClick={() => handleServiceClick(service)}
                      className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-brand/20 hover:border-brand/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                      {/* Top IDE Window Control Bar */}
                      <div className="bg-slate-950/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                          <span className="ml-2 text-slate-400 font-medium truncate max-w-[180px] sm:max-w-xs">
                            ~/services/{service.id}.tsx
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center space-x-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>ACTIVE STACK</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Top Banner Image & Floating Badges */}
                      <div className="relative h-52 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                            {getServiceIcon(service.icon, 36, "text-brand/50")}
                          </div>
                        )}
                        
                        {/* Gradient overlay for contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 font-mono text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                          {service.category}
                        </div>

                        {/* Floating Icon Badge */}
                        <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700 text-brand group-hover:bg-brand group-hover:text-slate-950 flex items-center justify-center transition-colors duration-300 shadow-md">
                          {getServiceIcon(service.icon, 22)}
                        </div>

                        {/* Title Overlay on Banner */}
                        <div className="absolute bottom-3 left-20 right-4 truncate">
                          <h3 className="text-xl font-display font-bold text-white group-hover:text-brand transition-colors leading-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Interactive Tab Switcher Bar inside Card */}
                      <div className="bg-slate-950/60 px-5 py-2 border-b border-slate-800/80 flex items-center space-x-2 text-xs font-mono">
                        <button
                          onClick={(e) => handleCardTabChange(service.id, "overview", e)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            activeTab === "overview"
                              ? "bg-slate-800 text-brand border border-brand/30"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Overview
                        </button>
                        <button
                          onClick={(e) => handleCardTabChange(service.id, "architecture", e)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                            activeTab === "architecture"
                              ? "bg-slate-800 text-emerald-400 border border-emerald-500/30"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <Code2 size={12} />
                          <span>Code & Stack</span>
                        </button>
                        <button
                          onClick={(e) => handleCardTabChange(service.id, "specs", e)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                            activeTab === "specs"
                              ? "bg-slate-800 text-amber-400 border border-amber-500/30"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <Gauge size={12} />
                          <span>Specs</span>
                        </button>
                      </div>

                      {/* Dynamic Tab Content Area */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between min-h-[200px]">
                        <AnimatePresence mode="wait">
                          {activeTab === "overview" && (
                            <motion.div
                              key="tab-overview"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-4"
                            >
                              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                                {service.description}
                              </p>

                              {/* Performance metrics pill row */}
                              <div className="grid grid-cols-2 gap-2 pt-1">
                                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800/80 flex items-center space-x-2">
                                  <Activity size={14} className="text-emerald-400 shrink-0" />
                                  <span className="text-[10px] font-mono text-slate-300 font-bold">100/100 Core Web Vitals</span>
                                </div>
                                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800/80 flex items-center space-x-2">
                                  <Cpu size={14} className="text-brand shrink-0" />
                                  <span className="text-[10px] font-mono text-slate-300 font-bold">Sub-100ms Rendering</span>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {activeTab === "architecture" && (
                            <motion.div
                              key="tab-architecture"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-3"
                            >
                              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300 space-y-1">
                                <div className="text-brand font-bold">// System Architecture Config</div>
                                <div><span className="text-indigo-400">export const</span> <span className="text-emerald-400">{service.id.replace(/-/g, "_")}</span> = &#123;</div>
                                <div className="pl-4"><span className="text-amber-300">framework</span>: <span className="text-slate-400">"{service.technologies[0] || "React"}"</span>,</div>
                                <div className="pl-4"><span className="text-amber-300">styling</span>: <span className="text-slate-400">"Tailwind CSS / CSS Modules"</span>,</div>
                                <div className="pl-4"><span className="text-amber-300">seo_score</span>: <span className="text-emerald-400">100</span>,</div>
                                <div>&#125;;</div>
                              </div>
                            </motion.div>
                          )}

                          {activeTab === "specs" && (
                            <motion.div
                              key="tab-specs"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-2"
                            >
                              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">PRIMARY DELIVERABLES</div>
                              <ul className="space-y-1.5">
                                {service.deliverables.slice(0, 3).map((item, i) => (
                                  <li key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                                    <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Key Tech Chips */}
                        {service.technologies && service.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                            {service.technologies.map((tech) => (
                              <span 
                                key={tech}
                                className="bg-slate-800/90 text-white border border-slate-700/80 font-mono text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs hover:border-brand/50 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Footer Actions */}
                        <div className="pt-2 flex items-center justify-between">
                          <div
                            id={`learn-more-${service.id}`}
                            className="inline-flex items-center space-x-2 text-xs font-bold font-mono uppercase tracking-wider text-brand group-hover:text-white transition-colors cursor-pointer"
                          >
                            <span>Explore Full Architecture</span>
                            <motion.div
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 22 }}
                            >
                              <ArrowRight size={14} />
                            </motion.div>
                          </div>

                          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                            SPECS &rarr;
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Interactive "See Your Future Website" Simulator */}
              <WebsiteBuilderSimulator onBookCall={onBookCall} />
            </motion.div>
          ) : (
            /* ================= SERVICE DETAIL VIEW ================= */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              {/* Back Link */}
              <button
                id="back-to-services-btn"
                onClick={handleBackToList}
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider text-slate-400 hover:text-brand font-bold uppercase cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>BACK TO ALL SERVICES</span>
              </button>

              {/* Service Hero Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-slate-800 pb-16 items-start">
                
                {/* Title & Overview */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 text-brand font-mono text-[10px] px-3.5 py-1 rounded-full font-bold uppercase">
                    {getServiceIcon(selectedService.icon, 12)}
                    <span>{selectedService.category}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-none">
                    {selectedService.title}
                  </h1>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed font-normal">
                    {selectedService.description}
                  </p>

                  {/* Dynamic Service Specific Image Illustration */}
                  <div className="aspect-video max-w-2xl rounded-2xl overflow-hidden border border-slate-800 shadow-md bg-slate-900">
                    <img 
                      src={selectedService.id === "seo-opt" || selectedService.category === "Strategy" || selectedService.id.includes("seo")
                        ? "/src/assets/images/seo_growth_illustration_1784639833956.jpg"
                        : "/src/assets/images/hero_dashboard_mockup_1784639799645.jpg"
                      }
                      alt={selectedService.title} 
                      className="w-full h-full object-cover hover:scale-101 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Benefit Checklist */}
                  <div className="pt-4 space-y-3">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">KEY BENEFITS</h4>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-3 text-sm text-slate-200">
                          <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Scope & Technologies Sidebar Card */}
                <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
                  
                  {/* Scope / Deliverables */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold border-b border-slate-800 pb-2">
                      WHAT YOU RECEIVE
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedService.deliverables.map((item, i) => (
                        <li key={i} className="text-xs font-medium text-slate-200 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Technologies */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold border-b border-slate-800 pb-2">
                      CORE TECHNOLOGIES
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-200 font-bold px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Book Quick Call CTA Inside card */}
                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={onBookCall}
                      className="w-full flex items-center justify-center space-x-2 bg-brand hover:bg-brand-dark text-slate-950 font-sans text-xs font-black uppercase tracking-wider py-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <Calendar size={14} />
                      <span>Book Free Strategy Call</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Delivery Pipeline / Process */}
              <div className="space-y-8 border-b border-slate-800 pb-16">
                <div className="space-y-2">
                  <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">DELIVERY PIPELINE</h4>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    Our customized roadmap for this service.
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {selectedService.process.map((step, idx) => (
                    <div key={idx} className="bg-slate-900/90 border border-slate-800 p-6 rounded-xl space-y-3 relative">
                      <div className="text-3xl font-display font-black text-brand/20 absolute top-4 right-4 leading-none">
                        0{idx + 1}
                      </div>
                      <div className="text-xs font-mono text-slate-400 uppercase font-bold">STAGE 0{idx + 1}</div>
                      <p className="text-xs font-medium text-slate-200 leading-relaxed pr-6">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects Display */}
              {getRelatedProjects(selectedService.id).length > 0 && (
                <div className="space-y-8 border-b border-slate-800 pb-16">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">RECENT WORK</h4>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Success stories related to this service.
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {getRelatedProjects(selectedService.id).map(proj => (
                      <div 
                        key={proj.id} 
                        className="group border border-slate-800 rounded-2xl overflow-hidden hover:border-brand/40 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-900"
                        onClick={() => onPageChange("portfolio")}
                      >
                        <div className="aspect-video relative overflow-hidden bg-slate-950">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                        <div className="p-6 space-y-2 bg-slate-900">
                          <div className="text-[10px] font-mono text-brand uppercase font-bold">{proj.category}</div>
                          <h4 className="font-display font-bold text-white group-hover:text-brand transition-colors text-base">
                            {proj.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service FAQ Accordion */}
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="text-center space-y-2 mb-8">
                  <HelpCircle size={32} className="text-brand mx-auto" />
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-slate-300">Have lingering doubts about this service? Find answers below.</p>
                </div>

                <div className="space-y-3">
                  {selectedService.faq.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/90"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left font-display font-bold text-sm text-white hover:text-brand transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown 
                          size={16} 
                          className={`text-slate-400 transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-brand" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ opacity: 1 }}
                            className="px-6 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service CTA banner */}
              <div className="bg-brand text-slate-950 rounded-3xl p-8 md:p-12 text-center space-y-6 max-w-5xl mx-auto relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
                <h3 className="text-2xl md:text-4xl font-display font-black tracking-tight">
                  Ready to elevate your {selectedService.title.toLowerCase()}?
                </h3>
                <p className="text-slate-950/90 max-w-xl mx-auto text-sm leading-relaxed font-semibold">
                  Connect with Victor and the Vprime team for a free 30-minute discovery call to map out a clear growth strategy.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={onBookCall}
                    className="inline-flex items-center space-x-2 bg-slate-950 text-white hover:bg-slate-900 font-sans text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <span>SCHEDULE CALL NOW</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

