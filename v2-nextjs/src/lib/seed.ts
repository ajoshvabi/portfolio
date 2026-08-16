import { db } from "./firebase";
import { collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
import { projectsData } from "@/data/projects";

const defaultExperience = [
  {
    duration: "PRESENT — 2023",
    company: "Reon Technology",
    role: "Flutter Developer",
    description: "Leading development of cross-platform mobile applications with advanced state management and custom UI engines. Focused on performance optimization and scalable architecture.",
    order: 1,
  },
  {
    duration: "2022 — 2023",
    company: "Softzane Solutions",
    role: "Flutter + MERN Developer",
    description: "Architected full-stack solutions integrating Node.js backends with Flutter frontends. Developed real-time features and secure authentication systems.",
    order: 2,
  },
  {
    duration: "2021 — 2022",
    company: "Freelance Journey",
    role: "Independent Contractor",
    description: "Delivered bespoke digital solutions for startups and small businesses, specializing in landing pages and MVP development.",
    order: 3,
  },
];

const defaultAbout = {
  bio: "Hi, I'm Ajosh V Abi. I am a passionate developer with a strong focus on mobile architecture and cross-platform solutions. With deep expertise in Flutter and a growing foundation in modern web technologies, I love bringing ambitious ideas to life.\n\nI believe that great software is built at the intersection of clean, maintainable code and stunning user experiences. Whether I'm building a complex dashboard or a smooth mobile application, my goal is always to create products that feel intuitive and perform flawlessly.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  stats: {
    techStacks: "5+",
    commitment: "100%",
    experienceYears: "2+",
    projectsCompleted: "15+",
  }
};

export async function seedFirestore() {
  try {
    // 1. Seed Projects
    const projectsCol = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsCol);
    if (projectsSnapshot.empty) {
      console.log("Seeding projects...");
      // Seed mobile projects
      projectsData.mobile.forEach(async (p, index) => {
        await addDoc(projectsCol, { 
          ...p, 
          type: "mobile", 
          featured: index < 3, 
          order: index + 1 
        });
      });
      // Seed web projects
      projectsData.web.forEach(async (p, index) => {
        await addDoc(projectsCol, { 
          ...p, 
          type: "web", 
          featured: false, 
          order: index + 1 
        });
      });
      console.log("Projects seeded!");
    } else {
      // If database is already seeded but no projects are marked as featured, update the first 3 mobile ones
      const projects = projectsSnapshot.docs.map(d => ({ id: d.id, ...d.data() as any }));
      const hasFeatured = projects.some(p => p.featured === true);
      
      if (!hasFeatured) {
        console.log("No featured projects found in Firestore. Updating existing docs...");
        const mobileProjects = projects.filter(p => p.type === "mobile");
        
        // Update first 3 mobile projects to be featured
        for (let i = 0; i < Math.min(mobileProjects.length, 3); i++) {
          const docRef = doc(db, "projects", mobileProjects[i].id);
          await setDoc(docRef, { featured: true, order: i + 1 }, { merge: true });
        }
        console.log("Existing projects updated with featured flags!");
      }
    }

    // 2. Seed Experience
    const expCol = collection(db, "experience");
    const expSnapshot = await getDocs(expCol);
    if (expSnapshot.empty) {
      console.log("Seeding experience...");
      for (const e of defaultExperience) {
        await addDoc(expCol, e);
      }
      console.log("Experience seeded!");
    }

    // 3. Seed About Profile
    const aboutDocRef = doc(db, "about", "profile");
    const aboutSnapshot = await getDocs(collection(db, "about"));
    if (aboutSnapshot.empty) {
      console.log("Seeding about profile...");
      await setDoc(aboutDocRef, defaultAbout);
      console.log("About profile seeded!");
    }
  } catch (error) {
    console.error("Error seeding Firestore:", error);
  }
}
