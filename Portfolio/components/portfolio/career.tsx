import { careerItems, type CareerItem } from "@/data/portfolio-data"
import { GraduationCap, Briefcase } from "lucide-react"

export function Career() {
  const education = careerItems.filter((item) => item.type === "education")
  const work = careerItems.filter((item) => item.type === "work")

  return (
    <section id="career" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-12">Career</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((item) => (
                <CareerCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground">Experience</h3>
            </div>
            <div className="space-y-6">
              {work.map((item) => (
                <CareerCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CareerCard({ item }: { item: CareerItem }) {
  return (
    <div className="group">
      <div className="text-sm text-muted-foreground mb-1">
        {item.startDate} — {item.endDate || "Present"}
      </div>
      <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
        {item.title}
      </h4>
      <p className="text-muted-foreground text-sm mb-2">{item.organization}</p>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {item.description}
      </p>
      {item.skills && item.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
