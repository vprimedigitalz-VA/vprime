import { useState, FormEvent, useRef, useEffect, useMemo, ReactNode } from "react";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  CheckCircle, 
  BookOpen, 
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Share2,
  Copy,
  ExternalLink,
  Sparkles,
  HelpCircle,
  FolderOpen,
  ListOrdered,
  Layers,
  FileCheck2,
  Check,
  Scale
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { blogPostsData } from "../data";
import { BlogPost } from "../types";

interface BlogSectionProps {
  onBookCall: () => void;
  onPageChange?: (page: string, slug?: string) => void;
  initialPostSlug?: string | null;
}

export default function BlogSection({ onBookCall, onPageChange, initialPostSlug }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    if (initialPostSlug) {
      const match = blogPostsData.find((p) => p.slug === initialPostSlug || p.id === initialPostSlug);
      if (match) return match;
    }
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/blog/")) {
        const slug = path.replace("/blog/", "").replace(/\/$/, "");
        const match = blogPostsData.find((p) => p.slug === slug || p.id === slug);
        if (match) return match;
      }
    }
    return null;
  });

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [checklistProgress, setChecklistProgress] = useState<Record<number, boolean>>({});
  
  // Reading scroll progress tracker for blog detail view
  const articleRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!selectedPost) return;

    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight + 120;
      if (totalScrollable <= 0) {
        setReadingProgress(100);
        return;
      }
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(100, Math.max(0, Math.round((scrolled / totalScrollable) * 100)));
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedPost]);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Sync initialPostSlug if changed from parent
  useEffect(() => {
    if (initialPostSlug) {
      const match = blogPostsData.find((p) => p.slug === initialPostSlug || p.id === initialPostSlug);
      if (match) {
        setSelectedPost(match);
        setReadingProgress(0);
      }
    } else if (initialPostSlug === null && typeof window !== "undefined" && window.location.pathname === "/blog") {
      setSelectedPost(null);
    }
  }, [initialPostSlug]);

  // Handle SEO Meta Tags, Canonical Link & JSON-LD dynamically
  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc ? metaDesc.getAttribute("content") : "";

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    const previousCanonical = canonicalLink.href;

    let schemaScript = document.getElementById("vprime-article-schema") as HTMLScriptElement | null;

    if (selectedPost) {
      document.title = selectedPost.seoTitle || `${selectedPost.title} | Vprime Digitalz`;

      const descriptionText = selectedPost.metaDescription || selectedPost.excerpt;
      if (metaDesc) {
        metaDesc.setAttribute("content", descriptionText);
      }

      const postUrl = `https://vprimedigitalz.com/blog/${selectedPost.slug}`;
      canonicalLink.setAttribute("href", postUrl);

      // OpenGraph & Twitter tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", selectedPost.title);
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", descriptionText);
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", postUrl);
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute("content", selectedPost.image);

      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "vprime-article-schema";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }

      // Format ISO Date for Schema
      const isoDate = selectedPost.date.includes("21")
        ? "2026-10-21T00:00:00+00:00"
        : selectedPost.date.includes("20") 
        ? "2026-10-20T00:00:00+00:00" 
        : "2026-10-19T00:00:00+00:00";

      const schemaData: Record<string, any> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedPost.title,
        "description": descriptionText,
        "image": selectedPost.image,
        "datePublished": isoDate,
        "dateModified": isoDate,
        "author": {
          "@type": "Organization",
          "name": selectedPost.author.name,
          "url": "https://vprimedigitalz.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Vprime Digitalz",
          "logo": {
            "@type": "ImageObject",
            "url": "https://res.cloudinary.com/iuczvp68/image/upload/v1790002397/vprime-digitalz-logo-01_otkfc1.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": postUrl
        },
        "keywords": selectedPost.tags.join(", ")
      };

      if (selectedPost.faq && selectedPost.faq.length > 0) {
        schemaData["hasPart"] = {
          "@type": "FAQPage",
          "mainEntity": selectedPost.faq.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        };
      }

      schemaScript.innerHTML = JSON.stringify(schemaData);
    } else {
      document.title = "Insights & Strategy Blog | Vprime Digitalz";
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "In-depth articles, conversion blueprints, Webflow engineering strategies, and technical SEO guides for high-growth modern businesses."
        );
      }
      canonicalLink.setAttribute("href", "https://vprimedigitalz.com/blog");
      if (schemaScript) {
        schemaScript.remove();
      }
    }

    return () => {
      document.title = previousTitle;
      if (metaDesc && previousDesc) {
        metaDesc.setAttribute("content", previousDesc);
      }
      if (canonicalLink && previousCanonical) {
        canonicalLink.setAttribute("href", previousCanonical);
      }
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [selectedPost]);

  const categories = ["All", "Web Development", "Website Design", "Business Growth", "Case Study", "Design", "SEO"];

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setReadingProgress(0);
    setExpandedFaqIndex(0);
    setChecklistProgress({});
    if (onPageChange) {
      onPageChange("blog", post.slug);
    } else if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/blog/${post.slug}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToGrid = () => {
    setSelectedPost(null);
    setReadingProgress(0);
    setChecklistProgress({});
    if (onPageChange) {
      onPageChange("blog");
    } else if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/blog");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && selectedPost) {
      navigator.clipboard.writeText(`https://vprimedigitalz.com/blog/${selectedPost.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toggleChecklistItem = (index: number) => {
    setChecklistProgress((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = blogPostsData.find((p) => p.featured) || blogPostsData[0];
  const gridArticles = filteredPosts.filter((p) => selectedCategory !== "All" || searchQuery ? true : p.id !== featuredArticle.id);
  const popularPosts = blogPostsData.slice(1, 4);

  // Helper to parse markdown inline formatting: [link](url), **bold**, and *italic*
  const renderInlineFormatting = (text: string): ReactNode => {
    const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
    const elements: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }

      if (match[2] && match[3]) {
        // Link: [label](url)
        const label = match[2];
        const link = match[3];
        elements.push(
          <button
            key={`link-${match.index}`}
            onClick={(e) => {
              e.preventDefault();
              if (link.startsWith("/services")) {
                const sub = link.replace("/services/", "").replace("/services", "");
                if (sub) {
                  onPageChange?.("services", sub);
                } else {
                  onPageChange?.("services");
                }
              } else if (link.startsWith("/portfolio")) {
                onPageChange?.("portfolio");
              } else if (link.startsWith("/booking")) {
                onBookCall();
              } else if (link.startsWith("/blog")) {
                const sub = link.replace("/blog/", "");
                if (sub && sub !== "/blog") {
                  onPageChange?.("blog", sub);
                } else {
                  handleBackToGrid();
                }
              } else {
                onPageChange?.("home");
              }
            }}
            className="blog-link-text underline font-semibold transition-colors cursor-pointer inline-flex items-center gap-0.5 mx-0.5"
          >
            <span>{label}</span>
            <ExternalLink size={11} className="inline opacity-70" />
          </button>
        );
      } else if (match[4]) {
        // Bold: **text**
        elements.push(
          <strong key={`bold-${match.index}`} className="font-bold blog-heading-primary">
            {match[4]}
          </strong>
        );
      } else if (match[5]) {
        // Italic: *text*
        elements.push(
          <em key={`italic-${match.index}`} className="italic">
            {match[5]}
          </em>
        );
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements.length > 0 ? elements : text;
  };

  // Dedicated Renderers for in-article sections
  const renderFaqSectionComponent = (keyIdx: number) => {
    if (!selectedPost || !selectedPost.faq || selectedPost.faq.length === 0) return null;
    return (
      <div key={keyIdx} id="faq-section" className="my-12 blog-card-subtle-surface border blog-border-color rounded-3xl p-6 sm:p-10 space-y-6 scroll-mt-28 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 blog-badge-pill font-mono text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            <HelpCircle size={12} className="text-[#05BB8D]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h3 className="blog-heading-primary text-xl sm:text-2xl font-display font-black tracking-tight">
            {selectedPost.id === "webflow-vs-wordpress-2026"
              ? "Webflow vs WordPress Questions Answered"
              : selectedPost.id === "10-signs-your-website-needs-a-redesign"
              ? "Website Redesign Questions Answered"
              : "Frequently Asked Questions"}
          </h3>
          <p className="blog-muted-text text-xs sm:text-sm">
            {selectedPost.id === "webflow-vs-wordpress-2026"
              ? "Answers to the most common questions founders and marketing leaders ask when choosing between Webflow and WordPress in 2026."
              : selectedPost.id === "10-signs-your-website-needs-a-redesign"
              ? "Clear answers to the most common questions founders ask about website redesigns, SEO preservation, cost factors, and rebuild decisions."
              : "Common questions founders ask us about website investments, development timelines, and search rankings in 2026."}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {selectedPost.faq.map((item, index) => {
            const isOpen = expandedFaqIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen 
                    ? "blog-card-surface border-[#05BB8D]/50 shadow-md" 
                    : "blog-card-surface blog-border-color hover:border-slate-400/50"
                }`}
              >
                <button
                  onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="blog-heading-primary font-display font-bold text-sm sm:text-base leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`blog-muted-text shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#05BB8D]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 pt-0 blog-body-text text-xs sm:text-sm leading-relaxed border-t blog-border-color">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStrategicCtaBox = (keyIdx: number) => {
    if (!selectedPost) return null;
    return (
      <div key={keyIdx} id="cta-box" className="my-12 blog-card-surface border blog-border-color rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl scroll-mt-28">
        <div className="inline-flex items-center space-x-2 blog-badge-pill font-mono text-[10px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider relative z-10">
          <Sparkles size={12} className="text-[#05BB8D]" />
          <span>TAKE ACTION TODAY</span>
        </div>

        <h3 className="blog-heading-primary text-2xl sm:text-3xl md:text-4xl font-display font-black max-w-2xl mx-auto tracking-tight leading-tight relative z-10">
          {selectedPost.cta?.heading || "Ready to Build a Website That Works for Your Business?"}
        </h3>

        <p className="blog-body-text text-xs sm:text-sm max-w-xl mx-auto leading-relaxed relative z-10">
          {selectedPost.cta?.description || "Your website should match your goals, not just current trends. Let's discuss your project and choose an approach that works for your brand, customers, and long-term plans."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 relative z-10">
          <button
            onClick={onBookCall}
            className="blog-primary-btn inline-flex items-center justify-center space-x-2 font-sans text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.02]"
          >
            <span>{selectedPost.cta?.primaryBtnText || "Discuss Your Website Project"}</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => onPageChange?.("portfolio")}
            className="blog-secondary-btn inline-flex items-center justify-center space-x-2 font-sans text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02]"
          >
            <span>{selectedPost.cta?.secondaryBtnText || "View Our Work"}</span>
          </button>
        </div>
      </div>
    );
  };

  // Helper to render markdown content with full structural support
  const renderFormattedParagraph = (para: string, idx: number) => {
    const trimmed = para.trim();

    // 1. Horizontal divider
    if (trimmed === "---") {
      return <hr key={idx} className="my-8 border-t blog-border-color" />;
    }

    // 2. Dedicated Section Intercepts
    if (trimmed.startsWith("## Frequently Asked Questions")) {
      return renderFaqSectionComponent(idx);
    }

    if (trimmed.startsWith("## Need Help Choosing the Right Website Platform?") || 
        trimmed.startsWith("## Ready to Build a Website That Works for Your Business?")) {
      return renderStrategicCtaBox(idx);
    }

    // Skip redundant plain text promo blocks that are rendered by the CTA card
    if (trimmed.startsWith("At **Vprime Digitalz**, we help businesses") ||
        trimmed.startsWith("Whether you're planning a new website, considering Webflow") ||
        trimmed.startsWith("We can help you evaluate your goals, plan") ||
        trimmed.startsWith("Explore our [website design services](/services), view our [portfolio]") ||
        trimmed.startsWith("Explore our services, view our recent projects")) {
      return null;
    }

    // Skip FAQ questions rendered in plain text
    if (selectedPost?.faq && selectedPost.faq.some((f) => trimmed.replace(/^###\s+/, "").trim().toLowerCase().startsWith(f.q.substring(0, 15).toLowerCase()))) {
      return null;
    }

    // 3. Headings with Numbers: "## 1. What Is Webflow?" or "## 10. Signs..."
    const numberedHeadingMatch = trimmed.match(/^##\s+(\d+)\.\s+(.*)$/);
    if (numberedHeadingMatch) {
      const num = parseInt(numberedHeadingMatch[1], 10);
      const title = numberedHeadingMatch[2];
      const sectionId = selectedPost?.slug.includes("signs") ? `sign-${num}` : `section-${num}`;
      const badgeLabel = selectedPost?.slug.includes("signs") 
        ? `SIGN ${num < 10 ? `0${num}` : num}` 
        : `SECTION ${num < 10 ? `0${num}` : num}`;

      return (
        <div key={idx} id={sectionId} className="pt-10 pb-3 scroll-mt-28 space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="blog-badge-pill font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md border tracking-wider">
              {badgeLabel}
            </span>
            <span className="h-px flex-1 blog-border-color border-t" />
          </div>
          <h2 className="blog-heading-primary text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
            {title}
          </h2>
        </div>
      );
    }

    // 4. Other H2 Headings: "## Final Verdict: Webflow vs WordPress in 2026", "## Does Your Website...", etc.
    if (trimmed.startsWith("## ")) {
      const headingText = trimmed.replace("## ", "").trim();
      const slugId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      return (
        <div key={idx} id={slugId} className="pt-10 pb-4 scroll-mt-28 border-b blog-border-color">
          <h2 className="blog-heading-primary text-xl sm:text-2xl md:text-3xl font-display font-black tracking-tight flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#05BB8D] shrink-0" />
            <span>{headingText}</span>
          </h2>
        </div>
      );
    }

    // 5. H3 Headings: "### Heading"
    if (trimmed.startsWith("### ")) {
      const headingText = trimmed.replace("### ", "").trim();
      return (
        <h3 key={idx} className="blog-heading-primary text-lg sm:text-xl font-display font-bold pt-6 pb-2 tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#05BB8D] shrink-0" />
          <span>{headingText}</span>
        </h3>
      );
    }

    // 6. Actionable Recommendation / "What to do:" Takeaway Box
    if (trimmed.startsWith("**What to do:**")) {
      const advice = trimmed.replace("**What to do:**", "").trim();
      return (
        <div key={idx} className="my-6 blog-callout-box border rounded-2xl p-5 sm:p-6 border-l-4 border-l-[#05BB8D] shadow-xs">
          <div className="flex items-center space-x-2 mb-2.5">
            <span className="w-6 h-6 rounded-lg bg-[#05BB8D]/15 text-[#05BB8D] flex items-center justify-center shrink-0">
              <Sparkles size={13} />
            </span>
            <span className="blog-link-text font-mono text-xs font-bold uppercase tracking-wider">
              Actionable Recommendation
            </span>
          </div>
          <p className="blog-body-text text-sm sm:text-base leading-relaxed font-normal">
            {renderInlineFormatting(advice)}
          </p>
        </div>
      );
    }

    // 7. Highlight Pull Quote: Standalone block starting and ending with **...**
    if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.includes("\n")) {
      const quoteText = trimmed.slice(2, -2).trim();
      return (
        <div key={idx} className="my-7 blog-quote-box border-l-4 p-5 sm:p-6 rounded-r-2xl border blog-border-color shadow-xs">
          <p className="blog-heading-primary font-display text-base sm:text-lg font-bold italic leading-relaxed">
            "{quoteText}"
          </p>
        </div>
      );
    }

    // 8. Markdown Table Parsing (Comparison Table & Decision Matrix)
    if (trimmed.includes("|") && trimmed.includes("|---")) {
      const lines = trimmed.split("\n").filter((l) => l.trim().startsWith("|"));
      if (lines.length >= 2) {
        const headerCols = lines[0]
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean);

        const rowLines = lines.slice(2);
        const rows = rowLines.map((line) =>
          line
            .split("|")
            .map((c) => c.trim())
            .filter(Boolean)
        );

        const isWebflowVsWp = headerCols.some((h) => h.toLowerCase().includes("webflow")) &&
                              headerCols.some((h) => h.toLowerCase().includes("wordpress"));

        return (
          <div key={idx} className="my-10 rounded-2xl border blog-border-color overflow-hidden blog-table-container shadow-xs">
            {/* Table Header Bar */}
            <div className="py-3 px-5 blog-table-header border-b blog-border-color flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#05BB8D]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider blog-heading-primary">
                  {isWebflowVsWp ? "Webflow vs WordPress Platform Architecture & Feature Matrix" : "Strategic Comparison"}
                </span>
              </div>
              <span className="font-mono text-[10px] blog-muted-text uppercase tracking-wider hidden sm:inline">
                Detailed Side-by-Side Breakdown
              </span>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left border-collapse text-sm min-w-[620px]">
                <thead>
                  <tr className="blog-table-header border-b blog-border-color">
                    {headerCols.map((h, hIdx) => {
                      const isWf = h.toLowerCase().includes("webflow");
                      const isWp = h.toLowerCase().includes("wordpress");
                      return (
                        <th 
                          key={hIdx} 
                          className={`py-4 px-5 font-mono text-xs font-bold tracking-wider ${
                            hIdx === 0 ? "w-1/4" : "w-[37.5%]"
                          }`}
                        >
                          {isWf ? (
                            <div className="flex items-center gap-2 text-[#05BB8D]">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#05BB8D]" />
                              <span className="text-sm font-bold tracking-wider uppercase">{h}</span>
                            </div>
                          ) : isWp ? (
                            <div className="flex items-center gap-2 blog-heading-primary">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                              <span className="text-sm font-bold tracking-wider uppercase">{h}</span>
                            </div>
                          ) : (
                            <span className="blog-muted-text uppercase">{h}</span>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y blog-border-color">
                  {rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#05BB8D]/5 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-4 px-5 text-sm blog-table-cell align-top">
                          {cIdx === 0 ? (
                            <span className="font-semibold blog-heading-primary flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#05BB8D]/70 shrink-0" />
                              <span>{cell}</span>
                            </span>
                          ) : (
                            <span className="blog-body-text leading-relaxed">
                              {renderInlineFormatting(cell)}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile swipe hint */}
            <div className="sm:hidden px-4 py-2 border-t blog-border-color blog-card-subtle-surface text-center">
              <span className="font-mono text-[10px] blog-muted-text">
                Swipe left/right to compare columns
              </span>
            </div>
          </div>
        );
      }
    }

    // 9. Numbered Checklist: "1. Question... \n 2. Question..."
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split(/\n(?=\d+\.\s+)/).map((it) => {
        const clean = it.replace(/^\d+\.\s+/, "").trim();
        return clean;
      });

      return (
        <div key={idx} className="my-6 space-y-3">
          {items.map((item, itemIdx) => {
            const isChecked = checklistProgress[itemIdx];
            return (
              <div
                key={itemIdx}
                onClick={() => toggleChecklistItem(itemIdx)}
                className={`blog-checklist-item border rounded-xl p-4 flex items-start gap-3.5 cursor-pointer transition-all duration-200 select-none shadow-xs group ${
                  isChecked ? "border-[#05BB8D]/60 bg-[#05BB8D]/5" : ""
                }`}
              >
                <div 
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked 
                      ? "bg-[#05BB8D] text-slate-950 font-bold" 
                      : "blog-card-subtle-surface border blog-border-color group-hover:border-[#05BB8D]/60 text-slate-400"
                  }`}
                >
                  {isChecked ? (
                    <Check size={14} className="stroke-[3]" />
                  ) : (
                    <span className="font-mono text-xs font-bold">{itemIdx + 1 < 10 ? `0${itemIdx + 1}` : itemIdx + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm sm:text-base leading-relaxed transition-opacity ${
                    isChecked ? "line-through opacity-60 blog-muted-text" : "blog-heading-primary font-medium"
                  }`}>
                    {renderInlineFormatting(item)}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-xs blog-muted-text opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                  {isChecked ? "Completed" : "Tap to review"}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    // 10. Bullet list: "- item \n - item"
    if (trimmed.includes("\n- ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n- ").filter(Boolean);
      return (
        <ul key={idx} className="space-y-2.5 my-4 pl-2">
          {items.map((item, itemIdx) => {
            const cleanItem = item.replace(/^- /, "");
            return (
              <li key={itemIdx} className="flex items-start gap-2.5 blog-body-text text-sm sm:text-base leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#05BB8D] shrink-0 mt-2.5" />
                <span>{renderInlineFormatting(cleanItem)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    // 11. Standard clean body paragraph
    return (
      <p key={idx} className="blog-body-text text-sm sm:text-base leading-relaxed font-normal">
        {renderInlineFormatting(trimmed)}
      </p>
    );
  };

  // Quick Table of Contents sections
  const isDay2Post = selectedPost?.slug === "10-signs-your-website-needs-a-redesign";
  const isDay3Post = selectedPost?.slug === "webflow-vs-wordpress-2026";

  const day2Signs = useMemo(() => [
    { num: 1, title: "Outdated Look", id: "sign-1" },
    { num: 2, title: "Not Mobile-Friendly", id: "sign-2" },
    { num: 3, title: "Loads Too Slowly", id: "sign-3" },
    { num: 4, title: "Confusing Navigation", id: "sign-4" },
    { num: 5, title: "Few Enquiries", id: "sign-5" },
    { num: 6, title: "Misaligned Branding", id: "sign-6" },
    { num: 7, title: "Weak Trust Signals", id: "sign-7" },
    { num: 8, title: "Difficult to Update", id: "sign-8" },
    { num: 9, title: "Weak SEO Setup", id: "sign-9" },
    { num: 10, title: "Unclear CTAs", id: "sign-10" },
  ], []);

  const day3Sections = useMemo(() => [
    { num: 1, title: "Webflow", id: "section-1" },
    { num: 2, title: "WordPress", id: "section-2" },
    { num: 3, title: "Comparison Table", id: "section-3" },
    { num: 4, title: "Design Control", id: "section-4" },
    { num: 5, title: "CMS & Ease", id: "section-5" },
    { num: 6, title: "SEO Rankings", id: "section-6" },
    { num: 7, title: "Speed", id: "section-7" },
    { num: 8, title: "Pricing", id: "section-8" },
    { num: 9, title: "Maintenance", id: "section-9" },
    { num: 10, title: "E-commerce", id: "section-10" },
    { num: 11, title: "Portability", id: "section-11" },
    { num: 12, title: "Which to Choose", id: "section-12" },
    { num: 13, title: "5 Questions", id: "section-13" },
  ], []);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="blog-section" className="blog-page-root py-20 md:py-28 relative transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            /* ================= BLOG ARTICLES INDEX VIEW ================= */
            <motion.div
              key="index-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center space-x-2 blog-badge-pill font-mono text-[11px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
                  <Sparkles size={13} className="text-[#05BB8D]" />
                  <span>30-Day Engineering & Strategy Series</span>
                </div>

                <h1 className="blog-heading-primary text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-tight">
                  Insights & Conversion Strategies
                </h1>

                <p className="blog-muted-text text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  In-depth design breakdowns, technical SEO blueprints, Webflow engineering playbooks, and conversion architectures for modern high-growth businesses.
                </p>
              </div>

              {/* Search & Category Filter Navigation Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                {/* Category Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 border ${
                        selectedCategory === cat
                          ? "blog-primary-btn shadow-sm"
                          : "blog-card-surface blog-muted-text hover:text-brand blog-border-color"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Bar Input */}
                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 blog-muted-text" />
                  <input
                    type="text"
                    placeholder="Search strategy guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="blog-input-field blog-border-color w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none transition-colors border"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs blog-muted-text hover:text-brand"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* ================= FEATURED HERO ARTICLE (Day 3, Day 2, or Latest) ================= */}
              {featuredArticle && selectedCategory === "All" && !searchQuery && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold blog-link-text uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-[#05BB8D]" />
                    <span>LATEST PUBLISHED STRATEGY GUIDE</span>
                  </div>

                  <div 
                    onClick={() => handlePostClick(featuredArticle)}
                    className="blog-hero-card rounded-3xl border overflow-hidden transition-all duration-300 hover:border-[#05BB8D]/50 group cursor-pointer"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      
                      {/* Image Preview Box */}
                      <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden min-h-[280px] lg:min-h-[420px]">
                        <img 
                          src={featuredArticle.image} 
                          alt={featuredArticle.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="blog-badge-pill font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm">
                            {featuredArticle.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Box */}
                      <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 text-xs font-mono blog-muted-text font-semibold">
                            <span className="flex items-center space-x-1">
                              <Calendar size={13} className="text-[#05BB8D]" />
                              <span>{featuredArticle.date}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Clock size={13} className="text-[#05BB8D]" />
                              <span>{featuredArticle.readTime}</span>
                            </span>
                          </div>

                          <h2 className="blog-heading-primary text-2xl sm:text-3xl font-display font-extrabold group-hover:text-brand transition-colors tracking-tight leading-snug">
                            {featuredArticle.title}
                          </h2>

                          <p className="blog-body-text text-sm leading-relaxed font-normal">
                            {featuredArticle.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {featuredArticle.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="blog-card-subtle-surface border blog-border-color blog-muted-text text-[10px] font-mono px-2.5 py-1 rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t blog-border-color flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={featuredArticle.author.avatar} 
                              alt={featuredArticle.author.name} 
                              className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#05BB8D]/40" 
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="blog-heading-primary text-xs font-bold">{featuredArticle.author.name}</div>
                              <div className="blog-muted-text text-[11px] font-mono">{featuredArticle.author.role}</div>
                            </div>
                          </div>

                          <span className="blog-primary-btn text-xs font-mono font-bold flex items-center space-x-1.5 px-4 py-2.5 rounded-xl transition-all shadow-xs">
                            <span>Read Article</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* ================= ARTICLES GRID & SIDEBAR ================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left side: Articles Grid */}
                <div className="lg:col-span-8 space-y-8">
                  {gridArticles.length === 0 ? (
                    <div className="text-center py-20 blog-card-surface border blog-border-color rounded-3xl space-y-4">
                      <FolderOpen size={40} className="mx-auto text-slate-400" />
                      <div className="blog-heading-primary text-lg font-bold">No articles match your query</div>
                      <p className="blog-muted-text text-xs max-w-sm mx-auto">
                        Try clearing your search query or selecting a different category to explore our insights.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All");
                        }}
                        className="blog-primary-btn px-4 py-2 rounded-xl text-xs font-mono font-bold"
                      >
                        Reset Filter
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {gridArticles.map((post) => (
                        <motion.div
                          key={post.id}
                          layout
                          onClick={() => handlePostClick(post)}
                          className="blog-card-surface border blog-border-color rounded-3xl overflow-hidden hover:border-[#05BB8D]/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <div>
                            {/* Card Image */}
                            <div className="aspect-[16/10] overflow-hidden relative">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="blog-badge-pill font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm">
                                  {post.category}
                                </span>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 space-y-3">
                              <div className="flex items-center space-x-2 text-[11px] font-mono blog-muted-text">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                              </div>

                              <h3 className="blog-heading-primary text-lg font-display font-bold group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                                {post.title}
                              </h3>

                              <p className="blog-muted-text text-xs line-clamp-3 leading-relaxed">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>

                          <div className="p-6 pt-0 border-t blog-border-color flex items-center justify-between mt-4">
                            <span className="blog-link-text text-xs font-mono font-bold flex items-center space-x-1 group-hover:underline">
                              <span>Read Post</span>
                              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                            </span>

                            <div className="flex items-center space-x-2">
                              <img 
                                src={post.author.avatar} 
                                alt={post.author.name} 
                                className="w-6 h-6 rounded-full object-cover border border-[#05BB8D]/30" 
                                referrerPolicy="no-referrer"
                              />
                              <span className="blog-muted-text text-[11px] font-mono">{post.author.name}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right side: Sidebar with Strategic Links & Newsletter */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* Agency Advisory CTA Card */}
                  <div className="blog-card-surface border blog-border-color rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm relative overflow-hidden">
                    <div className="w-10 h-10 rounded-2xl bg-[#05BB8D]/15 text-[#05BB8D] flex items-center justify-center">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="blog-heading-primary text-lg font-display font-bold">
                      Need Expert Platform or Redesign Advice?
                    </h3>
                    <p className="blog-body-text text-xs leading-relaxed">
                      Our engineers evaluate your stack, CMS architecture, conversion bottlenecks, and SEO crawl health. We build bespoke digital solutions that drive revenue.
                    </p>
                    <button
                      onClick={onBookCall}
                      className="blog-primary-btn w-full py-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                    >
                      <span>Book Free Strategy Call</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Popular Articles Widget */}
                  <div className="blog-card-surface border blog-border-color rounded-3xl p-6 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between border-b blog-border-color pb-3">
                      <h4 className="blog-heading-primary text-xs font-mono font-bold uppercase tracking-wider">
                        Trending Insights
                      </h4>
                      <span className="text-[10px] font-mono blog-link-text">TOP READS</span>
                    </div>

                    <div className="space-y-4">
                      {popularPosts.map((post, idx) => (
                        <div
                          key={post.id}
                          onClick={() => handlePostClick(post)}
                          className="flex items-start space-x-3 group cursor-pointer"
                        >
                          <span className="font-mono text-xs font-bold text-[#05BB8D] bg-[#05BB8D]/10 w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5">
                            0{idx + 1}
                          </span>
                          <div className="space-y-1">
                            <h5 className="blog-heading-primary text-xs font-bold group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </h5>
                            <span className="blog-muted-text text-[10px] font-mono">{post.readTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Subscription Box */}
                  <div className="blog-card-subtle-surface border blog-border-color rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="flex items-center space-x-2 text-[#05BB8D]">
                      <Mail size={18} />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">Weekly Dispatch</span>
                    </div>
                    <h4 className="blog-heading-primary text-base font-display font-bold">
                      Join 3,500+ Founders & Marketers
                    </h4>
                    <p className="blog-muted-text text-xs leading-relaxed">
                      Zero fluff. Only battle-tested Webflow code snippets, redesign breakdowns, and high-ROI conversion tactics delivered every Tuesday.
                    </p>

                    {subscribed ? (
                      <div className="blog-card-surface border border-[#05BB8D]/40 p-4 rounded-xl text-center space-y-1">
                        <CheckCircle size={20} className="text-[#05BB8D] mx-auto" />
                        <div className="blog-heading-primary text-xs font-bold">You're on the insider list!</div>
                        <p className="blog-muted-text text-[10px]">Check your inbox for our 2026 Redesign Blueprint.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                        <input
                          type="email"
                          required
                          placeholder="your.email@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="blog-input-field blog-border-color w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none transition-colors border"
                        />
                        <button
                          type="submit"
                          className="blog-primary-btn w-full py-2.5 rounded-xl text-xs font-mono font-bold shadow-xs cursor-pointer"
                        >
                          Subscribe Free
                        </button>
                      </form>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>
          ) : (
            /* ================= SINGLE ARTICLE EDITORIAL VIEW ================= */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-10"
            >
              {/* Top Navigation & Reading Progress */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between border-b blog-border-color pb-5"
              >
                <button
                  onClick={handleBackToGrid}
                  className="blog-link-text font-mono text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer group"
                >
                  <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                  <span>All Insights & Guides</span>
                </button>

                <div className="flex items-center space-x-3">
                  {/* Reading Progress Badge */}
                  <div className="blog-card-subtle-surface border blog-border-color px-3 py-1.5 rounded-xl font-mono text-xs font-bold shadow-xs">
                    {readingProgress >= 95 ? (
                      <span className="text-[#05BB8D] flex items-center space-x-1">
                        <CheckCircle2 size={13} />
                        <span>100% READ</span>
                      </span>
                    ) : (
                      <span className="blog-link-text flex items-center space-x-1.5">
                        <span>{readingProgress}%</span>
                        <span className="text-[10px] blog-muted-text font-normal uppercase">Progress</span>
                      </span>
                    )}
                  </div>

                  {/* Back to List Button */}
                  <button
                    id="back-to-index-btn"
                    onClick={handleBackToGrid}
                    className="blog-primary-btn px-3 py-1.5 rounded-xl cursor-pointer text-xs font-mono font-bold flex items-center space-x-1.5 shadow-xs"
                  >
                    <ArrowLeft size={13} />
                    <span>Back to Blog</span>
                  </button>
                </div>
              </motion.div>

              {/* Main Article Container with Scroll Target Ref */}
              <div ref={articleRef} className="space-y-10 pt-2">
                
                {/* Title Header */}
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono blog-muted-text font-semibold uppercase">
                    <span className="blog-badge-pill px-3 py-1 rounded-md font-bold">
                      {selectedPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={13} className="text-[#05BB8D]" />
                      <span>{selectedPost.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock size={13} className="text-[#05BB8D]" />
                      <span>{selectedPost.readTime}</span>
                    </span>
                  </div>

                  <h1 className="blog-heading-primary text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-tight">
                    {selectedPost.title}
                  </h1>

                  <div className="blog-card-subtle-surface border-l-4 border-[#05BB8D] blog-body-text text-base sm:text-lg leading-relaxed font-medium italic p-5 rounded-r-2xl">
                    "{selectedPost.excerpt}"
                  </div>

                  {/* Author profile & Share */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-y blog-border-color py-4">
                    <div className="flex items-center space-x-3.5">
                      <img 
                        src={selectedPost.author.avatar} 
                        alt={selectedPost.author.name} 
                        className="w-11 h-11 rounded-full object-cover shrink-0 border border-[#05BB8D]/40 shadow-xs" 
                        referrerPolicy="no-referrer" 
                      />
                      <div>
                        <div className="blog-heading-primary text-sm font-bold">{selectedPost.author.name}</div>
                        <div className="blog-muted-text text-xs font-mono">{selectedPost.author.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopyLink}
                        className="blog-secondary-btn px-3 py-2 rounded-xl text-xs font-mono font-semibold border flex items-center space-x-1.5 cursor-pointer"
                      >
                        {copiedLink ? <CheckCircle size={14} className="text-[#05BB8D]" /> : <Copy size={14} />}
                        <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                      </button>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(`https://vprimedigitalz.com/blog/${selectedPost.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="blog-secondary-btn px-3 py-2 rounded-xl text-xs font-mono font-semibold border flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Share2 size={14} />
                        <span>Share on X</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Post Featured Image with descriptive alt */}
                <div className="aspect-video rounded-3xl overflow-hidden border blog-border-color shadow-xl relative">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>

                {/* Quick Interactive Table of Contents for Day 3 (Webflow vs WordPress) */}
                {isDay3Post && (
                  <div className="blog-card-subtle-surface border blog-border-color rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Scale size={16} className="text-[#05BB8D]" />
                        <span className="blog-heading-primary font-display font-bold text-sm tracking-tight">
                          Quick Jump — Webflow vs WordPress 2026 Guide
                        </span>
                      </div>
                      <span className="font-mono text-[10px] blog-muted-text font-bold uppercase tracking-wider">
                        13 Sections & Matrix
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 pt-1">
                      {day3Sections.map((s) => (
                        <button
                          key={s.num}
                          onClick={() => scrollToAnchor(s.id)}
                          className="blog-card-surface border blog-border-color hover:border-[#05BB8D]/60 hover:text-brand px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer group flex items-center space-x-1.5"
                        >
                          <span className="font-mono text-[10px] font-bold text-[#05BB8D] bg-[#05BB8D]/10 px-1.5 py-0.5 rounded">
                            {s.num < 10 ? `0${s.num}` : s.num}
                          </span>
                          <span className="text-xs font-medium blog-heading-primary truncate group-hover:text-brand">
                            {s.title}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t blog-border-color text-xs font-mono">
                      <button
                        onClick={() => scrollToAnchor("section-3")}
                        className="blog-link-text font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Feature Comparison Table</span>
                        <ChevronRight size={12} />
                      </button>
                      <span className="blog-muted-text">•</span>
                      <button
                        onClick={() => scrollToAnchor("section-12")}
                        className="blog-link-text font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Which Platform to Choose</span>
                        <ChevronRight size={12} />
                      </button>
                      <span className="blog-muted-text">•</span>
                      <button
                        onClick={() => scrollToAnchor("section-13")}
                        className="blog-link-text font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>5 Questions to Ask</span>
                        <ChevronRight size={12} />
                      </button>
                      <span className="blog-muted-text">•</span>
                      <button
                        onClick={() => scrollToAnchor("faq-section")}
                        className="blog-link-text font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>FAQ Accordion</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Interactive Table of Contents for Day 2 */}
                {isDay2Post && (
                  <div className="blog-card-subtle-surface border blog-border-color rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ListOrdered size={16} className="text-[#05BB8D]" />
                        <span className="blog-heading-primary font-display font-bold text-sm tracking-tight">
                          Quick Jump — In This Strategic Guide
                        </span>
                      </div>
                      <span className="font-mono text-[10px] blog-muted-text font-bold uppercase tracking-wider">
                        10 Warning Signs
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                      {day2Signs.map((s) => (
                        <button
                          key={s.num}
                          onClick={() => scrollToAnchor(s.id)}
                          className="blog-card-surface border blog-border-color hover:border-[#05BB8D]/60 hover:text-brand px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer group flex items-center space-x-1.5"
                        >
                          <span className="font-mono text-[10px] font-bold text-[#05BB8D] bg-[#05BB8D]/10 px-1.5 py-0.5 rounded">
                            {s.num < 10 ? `0${s.num}` : s.num}
                          </span>
                          <span className="text-xs font-medium blog-heading-primary truncate group-hover:text-brand">
                            {s.title}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t blog-border-color text-xs font-mono">
                      <button
                        onClick={() => scrollToAnchor("does-your-website-need-a-full-redesign")}
                        className="blog-link-text font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Decision Matrix</span>
                        <ChevronRight size={12} />
                      </button>
                      <span className="blog-muted-text">•</span>
                      <button
                        onClick={() => scrollToAnchor("a-simple-website-redesign-checklist")}
                        className="blog-link-text font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>10-Point Checklist</span>
                        <ChevronRight size={12} />
                      </button>
                      <span className="blog-muted-text">•</span>
                      <button
                        onClick={() => scrollToAnchor("faq-section")}
                        className="blog-link-text font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>FAQ Accordion</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Formatted body prose */}
                <div className="space-y-6 pt-2 leading-relaxed">
                  {selectedPost.content.split("\n\n").map((para, i) => renderFormattedParagraph(para, i))}
                </div>

                {/* Tag row */}
                <div className="flex flex-wrap items-center gap-2 pt-6 border-t blog-border-color">
                  <span className="text-[11px] font-mono tracking-widest blog-muted-text font-bold uppercase mr-1">TOPICS:</span>
                  {selectedPost.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="blog-card-subtle-surface border blog-border-color blog-muted-text text-xs font-mono px-3 py-1 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* ================= AUTHOR BIO CARD ================= */}
                <div className="blog-card-subtle-surface border blog-border-color rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs">
                  <img 
                    src={selectedPost.author.avatar} 
                    alt={selectedPost.author.name} 
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border-2 border-[#05BB8D]/40 shadow-sm"
                    referrerPolicy="no-referrer" 
                  />
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="space-y-0.5">
                      <h4 className="blog-heading-primary text-base font-display font-extrabold">{selectedPost.author.name}</h4>
                      <p className="blog-link-text text-xs font-mono font-bold uppercase">{selectedPost.author.role}</p>
                    </div>
                    <p className="blog-body-text text-xs leading-relaxed max-w-xl">
                      Vprime Digitalz is an elite digital agency helping small businesses, high-growth startups, and established enterprises build high-performance Webflow websites, custom digital systems, and data-backed search strategies.
                    </p>
                  </div>
                </div>

                {/* MORE ARTICLES GRID */}
                <div className="pt-8 space-y-6">
                  <h4 className="blog-heading-primary text-base font-display font-extrabold border-b blog-border-color pb-3">
                    More Articles & Strategy Guides
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPostsData
                      .filter((p) => p.id !== selectedPost.id)
                      .slice(0, 2)
                      .map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handlePostClick(p)}
                          className="blog-card-surface border blog-border-color rounded-2xl p-5 hover:border-[#05BB8D]/50 transition-all cursor-pointer space-y-3 group shadow-xs"
                        >
                          <span className="blog-badge-pill text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded">{p.category}</span>
                          <h5 className="blog-heading-primary group-hover:text-brand text-sm font-display font-bold transition-colors line-clamp-2">
                            {p.title}
                          </h5>
                          <p className="blog-muted-text text-xs line-clamp-2">{p.excerpt}</p>
                          <span className="blog-link-text text-xs font-mono font-bold flex items-center gap-1 pt-1">
                            <span>Read article</span>
                            <ArrowRight size={12} />
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
