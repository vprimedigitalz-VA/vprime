export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string; // Lucide icon name
  benefits: string[];
  process: string[];
  deliverables: string[];
  technologies: string[];
  faq: { q: string; a: string }[];
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  logo: string;
  avatar: string;
  rating: number;
  quote: string;
  videoUrl?: string; // placeholder for video testimonials
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  results: string[]; // key metrics, e.g., "+140% Conversion"
  problem: string;
  strategy: string;
  designProcess: string;
  developmentProcess: string;
  solution: string;
  resultsDetail: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  beforeImage?: string;
  afterImage?: string;
  technologies: string[];
  duration: string;
  gallery?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  details: string[];
  duration: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string; // Markdown or styled text
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  tags: string[];
}
