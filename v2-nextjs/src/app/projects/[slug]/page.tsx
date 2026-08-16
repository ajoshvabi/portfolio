import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/data/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const revalidate = 86400; // 24 hours ISR

export async function generateStaticParams() {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    const slugs = snapshot.docs
      .map((d) => d.data().slug as string)
      .filter(Boolean);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    const project = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() } as Project))
      .find((p) => p.slug === slug);
    return project || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — ${project.category} Project`,
    description:
      project.longDescription ||
      project.description ||
      `${project.title} — a ${project.category} project built by Ajosh V Abi using ${project.stack?.join(", ")}.`,
    alternates: { canonical: `${siteUrl}/projects/${slug}` },
    openGraph: {
      title: `${project.title} — ${project.category} | Ajosh V Abi`,
      description: project.description,
      url: `${siteUrl}/projects/${slug}`,
      images: project.image ? [{ url: project.image, alt: `${project.title} — project screenshot` }] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Person",
      name: "Ajosh V Abi",
      url: siteUrl,
    },
    ...(project.demo && { url: project.demo }),
    ...(project.image && { image: project.image }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* Cover Image */}
        {project.image && (
          <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} — ${project.category} project screenshot built by Ajosh V Abi`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/20 via-transparent to-surface-container-lowest" />
          </div>
        )}

        <div
          className={`max-w-4xl mx-auto px-6 lg:px-8 ${project.image ? "-mt-24 relative z-10" : "pt-32"} pb-24`}
        >
          {/* Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl text-xs font-bold uppercase text-outline hover:text-primary hover:border-primary/30 transition-all duration-300 group mb-8"
          >
            <span className="material-symbols-outlined text-[14px] transform group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            All Projects
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-3 py-1 bg-${project.theme || "primary"}/10 text-${project.theme || "primary"} rounded-full text-[10px] font-bold uppercase`}
              >
                {project.category}
              </span>
              {project.stack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-outline/10 text-outline rounded-full text-[10px] font-bold uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              {project.title}
            </h1>

            <p className="text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed">
              {project.longDescription || project.description}
            </p>

            {/* CTA Links */}
            <div className="flex flex-wrap gap-4 mt-8">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] px-6 py-3 rounded-xl text-xs font-bold uppercase hover:shadow-[0_0_20px_rgba(0,219,233,0.4)] transition-all group"
                >
                  Live Demo{" "}
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    open_in_new
                  </span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase border border-outline/20 dark:border-white/10 text-on-surface hover:border-primary/40 hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-sm">
                    code
                  </span>
                  GitHub
                </a>
              )}
            </div>
          </header>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* CTA */}
          <div className="glass-card rounded-2xl p-8 text-center border border-outline/10 dark:border-white/5">
            <p className="text-outline mb-4">
              Interested in building something similar?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] px-6 py-3 rounded-xl text-xs font-bold uppercase hover:shadow-[0_0_20px_rgba(0,219,233,0.4)] transition-all group"
            >
              Start a Project{" "}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
