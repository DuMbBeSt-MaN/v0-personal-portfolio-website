"use client"
import { useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import InteractiveBackground from "@/components/interactive-background"
import About from "@/components/about"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  const handleNavigation = (section: string) => {
    setActiveSection(section)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <InteractiveBackground />
      <Navigation onNavigate={handleNavigation} />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
