"use client"

import { useState } from "react"

interface NavigationProps {
  onNavigate: (section: string) => void
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    onNavigate(id)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          RC
        </a>

        <div className="flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
