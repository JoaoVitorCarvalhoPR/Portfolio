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

export function MarkdownBody({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function renderMermaidBlocks() {
      const container = containerRef.current
      if (!container) return

      const blocks = container.querySelectorAll<HTMLElement>("code.language-mermaid")
      if (blocks.length === 0) return

      const mermaid = (await import("mermaid")).default
      // Site's globals.css currently always renders the dark palette regardless of
      // the theme toggle, so the dark mermaid theme is what actually matches today.
      mermaid.initialize({ startOnLoad: false, theme: "dark" })

      for (const [index, block] of Array.from(blocks).entries()) {
        const definition = block.textContent ?? ""
        const id = `mermaid-diagram-${index}`
        try {
          const { svg } = await mermaid.render(id, definition)
          const wrapper = document.createElement("div")
          wrapper.className = "my-6 flex justify-center overflow-x-auto"
          wrapper.innerHTML = svg
          block.closest("pre")?.replaceWith(wrapper)
        } catch (err) {
          console.error("Failed to render mermaid diagram", err)
        }
      }
    }

    renderMermaidBlocks()
  }, [content])

  return (
    <div ref={containerRef}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
