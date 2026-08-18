"use client"

import { useState } from "react"
import { careerItems, type CareerItem } from "@/data/portfolio-data"
import { Reveal } from "@/components/portfolio/reveal"

type Tab = "experience" | "education"

export function Career() {
  const [activeTab, setActiveTab] = useState<Tab>("experience")

  const education = careerItems.filter((item) => item.type === "education")
  const experience = careerItems.filter((item) => item.type === "work")
  const items = activeTab === "experience" ? experience : education

  return (
    <section id="career" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-4">Career</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Where I&apos;ve worked and studied along the way.
        </p>

        <div className="flex gap-2 mb-12 border border-border rounded-lg p-1 w-fit bg-card">
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "experience"
                ? "bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-[0_0_20px_-6px_var(--accent)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "education"
                ? "bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-[0_0_20px_-6px_var(--accent)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Education
          </button>
        </div>

        <div className="space-y-8 max-w-2xl">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <CareerCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CareerCard({ item }: { item: CareerItem }) {
  return (
    <div className="group relative pl-5 border-l-2 border-border hover:border-accent transition-colors">
      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-border group-hover:bg-accent transition-colors" />
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
