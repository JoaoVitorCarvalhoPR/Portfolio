import { highlights, type Highlight } from "@/data/portfolio-data"
import { Trophy, Mic, Plane, Award, Target } from "lucide-react"

const iconMap: Record<Highlight["type"], React.ReactNode> = {
  achievement: <Trophy className="w-5 h-5" />,
  talk: <Mic className="w-5 h-5" />,
  travel: <Plane className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
  milestone: <Target className="w-5 h-5" />,
}

export function Highlights() {
  return (
    <section id="highlights" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-4">Highlights</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Achievements, talks, travels, and important milestones of my journey.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight) => (
            <HighlightCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HighlightCard({ highlight }: { highlight: Highlight }) {
  return (
    <div className="group p-5 bg-card border border-border rounded-lg hover:border-muted-foreground/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-secondary rounded-md text-muted-foreground group-hover:text-accent transition-colors">
          {iconMap[highlight.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-muted-foreground mb-1">{highlight.date}</div>
          <h3 className="font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
            {highlight.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {highlight.description}
          </p>
        </div>
      </div>
    </div>
  )
}
