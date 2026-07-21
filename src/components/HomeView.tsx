import { useState } from "react";
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
  ShieldCheck
} from "lucide-react";
import Hero from "./Hero";
import { servicesData, projectsData, testimonialsData } from "../data";

interface HomeViewProps {
  onPageChange: (page: string) => void;
  onSelectService: (slug: string) => void;
}

export default function HomeView({ onPageChange, onSelectService }: HomeViewProps) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const featuredServices = servicesData.slice(0, 3); // Website Design, Webflow Dev, WordPress Dev
  const featuredProjects = projectsData.slice(0, 3); // Starlight, Apex, Solis
  
  const activeTestimonial = testimonialsData[activeTestimonialIdx];

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((activeTestimonialIdx + 1) % testimonialsData.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((activeTestimonialIdx - 1 + testimonialsData.length) % testimonialsData.length);
  };

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
      <Hero onPageChange={onPageChange} />

      {/* 2. Featured Services Preview Grid */}
      <section id="home-services-preview" className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div className="space-y-3.5">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">Featured Capabilities</span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Our core growth services.
              </h2>
            </div>
            <button
              onClick={() => onPageChange("services")}
              className="group text-xs font-mono tracking-wider text-slate-400 hover:text-brand font-semibold uppercase mt-4 md:mt-0 cursor-pointer flex items-center space-x-1"
            >
              <span>Explore All 13 Capabilities</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl border border-slate-100/80 p-8 shadow-xs hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-11 h-11 bg-brand/5 group-hover:bg-brand text-brand group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300">
                    {service.id === "web-design" ? <Layout size={20} /> : service.id === "webflow-dev" ? <Code size={20} /> : <Sparkles size={20} />}
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                      {service.category}
                    </span>
                    <h3 className="text-base font-display font-bold text-slate-900 group-hover:text-brand transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service.slug)}
                  className="mt-6 inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:text-brand transition-colors cursor-pointer self-start"
                >
                  <span>Learn More</span>
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. About Bento Preview */}
      <section id="home-about-preview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
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
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="font-display font-extrabold text-slate-900 text-sm">Our Core Promises</h3>
            <div className="space-y-4">
              {[
                { title: "Surgical Code Quality", desc: "No bulky, slow WordPress layers. We build optimized class structures yielding 0.8s load times." },
                { title: "Complete Source Ownership", desc: "Our clients receive 100% Figma master source files, CMS passwords, and code repositories." },
                { title: "Durable Strategy Alignment", desc: "We map local SEO, schemas, and tracking pixels into our design grids from day one." }
              ].map((promise, idx) => (
                <div key={idx} className="flex items-start space-x-3.5 bg-white p-4.5 rounded-xl border border-slate-100/50">
                  <CheckCircle size={16} className="text-brand shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-display font-bold text-slate-900">{promise.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">{promise.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Portfolio Showcase Previews */}
      <section id="home-portfolio-preview" className="py-20 bg-slate-50/30 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onPageChange("portfolio")}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-brand/20 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-50">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" referrerPolicy="no-referrer" />
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
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Client Testimonials Slider */}
      <section id="home-testimonials" className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">CLIENT TESTIMONIALS</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-none">
              Client reviews from elite founders.
            </h2>
          </div>

          {/* Slider box layout */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 relative overflow-hidden space-y-6">
            <span className="text-6xl font-display font-bold text-brand/10 absolute top-6 right-8">“</span>
            
            <div className="flex text-amber-400">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>

            <p className="text-slate-700 text-sm md:text-base font-medium italic leading-relaxed max-w-3xl relative z-10">
              "{activeTestimonial.quote}"
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-slate-100/50 pt-6">
              <div className="flex items-center space-x-3.5">
                <img src={activeTestimonial.avatar} alt={activeTestimonial.name} className="w-10 h-10 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                <div>
                  <div className="text-xs font-bold text-slate-800">{activeTestimonial.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{activeTestimonial.role}, {activeTestimonial.company}</div>
                </div>
              </div>

              {/* Slider Arrow Indicators */}
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevTestimonial}
                  className="w-9 h-9 border border-slate-200 hover:border-brand text-slate-600 hover:text-brand bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="w-9 h-9 border border-slate-200 hover:border-brand text-slate-600 hover:text-brand bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Abbreviated Process Pipeline Preview */}
      <section id="home-process-preview" className="py-20 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          
          <div className="space-y-3.5">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">OUR METHODOLOGY</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              An engineered roadmap to delivery.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              We structure your projects around a meticulous 9-step development timeline. Explore how we manage delivery milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { id: "01", title: "Discovery", desc: "Understanding objectives, brand vibes, and competitors." },
              { id: "04", title: "Wireframing", desc: "Building spatial structures inside Figma for click paths." },
              { id: "06", title: "Development", desc: "Engineering high-speed, secure, custom code solutions." },
              { id: "08", title: "Deployment", desc: "DNS, SSL activation, schemas configuration, and live launch." }
            ].map(step => (
              <div key={step.id} className="bg-white border border-slate-100 p-6 rounded-2xl relative space-y-2 text-left">
                <span className="text-3xl font-display font-black text-slate-100 absolute top-4 right-4">{step.id}</span>
                <span className="text-[10px] font-mono text-brand font-semibold block uppercase">STAGE {step.id}</span>
                <h4 className="font-display font-bold text-slate-900 text-sm">{step.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed pr-6">{step.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onPageChange("process")}
            className="group inline-flex items-center space-x-2 text-xs font-mono font-bold text-brand uppercase tracking-widest cursor-pointer"
          >
            <span>VIEW DETAILED 9-STAGE TIMELINE</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>

        </div>
      </section>

      {/* 7. Technologies stack catalog */}
      <section id="home-technologies" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">DIGITAL TOOLKIT</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-none">
              High-performance technologies.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              We leverage the world's most robust digital platforms to design, code, secure, and index custom enterprise solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="bg-slate-50 border border-slate-100/50 p-5 rounded-2xl text-center space-y-1 hover:border-brand/10 hover:shadow-xs transition-all duration-300"
              >
                <div className="font-display font-bold text-slate-800 text-sm">{tech.name}</div>
                <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">{tech.category}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Call to Action Banner section */}
      <section id="home-cta" className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
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
              <a
                href="https://calendly.com/vprimedigitalz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-brand text-white font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand/25"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Book Strategy Call</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <button
                onClick={() => onPageChange("contact")}
                className="inline-flex items-center justify-center border border-white/20 hover:border-white/55 bg-transparent text-white font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer"
              >
                <span>Submit Inquiry Form</span>
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

          </div>
        </div>
      </section>

    </div>
  );
}
