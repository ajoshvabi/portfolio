import { Timestamp } from "firebase/firestore";

// Content block types for the block-based blog editor
export type ContentBlock =
  | { type: "text"; value: string }
  | { type: "heading"; value: string; level: 2 | 3 }
  | { type: "image"; url: string; caption?: string; align: "left" | "center" | "right" | "full" }
  | { type: "code"; value: string; language?: string }
  | { type: "quote"; value: string };

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;     // URL string (user provides the URL)
  content: ContentBlock[];
  tags: string[];
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  published: boolean;
}

// Helper to generate a URL-friendly slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 80);
}

// Estimate reading time from content blocks
export function estimateReadingTime(content: ContentBlock[]): number {
  let wordCount = 0;
  for (const block of content) {
    if (block.type === "text" || block.type === "heading" || block.type === "quote" || block.type === "code") {
      wordCount += block.value.split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200));
}
