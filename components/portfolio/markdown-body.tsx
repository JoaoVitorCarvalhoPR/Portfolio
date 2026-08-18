"use client"

import { useEffect, useRef } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-foreground mt-10 mb-4 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-foreground mt-10 mb-4 border-l-2 border-accent/50 pl-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline hover:text-accent transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border px-3 py-2 text-left text-foreground bg-secondary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-3 py-2 text-muted-foreground">{children}</td>
  ),
  pre: ({ children }) => (
    <pre className="bg-secondary border border-border rounded-lg p-4 overflow-x-auto mb-6 text-sm">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isFenced = Boolean(className)
    if (!isFenced) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-sm" {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

// Mermaid needs concrete colors, not CSS custom properties, so this resolves
// each token to the browser's actual computed color at render time — stays
// in sync with the site's palette instead of hardcoding a second copy of it.
// getComputedStyle() serializes the site's oklch() tokens as lab(...), which
// mermaid's internal color library can't parse — a 1x1 canvas normalizes
// whatever color syntax the browser returns down to plain rgb().
function resolveThemeColor(cssVar: string, fallback: string): string {
  const probe = document.createElement("div")
  probe.style.color = `var(${cssVar})`
  document.body.appendChild(probe)
  const raw = getComputedStyle(probe).color
  document.body.removeChild(probe)

  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx || !raw) return fallback

  ctx.fillStyle = raw
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return `rgb(${r}, ${g}, ${b})`
}

export function MarkdownBody({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    async function renderMermaidBlocks() {
      const container = containerRef.current
      if (!container) return

      const blocks = container.querySelectorAll<HTMLElement>("code.language-mermaid")
      if (blocks.length === 0) return

      const mermaid = (await import("mermaid")).default
      if (cancelled) return
      const accent = resolveThemeColor("--accent", "#a78bfa")
      const accentSecondary = resolveThemeColor("--accent-secondary", "#67e8f9")
      const foreground = resolveThemeColor("--foreground", "#f5f5f5")
      const card = resolveThemeColor("--card", "#262626")
      const border = resolveThemeColor("--border", "#3f3f3f")

      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          background: "transparent",
          primaryColor: card,
          primaryBorderColor: accent,
          primaryTextColor: foreground,
          secondaryColor: card,
          secondaryBorderColor: accentSecondary,
          tertiaryColor: card,
          lineColor: accentSecondary,
          textColor: foreground,
          mainBkg: card,
          nodeBorder: accent,
          clusterBkg: "transparent",
          clusterBorder: border,
          edgeLabelBackground: card,
          fontFamily: "inherit",
        },
      })

      for (const [index, block] of Array.from(blocks).entries()) {
        if (cancelled) return
        const definition = block.textContent ?? ""
        const id = `mermaid-diagram-${index}`
        try {
          const { svg } = await mermaid.render(id, definition)
          if (cancelled) return
          const wrapper = document.createElement("div")
          wrapper.className = "my-6 rounded-lg border border-border bg-card/40 p-4 overflow-x-auto"
          wrapper.innerHTML = svg

          // Mermaid stretches the SVG to fill its container by default, which
          // shrinks wide/tall diagrams down to illegible text. Rendering at
          // natural size + letting the wrapper scroll keeps them readable.
          const svgEl = wrapper.querySelector("svg")
          const viewBox = svgEl?.getAttribute("viewBox")
          if (svgEl && viewBox) {
            const [, , w, h] = viewBox.split(/\s+/).map(Number)
            svgEl.style.width = `${w}px`
            svgEl.style.height = `${h}px`
            svgEl.style.maxWidth = "none"
          }

          block.closest("pre")?.replaceWith(wrapper)
        } catch (err) {
          console.error("Failed to render mermaid diagram", err)
        }
      }
    }

    renderMermaidBlocks()

    return () => {
      cancelled = true
    }
  }, [content])

  return (
    <div ref={containerRef}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
