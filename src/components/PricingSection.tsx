import { useState } from "react";
import { Check, HelpCircle, X, ShieldCheck, ArrowRight, Star } from "lucide-react";
import { pricingPlans } from "../data";

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  // Calculate price discount for annual (let's say 20% off)
  const getPrice = (priceStr: string) => {
    if (billingPeriod === "monthly") return priceStr;
    const numeric = parseInt(priceStr.replace("$", "").replace(",", ""));
    const discounted = Math.round((numeric * 0.8) / 10) * 10;
    return `$${discounted.toLocaleString()}`;
  };

  const featureComparison = [
    { name: "High-Fidelity Figma Designs", starter: true, pro: true, enterprise: true },
    { name: "Responsive Layout Codes", starter: true, pro: true, enterprise: true },
    { name: "Analytics & Tracking Setup", starter: true, pro: true, enterprise: true },
    { name: "Custom micro-animations", starter: "Basic", pro: "Advanced", enterprise: "Immersive 3D/Fluid" },
    { name: "Search Engine Optimization (SEO)", starter: "Basic Meta Settings", pro: "Full On-Page & Speed Checklist", enterprise: "Competitor content roadmap + backlinks" },
    { name: "Dynamic CMS Integration", starter: false, pro: "Up to 3 collections", enterprise: "Infinite CMS structures" },
    { name: "A/B Testing & CRO", starter: false, pro: false, enterprise: true },
    { name: "Launch Support & Backups", starter: "1 Month", pro: "3 Months", enterprise: "12 Months VIP Support" },
    { name: "Custom Logo & Branding Kit", starter: false, pro: false, enterprise: true }
  ];

  return (
    <section id="pricing-section" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-radial-at-t from-slate-50 via-white to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            <span>TRANSPARENT VALUE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
            Elite digital craft, transparent pricing.
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Choose a level matching your exact operational targets. No hidden setup fees, complete source file delivery.
          </p>

          {/* Billing Toggle Switch */}
          <div className="flex items-center justify-center space-x-3 pt-4">
            <span className={`text-xs font-mono font-bold ${billingPeriod === "monthly" ? "text-slate-900" : "text-slate-400"}`}>
              STANDARD RATE
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              className="w-12 h-6.5 bg-slate-100 rounded-full p-1 flex items-center relative transition-colors duration-300 border border-slate-200 cursor-pointer"
              aria-label="Toggle Billing Period"
            >
              <div 
                className={`w-4.5 h-4.5 rounded-full bg-brand shadow-xs transition-transform duration-300 ${
                  billingPeriod === "annual" ? "translate-x-5.5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-mono font-bold flex items-center space-x-1.5 ${billingPeriod === "annual" ? "text-brand" : "text-slate-400"}`}>
              <span>ANNUAL CONTRACTS</span>
              <span className="bg-brand/10 border border-brand/20 text-brand text-[9px] px-1.5 py-0.5 rounded-md font-extrabold">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white border rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-full ${
                plan.popular
                  ? "border-brand shadow-xl shadow-brand/5 scale-100 lg:scale-[1.03] z-10"
                  : "border-slate-100 shadow-xs hover:border-slate-200 hover:shadow-lg transition-all duration-300"
              }`}
            >
              {/* Popularity badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-brand text-white text-[9px] font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-xs flex items-center space-x-1">
                  <Star size={10} fill="currentColor" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-slate-900 text-lg">{plan.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal min-h-[48px]">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="border-b border-slate-50 pb-6 flex items-baseline space-x-1.5">
                  <span className="text-4xl md:text-5xl font-display font-black text-slate-950 tracking-tight">
                    {getPrice(plan.price)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold uppercase">
                    / {plan.period}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3.5">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">FEATURES INCLUDED</span>
                  <ul className="space-y-3">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs font-semibold text-slate-600">
                        <Check size={14} className="text-brand shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="pt-8">
                <a
                  href="https://calendly.com/vprimedigitalz/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center space-x-2 font-sans text-xs font-semibold uppercase tracking-wider py-4 rounded-xl shadow-xs transition-all duration-300 ${
                    plan.popular
                      ? "bg-brand text-white hover:bg-brand-dark hover:shadow-md hover:shadow-brand/10"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-100"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Comprehensive Feature Comparison Matrix Table */}
        <div className="max-w-5xl mx-auto pt-12 space-y-6 hidden md:block">
          <div className="text-center">
            <h3 className="text-lg font-display font-bold text-slate-900">Side-by-Side Comparison</h3>
            <p className="text-xs text-slate-400">Review precise design, CMS, SEO, and support capabilities of each tier.</p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <th className="p-5 w-2/5">CAPABILITIES</th>
                  <th className="p-5 text-center">STARTER</th>
                  <th className="p-5 text-center">PRO</th>
                  <th className="p-5 text-center text-brand">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-600">
                {featureComparison.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                    <td className="p-5 font-semibold text-slate-700">{row.name}</td>
                    
                    {/* Starter value */}
                    <td className="p-5 text-center font-medium">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? <Check size={16} className="text-brand mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                      ) : (
                        row.starter
                      )}
                    </td>

                    {/* Pro value */}
                    <td className="p-5 text-center font-medium">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? <Check size={16} className="text-brand mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                      ) : (
                        row.pro
                      )}
                    </td>

                    {/* Enterprise value */}
                    <td className="p-5 text-center font-bold text-brand">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? <Check size={16} className="text-brand mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
