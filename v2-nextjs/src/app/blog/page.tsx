import type { Metadata } from "next";
import BlogListingClient from "./BlogListingClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  title: "Blog — Flutter, MERN & Web Development Insights",
  description:
    "Read articles, tutorials, and insights on Flutter app development, MERN stack, web performance, and software architecture by Ajosh V Abi — a freelance developer from Kerala.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog — Flutter & Web Development Insights | Ajosh V Abi",
    description:
      "Tutorials and insights on Flutter, MERN stack, web performance, and software architecture.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Flutter & Web Development Insights | Ajosh V Abi",
    description:
      "Tutorials and insights on Flutter, MERN stack, web performance, and software architecture.",
  },
};

export default function BlogPage() {
  return <BlogListingClient />;
}
