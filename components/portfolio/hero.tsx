import { siteConfig, careerItems, games, projects } from "@/data/portfolio-data"
import { MapPin } from "lucide-react"

export function Hero() {
  const startYear = Math.min(...careerItems.map((item) => Number.parseInt(item.startDate, 10)))
  const yearsBuilding = new Date().getFullYear() - startYear
  const location = careerItems.find((item) => item.location)?.location

  const initials = siteConfig.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const stats = [
    { label: "Years Building", value: `${yearsBuilding}+` },
    { label: "Games Shipped", value: `${games.length}` },
    { label: "AI/LLM Projects", value: `${projects.length}` },
  ]

  return (
    <section id="about" className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 -right-24 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-10">
          <div className="shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-br from-accent to-accent-secondary shadow-[0_0_60px_-12px_var(--accent)]">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                {siteConfig.avatarUrl ? (
                  <img
                    src={siteConfig.avatarUrl}
                    alt={siteConfig.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-accent to-accent-secondary bg-clip-text text-transparent">
                    {initials}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {location && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full border border-border bg-card/50 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {location}
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
              {siteConfig.name}
            </h1>
            <p className="text-xl md:text-2xl mb-6 font-medium bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent text-balance">
              {siteConfig.title}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#work"
                className="px-6 py-3 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 transition-colors"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-secondary transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
