import { useState, useRef, useEffect, TouchEvent, MouseEvent } from "react";
import { 
  ArrowRight, 
  CheckCircle, 
  ArrowLeft, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  Award,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "../data";
import { Project } from "../types";
import { CardSkeleton, BrandedSpinner } from "./BrandedLoader";

interface PortfolioSectionProps {
  onPageChange: (page: string) => void;
}

export default function PortfolioSection({ onPageChange }: PortfolioSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  // Before/After slider states
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const filters = ["All", "Web Design", "Webflow/WordPress", "Shopify", "UI/UX"];

  const handleFilterClick = (filter: string) => {
    if (filter === selectedFilter) return;
    setIsFiltering(true);
    setSelectedFilter(filter);
    setSelectedProject(null);
    setTimeout(() => {
      setIsFiltering(false);
    }, 400);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setSliderPosition(50); // Reset slider position
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToGrid = () => {
    setSelectedProject(null);
  };

  // Filter projects mapping
  const filteredProjects = projectsData.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Web Design") {
      return project.category.toLowerCase().includes("web design") || project.category.toLowerCase().includes("branding");
    }
    if (selectedFilter === "Webflow/WordPress") {
      return project.category.toLowerCase().includes("webflow") || project.category.toLowerCase().includes("wordpress");
    }
    if (selectedFilter === "Shopify") {
      return project.category.toLowerCase().includes("shopify");
    }
    if (selectedFilter === "UI/UX") {
      return project.category.toLowerCase().includes("ui/ux");
    }
    return true;
  });

  // Handle Before/After dragging
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <section id="portfolio-section" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-radial-at-t from-slate-50 via-white to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            /* ================= PORTFOLIO GRID VIEW ================= */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                  <span>PORTFOLIO GRID</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
                  Crafting visual benchmarks of industry excellence.
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  Explore our curated gallery of custom-built platforms, headless storefronts, and conversion-optimized scheduling tools.
                </p>
              </div>

              {/* Filters Slider */}
              <div className="flex justify-center flex-wrap gap-2 pt-4">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    id={`filter-btn-${filter.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => handleFilterClick(filter)}
                    className={`px-5 py-2.5 rounded-full font-display text-xs font-bold tracking-widest transition-all cursor-pointer ${
                      selectedFilter === filter
                        ? "bg-brand text-white shadow-md shadow-brand/15"
                        : "bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-100"
                    }`}
                  >
                    {filter.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Projects Grid or Branded Skeleton Loader */}
              {isFiltering ? (
                <div className="pt-6 space-y-6">
                  <div className="flex justify-center py-4">
                    <BrandedSpinner size="md" label={`Filtering ${selectedFilter} projects...`} />
                  </div>
                  <CardSkeleton count={3} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
                  {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    id={`portfolio-card-${project.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    onClick={() => handleProjectClick(project)}
                    className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-brand/20 shadow-xs hover:shadow-2xl hover:shadow-slate-100/50 transition-all duration-500 cursor-pointer flex flex-col h-full"
                  >
                    {/* Project Thumbnail Image */}
                    <div className="aspect-video relative overflow-hidden bg-slate-50 shrink-0">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Hover stats overlay */}
                      <div className="absolute inset-0 bg-brand/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase font-semibold">
                            {project.client.toUpperCase()}
                          </span>
                          <span className="bg-white/10 text-white font-mono text-[9px] px-2 py-0.5 rounded-md font-semibold">
                            {project.duration}
                          </span>
                        </div>
                        
                        {/* Highlights Counter Metrics */}
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono text-white/70 uppercase tracking-widest">KEY OUTCOMES</div>
                          <div className="flex flex-col gap-1">
                            {project.results.map((metric, i) => (
                              <div key={i} className="text-sm font-semibold text-white flex items-center space-x-1.5">
                                <span className="text-white/60">●</span>
                                <span>{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 text-xs font-bold text-white uppercase tracking-wider">
                          <span>View Full Case Study</span>
                          <ArrowRight size={14} className="animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                          {project.category}
                        </span>
                        <h3 className="text-base font-display font-bold text-slate-900 group-hover:text-brand transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech} 
                            className="bg-slate-50 border border-slate-100 font-mono text-[9px] text-slate-500 font-semibold px-2 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              )}
            </motion.div>
          ) : (
            /* ================= PORTFOLIO CASE STUDY VIEW ================= */
            <motion.div
              key="case-study-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              {/* Back Button */}
              <button
                id="back-to-grid-btn"
                onClick={handleBackToGrid}
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider text-slate-400 hover:text-brand font-semibold uppercase cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>BACK TO PORTFOLIO GRID</span>
              </button>

              {/* Case Study Title Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-slate-100 pb-12 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase">
                    <BookOpen size={12} />
                    <span>CASE STUDY REPORT</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-[1.1]">
                    {selectedProject.title}
                  </h1>
                </div>

                {/* Client / Duration Sidebar stats */}
                <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-xl p-5 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block font-semibold uppercase">CLIENT PARTNER</span>
                    <span className="text-xs font-bold text-slate-800">{selectedProject.client}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block font-semibold uppercase">TIMELINE</span>
                    <span className="text-xs font-bold text-slate-800">{selectedProject.duration}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-100">
                    <span className="text-[9px] font-mono text-slate-400 block font-semibold uppercase">INDUSTRY / SCOPE</span>
                    <span className="text-xs font-bold text-brand">{selectedProject.category}</span>
                  </div>
                </div>
              </div>

              {/* Before/After Visual Image Slider (If available) */}
              {selectedProject.beforeImage && selectedProject.afterImage ? (
                <div className="space-y-4 max-w-5xl mx-auto">
                  <div className="text-center space-y-1">
                    <h3 className="text-sm font-display font-bold text-slate-900">Interactive Visual Comparison</h3>
                    <p className="text-[11px] text-slate-400">Slide horizontal bar to compare the old website (left) with Vprime's new redesign (right).</p>
                  </div>

                  <div 
                    ref={sliderRef}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    onMouseDown={() => { isDragging.current = true; }}
                    onMouseUp={() => { isDragging.current = false; }}
                    onMouseLeave={() => { isDragging.current = false; }}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-xl cursor-ew-resize select-none"
                  >
                    {/* Before Image (Left / Background) */}
                    <div className="absolute inset-0">
                      <img 
                        src={selectedProject.beforeImage} 
                        alt="Before redesign" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-3 py-1 rounded-md font-bold uppercase tracking-wider">
                        BEFORE REDESIGN (SLUGGISH TEMPLATE)
                      </div>
                    </div>

                    {/* After Image (Right / Clip-path overlay) */}
                    <div 
                      className="absolute inset-0"
                      style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                    >
                      <img 
                        src={selectedProject.afterImage} 
                        alt="After Vprime redesign" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 right-4 bg-brand text-white text-[10px] font-mono px-3 py-1 rounded-md font-bold uppercase tracking-wider shadow-md shadow-brand/20">
                        AFTER REDESIGN (BESPOKE VPRIME CRAFT)
                      </div>
                    </div>

                    {/* Dragger Bar */}
                    <div 
                      className="absolute top-0 bottom-0 w-[4px] bg-white cursor-ew-resize flex items-center justify-center"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-brand text-white shadow-lg flex items-center justify-center text-xs font-bold border border-white font-mono select-none">
                        ↔
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Static Image if slider not configured */
                <div className="aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-100 shadow-2xl">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}

              {/* Outcomes Metrics row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {selectedProject.results.map((metric, idx) => {
                  const [value, ...lbl] = metric.split(" ");
                  return (
                    <div key={idx} className="bg-slate-50 border border-slate-100/50 p-6 rounded-2xl text-center space-y-1">
                      <div className="text-3xl font-display font-bold text-brand">{value}</div>
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold leading-none">
                        {lbl.join(" ")}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Case Study Content Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto pt-4 items-start">
                
                {/* Written Case Details */}
                <div className="lg:col-span-8 space-y-10">
                  
                  {/* Problem & Strategy */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-display font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-6 bg-rose-400 rounded-full block" />
                      <span>The Challenge</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-display font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-6 bg-brand rounded-full block" />
                      <span>The Strategy</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {selectedProject.strategy}
                    </p>
                  </div>

                  {/* Core Design & Dev Processes */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-display font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-6 bg-amber-400 rounded-full block" />
                      <span>Design Process & System</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {selectedProject.designProcess}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-display font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-6 bg-emerald-400 rounded-full block" />
                      <span>Development & Performance</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {selectedProject.developmentProcess}
                    </p>
                  </div>

                  {/* Results Detail */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-display font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-6 bg-indigo-400 rounded-full block" />
                      <span>The Outcome & Metrics</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {selectedProject.resultsDetail}
                    </p>
                  </div>
                </div>

                {/* Testimonial & Technologies Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Testimonial card if exists */}
                  {selectedProject.testimonial && (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative overflow-hidden space-y-4">
                      <span className="text-4xl font-display font-bold text-brand/10 absolute top-4 right-4">“</span>
                      <p className="text-xs text-slate-600 font-medium italic leading-relaxed relative z-10">
                        "{selectedProject.testimonial.quote}"
                      </p>
                      
                      <div className="flex items-center space-x-3.5 pt-2">
                        <img 
                          src={selectedProject.testimonial.avatar} 
                          alt={selectedProject.testimonial.author} 
                          className="w-9 h-9 rounded-full object-cover shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-800">{selectedProject.testimonial.author}</div>
                          <div className="text-[10px] font-mono text-slate-400">{selectedProject.testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tech stack list */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold border-b border-slate-50 pb-2">
                      CORE TECH STACK
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map(tech => (
                        <span 
                          key={tech} 
                          className="bg-slate-50 border border-slate-100 font-mono text-[9px] text-slate-500 font-semibold px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Gallery (If available) */}
                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">ADDITIONAL SCREENSHOTS</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedProject.gallery.map((imgUrl, i) => (
                          <div key={i} className="aspect-video rounded-xl overflow-hidden border border-slate-100 shadow-xs">
                            <img src={imgUrl} alt="Additional page detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Case Study CTA banner */}
              <div className="bg-brand text-white rounded-3xl p-8 md:p-12 text-center space-y-6 max-w-5xl mx-auto relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
                <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight">
                  Want metrics like this for your business?
                </h3>
                <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed font-normal">
                  Connect with the Vprime team for a free 30-minute consultation call to see how we can design, build, and optimize your organic search acquisitions.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://calendly.com/vprimedigitalz/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-white text-brand hover:bg-slate-50 font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>SCHEDULE FREE CALL</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
