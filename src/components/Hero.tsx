import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Play, Star, Clock } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onPageChange: (page: string) => void;
  onBookCall: () => void;
}

export default function Hero({ onPageChange, onBookCall }: HeroProps) {
  const [time, setTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    if (!isHovering) setIsHovering(true);
  };

  const clientLogos = [
    { 
      name: "Stripe", 
      svg: (
        <svg className="h-6 md:h-7 w-auto fill-slate-800 hover:fill-indigo-600 transition-colors" viewBox="0 0 60 25">
          <path d="M59.64 14.28c0-4.52-2.16-8.2-6.52-8.2-4.4 0-7.08 3.68-7.08 8.16 0 5.36 3.16 8.24 7.68 8.24 2.24 0 4.28-.52 5.64-1.28v-3.48c-1.36.72-3.12 1.16-4.88 1.16-2.04 0-3.84-.76-4.12-3.04h9.24c.04-.44.04-1.12.04-1.56zm-9.36-1.84c.24-2 1.64-2.88 3.08-2.88 1.4 0 2.8.84 3.04 2.88h-6.12zM33.8 6.36h-4.32v15.8h4.32V6.36zm-4.32-3.32h4.32V.08h-4.32v2.96zM22.08 9.8c-1.36-1.12-3.08-1.56-4.84-1.56-3.88 0-6.96 2.84-6.96 7.08 0 4.6 3.2 7.12 7.08 7.12 1.8 0 3.44-.44 4.72-1.44v1.16h4.32V6.36h-4.32v3.44zm-2.08 8.84c-1.8 0-3.24-1.32-3.24-3.4 0-2.12 1.48-3.36 3.24-3.36 1.72 0 3.16 1.28 3.16 3.36 0 2.08-1.4 3.4-3.16 3.4zM9.48 11.24C7.72 10.48 6 10.12 6 9c0-.96.96-1.44 2.32-1.44 1.84 0 3.84.68 5.28 1.52V5.24C12.12 4.48 10.12 4.12 8.32 4.12 3.6 4.12.6 6.56.6 10.44c0 6.08 8.28 5.12 8.28 7.76 0 1.12-1.04 1.6-2.6 1.6-2.16 0-4.6-.96-6.24-2.04v4.04c1.84.92 4.12 1.36 6.24 1.36 4.96 0 8.04-2.28 8.04-6.52.04-6.2-8.84-5.28-8.84-8.16z"/>
        </svg>
      )
    },
    { 
      name: "Figma", 
      svg: (
        <div className="flex items-center space-x-2">
          <svg className="h-6 md:h-7 w-auto" viewBox="0 0 38 57">
            <path fill="#0ACF83" d="M19 28.5a9.5 9.5 0 1 1 9.5 9.5A9.5 9.5 0 0 1 19 28.5z"/>
            <path fill="#A259FF" d="M0 47.5a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5V38H9.5A9.5 9.5 0 0 0 0 47.5z"/>
            <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z"/>
            <path fill="#FF7262" d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z"/>
            <path fill="#1ABCFE" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z"/>
          </svg>
          <span className="font-display font-extrabold text-slate-800 text-lg tracking-tight">Figma</span>
        </div>
      )
    },
    { 
      name: "Webflow", 
      svg: (
        <div className="flex items-center space-x-2">
          <svg className="h-5 md:h-6 w-auto fill-blue-600" viewBox="0 0 24 24">
            <path d="M17.8 4.2h-3.4l-2.8 7.3L8.8 4.2H5.4L2 19.8h3.3l1.8-8.8 2.8 7.3h3.2l2.8-7.3 1.8 8.8h3.3z"/>
          </svg>
          <span className="font-display font-black text-slate-800 text-lg tracking-tight">Webflow</span>
        </div>
      )
    },
    { 
      name: "Notion", 
      svg: (
        <div className="flex items-center space-x-2">
          <svg className="h-6 md:h-7 w-auto fill-slate-900" viewBox="0 0 24 24">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L2.87 2.388c-.42.047-.514.28-.327.467zm.794 3.174v14.463c0 .56.28.84.887.887l14.463.84c.56 0 .84-.28.84-.84V8.222c0-.56-.28-.84-.84-.887l-14.463-.84c-.56 0-.887.28-.887.887zm13.115 12.316l-3.218-4.852v4.852h-2.1v-8.153h2.1l3.218 4.852v-4.852h2.1v8.153z"/>
          </svg>
          <span className="font-display font-bold text-slate-900 text-lg tracking-tight">Notion</span>
        </div>
      )
    },
    { 
      name: "Slack", 
      svg: (
        <div className="flex items-center space-x-2">
          <svg className="h-6 md:h-7 w-auto" viewBox="0 0 127 127">
            <path fill="#E01E5A" d="M27.3 80c0 7.3-5.9 13.3-13.3 13.3C6.7 93.3.8 87.4.8 80c0-7.3 5.9-13.3 13.3-13.3h13.3V80zM34 80c0-7.3 5.9-13.3 13.3-13.3 7.3 0 13.3 5.9 13.3 13.3v33.3c0 7.3-5.9 13.3-13.3 13.3-7.3 0-13.3-5.9-13.3-13.3V80z"/>
            <path fill="#36C5F0" d="M47.3 27.3c-7.3 0-13.3-5.9-13.3-13.3C34 6.7 39.9.8 47.3.8c7.3 0 13.3 5.9 13.3 13.3v13.3H47.3zM47.3 34c7.3 0 13.3 5.9 13.3 13.3 0 7.3-5.9 13.3-13.3 13.3H14C6.7 60.6.8 54.7.8 47.3c0-7.3 5.9-13.3 13.3-13.3h33.2z"/>
            <path fill="#2EB67D" d="M100 47.3c0-7.3 5.9-13.3 13.3-13.3 7.3 0 13.3 5.9 13.3 13.3 0 7.3-5.9 13.3-13.3 13.3H100V47.3zM93.3 47.3c0 7.3-5.9 13.3-13.3 13.3-7.3 0-13.3-5.9-13.3-13.3V14c0-7.3 5.9-13.3 13.3-13.3 7.3 0 13.3 5.9 13.3 13.3v33.3z"/>
            <path fill="#ECB22E" d="M80 100c7.3 0 13.3 5.9 13.3 13.3 0 7.3-5.9 13.3-13.3 13.3-7.3 0-13.3-5.9-13.3-13.3V100H80zM80 93.3c-7.3 0-13.3-5.9-13.3-13.3 0-7.3 5.9-13.3 13.3-13.3h33.3c7.3 0 13.3 5.9 13.3 13.3 0 7.3-5.9 13.3-13.3 13.3H80z"/>
          </svg>
          <span className="font-display font-extrabold text-slate-800 text-lg tracking-tight">Slack</span>
        </div>
      )
    },
    { 
      name: "Framer", 
      svg: (
        <div className="flex items-center space-x-2">
          <svg className="h-6 md:h-7 w-auto fill-slate-900" viewBox="0 0 24 24">
            <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
          </svg>
          <span className="font-display font-black text-slate-900 text-lg tracking-tight">Framer</span>
        </div>
      )
    },
    { 
      name: "React", 
      svg: (
        <div className="flex items-center space-x-2">
          <svg className="h-6 md:h-7 w-auto text-sky-500 animate-spin" style={{ animationDuration: "12s" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
          </svg>
          <span className="font-display font-extrabold text-slate-800 text-lg tracking-tight">React JS</span>
        </div>
      )
    },
    { 
      name: "Shopify", 
      svg: (
        <div className="flex items-center space-x-2">
          <svg className="h-6 md:h-7 w-auto fill-emerald-600" viewBox="0 0 24 24">
            <path d="M12 0L1.75 6.75l1.5 12.5L12 24l8.75-4.75 1.5-12.5L12 0zm0 3.25l6.5 4.25-1.12 9.38L12 20.25l-5.38-3.37L5.5 7.5 12 3.25z"/>
          </svg>
          <span className="font-display font-black text-slate-800 text-lg tracking-tight">Shopify</span>
        </div>
      )
    }
  ];

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-white overflow-hidden"
    >
      {/* Dynamic Interactive Cursor Glow */}
      {isHovering && (
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 207, 156, 0.22), transparent 75%)`
          }}
        />
      )}

      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06cf9c0c_1px,transparent_1px),linear-gradient(to_bottom,#06cf9c0c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Real-time Global Operations Clock */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full shadow-xs"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
              VPRIME OPERATIONS ALWAYS ON
            </span>
            <span className="text-xs text-slate-300">|</span>
            <span className="flex items-center space-x-1 text-slate-700 font-mono text-xs font-semibold">
              <Clock size={12} className="text-brand mr-0.5" />
              <span>{time || "04:38 AM"}</span>
            </span>
          </motion.div>
        </div>

        {/* Primary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Headline and Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-slate-900 leading-[1.08]"
            >
              Helping businesses grow online through{" "}
              <span className="text-brand relative inline-block">
                beautiful design
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-brand/10 -rotate-1 rounded-sm" />
              </span>{" "}
              & strategic growth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              VprimeDigitalz is an award-winning creative agency. We build stunning, highly converting websites, scale organic SEO traffic, and engineer high-performance marketing funnels.
            </motion.p>

            {/* Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onBookCall}
                className="group w-full sm:w-auto relative inline-flex items-center justify-center bg-brand text-white font-sans text-xs font-semibold uppercase tracking-widest px-8 py-4.5 rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Book Free Consultation</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-brand-dark scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out" />
              </button>

              <button
                onClick={() => onPageChange("portfolio")}
                className="group w-full sm:w-auto inline-flex items-center justify-center border border-slate-200 hover:border-brand/40 bg-white text-slate-800 font-sans text-xs font-semibold uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="flex items-center space-x-2">
                  <span>View Portfolio</span>
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-brand transition-colors" />
                </span>
              </button>
            </motion.div>

            {/* Micro Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start space-x-3.5 pt-4"
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs font-mono tracking-wide text-slate-500 font-semibold">
                RATED 4.9/5 ON CLUTCH & TRUSTPILOT
              </span>
            </motion.div>
          </div>

          {/* Premium UI/Canvas Side Graphic */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-video lg:aspect-[5/6] bg-slate-50 border border-slate-200/60 rounded-3xl p-3 shadow-2xl flex items-center justify-center overflow-hidden group select-none"
            >
              {/* Geometric Grid Element inside Graphic */}
              <div className="absolute inset-0 bg-[radial-gradient(#06cf9c10_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

              {/* Central Premium Mockup Frame */}
              <div className="relative w-full h-full bg-white rounded-2xl border border-slate-100 shadow-md flex flex-col overflow-hidden">
                {/* Browser top-bar */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3 shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[9px] font-mono tracking-widest text-slate-400 font-bold select-all">
                    HTTPS://VPRIMEDIGITALZ.COM
                  </div>
                  <div className="w-12" /> {/* Spacer to balance */}
                </div>

                {/* Full-bleed mock-up presentation image */}
                <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950">
                  <img 
                    src="https://res.cloudinary.com/iuczvp68/image/upload/v1784648495/25332547_web_pages_presentation_mock_up_051_ajiuts.jpg" 
                    alt="Vprime Web Pages Presentation Mockup" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>

              {/* Decorative Accent Badges */}
              <div className="absolute top-8 -right-3 bg-white border border-slate-100 shadow-xl px-4 py-3 rounded-2xl flex items-center space-x-3 -rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-display font-bold text-sm">
                  ★
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-400 font-bold">AWARDS WINNER</div>
                  <div className="text-[11px] font-sans font-bold text-slate-800 uppercase">SITE OF THE DAY</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Dynamic Agency Statistics Grid */}
        <div className="mt-20 md:mt-28 border-t border-slate-100 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center md:text-left">
          {[
            { value: "120+", label: "BRANDS SCALED" },
            { value: "98%", label: "CLIENT RETENTION" },
            { value: "$45M+", label: "REVENUE GENERATED" },
            { value: "4.9★", label: "CLUTCH REVIEWS RATING" }
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              className="space-y-1.5"
            >
              <div className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                <span className="text-gradient-brand">{stat.value}</span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite Scrolling Logo Ticker / Trusted Partners */}
        <div className="mt-16 border-t border-slate-100 pt-12">
          <div className="text-center text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold mb-8">
            TRUSTED BY AMBITIOUS TEAMS AT DIGITAL-FORWARD ENTERPRISES
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <div className="flex w-[200%] gap-12 items-center animate-marquee">
              {clientLogos.concat(clientLogos).map((logo, i) => (
                <div key={i} className="flex-1 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 py-3 shrink-0 px-4">
                  {logo.svg}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
