import { Header } from "@/components/portfolio/header"
import { Hero } from "@/components/portfolio/hero"
import { Career } from "@/components/portfolio/career"
import { Work } from "@/components/portfolio/work"
import { Highlights } from "@/components/portfolio/highlights"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[260px] h-[260px] md:w-[550px] md:h-[550px] bg-accent/8 md:bg-accent/15 rounded-full blur-[70px] md:blur-[130px]" />
        <div className="absolute top-[10%] right-[-15%] w-[280px] h-[280px] md:w-[600px] md:h-[600px] bg-accent-secondary/8 md:bg-accent-secondary/15 rounded-full blur-[70px] md:blur-[130px]" />
        <div className="absolute top-[55%] left-[15%] w-[220px] h-[220px] md:w-[450px] md:h-[450px] bg-accent/5 md:bg-accent/10 rounded-full blur-[65px] md:blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[5%] w-[240px] h-[240px] md:w-[500px] md:h-[500px] bg-accent-secondary/5 md:bg-accent-secondary/10 rounded-full blur-[70px] md:blur-[130px]" />
      </div>
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Career />
          <Work />
          <Highlights />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
