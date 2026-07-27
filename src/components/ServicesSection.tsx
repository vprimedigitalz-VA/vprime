import { useState, useEffect } from "react";
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
  Calendar
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

  // Sync selectedService if a slug is passed from the parent (like navbar redirects)
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

  // Find related projects for the detail view
  const getRelatedProjects = (serviceId: string) => {
    return projectsData.filter(p => 
      p.category.toLowerCase().includes(serviceId.replace("-dev", "").replace("-opt", ""))
    ).slice(0, 2);
  };

  return (
    <section id="services-section" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-radial-at-t from-slate-50 via-white to-white pointer-events-none" />

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
                <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                  <span>VPRIME CAPABILITIES</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
                  Expert solutions crafted for high-performance scale.
                </h2>
                <p className="text-slate-600 text-base md:text-lg">
                  We bridge the gap between design mastery and technical perfection to deliver custom solutions that capture market share.
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesData.map((service, index) => (
                  <motion.div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl border border-slate-100 hover:border-brand/20 p-8 shadow-xs hover:shadow-xl hover:shadow-brand/2 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      {/* Icon Container with visual feedback */}
                      <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-brand group-hover:text-white flex items-center justify-center transition-all duration-300">
                        {getServiceIcon(service.icon, 22)}
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                          {service.category}
                        </span>
                        <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-brand transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <button
                      id={`learn-more-${service.id}`}
                      onClick={() => handleServiceClick(service)}
                      className="mt-6 inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:text-brand transition-colors cursor-pointer text-left self-start"
                    >
                      <span>Learn More</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Interactive "See Your Future Website" Simulator */}
              <WebsiteBuilderSimulator onBookCall={onBookCall} />

              {/* Vanalyst SEO Auditor */}
              <VanalystSection onBookCall={onBookCall} />

              {/* Engineered Roadmap & Delivery Pipeline */}
              <div className="pt-12 border-t border-slate-100">
                <ProcessSection />
              </div>
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
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider text-slate-400 hover:text-brand font-semibold uppercase cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>BACK TO ALL SERVICES</span>
              </button>

              {/* Service Hero Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-slate-100 pb-16 items-start">
                
                {/* Title & Overview */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase">
                    {getServiceIcon(selectedService.icon, 12)}
                    <span>{selectedService.category}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
                    {selectedService.title}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                    {selectedService.description}
                  </p>

                  {/* Dynamic Service Specific Image Illustration */}
                  <div className="aspect-video max-w-2xl rounded-2xl overflow-hidden border border-slate-100 shadow-md bg-slate-50">
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
                        <li key={i} className="flex items-start space-x-3 text-sm text-slate-600">
                          <CheckCircle size={16} className="text-brand shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Scope & Technologies Sidebar Card */}
                <div className="lg:col-span-5 bg-slate-50 border border-slate-100/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
                  
                  {/* Scope / Deliverables */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold border-b border-slate-100 pb-2">
                      WHAT YOU RECEIVE
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedService.deliverables.map((item, i) => (
                        <li key={i} className="text-xs font-medium text-slate-700 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Technologies */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold border-b border-slate-100 pb-2">
                      CORE TECHNOLOGIES
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-white border border-slate-100 font-mono text-[10px] text-slate-600 font-semibold px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Book Quick Call CTA Inside card */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={onBookCall}
                      className="w-full flex items-center justify-center space-x-2 bg-brand hover:bg-brand-dark text-white font-sans text-xs font-semibold uppercase tracking-wider py-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <Calendar size={14} />
                      <span>Book Free Strategy Call</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Delivery Pipeline / Process */}
              <div className="space-y-8 border-b border-slate-100 pb-16">
                <div className="space-y-2">
                  <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">DELIVERY PIPELINE</h4>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950">
                    Our customized roadmap for this service.
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {selectedService.process.map((step, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100/50 p-6 rounded-xl space-y-3 relative">
                      <div className="text-3xl font-display font-bold text-brand/10 absolute top-4 right-4 leading-none">
                        0{idx + 1}
                      </div>
                      <div className="text-xs font-mono text-slate-400 uppercase font-semibold">STAGE 0{idx + 1}</div>
                      <p className="text-xs font-medium text-slate-700 leading-relaxed pr-6">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects Display */}
              {getRelatedProjects(selectedService.id).length > 0 && (
                <div className="space-y-8 border-b border-slate-100 pb-16">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">RECENT WORK</h4>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950">
                      Success stories related to this service.
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {getRelatedProjects(selectedService.id).map(proj => (
                      <div 
                        key={proj.id} 
                        className="group border border-slate-100 rounded-2xl overflow-hidden hover:border-brand/20 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => onPageChange("portfolio")}
                      >
                        <div className="aspect-video relative overflow-hidden bg-slate-50">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                        <div className="p-6 space-y-2 bg-white">
                          <div className="text-[10px] font-mono text-brand uppercase font-bold">{proj.category}</div>
                          <h4 className="font-display font-bold text-slate-900 group-hover:text-brand transition-colors text-base">
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
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-slate-500">Have lingering doubts about this service? Find answers below.</p>
                </div>

                <div className="space-y-3">
                  {selectedService.faq.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="border border-slate-100 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left font-display font-bold text-sm text-slate-800 hover:text-brand transition-colors cursor-pointer"
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
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-50"
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
              <div className="bg-brand text-white rounded-3xl p-8 md:p-12 text-center space-y-6 max-w-5xl mx-auto relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
                <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight">
                  Ready to elevate your {selectedService.title.toLowerCase()}?
                </h3>
                <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed font-normal">
                  Connect with Vikram and the Vprime team for a free 30-minute discovery call to map out a clear growth strategy.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={onBookCall}
                    className="inline-flex items-center space-x-2 bg-white text-brand hover:bg-slate-50 font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
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
