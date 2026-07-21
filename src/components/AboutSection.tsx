import { useState } from "react";
import { 
  History, 
  Target, 
  Eye, 
  Heart, 
  CheckCircle, 
  Linkedin, 
  Twitter, 
  Github, 
  TrendingUp,
  Award,
  Clock,
  ShieldAlert
} from "lucide-react";
import { motion } from "motion/react";
import { teamData } from "../data";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"story" | "timeline" | "values">("story");

  const timelineEvents = [
    { year: "2021", title: "The Inception", desc: "VprimeDigitalz founded by Vikram Malhotra to bridge the gap between creative artistry and scientific conversion." },
    { year: "2022", title: "Going Full-Stack", desc: "Added custom Webflow and bespoke React/TypeScript development to our core design capabilities." },
    { year: "2023", title: "Scaling Up Traffic", desc: "Expanded into high-velocity SEO and paid social channels, scaling 50+ brands globally." },
    { year: "2024", title: "Award Curation", desc: "Opened secondary operations in San Francisco and scored our first CSS Design nominations." },
    { year: "2025", title: "$45M Milestone", desc: "Tracked revenue generated directly for our active agency clients surpassed $45 Million." },
    { year: "2026", title: "Digital Authority", desc: "Recognized as a leading premium boutique digital agency crafting top-tier global sites." }
  ];

  const coreValues = [
    { title: "Surgical Attention to Detail", desc: "We review tracking, spacing, line-height, and padding pixel-by-pixel. Average is our enemy." },
    { title: "Continuous Innovation", desc: "We leverage modern front-end frameworks, high-speed CDN configurations, and conversion theories." },
    { title: "Durable Trust & Transparency", desc: "We maintain shared Slack workspaces, instant Loom summaries, and open, clear project boards." },
    { title: "Results-Backed Strategy", desc: "We do not believe in design that just looks pretty. If it doesn't boost revenue, we redesign it." }
  ];

  const whyChooseUs = [
    "No pre-made templates or visual bloat — 100% bespoke craft.",
    "Integrated elite team of design, development, and SEO experts.",
    "Direct contact with Creative & Tech Directors — no account manager layers.",
    "Data-driven design backed by behavioral psychology and CRO tests.",
    "Uptime and performance guaranteed with high-speed green PageSpeeds.",
    "Highly collaborative, weekly video checkins, and full asset ownership."
  ];

  return (
    <section id="about-section" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-radial-at-b from-slate-50 via-white to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-24">
        
        {/* About Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-slate-100 pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
              <span>AGENCY MANIFESTO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
              A premium digital agency built on visual prestige and performance.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We help ambitious brands conquer their markets by engineering gorgeous custom websites, high-authority organic SEO campaigns, and bulletproof conversion engines.
            </p>
          </div>
        </div>

        {/* Story, Timeline and Values Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Navigation Tabs */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-slate-100">
            {[
              { id: "story", label: "OUR STORY", icon: <History size={16} /> },
              { id: "timeline", label: "COMPANY TIMELINE", icon: <Clock size={16} /> },
              { id: "values", label: "OUR CORE VALUES", icon: <Heart size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-3 px-5 py-3.5 rounded-xl font-display text-xs font-bold tracking-widest text-left whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-brand text-white shadow-md shadow-brand/10"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="lg:col-span-9 min-h-[300px]">
            {activeTab === "story" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-bold text-slate-900">Bridging the Gap</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      VprimeDigitalz was founded after realizing a painful disconnect in the digital sector. Brands were forced to choose between creative agencies (whose sites looked gorgeous but loaded slow and converted poorly) or dry engineering shops (whose platforms were technically secure but visually sterile and generic).
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      We assembled an elite team of artistic designers and front-end developers under one roof to build digital products that excel in both visual mastery and speed metrics.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 space-y-4">
                      <div className="flex items-center space-x-3 text-brand">
                        <Target size={20} />
                        <h4 className="font-display font-bold text-slate-900 text-sm">Our Mission</h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        To help high-growth businesses dominate online through stunning, custom-designed interfaces, high-authority organic SEO infrastructure, and conversion rate optimizations.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 space-y-4">
                      <div className="flex items-center space-x-3 text-brand">
                        <Eye size={20} />
                        <h4 className="font-display font-bold text-slate-900 text-sm">Our Vision</h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        To build the internet's most recognizable, high-performance web solutions, proving that visual art and technical engineering can co-exist harmoniously.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "timeline" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative border-l border-slate-100 pl-6 space-y-8"
              >
                {timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Event Dot */}
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-brand group-hover:bg-brand transition-colors duration-300" />
                    
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-brand">{evt.year}</span>
                      <h4 className="font-display font-bold text-slate-900 text-sm">{evt.title}</h4>
                      <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">{evt.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "values" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {coreValues.map((val, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100/50 p-6 rounded-2xl space-y-3">
                    <div className="text-xs font-mono font-bold text-brand">VALUE 0{idx + 1}</div>
                    <h4 className="font-display font-bold text-slate-900 text-base">{val.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Why Choose Us & Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          
          {/* Achievements Counters */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
              Agency Achievements
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our commitment to delivering visual distinction and actual financial growth for our partners is backed by solid numbers.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "120+", desc: "Active brands scaled globally" },
                { value: "98%", desc: "Direct customer satisfaction" },
                { value: "$45M+", desc: "Tracked customer revenue" },
                { value: "14", desc: "Design & speed nominations" }
              ].map((achievement, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100/50 p-5 rounded-xl space-y-1">
                  <div className="text-2xl font-display font-bold text-brand">{achievement.value}</div>
                  <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide leading-tight">
                    {achievement.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Checklist */}
          <div className="lg:col-span-7 bg-brand/[0.02] border border-brand/5 p-8 md:p-10 rounded-3xl space-y-6">
            <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
              Why Choose VprimeDigitalz?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We replace long, sterile email threads with active communication, real metrics tracking, and complete files handoff.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyChooseUs.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle size={15} className="text-brand shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700 leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Meet the Elite Team Grid */}
        <div className="space-y-12 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Meet the Creative Minds
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              An integrated boutique team of world-class artists, full-stack engineers, and conversion rate strategists directing your project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member) => (
              <div 
                key={member.id} 
                className="group bg-white border border-slate-100 hover:border-brand/10 p-5 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 text-center"
              >
                {/* Photo with subtle hover expansion */}
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 mb-4 relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  
                  {/* Social Handles overlay */}
                  <div className="absolute inset-0 bg-brand/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3.5">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-white hover:text-slate-200 transition-colors">
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-white hover:text-slate-200 transition-colors">
                        <Twitter size={18} />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="text-white hover:text-slate-200 transition-colors">
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-bold text-slate-900 text-sm">{member.name}</h4>
                  <p className="text-[11px] font-mono tracking-wider text-brand uppercase font-bold">{member.role}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                    {member.bio}
                  </p>
                  
                  {/* Specialties tags */}
                  <div className="flex flex-wrap gap-1 justify-center pt-2">
                    {member.specialties.map(spec => (
                      <span 
                        key={spec} 
                        className="bg-slate-50 border border-slate-100 text-[9px] font-semibold text-slate-500 px-2 py-0.5 rounded-md"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
