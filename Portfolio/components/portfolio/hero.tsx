import { siteConfig } from "@/data/portfolio-data"

export function Hero() {
  return (
    <section id="about" className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          {siteConfig.name}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-6 italic">
          {siteConfig.title}
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#games"
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
      </div>
    </section>
  )
}
