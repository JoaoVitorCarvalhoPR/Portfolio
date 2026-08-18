"use client"

import { useState } from "react"
import Link from "next/link"
import { games, projects, type Game, type Project } from "@/data/portfolio-data"
import { ExternalLink, Users, ThumbsUp } from "lucide-react"
import { Reveal } from "@/components/portfolio/reveal"

type Tab = "games" | "projects"

export function Work() {
  const [activeTab, setActiveTab] = useState<Tab>("games")

  return (
    <section id="work" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-4">Work</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Games and AI-powered tools I've built — from Roblox experiences to production LLM systems.
        </p>

        <div className="flex gap-2 mb-12 border border-border rounded-lg p-1 w-fit bg-card">
          <button
            onClick={() => setActiveTab("games")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "games"
                ? "bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-[0_0_20px_-6px_var(--accent)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "projects"
                ? "bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-[0_0_20px_-6px_var(--accent)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects
          </button>
        </div>

        {activeTab === "games" ? <GameGrid /> : <ProjectGrid />}
      </div>
    </section>
  )
}

function GameGrid() {
  const featuredGames = games.filter((game) => game.featured)
  const otherGames = games.filter((game) => !game.featured)

  return (
    <>
      {featuredGames.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredGames.map((game, i) => (
            <Reveal key={game.id} delay={i * 80}>
              <GameCard game={game} featured />
            </Reveal>
          ))}
        </div>
      )}

      {otherGames.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherGames.map((game, i) => (
            <Reveal key={game.id} delay={i * 80}>
              <GameCard game={game} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  )
}

function GameCard({ game, featured = false }: { game: Game; featured?: boolean }) {
  return (
    <div
      className={`group bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 hover:shadow-[0_0_40px_-14px_var(--accent)] transition-all ${
        featured ? "md:flex md:flex-row" : ""
      }`}
    >
      <div
        className={`bg-secondary aspect-video flex items-center justify-center ${
          featured ? "md:w-1/2 md:aspect-auto md:min-h-[200px]" : ""
        }`}
      >
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
          {game.imageUrl ? (
            <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">🎮</span>
          )}
        </div>
      </div>

      <div className={`p-5 ${featured ? "md:w-1/2 md:flex md:flex-col md:justify-center" : ""}`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
            {game.title}
          </h3>
          {game.robloxUrl && (
            <a
              href={game.robloxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              aria-label={`View ${game.title} on Roblox`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {game.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          {game.players && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{game.players}</span>
            </div>
          )}
          {game.likes && (
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4" />
              <span>{game.likes}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectGrid() {
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <>
      {featuredProjects.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 80}>
              <ProjectCard project={project} featured />
            </Reveal>
          ))}
        </div>
      )}

      {otherProjects.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  )
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 hover:shadow-[0_0_40px_-14px_var(--accent)] transition-all block ${
        featured ? "md:flex md:flex-row" : ""
      }`}
    >
      <div
        className={`bg-secondary aspect-video flex items-center justify-center ${
          featured ? "md:w-1/2 md:aspect-auto md:min-h-[200px]" : ""
        }`}
      >
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">{project.fallbackIcon ?? "🎮"}</span>
          )}
        </div>
      </div>

      <div className={`p-5 ${featured ? "md:w-1/2 md:flex md:flex-col md:justify-center" : ""}`}>
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
