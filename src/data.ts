import { Service, Project, TeamMember, TimelineStep, PricingPlan, BlogPost, Testimonial } from "./types";

export const servicesData: Service[] = [
  {
    id: "web-design",
    title: "Website Design",
    description: "Bespoke digital design that elevates your brand and engages your target audience.",
    category: "Design",
    icon: "Layout",
    benefits: [
      "Custom visual design tailored precisely to your brand guidelines.",
      "Conversion-focused layouts optimized for user experience (UX).",
      "Interactive components, subtle micro-interactions, and beautiful transitions.",
      "100% responsive and fluid grids for any device screen."
    ],
    process: [
      "Discovery & wireframing of layout structure.",
      "Style guide curation (colors, typography, grid).",
      "High-fidelity UI mockups in Figma.",
      "Design sign-off and smooth handoff for development."
    ],
    deliverables: [
      "Complete Figma design system with components.",
      "Desktop, tablet, and mobile interface templates.",
      "Exported digital assets and illustrations.",
      "Interactive high-fidelity prototype."
    ],
    technologies: ["Figma", "Adobe Creative Suite", "Tailwind CSS", "Spline (3D)"],
    faq: [
      {
        q: "How long does a custom website design take?",
        a: "Typically, a complete custom design takes between 2 to 4 weeks depending on the complexity and number of unique layouts required."
      },
      {
        q: "Do we own the Figma source files?",
        a: "Absolutely! We deliver full ownership of all Figma source projects, component libraries, and style guides upon completion."
      }
    ],
    slug: "website-design"
  },
  {
    id: "webflow-dev",
    title: "Webflow Development",
    description: "Stunning, robust, and clean Webflow sites designed for performance and simple content editing.",
    category: "Development",
    icon: "Layers",
    benefits: [
      "Blazing fast page load speeds out-of-the-box.",
      "Intuitive client editor allowing you to make updates instantly.",
      "No reliance on bulky plugins or security updates.",
      "Seamless CMS integration for dynamic blogs, career pages, and resources."
    ],
    process: [
      "Analyzing static Figma designs for modular layouts.",
      "Building clean, class-styled HTML structures in Webflow.",
      "Implementing custom animations and interactive triggers.",
      "CMS structuring and detailed SEO meta tags setup."
    ],
    deliverables: [
      "Fully developed, custom-built Webflow website.",
      "Interactive CMS setup with customized editor panels.",
      "30-minute tailored video tutorial on how to update content.",
      "Domain configuration and final launch checklist."
    ],
    technologies: ["Webflow", "Client-First CSS", "JavaScript", "Wized / Finsweet"],
    faq: [
      {
        q: "Is Webflow good for SEO?",
        a: "Yes, Webflow provides clean, lightweight semantic code, built-in schema, simple meta settings, and lightning-fast speeds which are fantastic for SEO."
      },
      {
        q: "Can you migrate our existing site to Webflow?",
        a: "Yes! We specialize in migrating WordPress, Squarespace, and custom-coded sites over to Webflow with zero downtime."
      }
    ],
    slug: "webflow-development"
  },
  {
    id: "wordpress-dev",
    title: "WordPress Development",
    description: "Enterprise-grade, secure, and fully customized WordPress solutions built with Gutenberg and clean code.",
    category: "Development",
    icon: "Code",
    benefits: [
      "Highly scalable architecture matching enterprise requirements.",
      "Infinite flexibility with custom plugins and headless integrations.",
      "Optimized codebase avoiding heavy pre-made multi-purpose templates.",
      "Familiar backend dashboard with Gutenberg or custom ACF blocks."
    ],
    process: [
      "Environment setup and custom theme architecture creation.",
      "Database schema and custom post types structuring.",
      "High-fidelity block design integration using Tailwind/PHP.",
      "Comprehensive performance and security hardening."
    ],
    deliverables: [
      "Custom WordPress theme completely free of visual bloat.",
      "Optimized Advanced Custom Fields (ACF) templates.",
      "Security configuration (SSL, firewalls, and automated backups).",
      "Full site speed optimization report (Green Core Web Vitals)."
    ],
    technologies: ["WordPress", "PHP", "React / Gutenberg Blocks", "MySQL", "ACF Pro"],
    faq: [
      {
        q: "Why custom WordPress instead of a pre-made template?",
        a: "Pre-made templates are loaded with massive code bloat that slows down your site and makes it insecure. Our custom builds are lightning-fast, custom-tailored, and secure."
      },
      {
        q: "How do you handle security?",
        a: "We implement advanced server-side caching, secure logins, API access restriction, weekly automated security scans, and database immunization."
      }
    ],
    slug: "wordpress-development"
  },
  {
    id: "shopify-dev",
    title: "Shopify Development",
    description: "High-converting, bespoke e-commerce experiences that turn visitors into loyal customers.",
    category: "Development",
    icon: "ShoppingBag",
    benefits: [
      "Sleek custom Liquid themes engineered for peak conversion rates.",
      "Optimized checkout funnels and integrated upsells.",
      "Scalable inventory management and custom app integrations.",
      "Ultra-fast product pages built with headless or optimized native liquid structures."
    ],
    process: [
      "Strategy mapping of the customer purchase journey.",
      "Custom UI design for home, collection, product, and cart pages.",
      "Shopify theme building and robust cart actions coding.",
      "Payment gateway setups and fulfillment routing checks."
    ],
    deliverables: [
      "Fully responsive custom Shopify storefront.",
      "Automated marketing setups ( abandoned cart emails, popups).",
      "Configured shipping profiles and transactional emails.",
      "SEO-optimized collection and product hierarchies."
    ],
    technologies: ["Shopify Liquid", "Tailwind CSS", "JavaScript / Alpine.js", "GraphQL"],
    faq: [
      {
        q: "Can you build custom apps for our Shopify store?",
        a: "Yes, we build custom private apps using Shopify's API to integrate with external ERPs, CRMs, or inventory databases."
      },
      {
        q: "Can you help set up third-party fulfillment services?",
        a: "Absolutely, we configure fulfillment services (Amazon FBA, ShipBob, etc.) directly into your Shopify dashboard."
      }
    ],
    slug: "shopify-development"
  },
  {
    id: "landing-page",
    title: "Landing Page Design",
    description: "High-impact, single-page funnels designed for maximum conversions and campaign performance.",
    category: "Design",
    icon: "Zap",
    benefits: [
      "Clear, persuasive visual storytelling that drives action.",
      "A/B testing-ready architecture with clean grid lines.",
      "Optimized speed to guarantee minimum drop-offs from ads.",
      "Sleek lead-capture mechanisms with instant integrations."
    ],
    process: [
      "Copywriting structure and narrative mapping.",
      "Wireframing conversion hotspots (Hero, Social Proof, FAQ, CTA).",
      "Polished high-fidelity design application.",
      "Pixel-perfect frontend implementation and analytics tracking."
    ],
    deliverables: [
      "High-converting landing page.",
      "Integrated tracking (Google Analytics, Meta Pixel, Hotjar).",
      "Fully animated scroll experience to retain user interest.",
      "Lightning-fast server deployment."
    ],
    technologies: ["Vite / React", "Tailwind CSS", "Motion", "Figma"],
    faq: [
      {
        q: "What is the typical conversion rate for your landing pages?",
        a: "While industry averages sit around 2-3%, our landing pages typically achieve conversion rates between 8% and 18% depending on the traffic source quality."
      }
    ],
    slug: "landing-page-design"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Intuitively designed digital products that solve complex user problems and maximize user retention.",
    category: "Design",
    icon: "Smartphone",
    benefits: [
      "User-tested flow charts that eliminate interaction friction.",
      "Elegant visual aesthetics that build emotional resonance.",
      "Comprehensive interactive component libraries.",
      "Aesthetic layouts built with accessible contrast ratios."
    ],
    process: [
      "User interviews and detailed persona mapping.",
      "Information Architecture and interactive wireframes.",
      "High-fidelity visual UI styling.",
      "Usability testing with real-user video reviews."
    ],
    deliverables: [
      "Complete design system with interactive tokens.",
      "Tested wireframe paths and user flow diagrams.",
      "Developer-ready production design assets.",
      "Clickable UX prototypes for stakeholder reviews."
    ],
    technologies: ["Figma", "Miro", "Protopie", "Lottie Animations"],
    faq: [
      {
        q: "What is the difference between UI and UX?",
        a: "UX (User Experience) is how a product functions and how users navigate it. UI (User Interface) is how it looks, including colors, typography, buttons, and animations."
      }
    ],
    slug: "ui-ux-design"
  },
  {
    id: "seo-opt",
    title: "SEO Optimization",
    description: "Data-driven search engine optimization to rank #1 on Google and capture high-intent organic traffic.",
    category: "Marketing",
    icon: "Search",
    benefits: [
      "Comprehensive keyword research targeting buying-intent keywords.",
      "Advanced on-page SEO targeting high search-engine scores.",
      "In-depth technical SEO audits resolving speed, schema, and indexation issues.",
      "Sustained organic traffic growth without continuous ad-spend."
    ],
    process: [
      "Full SEO site audit and competitor keyword gap analysis.",
      "On-page metadata, content structure, and internal link optimization.",
      "JSON-LD schema configuration for rich search snippets.",
      "Monthly backlink outreach and keyword tracking."
    ],
    deliverables: [
      "Thorough competitor and keyword roadmap.",
      "Optimized technical SEO configuration.",
      "Customized SEO reporting dashboard (GSC & GA4 integration).",
      "On-going monthly optimization plan."
    ],
    technologies: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "RankMath"],
    faq: [
      {
        q: "How long does it take to see results from SEO?",
        a: "SEO is a compounding strategy. You typically see initial indexing movements in 4-6 weeks, with major traffic compounding starting in 3-6 months."
      }
    ],
    slug: "seo-optimization"
  },
  {
    id: "smm-ads",
    title: "Social Media Marketing",
    description: "Paid social advertising campaigns on Meta, TikTok, LinkedIn, and Google to drive instant sales.",
    category: "Marketing",
    icon: "TrendingUp",
    benefits: [
      "Highly persuasive, premium ad creative designs.",
      "Deep audience targeting based on custom conversion data.",
      "Rigorous ROAS monitoring and daily bidding optimization.",
      "Strategic retargeting funnels that convert cold prospects."
    ],
    process: [
      "Audience modeling and creative brief development.",
      "Ad copywriting and professional layout design.",
      "Pixel tracker installation and campaign launching.",
      "Rapid creative testing and scaling of winning ads."
    ],
    deliverables: [
      "High-performing ad creatives (videos, statics, carousels).",
      "Complete ad account setup and custom conversions.",
      "Transparent ROAS and CPA reports.",
      "Weekly status and creative revision meetings."
    ],
    technologies: ["Meta Ads Manager", "TikTok Ads", "Google Ads", "Triple Whale"],
    faq: [
      {
        q: "What is your average ROAS for clients?",
        a: "Our clients average an immediate 3.4x Return on Ad Spend (ROAS) across cold campaigns, and up to 7.8x on warm retargeting."
      }
    ],
    slug: "social-media-marketing"
  },
  {
    id: "smm-mgmt",
    title: "Social Media Management",
    description: "Organic community building, premium content curation, and brand aesthetic management across all channels.",
    category: "Marketing",
    icon: "Users",
    benefits: [
      "Stunningly curated feed layouts that tell a cohesive brand story.",
      "Consistent, professional posting schedule.",
      "Active, real-time community comment and DM engagement.",
      "Organic viral growth through strategic Reels and Shorts creation."
    ],
    process: [
      "Brand vibe analysis and feed theme design.",
      "30-day ahead content calendar planning.",
      "Graphic design, copywriting, and short-form video editing.",
      "Daily scheduling and community outreach."
    ],
    deliverables: [
      "Interactive 30-day visual content calendar.",
      "Custom graphic templates and high-quality reels.",
      "Targeted hashtag and trending sound blueprints.",
      "Detailed organic growth metrics report."
    ],
    technologies: ["Canva Pro", "CapCut", "Later / Buffer", "Notion Content Board"],
    faq: [
      {
        q: "Do you respond to comments and messages on our behalf?",
        a: "Yes! We establish a comprehensive 'Brand FAQ & Tone' document with you so our community managers can reply to comments and basic inquiries instantly."
      }
    ],
    slug: "social-media-management"
  },
  {
    id: "branding",
    title: "Branding & Identity",
    description: "Crafting iconic visual identities, logos, voice guidelines, and corporate guidelines that stand the test of time.",
    category: "Design",
    icon: "Compass",
    benefits: [
      "Instantly recognizable logo systems (primary, secondary, submarks).",
      "Unified typographic guidelines and a premium color palette.",
      "Strategic brand voice and mission documentation.",
      "A complete Brand Guidelines Book to maintain consistency across teams."
    ],
    process: [
      "In-depth research on market positioning and brand archetypes.",
      "Concept sketching and vectorization of primary marks.",
      "Typographic pairing and rigorous color theory application.",
      "Design of corporate assets (business cards, stationery, templates)."
    ],
    deliverables: [
      "Scalable Vector Logo System (.SVG, .AI, .PNG).",
      "Comprehensive Brand Guidelines book.",
      "Custom brand typography set and color HEX/RGB/CMYK codes.",
      "Social media profile kit and asset patterns."
    ],
    technologies: ["Adobe Illustrator", "Figma", "Adobe InDesign", "Pantone Formula Guides"],
    faq: [
      {
        q: "Do you design packaging as part of branding?",
        a: "Yes, we frequently include packaging design, physical collateral, and premium merchandise as custom add-ons to our brand identity packages."
      }
    ],
    slug: "branding"
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description: "Comprehensive multi-channel growth consulting and data-backed digital architecture mapping.",
    category: "Strategy",
    icon: "Globe",
    benefits: [
      "Custom-built growth blueprints based on detailed competitor intelligence.",
      "Conversion funnel audits pinpointing leakages in your user flow.",
      "Technical stack evaluations to cut down unnecessary software fees.",
      "Accurate revenue projection models and channel optimization tips."
    ],
    process: [
      "Discovery meetings to align on exact business objectives.",
      "Data analysis of current channels, traffic, and conversion numbers.",
      "Synthesizing high-impact opportunities into an executive strategy report.",
      "Quarterly review meetings to measure strategy adoption."
    ],
    deliverables: [
      "70+ page bespoke Digital Growth Roadmap.",
      "Comprehensive visual funnel blueprints.",
      "Customer Acquisition Cost (CAC) optimization sheet.",
      "Quarterly executive presentation slides."
    ],
    technologies: ["Lucidchart", "Google Analytics 4", "Hotjar", "Excel", "Notion"],
    faq: [
      {
        q: "Is digital strategy only for larger enterprises?",
        a: "Not at all. Businesses of all sizes benefit from having a clear, actionable growth framework rather than guessing where to allocate marketing budgets."
      }
    ],
    slug: "digital-strategy"
  },
  {
    id: "maintenance",
    title: "Website Maintenance",
    description: "Worry-free maintenance, security patching, speed audits, and content updates for peace of mind.",
    category: "Strategy",
    icon: "ShieldCheck",
    benefits: [
      "Weekly automated plugin, theme, and security updates.",
      "Real-time uptime monitoring with immediate crash-handling.",
      "Dedicated developer hours for making design or text revisions.",
      "Daily off-site cloud backups ensuring maximum disaster recovery."
    ],
    process: [
      "Migrating or pointing site to our high-performance secure servers.",
      "Configuring daily cloud backups and uptime alerts.",
      "Routine weekly manual site sweeps and speed audits.",
      "Fulfilling support tickets and visual edits in under 24 hours."
    ],
    deliverables: [
      "Monthly performance and security summary report.",
      "Daily backups stored on redundant cloud servers.",
      "Instant security firewall and hack-recovery guarantee.",
      "Priority developer email and Slack support."
    ],
    technologies: ["Cloudflare", "UptimeRobot", "AWS S3", "GitLab CI/CD"],
    faq: [
      {
        q: "What is the turnaround time for content updates?",
        a: "Standard content updates are completed within 24 hours of submitting a request. Critical updates are addressed within 1-2 hours."
      }
    ],
    slug: "website-maintenance"
  },
  {
    id: "cro-opt",
    title: "Conversion Rate Optimization (CRO)",
    description: "Scientific A/B testing and behavioral psychology to maximize sales from your existing web traffic.",
    category: "Strategy",
    icon: "Target",
    benefits: [
      "Actionable heatmaps and scrollmaps identifying client friction.",
      "Hypothesis-backed A/B testing on headlines, CTA colors, and checkout layouts.",
      "Substantial increases in Average Order Value (AOV) and client lifetime value.",
      "Better ROAS on advertising campaigns by multiplying landing page value."
    ],
    process: [
      "Running heatmaps and session recording tracking for 14 days.",
      "Identifying low-friction user paths and severe drop-off locations.",
      "Drafting alternative layout variations and running real-time A/B splits.",
      "Implementing winning structures directly into production code."
    ],
    deliverables: [
      "In-depth user behavioral friction report.",
      "A/B split-testing configuration and live dashboard tracking.",
      "High-converting visual redesigns for key high-traffic templates.",
      "CRO playbook showing optimized persuasion formulas."
    ],
    technologies: ["Hotjar", "VWO", "Optimizely", "Google Optimize / GA4", "Figma"],
    faq: [
      {
        q: "How much traffic do we need to start A/B testing?",
        a: "We recommend having at least 15,000 monthly unique visitors to achieve statistically significant winners in under 30 days."
      }
    ],
    slug: "conversion-rate-optimization"
  }
];

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "Starlight SaaS Rebrand & Growth Platform",
    client: "Starlight Tech Inc.",
    category: "Web Design & Webflow Dev",
    description: "A complete overhaul of an AI scheduling platform, resulting in a 140% boost in conversion and award-winning motion experiences.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1200&q=80",
    results: ["+140% Conversion", "-35% Bounce Rate", "4.2s Speed Increase"],
    problem: "Starlight's old website was slow, built on a heavy custom template, and failed to communicate their product's core value. They were losing nearly 40% of their organic search traffic due to low page loading speeds and confusing navigation layouts.",
    strategy: "We redesigned their entire visual identity with sleek dark-mode accents, Inter typography, and structured content cards. We then built the site in Webflow with highly optimized classes, minimal JS libraries, and elegant scroll-triggered animations to explain complex features intuitively.",
    designProcess: "We created a minimalist design system based on 4px grid blocks, soft gray borders, and electric blue (#0037FD) brand accents. We added glassmorphic menus and interactive floating scheduling tools that demonstrated the product's instant benefits dynamically.",
    developmentProcess: "Built cleanly using the Finsweet Client-First framework inside Webflow. We optimized every image asset to modern WebP format, implemented lightweight custom JS for scroll performance, and structured a robust content CMS for their blog and documentation sections.",
    solution: "A jaw-dropping, high-performing web layout highlighting core API connections, interactive schedule planners, and seamless book-now funnels, culminating in an award-winning aesthetic that instantly breeds customer trust.",
    resultsDetail: "Starlight experienced an immediate 140% jump in consultation booking signups, a reduction of page load speeds down to 0.6 seconds, and received several high-profile digital awards (CSS Design Awards Nominations).",
    testimonial: {
      quote: "VprimeDigitalz completely transformed our online presence. Our conversion rates went through the roof, and our clients constantly compliment our new website design.",
      author: "Sarah Jenkins",
      role: "VP of Growth, Starlight Tech",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
    },
    beforeImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    technologies: ["Figma", "Webflow", "Tailwind CSS", "Motion", "Wized"],
    duration: "6 Weeks",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "project-2",
    title: "Apex Luxury E-Commerce Framework",
    client: "Apex Apparel Co.",
    category: "Shopify Development",
    description: "Custom headless Shopify experience engineered for a premium luxury apparel brand, yielding +240% sales and a refined layout.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    results: ["+240% Sales Growth", "45% Faster Checkout", "4.9★ Customer Rating"],
    problem: "Apex was using a generic pre-made Shopify template that felt cheap and did not represent their luxury brand positioning. The loading speed on mobile was extremely sluggish, causing high shopping cart abandonment rates during peak marketing pushes.",
    strategy: "We built a tailored, custom Shopify storefront using modern Liquid development patterns and structured interactive collection listings. Our focus was on ultra-minimalistic typography, large high-fidelity brand photography, and custom checkout flows.",
    designProcess: "We structured a high-fashion, editorial layout with generous negative space, sophisticated uppercase headers, and smooth hover-to-reveal sizing overlays. The primary brand blue (#0037FD) was used beautifully as a subtle focus accent.",
    developmentProcess: "Crafted with optimized Shopify Liquid codes, avoiding all external app scripts that slow down rendering. We used custom CSS grids for product modules, implemented instant cart drawers, and added automated back-in-stock SMS setups.",
    solution: "A breathtaking mobile-first digital boutique that feels like walking into an high-end luxury physical store, loading in under 0.9 seconds worldwide.",
    resultsDetail: "Sales grew by 240% within three months of deployment. Mobile checkout abandonment rates decreased from 68% to 37%, saving the client hundreds of thousands in ad-spend efficiency.",
    testimonial: {
      quote: "The visual polish and code performance that VprimeDigitalz delivered is unparalleled. Our average order value (AOV) grew by 35% almost overnight.",
      author: "Julian Vance",
      role: "Creative Director, Apex Apparel",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
    },
    beforeImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80",
    technologies: ["Shopify Liquid", "Tailwind CSS", "Alpine.js", "GraphQL"],
    duration: "8 Weeks",
    gallery: [
      "https://images.unsplash.com/photo-1441984969893-c534e97be204?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "project-3",
    title: "Solis Smart Energy Dashboard",
    client: "Solis Power Systems",
    category: "UI/UX Design & Development",
    description: "An intuitive web application and control interface designed for smart solar panel networks, simplifying user control.",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=80",
    results: ["98% User Retention", "Green Core Web Vitals", "Featured on Behance"],
    problem: "Solis had a powerful physical smart solar grid but a complex, outdated desktop application that left everyday consumers confused. Users were overwhelming their technical customer support line with basic routing and energy calculation questions.",
    strategy: "We redesigned the interface from the ground up, turning complex electrical telemetry grids into clean, visual micro-charts, animated energy flow vectors, and automated suggestions that anyone can understand instantly.",
    designProcess: "Created an interactive bento-grid dashboard in Figma. We utilized a sleek off-white layout with deep gray text, using electric blue (#0037FD) to represent grid health and energy connections. We tested the UX flow with users aged 25 to 70 to ensure total ease of use.",
    developmentProcess: "Built as a lightning-fast React application using Tailwind CSS for responsive spacing and Recharts for highly interactive, lightweight charting modules.",
    solution: "A highly responsive, beautifully styled digital portal that empowers consumers to track solar storage, sell energy back to the grid, and schedule smart appliance loads in 3 simple clicks.",
    resultsDetail: "Support ticket volume dropped by an immediate 82%. Customer app satisfaction jumped to 98%, and the project was featured on Behance's UI/UX curation boards.",
    testimonial: {
      quote: "VprimeDigitalz combined technical understanding with world-class visual design. They solved our customer support crisis and built a dashboard our users adore.",
      author: "Marcus Chen",
      role: "CTO, Solis Power",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Figma"],
    duration: "10 Weeks"
  },
  {
    id: "project-4",
    title: "Novus Health Platform Redesign",
    client: "Novus Care Network",
    category: "WordPress & SEO Strategy",
    description: "A highly secure and accessible digital medical portal optimized for speed, patient booking, and localized search results.",
    image: "https://images.unsplash.com/photo-1504607798333-52a30db54a5d?auto=format&fit=crop&w=1200&q=80",
    results: ["+180% Patient Bookings", "100% HIPAA Compliant", "#1 Rank for 40+ Keywords"],
    problem: "Novus's older WordPress site suffered from heavy security vulnerabilities, took over 6 seconds to load, and failed completely on basic accessibility standards (WCAG 2.1), exposing them to litigation and discouraging patients from booking appointments online.",
    strategy: "We developed a completely bespoke, highly secure WordPress theme using modular ACF blocks. We optimized the typography for legibility, audited the contrast levels, and restructured their content architecture for local SEO rankings.",
    designProcess: "Designed a calming, professional interface using warm whites, rich charcoal, and VprimeDigitalz's electric blue focus brand color. Navigation links were made extremely legible with keyboard-accessible focus markers.",
    developmentProcess: "Built custom PHP templates from scratch, integrated secure patient booking APIs, and optimized server caching. We engineered automated structured schemas for each medical clinic location to dominate local search engine algorithms.",
    solution: "A gorgeous, secure, and accessible medical resource hub that loads instantly and lets patients find physicians and book appointments in seconds.",
    resultsDetail: "Online appointment bookings grew by 180% within 4 weeks. The clinic achieved a 100/100 performance score on Google PageSpeed Insights and reached page #1 rankings for local primary care keywords.",
    testimonial: {
      quote: "The technical performance, speed, and beautiful layouts built by VprimeDigitalz changed our healthcare network's patient acquisition strategy entirely.",
      author: "Dr. Amanda Ross",
      role: "Director, Novus Care",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
    },
    technologies: ["WordPress", "PHP", "Tailwind CSS", "Cloudflare", "ACF Pro"],
    duration: "7 Weeks"
  },
  {
    id: "project-5",
    title: "Zeta Crypto Wallet Brand & Campaign",
    client: "Zeta Labs",
    category: "Branding & Web Design",
    description: "A high-concept futuristic brand identity and landing page showcasing visual assets, sleek typography, and interactive charts.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80",
    results: ["50K+ Waitlist Signups", "2M+ Social Impressions", "Awwwards Site of the Day"],
    problem: "Zeta was entering a highly crowded crypto wallet market. They needed to immediately stand out as premium, secure, and cutting-edge, rather than looking like standard copycat Web3 projects.",
    strategy: "We crafted a stunning, hyper-custom 3D visual brand system with a custom logomark, elegant geometric layouts, and an interactive landing page that visualizes wallet security and token tracking in real time.",
    designProcess: "Created a unique brutalist-minimalist brand concept utilizing raw geometric layouts, elegant grid borders, Space Grotesk display fonts, and deep royal blue accents. Every scroll of the site felt futuristic and highly intentional.",
    developmentProcess: "Implemented utilizing Vite React and Tailwind CSS, featuring high-fidelity custom SVG paths and Motion spring physics for custom interactive features.",
    solution: "A breathtaking, futuristic landing page experience that immediately hooks visitors and communicates premium technical prestige.",
    resultsDetail: "Generated over 50,000 waitlist signups in under two weeks. The landing page design went viral on design Twitter, winning 'Site of the Day' on CSS Design Awards.",
    testimonial: {
      quote: "VprimeDigitalz is in a class of their own. They took our abstract security technology and turned it into an award-winning brand masterpiece.",
      author: "Dmitri Volk",
      role: "Founder, Zeta Labs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    technologies: ["React", "Motion", "Tailwind CSS", "Figma", "Illustrator"],
    duration: "5 Weeks"
  },
  {
    id: "project-6",
    title: "Scribe SaaS Content Machine",
    client: "Scribe.ai",
    category: "Webflow Dev & SEO",
    description: "SEO-driven blog system and marketing funnels engineered for an AI writing assistant, skyrocketing traffic and MRR.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    results: ["+320% Organic Traffic", "45k New Signups", "$120K Added ARR"],
    problem: "Scribe.ai had amazing tech but zero organic presence. They relied entirely on expensive paid search ads to drive product registrations, which was unsustainable long-term.",
    strategy: "We developed a high-velocity Webflow hub optimized for editorial articles, including automated internal link schemas and conversion-optimized callouts on every single content template.",
    designProcess: "We created a clean, distraction-free typographic layout centered around a grid structure that made reading long-form guides highly engaging and visual.",
    developmentProcess: "Built fully custom Webflow CMS collections with automatic category sorting, related posts recommendations, and custom email capture blocks that synchronized directly with HubSpot.",
    solution: "A high-performance organic content machine that established Scribe.ai as the authority in AI copywriting.",
    resultsDetail: "Scribe saw organic traffic jump by 320% in five months, leading to over 45,000 organic signups and adding $120,000 to their Annual Recurring Revenue.",
    testimonial: {
      quote: "VprimeDigitalz didn't just build us a website; they built us a customer acquisition machine. Our organic acquisition cost dropped to almost zero.",
      author: "Elena Petrova",
      role: "Head of Marketing, Scribe.ai",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
    },
    technologies: ["Webflow", "HubSpot API", "Tailwind CSS", "Ahrefs SEO"],
    duration: "6 Weeks"
  }
];

export const teamData: TeamMember[] = [
  {
    id: "team-1",
    name: "Vikram Malhotra",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "With over 12 years of experience designing for Fortune 500 brands and global tech companies, Vikram oversees the creative vision and design precision of all agency projects.",
    specialties: ["Art Direction", "Brand Strategy", "UI/UX Architecture"],
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: "team-2",
    name: "Sarah Jenkins",
    role: "Head of Development",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Sarah is a seasoned frontend engineer specializing in clean, highly semantic code, interactive animations, and responsive modern framework scaling.",
    specialties: ["React / TypeScript", "Webflow Development", "Performance Optimization"],
    social: { linkedin: "#", github: "#" }
  },
  {
    id: "team-3",
    name: "Elena Rostova",
    role: "Lead UI/UX Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Elena crafts digital interfaces that blend minimalist visual aesthetics with rigorous, user-tested ergonomic flows to drive customer retention.",
    specialties: ["Interaction Design", "Figma Design Systems", "Prototyping"],
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: "team-4",
    name: "David Kross",
    role: "Growth & SEO Strategist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "David spends his time analyzing search engine changes, auditing technical architectures, and engineering custom content plans that rank #1.",
    specialties: ["Technical SEO", "Growth Hacking", "CRO & Analytics"],
    social: { linkedin: "#", twitter: "#" }
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Jenkins",
    role: "VP of Growth",
    company: "Starlight Tech Inc.",
    logo: "STARLIGHT",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    quote: "VprimeDigitalz completely transformed our online presence. Our conversion rates went through the roof, and our clients constantly compliment our new website design."
  },
  {
    id: "test-2",
    name: "Julian Vance",
    role: "Creative Director",
    company: "Apex Apparel Co.",
    logo: "APEX LUXURY",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    quote: "The visual polish and code performance that VprimeDigitalz delivered is unparalleled. Our average order value (AOV) grew by 35% almost overnight."
  },
  {
    id: "test-3",
    name: "Marcus Chen",
    role: "CTO",
    company: "Solis Power Systems",
    logo: "SOLIS POWER",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    quote: "VprimeDigitalz combined technical understanding with world-class visual design. They solved our customer support crisis and built a dashboard our users adore."
  }
];

export const timelineSteps: TimelineStep[] = [
  {
    step: "01",
    title: "Discovery & Alignment",
    description: "Deep research into your brand, target audience, business goals, and competitors.",
    details: [
      "Deep dive stakeholder brand interviews.",
      "Competitor digital audit and keyword research.",
      "Audience persona identification mapping.",
      "Technical stack selection and outline planning."
    ],
    duration: "Week 1"
  },
  {
    step: "02",
    title: "Research & UX Mapping",
    description: "Information architecture planning and creating high-performance conversion pathways.",
    details: [
      "User journey mapping & task flow modeling.",
      "Website structural blueprinting (sitemap design).",
      "Interactive structural wireframes outlining CTA paths.",
      "Conversion Hotspot strategy planning."
    ],
    duration: "Week 1-2"
  },
  {
    step: "03",
    title: "Digital Growth Strategy",
    description: "Formulating conversion, SEO, content, and messaging blueprints for performance.",
    details: [
      "Bespoke keyword research roadmap.",
      "High-converting copy narrative structure design.",
      "Paid advertising visual layout planning.",
      "Technical analytics schema setup design."
    ],
    duration: "Week 2"
  },
  {
    step: "04",
    title: "Wireframing & Prototypes",
    description: "Drafting the skeletal layouts to organize content logic and CTA paths.",
    details: [
      "Clean low-fidelity spatial layouts.",
      "Interactive wireframe pathways inside Figma.",
      "Rapid user flow navigation testing.",
      "Early layout feedback alignment with stakeholders."
    ],
    duration: "Week 2-3"
  },
  {
    step: "05",
    title: "Premium UI Design",
    description: "Applying stunning typography, brand colors, images, and visual elements.",
    details: [
      "Custom brand typography pairing & grid styling.",
      "High-fidelity desktop, tablet & mobile mockups.",
      "Sleek component creation (buttons, navigation drawers).",
      "Interactive UI transition click-through prototype."
    ],
    duration: "Week 3-4"
  },
  {
    step: "06",
    title: "High-Performance Development",
    description: "Turning designs into clean, semantic, fast, and responsive production code.",
    details: [
      "Clean, modular React or Webflow code architecture.",
      "Implementation of high-performance custom animations.",
      "Fully responsive styling following mobile-first grids.",
      "Rigorous database, CMS, or API connection coding."
    ],
    duration: "Week 4-6"
  },
  {
    step: "07",
    title: "Testing & Quality Assurance",
    description: "Thorough testing of speed, responsiveness, accessibility, and link safety.",
    details: [
      "Cross-browser rendering tests (Safari, Chrome, Firefox).",
      "Multi-device scaling audits (iPhones, Androids, MacBooks).",
      "Green Core Web Vitals performance code checks.",
      "WCAG 2.1 Contrast & screen-reader compatibility tests."
    ],
    duration: "Week 6-7"
  },
  {
    step: "08",
    title: "Final Deployment & Launch",
    description: "Launching your digital solution on secure, fast, and optimized server hosting.",
    details: [
      "DNS configuration and SSL certificate activation.",
      "Form submissions and payment flow final testing.",
      "XML Sitemaps generation and search indexing request.",
      "Website launch and live speed audit verification."
    ],
    duration: "Week 7"
  },
  {
    step: "09",
    title: "Continuous Support & Growth",
    description: "On-going server maintenance, speed optimization, and strategy updates.",
    details: [
      "Weekly automated plugin & theme security patching.",
      "Daily secure cloud backups storage configuration.",
      "Dedicated developer hours for rapid modifications.",
      "Monthly keyword SEO tracking and CRO heatmaps."
    ],
    duration: "Ongoing"
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "price-1",
    name: "Starter Growth",
    price: "$2,999",
    period: "one-time",
    description: "A beautifully crafted, ultra-fast custom single-page landing funnel optimized for high-converting marketing campaigns.",
    features: [
      "Bespoke High-Fidelity UI Design",
      "Lightweight React or Webflow Build",
      "100% Responsive Grid Flow",
      "Basic On-Page SEO Configuration",
      "Calendly & Contact Form Integration",
      "Integrated Analytics & Pixel Setup",
      "1 Month Launch Support & Backups"
    ],
    popular: false,
    ctaText: "Get Started"
  },
  {
    id: "price-2",
    name: "Professional Agency",
    price: "$5,999",
    period: "one-time",
    description: "Our core agency package. A fully customized, multi-page website designed to establish ultimate brand credibility.",
    features: [
      "Custom Figma Design System",
      "Up to 8 Fully Animated Layouts",
      "High-Performance Webflow/WordPress Development",
      "Advanced CMS Integration (Blog & Resources)",
      "Technical & On-Page SEO Roadmap",
      "Core Web Vitals Optimization (0.8s load)",
      "Custom Interactive Micro-Animations",
      "3 Months Dedicated Support & Backups"
    ],
    popular: true,
    ctaText: "Choose Professional"
  },
  {
    id: "price-3",
    name: "Enterprise Premium",
    price: "$11,999",
    period: "one-time",
    description: "The ultimate digital suite. Full brand strategy, high-end design, custom platform build, and comprehensive search growth campaigns.",
    features: [
      "Comprehensive Brand Identity & Voice Guide",
      "Infinite Custom Layouts & Complex Assets",
      "Shopify Headless or Custom React/TypeScript Web App",
      "Complete Competitor Content & Backlink SEO Campaign",
      "A/B Testing & Conversion Rate Optimization (CRO) Setup",
      "Interactive 3D Elements or Complex Math Calculators",
      "Premium Logo Kit & Physical Branding Assets",
      "12 Months VIP Developer Support & Free Hosting"
    ],
    popular: false,
    ctaText: "Inquire Custom Setup"
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: "blog-1",
    title: "How We Achieved a 140% Conversion Rate Boost for Starlight Tech",
    category: "Case Study",
    excerpt: "An inside look at our design strategy, copywriting structure, and performance optimizations that unlocked massive growth.",
    content: "When Starlight Tech approached VprimeDigitalz, they were battling a generic pre-made template that loaded in 6.2 seconds and had a low 1.4% conversion rate. Here is exactly how we restructured their spatial layouts, implemented minimalist typography, and engineered an electric brand experience that loaded in under 0.6 seconds and skyrocketed their signups to a massive 140% growth.\n\n### Step 1: Human-First Spatial Structures\nInstead of overwhelming readers with massive bullet lists of technical server terms, we broke down their platform into visual, interactive bento grid boxes. Each block answered a precise customer doubt right when they scrolled down, maximizing user retention.\n\n### Step 2: Eliminating CSS & JavaScript Bloat\nMost modern websites carry massive code libraries that slow down mobile processing speeds. We custom-crafted Starlight's layouts with neat class styles, avoided heavy third-party plugins, and leveraged Motion's hardware-accelerated spring animations, which load instantly.\n\n### Step 3: Precise Persuasion Copywriting\nEvery headline was rewritten to focus purely on high-intent customer outcomes. We replaced corporate jargon like 'Enterprise Synchronous Solutions' with direct action prompts like 'Align your calendar in 3 simple clicks.'",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Vikram Malhotra",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80"
    },
    date: "July 12, 2026",
    readTime: "6 Min Read",
    tags: ["CRO", "UI/UX Design", "Case Study"]
  },
  {
    id: "blog-2",
    title: "The Death of Generic Templates: Why Custom Design Matters in 2026",
    category: "Design",
    excerpt: "Pre-made templates are destroying your brand's authority. Learn why unique visual structures build immediate client trust.",
    content: "In 2026, customers can spot a standard multi-purpose template in a millisecond. If your website looks like five other competitors, you are immediately perceived as a commodity. Custom design is not just about looking different; it is about building immediate customer confidence through visual excellence and architectural precision.\n\n### First Impressions Are Subconscious\nWhen a prospect lands on your page, they evaluate your competence in 0.05 seconds. Generous negative space, perfectly aligned tracking, premium typography, and fluid, purposeful animations immediately communicate that you care deeply about details.\n\n### Templates are Speed Traps\nTemplates are built to satisfy everyone, meaning they include tons of unneeded options that drag down your mobile load speeds. This code bloat hurts your Google ranking and causes mobile visitors to exit your site before it even loads.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Elena Rostova",
      role: "Lead UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80"
    },
    date: "June 28, 2026",
    readTime: "4 Min Read",
    tags: ["Branding", "UI/UX Design", "Templates"]
  },
  {
    id: "blog-3",
    title: "Technical SEO Checklist to Outrank Your Competitors This Quarter",
    category: "SEO",
    excerpt: "The exact backend configurations, structured schemas, and performance indicators Google uses to rank sites higher.",
    content: "SEO is no longer just about stuffing keywords into blog articles. Search engines have evolved to heavily reward technical perfection. If your site has slow server-response speeds, broken internal link loops, or lacks structured rich schemas, Google will push you down the search results list.\n\n### 1. Hardening Your Core Web Vitals\nGoogle measures your site's Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). Ensure all images have explicit width/height tags to avoid layout shift, and serve assets via premium CDN proxies like Cloudflare.\n\n### 2. Implementing JSON-LD Structured Schema\nAdding schema codes tells search engines exactly what your page is about. Ensure your services pages contain official Service structured schemas, and your blog posts have complete NewsArticle tags.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "David Kross",
      role: "SEO Strategist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
    },
    date: "May 15, 2026",
    readTime: "8 Min Read",
    tags: ["SEO", "Marketing", "Core Web Vitals"]
  }
];

export const globalFaqs = [
  {
    q: "Why should we choose VprimeDigitalz over a freelance designer?",
    a: "Unlike freelancers who specialize in only one aspect, VprimeDigitalz provides a fully integrated team of world-class brand strategists, award-winning designers, elite frontend developers, and SEO engineers. We don't just build beautiful sites; we build conversion engines designed to drive measurable business growth."
  },
  {
    q: "Can you design custom web apps or just marketing websites?",
    a: "We design and build both! We build highly complex custom client dashboards, e-commerce storefronts, SaaS applications, interactive pricing calculators, and bespoke internal workflows using modern full-stack web technologies."
  },
  {
    q: "How does the project process work?",
    a: "We follow a highly structured 9-step timeline: Discovery, Research, Growth Strategy, Wireframing, UI Design, Custom Development, Rigorous Testing, Launch, and Continuous Support. You receive dedicated Slack updates and live Loom video previews at each phase."
  },
  {
    q: "What CMS platforms do you support?",
    a: "We build primarily in React/TypeScript for high-performance custom needs, Webflow for beautiful content editor dashboards, Shopify for custom e-commerce boutique experiences, and secure WordPress themes with Gutenberg for larger corporate teams."
  },
  {
    q: "Do you integrate with third-party tools like Salesforce, HubSpot, or custom APIs?",
    a: "Yes! We specialize in custom integrations. We easily sync your website contact forms and lead captures directly with Salesforce, HubSpot, Klaviyo, ActiveCampaign, Zapier, or any custom REST/GraphQL APIs."
  }
];
