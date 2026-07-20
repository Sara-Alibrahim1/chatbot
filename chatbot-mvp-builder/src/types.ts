export interface BusinessInfo {
  name: string;
  type: string;
  city: string;
  tone: string;
  customPrompt: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  matchedFaqId?: string;
}

export const BUSINESS_TYPES = [
  { value: "Specialty Cafe", label: "Specialty Cafe" },
  { value: "E-commerce Store", label: "E-commerce Store" },
  { value: "Medical/Dental Clinic", label: "Medical/Dental Clinic" },
  { value: "Real Estate Agency", label: "Real Estate Agency" },
  { value: "Delivery & Logistics", label: "Delivery & Logistics" },
  { value: "Online Learning Platform", label: "Online Learning Platform" },
  { value: "SaaS/Tech Startup", label: "SaaS/Tech Startup" },
];

export const SAUDI_CITIES = [
  { value: "Riyadh", label: "Riyadh" },
  { value: "Jeddah", label: "Jeddah" },
  { value: "Dammam", label: "Dammam" },
  { value: "Madinah", label: "Madinah" },
  { value: "Makkah", label: "Makkah" },
  { value: "Abha", label: "Abha" },
  { value: "Khobar", label: "Khobar" },
];

export const TONES = [
  { value: "Casual & Friendly", label: "Casual & Friendly" },
  { value: "Formal B2B", label: "Formal B2B" },
  { value: "Direct & Practical", label: "Direct & Practical" },
  { value: "Enthusiastic & Marketing", label: "Enthusiastic & Marketing" },
];

export const FAQ_CATEGORIES = [
  "General & About",
  "Products & Services",
  "Pricing & Discounts",
  "Location & Hours",
  "Support & Policies"
];

