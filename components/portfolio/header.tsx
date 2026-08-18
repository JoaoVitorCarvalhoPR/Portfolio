"use client"

import { siteConfig } from "@/data/portfolio-data"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#career", label: "Career" },
  { href: "#work", label: "Work" },
  { href: "#highlights", label: "Highlights" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 text-lg font-medium text-foreground transition-colors">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-accent to-accent-secondary shadow-[0_0_12px_-1px_var(--accent)]" />
          {siteConfig.name}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent to-accent-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="md:hidden">
      <input type="checkbox" id="mobile-menu" className="hidden peer" />
      <label
        htmlFor="mobile-menu"
        className="flex flex-col gap-1.5 cursor-pointer p-2"
      >
        <span className="w-5 h-0.5 bg-foreground transition-all peer-checked:rotate-45 peer-checked:translate-y-2" />
        <span className="w-5 h-0.5 bg-foreground transition-all peer-checked:opacity-0" />
        <span className="w-5 h-0.5 bg-foreground transition-all peer-checked:-rotate-45 peer-checked:-translate-y-2" />
      </label>
      <nav className="hidden peer-checked:flex flex-col absolute top-full left-0 right-0 bg-background border-b border-border p-6 gap-4">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
