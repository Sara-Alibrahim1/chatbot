import { FAQItem, BusinessInfo } from "./types";

export const DEFAULT_BUSINESS_INFO: BusinessInfo = {
  name: "Cloud Cafe",
  type: "Specialty Cafe",
  city: "Riyadh",
  tone: "Casual & Friendly",
  customPrompt: "A high-end cozy specialty cafe in Riyadh. We offer premium locally roasted single-origin coffees, artisanal pastries, and a serene, beautiful atmosphere perfect for focus, study, and socialization."
};

export const DEFAULT_FAQS: FAQItem[] = [
  // Category 1: General & About (10 items)
  {
    id: "g1",
    category: "General & About",
    question: "What is Cloud Cafe and what makes it unique?",
    answer: "Cloud Cafe is a premium specialty coffee shop in Riyadh. We stand out by combining locally roasted micro-lot single-origin beans with a serene, cloud-like aesthetic designed for ultimate comfort and focus."
  },
  {
    id: "g2",
    category: "General & About",
    question: "Is Cloud Cafe suitable for studying or remote work?",
    answer: "Yes, absolutely! We offer quiet zones, dedicated high-speed Wi-Fi, and multiple universal power sockets under almost every table to make your study or work sessions seamless."
  },
  {
    id: "g3",
    category: "General & About",
    question: "What is the story behind the name 'Cloud Cafe'?",
    answer: "The name represents our desire to provide an escape. Our dreamy, minimalist white-and-blue aesthetics and airy seating are designed to make you feel like you are floating on a cloud."
  },
  {
    id: "g4",
    category: "General & About",
    question: "Do you host community workshops or local events?",
    answer: "Yes! We regularly host weekend coffee tasting sessions, local art exhibits, and book club discussions. Follow our social media to join the next community gathering."
  },
  {
    id: "g5",
    category: "General & About",
    question: "Who is the head barista or roaster at Cloud Cafe?",
    answer: "Our head barista is an award-winning local coffee professional who oversees our quality control and personally selects our micro-lot single-origin coffees from ethical farms."
  },
  {
    id: "g6",
    category: "General & About",
    question: "What kind of atmosphere can I expect at Cloud Cafe?",
    answer: "Expect a peaceful, minimalist interior with soothing ambient music, warm downlighting, lush indoor plants, and friendly staff who make everyone feel welcome."
  },
  {
    id: "g7",
    category: "General & About",
    question: "Do you have indoor and outdoor seating options?",
    answer: "Yes, we have a beautifully designed indoor lounge with plush armchairs and a gorgeous outdoor terrace equipped with misting fans for the warmer Riyadh nights."
  },
  {
    id: "g8",
    category: "General & About",
    question: "Do you play loud music or is it quiet?",
    answer: "We keep the background music soft, focus-friendly, and instrumental during daytime hours, transitioning to smooth lo-fi and light jazz in the evenings."
  },
  {
    id: "g9",
    category: "General & About",
    question: "Are families and children welcome at Cloud Cafe?",
    answer: "We are family-friendly! We have spacious seating arrangements that accommodate families comfortably, while preserving quiet corners for working individuals."
  },
  {
    id: "g10",
    category: "General & About",
    question: "Is there a prayer room nearby?",
    answer: "Yes, there is a spacious public prayer room situated just a few steps away within the same commercial plaza."
  },

  // Category 2: Products & Services (10 items)
  {
    id: "p1",
    category: "Products & Services",
    question: "What is your best-selling specialty drink?",
    answer: "Our signature 'Iced Cloud Latte' made with organic condensed milk, cream, and a double shot of Ethiopian espresso is our #1 bestseller."
  },
  {
    id: "p2",
    category: "Products & Services",
    question: "What origins of single-origin beans do you serve?",
    answer: "We rotate our beans monthly. Currently, we are brewing a bright Colombian Gesha (washed) and a rich, fruity Ethiopian Yirgacheffe (natural)."
  },
  {
    id: "p3",
    category: "Products & Services",
    question: "Do you serve freshly baked pastries daily?",
    answer: "Yes! All of our pastries—including our signature saffron milk cake, pecan tarts, and buttery croissants—are baked fresh every morning by our partner bakery."
  },
  {
    id: "p4",
    category: "Products & Services",
    question: "Do you offer non-dairy milk alternatives?",
    answer: "Yes, we offer organic oat milk, almond milk, and soy milk. We do not charge extra for milk alternatives to keep our drinks accessible to everyone."
  },
  {
    id: "p5",
    category: "Products & Services",
    question: "Do you sell coffee beans for home brewing?",
    answer: "Definitely! We retail our custom blends and single-origin beans in 250g bags. Our baristas can grind them for you on the spot based on your brewing method."
  },
  {
    id: "p6",
    category: "Products & Services",
    question: "What manual brewing methods do you offer?",
    answer: "We offer manual pour-overs using V60, Chemex, and Aeropress, as well as a rich and smooth 12-hour slow-dripped Cold Brew."
  },
  {
    id: "p7",
    category: "Products & Services",
    question: "Do you have healthy or low-calorie menu items?",
    answer: "Yes! We serve organic acai bowls topped with fresh berries, sugar-free protein bars, and light Greek yogurt parfait cups."
  },
  {
    id: "p8",
    category: "Products & Services",
    question: "Can I customize the sweetness level of my drink?",
    answer: "Absolutely. Just let our baristas know if you prefer your sweet drinks with half-sweetness, quarter-sweetness, or entirely sugar-free."
  },
  {
    id: "p9",
    category: "Products & Services",
    question: "Do you serve hot tea or matcha drinks?",
    answer: "Yes, we serve premium ceremonial-grade Japanese Matcha Lattes (sweetened or unsweetened) and a selection of high-quality organic loose-leaf teas."
  },
  {
    id: "p10",
    category: "Products & Services",
    question: "Do you have savory breakfast options?",
    answer: "Yes! We serve fresh halloumi pesto sandwiches, avocado sourdough toast with poached eggs, and turkey-cheese croissants toasted to perfection."
  },

  // Category 3: Pricing & Discounts (10 items)
  {
    id: "pr1",
    category: "Pricing & Discounts",
    question: "What is your price range for coffee?",
    answer: "Our standard espresso drinks (latte, flat white) range between SAR 14 and SAR 18. Manual pour-overs start at SAR 20, and signature drinks are SAR 22."
  },
  {
    id: "pr2",
    category: "Pricing & Discounts",
    question: "Do you offer student and academic discounts?",
    answer: "Yes! Students and teachers get a 15% discount on all beverage orders when they present a valid university or school ID card."
  },
  {
    id: "pr3",
    category: "Pricing & Discounts",
    question: "Do you have a loyalty card or rewards program?",
    answer: "Yes, we have a digital loyalty program. Scan our QR code at the register to sign up—every 9 drinks you buy, you get the 10th one completely free!"
  },
  {
    id: "pr4",
    category: "Pricing & Discounts",
    question: "Do you accept digital payments like Apple Pay and Mada?",
    answer: "Yes, we are a fully digital/cashless-friendly cafe. We accept Apple Pay, Mada, Visa, Mastercard, and American Express."
  },
  {
    id: "pr5",
    category: "Pricing & Discounts",
    question: "Are there any morning breakfast bundles?",
    answer: "Yes! Every weekday from 6:00 AM to 11:00 AM, you can grab any standard hot coffee paired with a fresh butter croissant for only SAR 22."
  },
  {
    id: "pr6",
    category: "Pricing & Discounts",
    question: "Do you charge extra for double shots of espresso?",
    answer: "No, all of our hot and iced milk drinks are served with a double ristretto shot by default to guarantee a rich, robust coffee flavor."
  },
  {
    id: "pr7",
    category: "Pricing & Discounts",
    question: "Do you sell gift cards or pre-paid vouchers?",
    answer: "Yes, we sell physical and digital Cloud Cafe gift cards. You can choose any balance from SAR 50 to SAR 500, perfect for gifting your friends."
  },
  {
    id: "pr8",
    category: "Pricing & Discounts",
    question: "Are tax and VAT included in the displayed prices?",
    answer: "Yes, all our prices listed on the menu are fully inclusive of the 15% Saudi Value Added Tax (VAT)."
  },
  {
    id: "pr9",
    category: "Pricing & Discounts",
    question: "Do you offer corporate or neighborhood business discounts?",
    answer: "Yes, employees of our neighboring offices and medical complexes in Al Malqa get a 10% discount on all weekday afternoon purchases."
  },
  {
    id: "pr10",
    category: "Pricing & Discounts",
    question: "Do you have seasonal promotions during national holidays?",
    answer: "Yes! We run great promotions during Saudi National Day, Founding Day, and Eid, including limited-edition drinks and discount bundles."
  },

  // Category 4: Location & Hours (10 items)
  {
    id: "l1",
    category: "Location & Hours",
    question: "What is the exact address of Cloud Cafe?",
    answer: "We are located on Anas Bin Malik Road, Al Malqa District, Riyadh 13521. We are situated in the central courtyard of the Plaza Mall."
  },
  {
    id: "l2",
    category: "Location & Hours",
    question: "What are your official opening hours?",
    answer: "We are open daily. Weekdays (Sunday to Wednesday): 6:00 AM to midnight. Weekends (Thursday to Saturday): 6:00 AM to 2:00 AM."
  },
  {
    id: "l3",
    category: "Location & Hours",
    question: "Are you open during Friday prayer hours?",
    answer: "We close briefly during the Friday prayer time (from 11:30 AM to 12:45 PM) and resume full operations immediately after."
  },
  {
    id: "l4",
    category: "Location & Hours",
    question: "Is there parking available near the cafe?",
    answer: "Yes, there is free front-facing parking in the main plaza lot, as well as a spacious underground parking garage with escalator access to our courtyard."
  },
  {
    id: "l5",
    category: "Location & Hours",
    question: "Do you deliver through food delivery apps?",
    answer: "Yes! You can find us and order your favorite drinks and pastries on HungerStation, Jahez, and ToYou for quick delivery straight to your doorstep."
  },
  {
    id: "l6",
    category: "Location & Hours",
    question: "Can I order ahead for pickup or curbside drive-thru?",
    answer: "Yes! You can place an order ahead by clicking our WhatsApp Business chat link, and our baristas will have it ready for you to pick up curbside."
  },
  {
    id: "l7",
    category: "Location & Hours",
    question: "Are you open during Ramadan?",
    answer: "Yes, during the holy month of Ramadan, we adjust our hours to open daily from 5:00 PM (for pick-up prep) until 3:30 AM before Suhoor."
  },
  {
    id: "l8",
    category: "Location & Hours",
    question: "Is the terrace outdoor seating open during the summer?",
    answer: "Our outdoor terrace is open year-round. In the hot summer months, we activate our high-pressure mist cooling system and large umbrellas."
  },
  {
    id: "l9",
    category: "Location & Hours",
    question: "Do you have any other branches in Saudi Arabia?",
    answer: "Our Al Malqa branch is our flagship. We are proud to announce our second branch opening soon in the Laysen Valley district!"
  },
  {
    id: "l10",
    category: "Location & Hours",
    question: "How do I find your location on Google Maps?",
    answer: "Just search 'Cloud Cafe Al Malqa' on Google Maps, or send us a message here on WhatsApp and we will send you our exact location pin."
  },

  // Category 5: Support & Policies (10 items)
  {
    id: "s1",
    category: "Support & Policies",
    question: "What is your refund/exchange policy for bad drinks?",
    answer: "If you are not 100% satisfied with your drink, please let our team know immediately. We will happily remake it or replace it with any drink of your choice."
  },
  {
    id: "s2",
    category: "Support & Policies",
    question: "How do I report a lost item left at the cafe?",
    answer: "We store all lost-and-found items in our manager's safe. Please send us your visit date, time, and a description of the item, and we'll check it right away."
  },
  {
    id: "s3",
    category: "Support & Policies",
    question: "Who should I contact to submit feedback or complaints?",
    answer: "Your feedback is highly valued! You can share your thoughts directly in this chat, or email our support management at support@cloudcafe.sa."
  },
  {
    id: "s4",
    category: "Support & Policies",
    question: "Can I book the cafe for private photoshoots or corporate events?",
    answer: "Yes, we accept private bookings for corporate meetings, workshops, and photoshoots. Please reach out to events@cloudcafe.sa for rates."
  },
  {
    id: "s5",
    category: "Support & Policies",
    question: "Is there a guest Wi-Fi password?",
    answer: "Our guest Wi-Fi is open to all customers. Simply connect to the network 'Cloud-Guest' and complete the one-click registration on the splash page."
  },
  {
    id: "s6",
    category: "Support & Policies",
    question: "Do you have wheelchair-accessible facilities?",
    answer: "Yes, our entrance, outdoor seating area, indoor lounge, and restrooms are fully wheelchair-friendly and designed with accessibility in mind."
  },
  {
    id: "s7",
    category: "Support & Policies",
    question: "How do I talk to a real human agent?",
    answer: "If you need human assistance, type 'human' or 'agent' in this chat and our on-duty manager will step in to message you directly."
  },
  {
    id: "s8",
    category: "Support & Policies",
    question: "Do you offer franchise opportunities?",
    answer: "We are currently expanding! To inquire about franchising opportunities in Saudi Arabia, please fill out the franchise form on cloudcafe.sa/franchise."
  },
  {
    id: "s9",
    category: "Support & Policies",
    question: "What sanitary and hygiene guidelines do you follow?",
    answer: "We follow strict local food health standards. Our staff sanitize all surfaces every 30 minutes, wear hairnets and gloves during prep, and undergo health checks."
  },
  {
    id: "s10",
    category: "Support & Policies",
    question: "Can I bring my pet to the cafe?",
    answer: "Pets are warmly welcomed on our outdoor garden terrace! However, due to local health municipality regulations, they are not allowed inside."
  }
];
