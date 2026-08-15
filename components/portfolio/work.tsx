"use client"

import { useState } from "react"
import Link from "next/link"
import { games, projects, type Game, type Project } from "@/data/portfolio-data"
import { ExternalLink, Users, ThumbsUp } from "lucide-react"

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
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "games"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "projects"
                ? "bg-secondary text-foreground"
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
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} featured />
          ))}
        </div>
      )}

      {otherGames.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </>
  )
}

function GameCard({ game, featured = false }: { game: Game; featured?: boolean }) {
  return (
    <div
      className={`group bg-card border border-border rounded-lg overflow-hidden hover:border-muted-foreground/50 transition-colors ${
        featured ? "md:flex md:flex-row" : ""
      }`}
    >
      <div
        className={`bg-secondary aspect-video flex items-center justify-center ${
          featured ? "md:w-1/2 md:aspect-auto md:min-h-[200px]" : ""
        }`}
      >
        <div className="text-muted-foreground text-sm">
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
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>
      )}

      {otherProjects.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
      className={`group bg-card border border-border rounded-lg overflow-hidden hover:border-muted-foreground/50 transition-colors block ${
        featured ? "md:flex md:flex-row" : ""
      }`}
    >
      <div
        className={`bg-secondary aspect-video flex items-center justify-center ${
          featured ? "md:w-1/2 md:aspect-auto md:min-h-[200px]" : ""
        }`}
      >
        <div className="text-muted-foreground text-sm">
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
