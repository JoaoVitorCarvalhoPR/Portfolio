import { games, type Game } from "@/data/portfolio-data"
import { ExternalLink, Users, ThumbsUp } from "lucide-react"

export function Games() {
  const featuredGames = games.filter((game) => game.featured)
  const otherGames = games.filter((game) => !game.featured)

  return (
    <section id="games" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-4">Games</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Projects and games I developed on the Roblox platform.
        </p>

        {/* Featured Games */}
        {featuredGames.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} featured />
            ))}
          </div>
        )}

        {/* Other Games */}
        {otherGames.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function GameCard({ game, featured = false }: { game: Game; featured?: boolean }) {
  return (
    <div
      className={`group bg-card border border-border rounded-lg overflow-hidden hover:border-muted-foreground/50 transition-colors ${
        featured ? "md:flex md:flex-row" : ""
      }`}
    >
      {/* Image Placeholder */}
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

      {/* Content */}
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

        {/* Stats */}
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

        {/* Tags */}
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
