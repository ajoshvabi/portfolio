import type { Metadata } from "next";
import ProjectsListingClient from "./ProjectsListingClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  title: "Projects — Mobile Apps & Web Platforms",
  description:
    "Browse the full portfolio of Flutter mobile apps and MERN stack web platforms built by Ajosh V Abi — a freelance developer from Kerala, India.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects — Flutter Apps & Web Platforms | Ajosh V Abi",
    description:
      "Browse Flutter mobile apps and MERN stack web platforms built by Ajosh V Abi.",
    url: `${siteUrl}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Flutter Apps & Web Platforms | Ajosh V Abi",
    description:
      "Browse Flutter mobile apps and MERN stack web platforms built by Ajosh V Abi.",
  },
};

export default function ProjectsPage() {
  return <ProjectsListingClient />;
}
