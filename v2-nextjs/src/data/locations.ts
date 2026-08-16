export type CityData = {
  slug: string;
  name: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  servicesBlurb: string;
  availability: string;
  faqs: { q: string; a: string }[];
  primaryService: "Flutter" | "MERN" | "Web";
  coordinates?: { lat: number; lng: number };
};

export const cities: CityData[] = [
  {
    slug: "kochi",
    name: "Kochi",
    headline: "Flutter & Full-Stack Developer in Kochi",
    metaTitle: "Flutter & MERN Developer in Kochi, Kerala | Ajosh V Abi",
    metaDescription:
      "Looking for a Flutter or MERN stack developer in Kochi? Ajosh V Abi delivers premium cross-platform mobile apps and full-stack web platforms for Kochi-based businesses. Remote & onsite available.",
    intro:
      "Kochi is Kerala's commercial capital and one of South India's fastest-growing technology hubs, home to established IT parks like SmartCity Kochi, Infopark, and a flourishing startup ecosystem. As a Flutter and MERN stack developer based here, I work closely with Kochi-based startups, SMEs, and enterprises that need reliable, high-performance digital products — whether that's a cross-platform mobile app for their field teams, a customer-facing SaaS platform, or a complete e-commerce solution built to scale. The city's blend of traditional business sectors (shipping, logistics, finance, tourism) and modern tech ambitions creates a unique demand for digital tools that bridge operational complexity with exceptional user experience.",
    servicesBlurb:
      "For Kochi clients, my most in-demand service is Flutter app development — building iOS and Android apps from a single codebase that look and perform like native applications. Many local businesses are digitising their operations for the first time, and Flutter is an ideal choice: it delivers premium UX at a fraction of the cost of separate native builds, and I can take a project from design brief to App Store submission within weeks, not months. On the web side, I specialise in MERN stack platforms — Node.js APIs, React dashboards, and MongoDB databases — that handle real business complexity while remaining maintainable as your team grows.",
    availability:
      "I am fully available for remote engagements with Kochi-based clients, with flexible working hours to accommodate your team's schedule. For projects that benefit from in-person collaboration — discovery workshops, design sprints, or regular check-ins — I am available for onsite visits across the Ernakulam district, including Kakkanad, Edappally, Fort Kochi, and surrounding areas.",
    primaryService: "Flutter",
    faqs: [
      {
        q: "Are you available for onsite work in Kochi?",
        a: "Yes — while most of my work is remote, I'm happy to meet onsite in Kochi and the broader Ernakulam district for workshops, sprint reviews, or regular check-ins. This works especially well for the early discovery phase of a project.",
      },
      {
        q: "Do you work with Kochi-based startups at early stages?",
        a: "Absolutely. I regularly work with early-stage startups that need to validate an idea quickly with an MVP. I can help you scope a lean first version, build it, and iterate based on user feedback — all within a startup-friendly budget.",
      },
      {
        q: "Can you build a Flutter app that integrates with local payment gateways?",
        a: "Yes — I have experience integrating Razorpay (widely used in India) into both Flutter mobile apps and Node.js backends. I can also integrate UPI, net banking, and wallet options as required.",
      },
      {
        q: "How do I get started with a project?",
        a: "The easiest way is to send me a brief via the contact form or WhatsApp. I'll review it and respond within 24 hours with initial thoughts and a request for a 30-minute discovery call where we'll map out your requirements, timeline, and budget.",
      },
    ],
    coordinates: { lat: 9.9312, lng: 76.2673 },
  },
  {
    slug: "kozhikode",
    name: "Kozhikode",
    headline: "Flutter & Web Developer in Kozhikode (Calicut)",
    metaTitle: "Flutter & Web Developer in Kozhikode, Kerala | Ajosh V Abi",
    metaDescription:
      "Professional Flutter app and web development services for businesses in Kozhikode (Calicut), Kerala. Ajosh V Abi delivers scalable mobile apps and modern web platforms remotely.",
    intro:
      "Kozhikode — historically known as Calicut — is the business and commercial hub of Malabar and one of Kerala's most economically active cities. With IIT Kozhikode in its backyard and a thriving entrepreneurial culture, the city is increasingly turning to technology to modernise traditional industries like textiles, spices, tourism, and retail. I provide Flutter app development and custom web development services to Kozhikode-based businesses that want to compete digitally — from e-commerce platforms serving the city's busy retail sector to mobile apps that help service businesses manage bookings, staff, and customers more efficiently.",
    servicesBlurb:
      "For businesses in Kozhikode, I specialise in web development using Next.js — building fast, SEO-optimised websites and web platforms that attract customers through organic search rather than paid advertising. Many Kozhikode businesses have a strong local reputation but limited online visibility; a well-built website with proper technical SEO changes that equation dramatically. I also build Flutter apps for businesses looking to launch customer loyalty programmes, delivery tracking apps, or staff management tools that work seamlessly on both Android and iOS.",
    availability:
      "I work fully remotely with clients in Kozhikode, which means there is no geographical constraint on collaboration. All project communication happens via video calls, shared documents, and project management tools that give you full visibility into progress. For Kozhikode clients with a preference for periodic in-person meetings, I can discuss travel arrangements for major milestones.",
    primaryService: "Web",
    faqs: [
      {
        q: "Can you build a website for my Kozhikode-based retail or hospitality business?",
        a: "Yes — retail, hospitality, and tourism are among the sectors I've worked with. I can build a marketing website, online booking system, or e-commerce store tailored to your business model, with SEO set up from day one to help local customers find you.",
      },
      {
        q: "I'm based in Calicut but need a developer — does distance matter?",
        a: "Not at all. All my project work is structured for remote collaboration. You'll have a clear communication channel, regular updates, and full access to the codebase from day one. Most of my clients across Kerala find this setup works better than dealing with a local agency.",
      },
      {
        q: "Do you support Malayalam or bilingual websites?",
        a: "Yes — I can build websites that support both English and Malayalam content, with proper font support for Malayalam script and language routing if needed.",
      },
      {
        q: "What's a realistic budget for a Flutter app for my Kozhikode SME?",
        a: "Budget depends on feature complexity, but a well-scoped MVP for a small business — covering core features, a simple backend API, and App Store submissions — typically falls in the ₹1.5L–4L range. I'll give you a detailed estimate after a free discovery call.",
      },
    ],
    coordinates: { lat: 11.2588, lng: 75.7804 },
  },
  {
    slug: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    headline: "Flutter & MERN Developer in Thiruvananthapuram (Trivandrum)",
    metaTitle:
      "Flutter & MERN Developer in Thiruvananthapuram, Kerala | Ajosh V Abi",
    metaDescription:
      "Experienced Flutter and MERN stack developer serving Thiruvananthapuram (Trivandrum). Build mobile apps and web platforms for Technopark companies, government projects, and startups in Kerala's capital.",
    intro:
      "Thiruvananthapuram, Kerala's state capital, is home to Technopark — one of the largest IT parks in India — and a concentration of government technology initiatives, defence research, and space science establishments like ISRO VSSC. The city's tech ecosystem spans Fortune 500 company campuses, innovative startups, and a growing freelance developer community. I provide Flutter and MERN stack development services to Trivandrum-based businesses, agencies, and government-adjacent projects that need high-quality digital products — from mobile apps for field operations to secure web platforms for data management and public-facing services.",
    servicesBlurb:
      "Thiruvananthapuram's technology sector has a particularly strong demand for well-architected MERN stack applications — secure, role-based web platforms that handle complex workflows for organisations with multiple user types. I build these systems with a focus on security (JWT authentication, input validation, audit logs), performance, and clean architecture that makes future maintenance straightforward. For startups and consumer-facing businesses, Flutter app development is the fastest route to market with a premium product on both iOS and Android simultaneously.",
    availability:
      "All work is conducted remotely, which is a natural fit for Thiruvananthapuram's technology sector where distributed teams are the norm. I operate on flexible hours and adapt to your team's working rhythm. Project management is handled through tools like Notion, Linear, or your preferred platform so you always have full transparency.",
    primaryService: "MERN",
    faqs: [
      {
        q: "Can you work with Technopark companies in Trivandrum?",
        a: "Yes — I'm open to both direct freelance engagements and subcontracting through Technopark-based agencies or IT companies that need additional development capacity for client projects.",
      },
      {
        q: "Do you have experience with government or public sector web projects?",
        a: "I have experience building secure, accessible web platforms that meet public sector requirements — proper WCAG accessibility compliance, bilingual content support, and secure data handling. Government-adjacent projects have specific requirements I'm happy to discuss.",
      },
      {
        q: "How do you handle project documentation?",
        a: "Every project includes technical documentation covering the architecture, API endpoints, database schema, environment setup, and deployment process. This is included as standard, not an add-on, so handoffs to internal teams are straightforward.",
      },
      {
        q: "Are you available for long-term retainer contracts?",
        a: "Yes — I offer monthly retainer arrangements for ongoing development, maintenance, and feature additions. This is particularly popular with Technopark companies that need a reliable external developer without the overhead of a full-time hire.",
      },
    ],
    coordinates: { lat: 8.5241, lng: 76.9366 },
  },
  {
    slug: "thrissur",
    name: "Thrissur",
    headline: "Flutter & Web Developer in Thrissur",
    metaTitle: "Flutter & Web Developer in Thrissur, Kerala | Ajosh V Abi",
    metaDescription:
      "Professional Flutter app and web development for businesses in Thrissur, Kerala. Ajosh V Abi builds mobile apps and modern websites for Thrissur's gold, retail, education, and healthcare sectors.",
    intro:
      "Thrissur — Kerala's cultural capital — is also one of its most commercially active cities, known nationally for its gold and jewellery sector, flourishing retail trade, educational institutions, and a strong healthcare ecosystem. As a developer serving Thrissur-based clients, I help traditional businesses in these sectors modernise through technology: customer-facing mobile apps, staff management platforms, e-commerce stores, and appointment booking systems that bring established operations into the digital age without disrupting what already works.",
    servicesBlurb:
      "For Thrissur's gold and jewellery businesses, I build custom Flutter apps with product catalogues, appointment booking, and loyalty programme features that work offline as well as online — critical for showroom environments where reliable internet isn't guaranteed. For educational institutions, I develop web platforms for student management, fee collection, and learning content delivery. Healthcare providers benefit from appointment and queue management apps built on Flutter that reduce front-desk load and improve patient experience.",
    availability:
      "I work fully remotely with Thrissur clients, offering the same level of engagement and responsiveness as an in-city developer. All project updates, code reviews, and milestones are communicated through clear, scheduled touchpoints so you're never in the dark about progress.",
    primaryService: "Flutter",
    faqs: [
      {
        q: "Can you build a jewellery store app for my Thrissur business?",
        a: "Yes — I've worked on retail and product catalogue apps and understand the specific needs of the jewellery sector: high-quality image display, gold rate updates, product search and filtering, wishlist features, and WhatsApp integration for enquiries.",
      },
      {
        q: "Do you build apps in Malayalam?",
        a: "Yes — I can build Flutter apps with full Malayalam language support, including proper rendering of the Malayalam script and bilingual UI where needed.",
      },
      {
        q: "Can you build a website for my Thrissur institution or business?",
        a: "Absolutely. I build SEO-optimised websites for educational institutions, healthcare providers, retailers, and professional services using Next.js. A well-built site dramatically improves your visibility in local search results.",
      },
      {
        q: "How do I share my requirements if I'm not technical?",
        a: "Non-technical briefs are perfectly fine — in fact, most of my clients start with just a description of the problem they want to solve. I'll translate your business requirements into a technical scope and explain it in plain language before we begin.",
      },
    ],
    coordinates: { lat: 10.5276, lng: 76.2144 },
  },
  {
    slug: "kannur",
    name: "Kannur",
    headline: "Flutter & Web Developer in Kannur",
    metaTitle: "Flutter & Web Developer in Kannur, Kerala | Ajosh V Abi",
    metaDescription:
      "Flutter app and web development services for businesses in Kannur, Kerala. Mobile apps, e-commerce platforms, and custom websites tailored for Kannur's tourism, handloom, and retail sectors.",
    intro:
      "Kannur, in northern Kerala, is a district defined by its natural beauty, handloom heritage, and tourism potential. The district's economy spans textile manufacturing, cashew processing, small retail, and a growing tourism industry anchored by its beaches, forts, and theyyam culture. I help Kannur-based businesses leverage technology to reach wider audiences — whether that's an e-commerce platform for handloom products that can sell to customers across India, a tourism booking app, or a B2B web platform for a manufacturer looking to digitise their sales process.",
    servicesBlurb:
      "For Kannur's handloom and textile businesses, I build web platforms and Flutter apps that showcase products beautifully and simplify the ordering process for both retail and wholesale customers. Tourism operators benefit from custom booking and itinerary management apps that work on low-bandwidth connections common in scenic but remote locations. For local retailers and service businesses, a well-built website with local SEO is often the highest-ROI digital investment — and I build these with performance and Google rankings as a core design constraint, not an afterthought.",
    availability:
      "All client work is managed remotely. Kannur's geography makes remote collaboration not just convenient but optimal — I can be as responsive and involved as a local developer, without the logistics overhead. Deliverables, updates, and feedback cycles are structured to respect your time.",
    primaryService: "Web",
    faqs: [
      {
        q: "Can you help my Kannur handloom business sell online?",
        a: "Yes — I can build a custom e-commerce platform or integrate with Shopify/WooCommerce, with product photography guidance, SEO optimisation for relevant search terms, and payment gateway integration (Razorpay, UPI). Many handloom businesses have found strong national demand once they've made their products discoverable online.",
      },
      {
        q: "I run a homestay or tourism business — can you build a booking website?",
        a: "Absolutely. I build tourism and homestay websites with online booking forms, availability calendars, WhatsApp integration, and local SEO targeting travellers searching for stays or activities in Kannur.",
      },
      {
        q: "Do you offer website maintenance after delivery?",
        a: "Yes — I offer monthly maintenance packages covering content updates, plugin/dependency updates, security patches, and minor design changes. This is optional but recommended for businesses that don't have in-house technical staff.",
      },
      {
        q: "What's the typical turnaround for a small business website?",
        a: "A standard 5–8 page business website with contact form, SEO setup, and mobile-responsive design typically takes 2–3 weeks from project kickoff to launch, provided content (text and images) is ready.",
      },
    ],
    coordinates: { lat: 11.8745, lng: 75.3704 },
  },
  {
    slug: "kollam",
    name: "Kollam",
    headline: "Flutter & Web Developer in Kollam",
    metaTitle: "Flutter & Web Developer in Kollam, Kerala | Ajosh V Abi",
    metaDescription:
      "Flutter app and web development services for businesses in Kollam, Kerala. B2B platforms, mobile apps, and websites for Kollam's cashew, shipping, and retail industries.",
    intro:
      "Kollam is one of Kerala's major commercial cities, known internationally for its cashew industry, active fishing port, and Ashtamudi Lake backwater tourism. The city's B2B orientation — many businesses dealing in bulk commodities, logistics, and export — creates a specific demand for professional web platforms and business management tools. I build these systems for Kollam-based businesses: procurement portals, inventory management apps, customer-facing booking platforms, and informational websites that help exporters and manufacturers present themselves credibly to international buyers and domestic partners.",
    servicesBlurb:
      "For Kollam's export and B2B sector, I specialise in building MERN stack web platforms — secure portals where buyers can browse catalogues, request quotes, and track orders. These applications are architected for reliability and security, with role-based access control so different user types see only what they need. For the tourism and hospitality businesses around Ashtamudi Lake, Flutter apps and booking websites help attract and manage visitors more efficiently. Local retailers benefit from Flutter-powered loyalty and ordering apps that encourage repeat business.",
    availability:
      "All work is delivered remotely with structured communication milestones. I'm comfortable working with clients in Kollam's business-oriented environment, adapting deliverables and meeting schedules to fit around your operational calendar.",
    primaryService: "MERN",
    faqs: [
      {
        q: "Can you build a B2B portal for my Kollam export business?",
        a: "Yes — B2B web platforms are a speciality. I can build catalogue management, RFQ (request for quote) systems, order tracking portals, and admin dashboards using Node.js and React, with secure user authentication and role-based access.",
      },
      {
        q: "Do you build apps for fisheries or port-related operations?",
        a: "Yes — logistics, inventory, and operational management apps are well within scope. Flutter is particularly good for operational apps used by field workers because it works on low-end Android devices and can handle offline data sync.",
      },
      {
        q: "Can you build a backwater tourism booking website?",
        a: "Absolutely. I can build a tourism website with online booking, availability management, WhatsApp enquiry integration, and local SEO targeting both Indian and international travellers searching for Kollam backwater experiences.",
      },
      {
        q: "How do you handle client communication when working remotely?",
        a: "I use video calls for kickoffs, milestone reviews, and feedback sessions. Day-to-day updates happen via WhatsApp or email. You'll always know the current status of your project and what's happening next.",
      },
    ],
    coordinates: { lat: 8.8932, lng: 76.6141 },
  },
  {
    slug: "palakkad",
    name: "Palakkad",
    headline: "Flutter & Web Developer in Palakkad",
    metaTitle: "Flutter & Web Developer in Palakkad, Kerala | Ajosh V Abi",
    metaDescription:
      "Flutter app development and web development services for businesses in Palakkad, Kerala. Custom mobile apps and websites for Palakkad's agricultural, manufacturing, and retail sectors.",
    intro:
      "Palakkad, situated at the famous Palakkad Gap between the Western Ghats, is an agricultural and manufacturing hub with a distinct character shaped by its connection to both Kerala's plantation economy and Tamil Nadu's industrial belt. The district's businesses span rice mills, steel fabrication, agri-processing, textiles, and a network of small and medium enterprises that are increasingly looking to technology to scale. I serve Palakkad-based SMEs and agricultural businesses with Flutter app development and custom web solutions that address the specific operational challenges of sectors where digitisation is still relatively early-stage.",
    servicesBlurb:
      "For Palakkad's agricultural and manufacturing clients, I build Flutter-based inventory and logistics management apps — rugged, reliable tools that work on affordable Android devices and handle offline data when connectivity is inconsistent. For businesses with a retail component, e-commerce websites and customer apps help access markets beyond the local region. Web development projects for Palakkad clients typically focus on B2B credibility — a professional website that helps a manufacturer communicate their capabilities to buyers in Coimbatore, Chennai, or Kochi who are making supplier decisions.",
    availability:
      "Remote-first engagement with Palakkad clients. Given the district's proximity to Tamil Nadu and its mixed business environment, I'm comfortable coordinating with Tamil-speaking stakeholders and cross-border supply chain contexts where relevant.",
    primaryService: "Flutter",
    faqs: [
      {
        q: "Can you build a mobile app for agricultural or supply-chain operations?",
        a: "Yes — supply chain, inventory, and agricultural management apps are well within scope. I can build Flutter apps with offline-first data sync (important for farm locations with unreliable connectivity), barcode/QR scanning, and reporting dashboards.",
      },
      {
        q: "My business is small — is custom development worth it for me?",
        a: "It depends on your specific needs. For very simple requirements, I'll honestly recommend an off-the-shelf solution if it fits. For anything involving custom workflows, specific data models, or integrations with existing systems, custom development usually pays for itself quickly through operational efficiency gains.",
      },
      {
        q: "Can you build a website that ranks well in both Kerala and Tamil Nadu search results?",
        a: "Yes — local SEO for businesses operating across state borders is something I can address with proper hreflang handling, location-specific landing pages, and content targeting both markets.",
      },
      {
        q: "What languages do you work in for client communication?",
        a: "English primarily, but I can manage basic communication in Malayalam. For technical discussions, English is always clearest and what I recommend for documentation purposes.",
      },
    ],
    coordinates: { lat: 10.7867, lng: 76.6548 },
  },
  {
    slug: "kasaragod",
    name: "Kasaragod",
    headline: "Flutter & Web Developer in Kasaragod",
    metaTitle: "Flutter & Web Developer in Kasaragod, Kerala | Ajosh V Abi",
    metaDescription:
      "Flutter app and web development services for businesses in Kasaragod, Kerala. Mobile apps, tourism websites, and custom web platforms for Kerala's northernmost district.",
    intro:
      "Kasaragod, Kerala's northernmost district, is a land of extraordinary linguistic and cultural diversity — home to speakers of Malayalam, Tulu, Kannada, Konkani, and Beary. Economically, the district is defined by cashew processing, coir, tourism (particularly its forts, beaches, and Theyyam traditions), and a significant NRI-remittance-driven economy. I help Kasaragod businesses establish and grow their digital presence — from professional websites that help tourism operators attract visitors from across India and abroad, to Flutter apps that modernise cashew and coir industry operations.",
    servicesBlurb:
      "Tourism is one of the clearest digital opportunities for Kasaragod's economy. Travellers searching for unexplored Kerala destinations are increasingly finding Kasaragod — and businesses that have a professional web presence with good local SEO are capturing this growing traffic. I build tourism websites and Flutter booking apps that help homestays, resorts, and experience operators convert online discovery into confirmed bookings. For MSME businesses in cashew and coir, custom web platforms and inventory apps provide the operational visibility needed to scale beyond local markets.",
    availability:
      "Fully remote engagement. Kasaragod's distance from Kerala's main IT hubs makes remote collaboration not just a convenience but an enabling factor — it gives Kasaragod businesses access to the same quality of development talent as businesses in Kochi or Thiruvananthapuram.",
    primaryService: "Web",
    faqs: [
      {
        q: "Can you help my Kasaragod tourism business get more online bookings?",
        a: "Yes — a combination of a well-built, fast website with local SEO optimisation (targeting searches like 'places to visit in Kasaragod', 'best homestay Kasaragod') and an online booking system is highly effective. I build these with mobile-first design since most tourists discover options on their phones.",
      },
      {
        q: "My business spans both Kerala and Karnataka — can you handle that?",
        a: "Yes — for businesses operating across the Kerala-Karnataka border, I can build websites with appropriate location pages for both states, handle multi-currency or multi-language requirements if needed, and ensure SEO targets both regional markets.",
      },
      {
        q: "Are you available for initial consultation calls in the evening?",
        a: "Yes — I'm flexible with call timings, including evenings and weekends for initial discovery conversations. Once we're aligned on requirements, we'll set a working schedule that suits your availability.",
      },
      {
        q: "Can you build a website quickly if I have an event or season coming up?",
        a: "If you have a firm deadline (like the start of tourist season or a product launch), tell me upfront and we'll design the scope around it. A functional MVP website can often be live within 7–10 days if requirements are clear and content is ready.",
      },
    ],
    coordinates: { lat: 12.4996, lng: 74.9869 },
  },
  {
    slug: "ernakulam",
    name: "Ernakulam",
    headline: "Flutter & Full-Stack Developer in Ernakulam",
    metaTitle: "Flutter & MERN Developer in Ernakulam, Kerala | Ajosh V Abi",
    metaDescription:
      "Flutter app development and MERN stack web platforms for businesses in Ernakulam district, Kerala. Onsite and remote engagements available across Ernakulam, Kakkanad, Aluva, and surrounding areas.",
    intro:
      "Ernakulam district — the urban core of the Greater Kochi metropolitan area — is Kerala's most economically dense region, encompassing the IT hubs of Kakkanad and Infopark, the commercial centres of MG Road and Broadway, the port and logistics sector, and a vast network of service businesses, healthcare providers, educational institutions, and retail establishments. As a developer based in this district, I serve the full spectrum of Ernakulam's business landscape: tech startups needing a CTO-lite partner for their MVP, established businesses that want to modernise their customer-facing tools, and agencies that need additional development capacity for their client projects.",
    servicesBlurb:
      "For Ernakulam's IT and startup community, I specialise in Flutter for consumer and B2B mobile apps — products that need to be delivered fast, look premium, and scale well. Many Ernakulam-based startups have validated their ideas and are now moving to mobile-first products; Flutter is my primary recommendation for this stage. For businesses in logistics, healthcare, and finance — sectors well-represented in Ernakulam — MERN stack web platforms with role-based access, complex data models, and integrations with third-party systems are a core capability I bring to every project.",
    availability:
      "I am available both remotely and for onsite engagements across Ernakulam district — including Kakkanad, Edappally, Aluva, Perumbavoor, Angamaly, and Muvattupuzha. Onsite availability makes sprint planning, design reviews, and team integration particularly smooth for longer-term engagements.",
    primaryService: "Flutter",
    faqs: [
      {
        q: "Do you work with IT companies in Infopark or Smartcity Kochi as a subcontractor?",
        a: "Yes — I'm open to subcontracting arrangements with IT companies in Kakkanad-based parks. This is a common engagement model for augmenting internal teams with specialised Flutter or MERN expertise on specific projects.",
      },
      {
        q: "Can you join our team on a dedicated basis for a fixed period?",
        a: "Yes — I offer dedicated engagement models (full-time equivalent for a defined period) in addition to standard project-based work. This is suitable for companies that need sustained development velocity without the overhead of a permanent hire.",
      },
      {
        q: "Are you available for quick turnaround projects in Ernakulam?",
        a: "If I have availability, yes. Short-duration, well-scoped projects are something I enjoy because they demand clarity and efficiency from both sides. Share your requirements and I'll give you an honest timeline.",
      },
      {
        q: "Do you offer NDAs and standard freelance contracts?",
        a: "Yes — all projects begin with a signed agreement covering scope, deliverables, payment terms, intellectual property transfer, and confidentiality. I have standard templates that satisfy most client legal requirements and can adapt to yours if needed.",
      },
    ],
    coordinates: { lat: 9.9816, lng: 76.2999 },
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export const citySlugs = cities.map((c) => c.slug);
