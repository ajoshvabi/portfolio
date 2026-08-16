export type Project = {
  id?: string;
  category: string;
  title: string;
  description: string;
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
  mobile: []
};
