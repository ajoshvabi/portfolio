import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { projectsData } from "@/data/projects";

// ── Helpers ─────────────────────────────────────────────────────────────────

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 80);
}

// ── Default seed data ────────────────────────────────────────────────────────

const defaultExperience = [
  {
    duration: "PRESENT — 2023",
    company: "Reon Technology",
    role: "Flutter Developer",
    description:
      "Leading development of cross-platform mobile applications with advanced state management and custom UI engines. Focused on performance optimisation and scalable architecture.",
    order: 1,
  },
  {
    duration: "2022 — 2023",
    company: "Softzane Solutions",
    role: "Flutter + MERN Developer",
    description:
      "Architected full-stack solutions integrating Node.js backends with Flutter frontends. Developed real-time features and secure authentication systems.",
    order: 2,
  },
  {
    duration: "2021 — 2022",
    company: "Freelance Journey",
    role: "Independent Contractor",
    description:
      "Delivered bespoke digital solutions for startups and small businesses, specialising in landing pages and MVP development.",
    order: 3,
  },
];

const defaultAbout = {
  bio: "Hi, I'm Ajosh V Abi. I am a passionate developer with a strong focus on mobile architecture and cross-platform solutions. With deep expertise in Flutter and a growing foundation in modern web technologies, I love bringing ambitious ideas to life.\n\nI believe that great software is built at the intersection of clean, maintainable code and stunning user experiences. Whether I'm building a complex dashboard or a smooth mobile application, my goal is always to create products that feel intuitive and perform flawlessly.",
  image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  stats: {
    techStacks: "5+",
    commitment: "100%",
    experienceYears: "2+",
    projectsCompleted: "15+",
  },
};

const sampleProjects = [
  {
    slug: "reon-field-ops-app",
    title: "Reon Field Ops App",
    category: "Mobile App",
    description:
      "A Flutter-based field operations management app for iOS and Android. Enables real-time task assignment, GPS tracking, and offline data capture for field technicians.",
    longDescription:
      "The Reon Field Ops App is a mission-critical Flutter application used by field service teams across multiple sites. It features real-time task assignment via Firebase Cloud Messaging, GPS location tracking with background service support, offline-first data capture using Hive (synced when connectivity is restored), and a dynamic reporting dashboard. State management is handled with Bloc, with a clean architecture separating the network, domain, and UI layers. The app targets Android (API 24+) and iOS 14+, achieving sub-2s cold start times on mid-range devices.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    github: null,
    demo: null,
    stack: ["Flutter", "Dart", "Firebase", "Bloc", "Hive"],
    theme: "primary",
    type: "mobile",
    order: 1,
    featured: true,
  },
  {
    slug: "ecom-mern-platform",
    title: "E-Commerce MERN Platform",
    category: "Web App",
    description:
      "Full-stack e-commerce platform built with MERN stack — product catalogue, Razorpay payments, admin dashboard, and order management.",
    longDescription:
      "A production-grade e-commerce platform built end-to-end with MongoDB, Express.js, React (Next.js), and Node.js. Features include: JWT-authenticated user accounts with refresh tokens, product catalogue with category filtering and full-text search, Razorpay payment gateway integration with webhook verification, admin dashboard for inventory and order management, and email notifications via Nodemailer. The React frontend uses React Query for server state and Zustand for UI state. MongoDB Atlas handles the database with indexed fields for performant queries on large catalogues.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
    github: "https://github.com/ajoshvabi",
    demo: null,
    stack: ["Node.js", "React", "MongoDB", "Express", "Razorpay"],
    theme: "secondary",
    type: "web",
    order: 2,
    featured: true,
  },
];

const sampleBlogPost = {
  title: "Why I choose Flutter for every cross-platform project in 2025",
  slug: "why-flutter-cross-platform-2025",
  excerpt:
    "Flutter has matured into the most compelling cross-platform toolkit for production mobile apps. Here's why I recommend it over React Native and native development for most projects.",
  coverImage:
    "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=800&auto=format&fit=crop",
  content: [
    {
      type: "text",
      value:
        "When a client asks me which framework to use for their mobile app, my answer is almost always Flutter. This isn't brand loyalty — it's a decision shaped by two years of shipping production apps on both platforms and watching Flutter's ecosystem mature at a remarkable pace.",
    },
    {
      type: "heading",
      level: 2,
      value: "The rendering engine advantage",
    },
    {
      type: "text",
      value:
        "The single most important difference between Flutter and React Native is how they render UI. React Native uses native platform components — which means you're always one OS update away from a rendering inconsistency. Flutter draws every pixel itself using Skia (or Impeller on newer targets), which gives you pixel-perfect consistency across Android versions and iOS device families without compromise.",
    },
    {
      type: "heading",
      level: 2,
      value: "State management has matured",
    },
    {
      type: "text",
      value:
        "The early criticism of Flutter — that the state management ecosystem was fragmented — no longer holds. Bloc gives you explicit, testable state machines for complex applications. Riverpod provides reactive dependency injection that scales from simple to complex without ceremony. Both are battle-tested in production at scale.",
    },
    {
      type: "quote",
      value:
        "Flutter lets me write code once and deliver a premium experience on both platforms. That's a genuine business advantage.",
    },
    {
      type: "heading",
      level: 2,
      value: "When I'd choose something else",
    },
    {
      type: "text",
      value:
        "Flutter is not always the right answer. If your team has strong native iOS/Android expertise and you're building a deeply platform-integrated app (think: AR features, system-level integrations), native development might serve you better. And if you already have a large React codebase and team, React Native's shared knowledge base has real value. But for most greenfield projects — especially for startups launching on both platforms — Flutter is the fastest path to a production-quality product.",
    },
  ],
  tags: ["Flutter", "Mobile Development", "Cross-Platform", "Architecture"],
  author: "Ajosh V Abi",
  published: true,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

const sampleTestimonials = [
  {
    name: "Rahul Menon",
    company: "Reon Technology",
    role: "Product Manager",
    quote:
      "Ajosh delivered the field ops app ahead of schedule with exceptional code quality. The offline sync feature alone saved our team hours of rework every week.",
    rating: 5,
    projectSlug: "reon-field-ops-app",
  },
  {
    name: "Priya Nair",
    company: "Kerala Startup",
    role: "Founder",
    quote:
      "From idea to App Store in 8 weeks. Ajosh's understanding of Flutter architecture means the codebase has been easy to extend as we've added features post-launch.",
    rating: 5,
  },
];

// ── Main seed function ────────────────────────────────────────────────────────

export async function seedFirestore() {
  try {
    // 1. Projects
    const projectsCol = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsCol);
    if (projectsSnapshot.empty) {
      console.log("Seeding projects...");
      for (const p of sampleProjects) {
        await addDoc(projectsCol, {
          ...p,
          slug: p.slug || makeSlug(p.title),
        });
      }
      // Seed legacy projectsData if populated
      for (const [idx, p] of projectsData.mobile.entries()) {
        await addDoc(projectsCol, {
          ...p,
          slug: p.slug || makeSlug(p.title),
          type: "mobile",
          featured: idx < 3,
          order: idx + 1,
        });
      }
      for (const [idx, p] of projectsData.web.entries()) {
        await addDoc(projectsCol, {
          ...p,
          slug: p.slug || makeSlug(p.title),
          type: "web",
          featured: false,
          order: idx + 1,
        });
      }
      console.log("Projects seeded!");
    } else {
      // Ensure existing projects have a slug field
      const projects = projectsSnapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as { title?: string; slug?: string; featured?: boolean; type?: string }),
      }));
      const hasFeatured = projects.some((p) => p.featured === true);
      if (!hasFeatured) {
        const mobileProjects = projects.filter((p) => p.type === "mobile");
        for (let i = 0; i < Math.min(mobileProjects.length, 3); i++) {
          const docRef = doc(db, "projects", mobileProjects[i].id);
          await setDoc(
            docRef,
            { featured: true, order: i + 1 },
            { merge: true }
          );
        }
      }
      // Backfill slugs for any project missing one
      for (const p of projects) {
        if (!p.slug && p.title) {
          const docRef = doc(db, "projects", p.id);
          await setDoc(docRef, { slug: makeSlug(p.title) }, { merge: true });
        }
      }
    }

    // 2. Experience
    const expCol = collection(db, "experience");
    const expSnapshot = await getDocs(expCol);
    if (expSnapshot.empty) {
      console.log("Seeding experience...");
      for (const e of defaultExperience) {
        await addDoc(expCol, e);
      }
      console.log("Experience seeded!");
    }

    // 3. About
    const aboutDocRef = doc(db, "about", "profile");
    const aboutSnapshot = await getDocs(collection(db, "about"));
    if (aboutSnapshot.empty) {
      console.log("Seeding about profile...");
      await setDoc(aboutDocRef, defaultAbout);
      console.log("About profile seeded!");
    }

    // 4. Sample Blog Post
    const blogsCol = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCol);
    if (blogsSnapshot.empty) {
      console.log("Seeding sample blog post...");
      await addDoc(blogsCol, sampleBlogPost);
      console.log("Blog seeded!");
    }

    // 5. Testimonials
    const testimonialsCol = collection(db, "testimonials");
    const testimonialsSnapshot = await getDocs(testimonialsCol);
    if (testimonialsSnapshot.empty) {
      console.log("Seeding testimonials...");
      for (const t of sampleTestimonials) {
        await addDoc(testimonialsCol, t);
      }
      console.log("Testimonials seeded!");
    }

    // 6. Tech Stack
    const techCol = collection(db, "tech_stack");
    const techSnapshot = await getDocs(techCol);
    if (techSnapshot.empty) {
      console.log("Seeding tech stack...");
      const defaultStack = [
        { name: "HTML", icon: "html", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 1 },
        { name: "CSS", icon: "css", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 2 },
        { name: "JavaScript", icon: "javascript", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 3 },
        { name: "Flutter", icon: "flutter", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 4 },
        { name: "Dart", icon: "code", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 5 },
        { name: "React.js", icon: "html", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 6 },
        { name: "Node.js", icon: "javascript", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 7 },
        { name: "Express.js", icon: "api", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 8 },
        { name: "MongoDB", icon: "database", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 9 },
        { name: "Redux", icon: "grid_view", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 10 },
        { name: "Firebase", icon: "local_fire_department", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 11 },
        { name: "Git", icon: "code", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 12 },
        { name: "GitHub", icon: "code", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 13 },
        { name: "Bootstrap", icon: "grid_view", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 14 },
        { name: "JWT", icon: "lock", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 15 },
        { name: "Socket.IO", icon: "chat", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 16 },
        { name: "PHP", icon: "code", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 17 },
        { name: "MySQL", icon: "database", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 18 },
        { name: "Codeigniter", icon: "code", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 19 },
        { name: "npm", icon: "settings", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 20 },
        { name: "Postman", icon: "api", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20", order: 21 },
        { name: "API", icon: "api", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20", order: 22 },
      ];
      for (const item of defaultStack) {
        await addDoc(techCol, item);
      }
      console.log("Tech stack seeded!");
    }
  } catch (error) {
    console.error("Error seeding Firestore:", error);
  }
}
