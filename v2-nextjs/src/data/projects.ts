export type Project = {
  id?: string;
  slug?: string;           // URL-friendly identifier for /projects/[slug]
  category: string;
  title: string;
  description: string;
  longDescription?: string; // Extended description for the detail page
  image: string;
  github: string | null;
  demo: string | null;
  stack: string[];
  theme?: "primary" | "secondary";
  order?: number;
  featured?: boolean;
  type?: "mobile" | "web";
};

export const projectsData: { web: Project[]; mobile: Project[] } = {
  web: [],
  mobile: [],
};
