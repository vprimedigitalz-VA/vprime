import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Search, Sparkles, MessageSquare, ArrowRight } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
  category?: string;
}

export const faqData: FaqItem[] = [
  {
    category: "General",
    q: "Why should we choose VprimeDigitalz over a freelance designer or agency?",
    a: "Unlike single freelancers who specialize in only one discipline, VprimeDigitalz provides an end-to-end boutique unit of brand strategists, award-winning UI/UX designers, senior frontend engineers, and technical SEO specialists. We don't just build beautiful sites; we engineer conversion engines designed to drive measurable revenue growth with zero outsourcing."
  },
  {
    category: "General",
    q: "Do you offer custom web apps or just marketing websites?",
    a: "We design and build both! From high-converting marketing sites to complex custom client portals, e-commerce storefronts, SaaS web apps, interactive calculators, and internal administrative dashboards utilizing modern React, TypeScript, Node, and secure API integrations."
  },
  {
    category: "Development",
    q: "What CMS and tech platforms do you support?",
    a: "We specialize in React/TypeScript and Next.js for high-performance custom platforms, Webflow for intuitive client-edited content systems, Shopify Liquid for enterprise e-commerce, and custom WordPress themes built with clean Gutenberg blocks and Advanced Custom Fields (ACF)."
  },
  {
    category: "Development",
    q: "Will my website be mobile-responsive and fast-loading?",
    a: "100% guaranteed. All VprimeDigitalz builds pass strict Google Core Web Vitals performance benchmarks with LCP under 1.2s, 95+ PageSpeed performance scores, and fluid responsive layouts across all mobile, tablet, and ultra-wide desktop monitors."
  },
  {
    category: "Pricing & Process",
    q: "How long does a custom project take from start to launch?",
    a: "Our standard website projects take between 2 to 5 weeks depending on the scope, custom interaction level, and number of unique page templates required. We follow a strict 9-step milestone pipeline so you know the exact delivery schedule at every phase."
  },
  {
    category: "Pricing & Process",
    q: "Do we own the full source code and design files?",
    a: "Yes! Upon final sign-off, you receive 100% full ownership of all Figma source design files, component libraries, custom code repositories, media assets, and server access rights with zero recurring platform lock-ins."
  },
  {
    category: "SEO & Growth",
    q: "How does the Vanalyst SEO integration work?",
    a: "Every build includes foundational technical SEO hardening: custom JSON-LD schema generation, semantic HTML markup, automated XML sitemaps, OpenGraph metadata, image compression, and indexing requests directly to Google Search Console."
  },
  {
    category: "SEO & Growth",
    q: "Do you provide ongoing maintenance and post-launch support?",
    a: "Yes, all custom builds include 30 days of complimentary post-launch support, live video walkthrough tutorials for your team, plus optional monthly retainer packages for continuous feature updates, security patches, and SEO monitoring."
  }
];

interface FaqSectionProps {
  onBookCall?: () => void;
}

export default function FaqSection({ onBookCall }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const categories = ["All", "General", "Development", "Pricing & Process", "SEO & Growth"];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq-section" className="py-24 bg-[#121520] border-t border-slate-800/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest"
          >
            <HelpCircle size={12} />
            <span>KNOWLEDGE BASE & FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know about partnering with VprimeDigitalz, our technical capabilities, pricing clarity, and delivery timelines.
          </motion.p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions (e.g., SEO, Webflow, Timeline, Pricing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-mono px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer font-semibold ${
                  activeCategory === cat
                    ? "bg-brand text-slate-950 font-bold shadow-md shadow-brand/10"
                    : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Accordion Questions List */}
        <div className="max-w-3xl mx-auto space-y-4 pt-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndices.includes(index);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`bg-slate-900/90 border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-brand/50 shadow-lg shadow-brand/5 ring-1 ring-brand/20"
                      : "border-slate-800/80 hover:border-slate-700 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-6 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? "bg-brand text-slate-950 font-bold" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                        }`}
                      >
                        <span className="font-mono text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="font-display font-bold text-white text-sm sm:text-base group-hover:text-brand transition-colors">
                        {faq.q}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`p-1.5 rounded-full shrink-0 ${
                        isOpen ? "bg-brand/20 text-brand" : "text-slate-400 group-hover:text-white"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 pl-16 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 font-normal">
                          <p className="mb-3">{faq.a}</p>
                          {faq.category && (
                            <span className="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md font-semibold uppercase tracking-wider">
                              Category: {faq.category}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-900/90 rounded-2xl border border-dashed border-slate-800 space-y-3">
              <Sparkles size={24} className="text-slate-500 mx-auto" />
              <p className="text-sm font-bold text-slate-300">No questions found matching your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-xs font-mono text-brand font-bold uppercase tracking-wider hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom "Still Have Questions" Card */}
        <div className="max-w-3xl mx-auto pt-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-brand/20 border border-brand/30 flex items-center justify-center shrink-0 text-brand">
                <MessageSquare size={20} />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display font-bold text-base text-white">Have a specific question about your project?</h4>
                <p className="text-xs text-slate-400">Speak directly with Vikram Malhotra or schedule a custom strategy session.</p>
              </div>
            </div>

            {onBookCall && (
              <button
                onClick={onBookCall}
                className="group inline-flex items-center space-x-2 bg-brand text-white font-sans text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-brand-hover transition-all duration-300 shrink-0 cursor-pointer shadow-md hover:shadow-brand/20"
              >
                <span>Book Strategy Call</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
