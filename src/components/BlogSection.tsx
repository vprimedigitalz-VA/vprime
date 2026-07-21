import { useState, FormEvent } from "react";
import { Search, Calendar, Clock, ArrowRight, ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { blogPostsData } from "../data";
import { BlogPost } from "../types";

interface BlogSectionProps {
  onBookCall: () => void;
}

export default function BlogSection({ onBookCall }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Newsletter state
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const categories = ["All", "Case Study", "Design", "SEO"];

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToGrid = () => {
    setSelectedPost(null);
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
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredPost = blogPostsData[0];
  const popularPosts = blogPostsData.slice(1, 3);

  return (
    <section id="blog-section" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-radial-at-t from-slate-50 via-white to-white pointer-events-none" />

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
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                  <span>VPRIME INSIGHTS</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
                  Deep-dives into scaling & custom engineering.
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  We write technical checklists, conversion guidelines, and design strategies designed to optimize your digital systems.
                </p>
              </div>

              {/* Filtering & Search Bar row */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8 pt-4">
                
                {/* Categories */}
                <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg font-display text-[11px] font-bold tracking-widest transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-brand text-white"
                          : "bg-slate-50 text-slate-500 hover:text-slate-800"
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
                    placeholder="Search articles, tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 text-xs font-medium pl-10 pr-4 py-3.5 rounded-xl focus:outline-hidden focus:border-brand/40 focus:bg-white transition-all"
                  />
                  <Search size={14} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left side: Featured & filtered Articles list */}
                <div className="lg:col-span-8 space-y-12">
                  
                  {/* Default Featured Banner if category is All and no active search query */}
                  {!searchQuery && selectedCategory === "All" && (
                    <div 
                      className="group bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden hover:border-brand/20 shadow-xs hover:shadow-2xl hover:shadow-slate-100/50 transition-all duration-500 cursor-pointer grid grid-cols-1 md:grid-cols-12"
                      onClick={() => handlePostClick(featuredPost)}
                    >
                      <div className="aspect-video md:aspect-auto md:col-span-5 bg-slate-100 overflow-hidden relative">
                        <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute top-4 left-4 bg-brand text-white text-[9px] font-mono px-2.5 py-1 rounded-md font-bold uppercase tracking-wider shadow-md">
                          FEATURED
                        </div>
                      </div>

                      <div className="p-8 md:col-span-7 flex flex-col justify-between space-y-6">
                        <div className="space-y-3.5">
                          <span className="text-[10px] font-mono tracking-widest text-brand uppercase font-bold">
                            {featuredPost.category}
                          </span>
                          <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 group-hover:text-brand transition-colors tracking-tight leading-tight">
                            {featuredPost.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            {featuredPost.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                          <div className="flex items-center space-x-3">
                            <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-8 h-8 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                            <div>
                              <div className="text-xs font-bold text-slate-800">{featuredPost.author.name}</div>
                              <div className="text-[9px] font-mono text-slate-400">{featuredPost.author.role}</div>
                            </div>
                          </div>
                          
                          <span className="text-[10px] font-mono text-slate-400">{featuredPost.date}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Standard Blog Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        id={`blog-card-${post.id}`}
                        onClick={() => handlePostClick(post)}
                        className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-brand/20 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="aspect-video relative overflow-hidden bg-slate-50">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" referrerPolicy="no-referrer" />
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-slate-800 text-[9px] font-mono px-2.5 py-1 rounded-md font-bold uppercase tracking-wider shadow-xs">
                              {post.category}
                            </span>
                          </div>

                          <div className="p-6 space-y-3">
                            <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 font-semibold uppercase">
                              <span className="flex items-center space-x-1">
                                <Calendar size={10} className="text-brand" />
                                <span>{post.date}</span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Clock size={10} className="text-brand" />
                                <span>{post.readTime}</span>
                              </span>
                            </div>

                            <h4 className="font-display font-bold text-slate-900 group-hover:text-brand transition-colors text-base tracking-tight leading-snug">
                              {post.title}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer Author summary */}
                        <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center space-x-3.5">
                          <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                          <div>
                            <div className="text-xs font-bold text-slate-800">{post.author.name}</div>
                            <div className="text-[9px] font-mono text-slate-400">{post.author.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredPosts.length === 0 && (
                      <div className="col-span-2 text-center py-12 border border-dashed border-slate-200 rounded-2xl space-y-2">
                        <p className="text-sm font-semibold text-slate-600">No articles matched your criteria.</p>
                        <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Secondary Widgets sidebar (Popular posts, Newsletter) */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* Popular posts */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-5">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold border-b border-slate-100 pb-2">
                      POPULAR ARTICLES
                    </h4>
                    <div className="space-y-4">
                      {popularPosts.map((post) => (
                        <div 
                          key={post.id} 
                          onClick={() => handlePostClick(post)}
                          className="flex items-center space-x-3 group cursor-pointer"
                        >
                          <img src={post.image} alt={post.title} className="w-12 h-12 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono text-brand uppercase font-bold">{post.category}</span>
                            <h5 className="text-xs font-display font-bold text-slate-800 group-hover:text-brand transition-colors leading-tight line-clamp-1">
                              {post.title}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar Newsletter Capture Form */}
                  <div className="bg-brand text-white rounded-2xl p-6.5 relative overflow-hidden space-y-5 shadow-lg shadow-brand/5">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />
                    
                    <div className="space-y-1 relative z-10">
                      <Mail size={24} className="text-white/90" />
                      <h4 className="font-display font-extrabold text-white text-base">Insights to Your Inbox</h4>
                      <p className="text-white/80 text-[11px] leading-relaxed">
                        Join 8,000+ founders and digital leaders. Receive a weekly 5-minute technical growth playbook.
                      </p>
                    </div>

                    {!subscribed ? (
                      <form onSubmit={handleSubscribe} className="space-y-3.5 relative z-10">
                        <input
                          type="email"
                          required
                          placeholder="your.email@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/10 border border-white/25 text-white placeholder-white/55 text-xs px-3.5 py-3 rounded-lg focus:outline-hidden focus:border-white/50 focus:bg-white/15"
                        />
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center space-x-2 bg-white text-brand hover:bg-slate-50 font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-lg transition-all"
                        >
                          <span>Subscribe Playbook</span>
                          <ArrowRight size={12} />
                        </button>
                      </form>
                    ) : (
                      <div className="bg-white/10 border border-white/10 p-4 rounded-xl flex items-start space-x-3 relative z-10">
                        <CheckCircle size={16} className="text-white shrink-0 mt-0.5" />
                        <span className="text-xs text-white leading-normal">
                          Awesome! You're subscribed to Vprime Insights. Check your inbox for the sitemap blueprint.
                        </span>
                      </div>
                    )}
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
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12 max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <button
                id="back-to-index-btn"
                onClick={handleBackToGrid}
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider text-slate-400 hover:text-brand font-semibold uppercase cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>BACK TO ARTICLES LIST</span>
              </button>

              {/* Title Header */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 font-semibold uppercase">
                  <span className="bg-brand/5 border border-brand/10 text-brand px-2.5 py-1 rounded-md font-bold">
                    {selectedPost.category}
                  </span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
                  {selectedPost.title}
                </h1>

                {/* Author profile */}
                <div className="flex items-center space-x-4 border-y border-slate-100 py-4">
                  <img src={selectedPost.author.avatar} alt={selectedPost.author.name} className="w-10 h-10 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{selectedPost.author.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{selectedPost.author.role} at VprimeDigitalz</div>
                  </div>
                </div>
              </div>

              {/* Post Thumbnail */}
              <div className="aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              {/* Formatted body prose */}
              <div className="prose prose-slate max-w-none text-slate-600 text-xs sm:text-sm leading-relaxed space-y-6 pt-4">
                {selectedPost.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("###")) {
                    return (
                      <h3 key={i} className="text-lg font-display font-bold text-slate-900 pt-4 pb-1">
                        {para.replace("###", "").trim()}
                      </h3>
                    );
                  }
                  return (
                    <p key={i} className="font-normal">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Tag row */}
              <div className="flex items-center space-x-2 pt-6 border-t border-slate-100">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">ARTICLES TAGS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-500 px-2.5 py-1 rounded-md"
                    >
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related CTA Banner */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 text-center space-y-6 relative overflow-hidden">
                <h4 className="text-xl font-display font-bold text-slate-900">
                  Enjoyed this technical playbook?
                </h4>
                <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
                  We implement these exact SEO optimizations and conversion designs for our active clients. Learn how we can build a high-performance content engine for your business.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={onBookCall}
                    className="inline-flex items-center space-x-2 bg-brand hover:bg-brand-dark text-white font-sans text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <span>SCHEDULE FREE GROWTH CONSULTATION</span>
                    <ArrowRight size={12} />
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
