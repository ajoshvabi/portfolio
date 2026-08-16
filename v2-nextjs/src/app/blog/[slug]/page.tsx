import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost, estimateReadingTime } from "@/data/blog";
import { BlogDetailClient } from "../BlogDetailClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const revalidate = 86400; // 24h ISR

export async function generateStaticParams() {
  try {
    const snapshot = await getDocs(collection(db, "blogs"));
    const slugs = snapshot.docs
      .filter((d) => d.data().published === true)
      .map((d) => d.data().slug as string)
      .filter(Boolean);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const snapshot = await getDocs(collection(db, "blogs"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const allPosts = await getAllPosts();
  const post = allPosts.find((p) => p.slug === slug && p.published);

  if (!post) return { title: "Post Not Found" };

  const readingTime = estimateReadingTime(post.content || []);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: post.createdAt
        ? new Date(
            (post.createdAt as unknown as { seconds: number }).seconds * 1000
          ).toISOString()
        : undefined,
      authors: [post.author || "Ajosh V Abi"],
      tags: post.tags,
      images: post.coverImage
        ? [{ url: post.coverImage, alt: `Cover image for: ${post.title}` }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
    other: {
      "article:reading_time": `${readingTime} min`,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allPosts = await getAllPosts();
  const post = allPosts.find((p) => p.slug === slug && p.published);

  if (!post) notFound();

  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.published &&
        p.tags?.some((t) => post.tags?.includes(t))
    )
    .slice(0, 2);

  // Detect test mode server-side via cookie headers instead of host port
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") || "";
  const isTestMode = cookieHeader.split(";").some(c => c.trim().startsWith("admin_session=true"));

  // BlogPosting JSON-LD schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${slug}`,
    ...(post.coverImage && { image: post.coverImage }),
    author: {
      "@type": "Person",
      name: post.author || "Ajosh V Abi",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Ajosh V Abi",
      url: siteUrl,
    },
    datePublished: post.createdAt
      ? new Date(
          (post.createdAt as unknown as { seconds: number }).seconds * 1000
        ).toISOString()
      : undefined,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <BlogDetailClient
        post={post}
        relatedPosts={relatedPosts}
        isTestMode={isTestMode}
      />
    </>
  );
}
