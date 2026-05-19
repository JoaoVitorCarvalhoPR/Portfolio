import { Header } from "@/components/portfolio/header"
import { Hero } from "@/components/portfolio/hero"
import { Career } from "@/components/portfolio/career"
import { Games } from "@/components/portfolio/games"
import { Highlights } from "@/components/portfolio/highlights"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Career />
        <Games />
        <Highlights />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
