import { useState, ChangeEvent, FormEvent } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle,
  Linkedin,
  Twitter,
  Instagram
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { globalFaqs } from "../data";

interface ContactSectionProps {
  onBookCall: () => void;
}

export default function ContactSection({ onBookCall }: ContactSectionProps) {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$5k - $10k",
    scope: "Website Design",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const budgets = ["Under $5k", "$5k - $10k", "$10k - $25k", "$25k+"];
  const scopes = [
    "Website Design",
    "Webflow/WordPress Dev",
    "Shopify E-Commerce",
    "UI/UX Design",
    "SEO Optimization",
    "Paid Ad Marketing"
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "$5k - $10k",
        scope: "Website Design",
        message: ""
      });
    }, 1500);
  };

  return (
    <section id="contact-section" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-radial-at-b from-slate-50 via-white to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-24">
        
        {/* Page title header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
            Let's build your digital authority.
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Have a project in mind? Submit an inquiry below or schedule a direct video consultation with Vikram Malhotra.
          </p>
        </div>

        {/* Form and info coordinates row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left column: Contact Info, Calendly & Custom vector map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick coordinates */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-bold text-slate-900">Direct Contacts</h3>
              <div className="space-y-3">
                <a href="mailto:vprimedigitalz@gmail.com" className="flex items-center space-x-3.5 text-xs text-slate-600 hover:text-brand transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                    <Mail size={14} />
                  </div>
                  <span className="font-semibold">vprimedigitalz@gmail.com</span>
                </a>
                <div className="flex items-center space-x-3.5 text-xs text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                    <Phone size={14} />
                  </div>
                  <span className="font-semibold">+1 (415) 340-2498</span>
                </div>
                <div className="flex items-center space-x-3.5 text-xs text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                    <MapPin size={14} />
                  </div>
                  <span className="font-semibold">San Francisco, CA & London, UK</span>
                </div>
              </div>
            </div>

            {/* Direct Calendly Scheduler trigger */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 text-brand">
                <Calendar size={18} />
                <h4 className="font-display font-bold text-slate-950 text-sm">Direct Operations Calendar</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Skip the back-and-forth emails. Pick a 30-minute slot on Vikram's calendar to talk design, scope, and goals.
              </p>
              <button
                onClick={onBookCall}
                className="w-full flex items-center justify-center space-x-2 bg-brand hover:bg-brand-dark text-white font-sans text-xs font-bold uppercase tracking-wider py-4 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Book 30-Min Discovery</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Styled vector map placeholder matching our branding */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-100 shadow-xs bg-slate-50 flex items-center justify-center">
              {/* Electric blue abstract graphic representation representing coordinates */}
              <div className="absolute inset-0 bg-[radial-gradient(#06cf9c15_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-75" />
              <div className="absolute w-24 h-24 rounded-full bg-brand/5 blur-xl top-1/2 left-1/4" />
              <div className="absolute w-16 h-16 rounded-full bg-brand/5 blur-lg top-1/3 right-1/4" />
              
              <div className="relative text-center z-10 space-y-1">
                <MapPin size={24} className="text-brand mx-auto animate-bounce" />
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">GLOBALLY ACTIVE TEAM</span>
                <p className="text-xs font-bold text-slate-800">LONDON | SAN FRANCISCO</p>
              </div>
            </div>

          </div>

          {/* Right column: Interactive Inquiry Form with custom scoping */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100/50 rounded-3xl p-8 md:p-10 shadow-xs relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="inquiry-form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">YOUR NAME *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-white border border-slate-100 text-xs px-4 py-3.5 rounded-xl focus:outline-hidden focus:border-brand/40"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="w-full bg-white border border-slate-100 text-xs px-4 py-3.5 rounded-xl focus:outline-hidden focus:border-brand/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Scope Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">PROJECT SCOPE</label>
                      <select
                        name="scope"
                        value={formData.scope}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-100 text-xs px-4 py-3.5 rounded-xl focus:outline-hidden focus:border-brand/40"
                      >
                        {scopes.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Budget selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">ESTIMATED BUDGET</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-100 text-xs px-4 py-3.5 rounded-xl focus:outline-hidden focus:border-brand/40"
                      >
                        {budgets.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">PROJECT DETAILS *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your brand, current roadblocks, and primary business goals..."
                      className="w-full bg-white border border-slate-100 text-xs px-4 py-3.5 rounded-xl focus:outline-hidden focus:border-brand/40 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 bg-brand hover:bg-brand-dark text-white font-sans text-xs font-bold uppercase tracking-wider py-4.5 rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{isSubmitting ? "SENDING INQUIRY..." : "SEND INQUIRY"}</span>
                    <ArrowRight size={14} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <CheckCircle size={44} className="text-brand mx-auto" />
                  <h3 className="font-display font-extrabold text-slate-900 text-xl">Inquiry Received!</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Awesome! Your details have been routed directly to Vikram Malhotra. We will review your website sitemap details and reach out in under 12 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-mono tracking-wider font-semibold text-brand uppercase underline cursor-pointer"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Global Agency FAQs Accordion section */}
        <div className="space-y-8 border-t border-slate-100 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <HelpCircle size={32} className="text-brand mx-auto" />
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">Find answers to general questions regarding collaboration pipelines and budgets.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {globalFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-100 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-display font-bold text-sm text-slate-800 hover:text-brand transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-400 transition-transform duration-300 ${activeFaqIdx === idx ? "rotate-180 text-brand" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaqIdx === idx && (
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

      </div>
    </section>
  );
}
