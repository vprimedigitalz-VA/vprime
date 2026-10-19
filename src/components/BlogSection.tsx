import { useState, FormEvent, useRef, useEffect } from "react";
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
  FolderOpen
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
    }
  }, [initialPostSlug]);

  // Handle SEO Meta Tags & JSON-LD dynamically
  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc ? metaDesc.getAttribute("content") : "";

    let schemaScript = document.getElementById("vprime-article-schema") as HTMLScriptElement | null;

    if (selectedPost) {
      document.title = selectedPost.seoTitle || `${selectedPost.title} | Vprime Digitalz`;

      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          selectedPost.metaDescription || selectedPost.excerpt
        );
      }

      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "vprime-article-schema";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }

      const postUrl = `https://vprimedigitalz.com/blog/${selectedPost.slug}`;
      const schemaData: Record<string, any> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedPost.title,
        "description": selectedPost.metaDescription || selectedPost.excerpt,
        "image": selectedPost.image,
        "datePublished": "2026-10-19T00:00:00+00:00",
        "dateModified": "2026-10-19T00:00:00+00:00",
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
      if (schemaScript) {
        schemaScript.remove();
      }
    }

    return () => {
      document.title = previousTitle;
      if (metaDesc && previousDesc) {
        metaDesc.setAttribute("content", previousDesc);
      }
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [selectedPost]);

  const categories = ["All", "Business Growth", "Case Study", "Design", "SEO"];

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setReadingProgress(0);
    setExpandedFaqIndex(0);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/blog/${post.slug}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToGrid = () => {
    setSelectedPost(null);
    setReadingProgress(0);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/blog");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBreadcrumbHome = () => {
    if (onPageChange) {
      onPageChange("home");
    } else if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/");
      window.location.href = "/";
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && selectedPost) {
      navigator.clipboard.writeText(`https://vprimedigitalz.com/blog/${selectedPost.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Filter blog posts mapping
  const filteredPosts = blogPostsData.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Featured article is our first article
  const featuredArticle = blogPostsData[0];
  const popularPosts = blogPostsData.slice(1, 4);

  // Helper to render markdown content with internal links
  const renderFormattedParagraph = (para: string, idx: number) => {
    if (para.startsWith("### ")) {
      return (
        <h2 key={idx} className="blog-heading-primary text-xl sm:text-2xl font-display font-extrabold pt-8 pb-3 tracking-tight border-b blog-border-color flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#05BB8D] shrink-0" />
          <span>{para.replace("### ", "").trim()}</span>
        </h2>
      );
    }

    if (para.startsWith("---")) {
      return <hr key={idx} className="my-8 border blog-border-color" />;
    }

    if (para.includes("\n- ") || para.startsWith("- ")) {
      const items = para.split("\n- ").filter(Boolean);
      return (
        <ul key={idx} className="space-y-2.5 my-4 pl-2">
          {items.map((item, itemIdx) => {
            const cleanItem = item.replace(/^- /, "");
            return (
              <li key={itemIdx} className="flex items-start gap-2.5 blog-body-text text-sm sm:text-base leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#05BB8D] shrink-0 mt-2.5" />
                <span>{renderTextWithInternalLinks(cleanItem)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <p key={idx} className="blog-body-text text-sm sm:text-base leading-relaxed font-normal">
        {renderTextWithInternalLinks(para)}
      </p>
    );
  };

  const renderTextWithInternalLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const label = match[1];
      const link = match[2];

      parts.push(
        <button
          key={match.index}
          onClick={(e) => {
            e.preventDefault();
            if (link.startsWith("/services")) {
              onPageChange?.("services");
            } else if (link.startsWith("/portfolio")) {
              onPageChange?.("portfolio");
            } else if (link.startsWith("/booking")) {
              onBookCall();
            } else {
              onPageChange?.("home");
            }
          }}
          className="blog-link-text underline font-semibold transition-colors cursor-pointer inline-flex items-center gap-0.5"
        >
          <span>{label}</span>
          <ExternalLink size={11} className="inline opacity-70" />
        </button>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
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
                <div className="inline-flex items-center space-x-1.5 blog-badge-pill font-mono text-[10px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
                  <Sparkles size={12} className="text-[#05BB8D]" />
                  <span>VPRIME INSIGHTS & STRATEGY</span>
                </div>
                <h1 className="blog-heading-primary text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
                  Actionable guides to modern web engineering & growth.
                </h1>
                <p className="blog-muted-text text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
                  Tested strategies, conversion rate optimization checklists, and technical frameworks designed to turn your website into a predictable revenue asset.
                </p>
              </div>

              {/* ================= FEATURED ARTICLE HERO CARD ================= */}
              {featuredArticle && (
                <div 
                  id="featured-article-card"
                  onClick={() => handlePostClick(featuredArticle)}
                  className="blog-hero-card rounded-3xl p-6 sm:p-10 border transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group"
                >
                  <div className="lg:col-span-7 space-y-5 relative z-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-[#05BB8D] text-[#0F121D] font-mono text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest shadow-xs">
                        FEATURED ARTICLE
                      </span>
                      <span className="blog-badge-pill font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-md">
                        {featuredArticle.category}
                      </span>
                      <span className="blog-muted-text">•</span>
                      <span className="flex items-center space-x-1 text-xs font-mono blog-muted-text">
                        <Calendar size={12} className="text-[#05BB8D]" />
                        <span>{featuredArticle.date}</span>
                      </span>
                      <span className="blog-muted-text">•</span>
                      <span className="flex items-center space-x-1 text-xs font-mono blog-muted-text">
                        <Clock size={12} className="text-[#05BB8D]" />
                        <span>{featuredArticle.readTime}</span>
                      </span>
                    </div>

                    <h2 className="blog-heading-primary text-2xl sm:text-3xl md:text-4xl font-display font-black group-hover:text-brand transition-colors tracking-tight leading-tight">
                      {featuredArticle.title}
                    </h2>

                    <p className="blog-body-text text-sm sm:text-base leading-relaxed line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t blog-border-color">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={featuredArticle.author.avatar} 
                          alt={featuredArticle.author.name} 
                          className="w-10 h-10 rounded-full object-cover border border-[#05BB8D]/40" 
                          referrerPolicy="no-referrer" 
                        />
                        <div>
                          <div className="blog-heading-primary text-xs font-bold">{featuredArticle.author.name}</div>
                          <div className="blog-muted-text text-[10px] font-mono">{featuredArticle.author.role}</div>
                        </div>
                      </div>

                      <button
                        className="blog-primary-btn inline-flex items-center space-x-2 font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative z-10 aspect-video lg:aspect-square rounded-2xl overflow-hidden border blog-border-color shadow-md">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                </div>
              )}

              {/* Filtering & Search Bar row */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b blog-border-color pb-8 pt-4">
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 self-start md:self-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl font-display text-xs font-bold tracking-wider transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "blog-primary-btn shadow-xs"
                          : "blog-card-subtle-surface blog-muted-text hover:text-brand border blog-border-color"
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Search Input widget */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search articles, topics, tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="blog-input-field blog-border-color w-full text-xs font-medium pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                  />
                  <Search size={14} className="blog-muted-text absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left side: Articles list */}
                <div className="lg:col-span-8 space-y-8">
                  
                  <div className="grid grid-cols-1 gap-8">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.id}
                        id={`blog-card-${post.slug}`}
                        onClick={() => handlePostClick(post)}
                        className="blog-card-surface border blog-border-color rounded-3xl overflow-hidden group hover:border-[#05BB8D] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 md:grid-cols-12 items-stretch"
                      >
                        <div className="aspect-video md:aspect-auto md:col-span-5 bg-slate-100 overflow-hidden relative min-h-[220px]">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute top-3 left-3">
                            <span className="blog-badge-pill text-[10px] font-mono tracking-wider uppercase font-black px-2.5 py-1 rounded-md shadow-xs">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-[11px] font-mono blog-muted-text font-semibold uppercase">
                              <span className="flex items-center space-x-1">
                                <Calendar size={11} className="text-[#05BB8D]" />
                                <span>{post.date}</span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Clock size={11} className="text-[#05BB8D]" />
                                <span>{post.readTime}</span>
                              </span>
                            </div>

                            <h3 className="blog-heading-primary text-lg md:text-xl font-display font-bold group-hover:text-brand transition-colors tracking-tight leading-snug">
                              {post.title}
                            </h3>

                            <p className="blog-body-text text-xs sm:text-sm leading-relaxed font-normal line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t blog-border-color">
                            <div className="flex items-center space-x-2.5">
                              <img 
                                src={post.author.avatar} 
                                alt={post.author.name} 
                                className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#05BB8D]/30" 
                                referrerPolicy="no-referrer" 
                              />
                              <div className="blog-heading-primary text-xs font-bold">{post.author.name}</div>
                            </div>
                            <span className="blog-link-text text-xs font-mono font-bold flex items-center space-x-1 transition-colors">
                              <span>READ ARTICLE</span>
                              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                    
                    {filteredPosts.length === 0 && (
                      <div className="blog-card-subtle-surface border border-dashed blog-border-color text-center py-16 rounded-3xl space-y-3">
                        <FolderOpen size={32} className="blog-muted-text mx-auto" />
                        <p className="blog-heading-primary text-base font-semibold">No articles matched your criteria.</p>
                        <p className="blog-muted-text text-xs">Try adjusting your category filter or search keywords.</p>
                        <button
                          onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                          className="blog-primary-btn px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Sidebar (Popular posts, Newsletter) */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* Popular posts */}
                  <div className="blog-card-subtle-surface border blog-border-color rounded-3xl p-6 space-y-5">
                    <h4 className="blog-muted-text text-xs font-mono tracking-widest uppercase font-bold border-b blog-border-color pb-3">
                      FEATURED & POPULAR GUIDES
                    </h4>
                    <div className="space-y-4">
                      {popularPosts.map((post) => (
                        <div 
                          key={post.id} 
                          onClick={() => handlePostClick(post)}
                          className="flex items-center space-x-3.5 group cursor-pointer"
                        >
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border blog-border-color" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="space-y-1 min-w-0">
                            <span className="blog-badge-pill text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded">{post.category}</span>
                            <h5 className="blog-heading-primary text-xs font-display font-bold group-hover:text-brand transition-colors leading-snug line-clamp-2">
                              {post.title}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar Newsletter Capture Form */}
                  <div className="blog-card-subtle-surface border blog-border-color rounded-3xl p-7 relative overflow-hidden space-y-5 shadow-sm">
                    <div className="space-y-2 relative z-10">
                      <div className="w-10 h-10 rounded-xl blog-badge-pill flex items-center justify-center">
                        <Mail size={18} className="text-[#05BB8D]" />
                      </div>
                      <h4 className="blog-heading-primary font-display font-black text-lg">Vprime Growth Playbook</h4>
                      <p className="blog-muted-text text-xs leading-relaxed">
                        Join 8,000+ founders and digital leaders. Receive bi-weekly actionable engineering and conversion optimization blueprints.
                      </p>
                    </div>

                    {!subscribed ? (
                      <form onSubmit={handleSubscribe} className="space-y-3 relative z-10">
                        <input
                          type="email"
                          required
                          placeholder="founder@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="blog-input-field blog-border-color w-full text-xs px-4 py-3 rounded-xl focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="blog-primary-btn w-full flex items-center justify-center space-x-2 font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl cursor-pointer shadow-xs"
                        >
                          <span>Subscribe to Insights</span>
                          <ArrowRight size={13} />
                        </button>
                      </form>
                    ) : (
                      <div className="blog-badge-pill p-4 rounded-xl flex items-start space-x-3 relative z-10">
                        <CheckCircle size={18} className="text-[#05BB8D] shrink-0 mt-0.5" />
                        <span className="text-xs leading-normal font-medium">
                          You're subscribed to Vprime Insights! We've sent your free website audit blueprint.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quick Discovery CTA Box */}
                  <div className="blog-card-surface border blog-border-color rounded-3xl p-6 text-center space-y-4 shadow-xs">
                    <h5 className="blog-heading-primary font-display font-bold text-sm">
                      Need a Website for Your Business?
                    </h5>
                    <p className="blog-muted-text text-xs leading-relaxed">
                      We craft custom websites engineered for speed, search visibility, and maximum conversions.
                    </p>
                    <button
                      onClick={onBookCall}
                      className="blog-secondary-btn w-full inline-flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider py-3 rounded-xl border cursor-pointer"
                    >
                      <span>Book Free Strategy Call</span>
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          ) : (
            /* ================= FULL BLOG POST READER VIEW ================= */
            <motion.div
              key="reader-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10 max-w-4xl mx-auto relative"
            >
              {/* Fixed Top Screen Reading Progress Line */}
              <div
                style={{ width: `${readingProgress}%` }}
                className="fixed top-0 left-0 h-[4px] bg-[#05BB8D] z-[130] pointer-events-none shadow-[0_1px_12px_rgba(5,187,141,0.9)] transition-all duration-150 ease-out"
              />

              {/* BREADCRUMB NAVIGATION */}
              <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono blog-muted-text overflow-x-auto pb-2">
                <button 
                  onClick={handleBreadcrumbHome}
                  className="hover:text-brand transition-colors cursor-pointer shrink-0 font-medium"
                >
                  Home
                </button>
                <ChevronRight size={13} className="shrink-0 opacity-60" />
                <button 
                  onClick={handleBackToGrid}
                  className="hover:text-brand transition-colors cursor-pointer shrink-0 font-medium"
                >
                  Blog
                </button>
                <ChevronRight size={13} className="shrink-0 opacity-60" />
                <span className="blog-heading-primary font-semibold truncate max-w-xs sm:max-w-md">
                  {selectedPost.title}
                </span>
              </nav>

              {/* Floating Sticky Reading Header & Progress Tracker */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-20 z-30 blog-card-surface border blog-border-color backdrop-blur-md p-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl blog-badge-pill flex items-center justify-center shrink-0">
                    <BookOpen size={16} className="text-[#05BB8D]" />
                  </div>
                  <div className="min-w-0 hidden sm:block">
                    <p className="text-[9px] font-mono blog-muted-text uppercase tracking-widest font-semibold">READING ARTICLE</p>
                    <h4 className="blog-heading-primary text-xs font-display font-bold truncate max-w-xs md:max-w-md">{selectedPost.title}</h4>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  {/* Share button */}
                  <button
                    onClick={handleCopyLink}
                    className="blog-secondary-btn px-2.5 py-1.5 rounded-xl cursor-pointer text-xs font-mono flex items-center space-x-1.5 border"
                    title="Copy Article Link"
                  >
                    {copiedLink ? <CheckCircle size={13} className="text-[#05BB8D]" /> : <Copy size={13} />}
                    <span className="hidden md:inline">{copiedLink ? "Copied!" : "Share"}</span>
                  </button>

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
                    alt={`Hero illustration for ${selectedPost.title}`} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>

                {/* Formatted body prose */}
                <div className="space-y-6 pt-4 leading-relaxed">
                  {selectedPost.content.split("\n\n").map((para, i) => renderFormattedParagraph(para, i))}
                </div>

                {/* ================= BEAUTIFULLY STYLED FAQ SECTION ================= */}
                {selectedPost.faq && selectedPost.faq.length > 0 && (
                  <div className="my-12 blog-card-subtle-surface border blog-border-color rounded-3xl p-6 sm:p-10 space-y-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center space-x-1.5 blog-badge-pill font-mono text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                        <HelpCircle size={12} className="text-[#05BB8D]" />
                        <span>FREQUENTLY ASKED QUESTIONS</span>
                      </div>
                      <h3 className="blog-heading-primary text-xl sm:text-2xl font-display font-black tracking-tight">
                        Small Business Website Questions Answered
                      </h3>
                      <p className="blog-muted-text text-xs sm:text-sm">
                        Common questions founders ask us about website investments, development timelines, and search rankings in 2026.
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
                )}

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
                <div className="blog-card-subtle-surface border blog-border-color rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
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

                {/* ================= STRATEGIC BOTTOM CTA SECTION ================= */}
                <div className="blog-card-surface border blog-border-color rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
                  <div className="inline-flex items-center space-x-2 blog-badge-pill font-mono text-[10px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider relative z-10">
                    <Sparkles size={12} className="text-[#05BB8D]" />
                    <span>TAKE ACTION TODAY</span>
                  </div>

                  <h3 className="blog-heading-primary text-2xl sm:text-3xl md:text-4xl font-display font-black max-w-2xl mx-auto tracking-tight leading-tight relative z-10">
                    Ready to Build a Website That Works for Your Business?
                  </h3>

                  <p className="blog-body-text text-xs sm:text-sm max-w-xl mx-auto leading-relaxed relative z-10">
                    Your website should do more than look good. Let's create a digital experience that builds trust, supports your growth, and makes it easier for customers to reach you.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 relative z-10">
                    <button
                      onClick={onBookCall}
                      className="blog-primary-btn inline-flex items-center justify-center space-x-2 font-sans text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-xl shadow-md cursor-pointer"
                    >
                      <span>Let's Discuss Your Project</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={() => {
                        if (onPageChange) {
                          onPageChange("portfolio");
                        }
                      }}
                      className="blog-secondary-btn inline-flex items-center justify-center space-x-2 font-sans text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-xl border cursor-pointer"
                    >
                      <span>Explore Our Work</span>
                    </button>
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
