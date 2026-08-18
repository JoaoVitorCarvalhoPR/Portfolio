import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { projects } from "@/data/portfolio-data"
import { MarkdownBody } from "@/components/portfolio/markdown-body"
import { Reveal } from "@/components/portfolio/reveal"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const filePath = path.join(process.cwd(), "content", "projects", `${project.slug}.md`)
  const content = fs.readFileSync(filePath, "utf-8")

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[550px] h-[550px] bg-accent/15 rounded-full blur-[130px]" />
        <div className="absolute top-[10%] right-[-15%] w-[600px] h-[600px] bg-accent-secondary/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[5%] w-[500px] h-[500px] bg-accent-secondary/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Work
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-4">{project.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 mb-12 border border-border rounded-md text-sm font-medium text-foreground hover:border-accent/50 hover:shadow-[0_0_30px_-12px_var(--accent)] transition-all"
            >
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </Reveal>

        <MarkdownBody content={content} />
      </div>
    </div>
  )
}
