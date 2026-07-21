import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Play, Star, Clock } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onPageChange: (page: string) => void;
}

export default function Hero({ onPageChange }: HeroProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const clientLogos = [
    { name: "Stripe", url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_blue.svg" },
    { name: "Linear", url: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Linear_logo.svg" },
    { name: "Notion", url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" },
    { name: "Figma", url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
    { name: "Framer", url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Framer_Logo.svg" },
    { name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "Webflow", url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Webflow_logo_2023.svg" }
  ];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-white overflow-hidden">
      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0037fd06_1px,transparent_1px),linear-gradient(to_bottom,#0037fd06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

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
              <a
                href="https://calendly.com/vprimedigitalz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto relative inline-flex items-center justify-center bg-brand text-white font-sans text-xs font-semibold uppercase tracking-widest px-8 py-4.5 rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand/20 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Book Free Consultation</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-brand-dark scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out" />
              </a>

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
              className="relative aspect-video lg:aspect-square bg-slate-50 border border-slate-100 rounded-3xl p-4 md:p-6 shadow-2xl flex items-center justify-center overflow-hidden group"
            >
              {/* Geometric Grid Element inside Graphic */}
              <div className="absolute inset-0 bg-[radial-gradient(#0037fd0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

              {/* Central Premium Mockup Card */}
              <div className="relative w-full h-full bg-white rounded-2xl border border-slate-100 shadow-md p-6 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] font-mono tracking-widest text-slate-400">
                    HTTPS://VPRIMEDIGITALZ.COM
                  </div>
                </div>

                <div className="my-auto space-y-5 py-4">
                  <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-2.5 py-1 rounded-full font-semibold">
                    <span>AGENCY ENGINE V1.4</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 tracking-tight leading-snug">
                    Redefining Digital Authority for Ambitious Teams.
                  </h3>
                  <div className="h-[2px] w-12 bg-brand" />
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                    Hover card elements to reveal physical metrics. Drag and drop assets directly to prompt global conversions.
                  </p>
                </div>

                {/* Simulated Waveform / Analytics Tracker */}
                <div className="flex items-end justify-between h-14 bg-slate-50 border border-slate-100/50 rounded-xl px-4 py-2">
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-slate-400">ORGANIC REACH</div>
                    <div className="text-sm font-semibold text-brand font-mono">+340.24%</div>
                  </div>
                  <div className="flex space-x-1 items-end h-full">
                    <div className="w-1.5 bg-slate-200 rounded-t-sm h-[30%]" />
                    <div className="w-1.5 bg-slate-200 rounded-t-sm h-[45%]" />
                    <div className="w-1.5 bg-slate-200 rounded-t-sm h-[20%]" />
                    <div className="w-1.5 bg-brand rounded-t-sm h-[60%] animate-pulse" />
                    <div className="w-1.5 bg-brand rounded-t-sm h-[85%] animate-pulse" />
                    <div className="w-1.5 bg-brand-light rounded-t-sm h-[100%] animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Decorative Accent Badges */}
              <div className="absolute top-10 -right-4 bg-white border border-slate-100 shadow-lg px-4 py-3 rounded-2xl flex items-center space-x-3 -rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-display font-bold text-sm">
                  ★
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">AWARDS WINNER</div>
                  <div className="text-xs font-semibold text-slate-800">SITE OF THE DAY</div>
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

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex w-[200%] gap-12 items-center animate-marquee">
              {/* First half */}
              {clientLogos.concat(clientLogos).map((logo, i) => (
                <div key={i} className="flex-1 flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300 py-2">
                  <img src={logo.url} alt={logo.name} className="h-6 md:h-7 object-contain max-w-[120px] pointer-events-none" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
