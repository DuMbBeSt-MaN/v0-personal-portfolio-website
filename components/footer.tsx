"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/20 py-12 px-6 bg-background relative z-10">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-primary font-bold mb-3 uppercase tracking-widest text-sm">About</h4>
            <p className="text-sm text-muted-foreground">
              Full-stack developer passionate about building elegant solutions and exploring cutting-edge technologies.
            </p>
          </div>
          <div>
            <h4 className="text-primary font-bold mb-3 uppercase tracking-widest text-sm">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary font-bold mb-3 uppercase tracking-widest text-sm">Tech Stack</h4>
            <p className="text-sm text-muted-foreground font-mono">
              React • Next.js • TypeScript • TailwindCSS • Three.js • Framer Motion
            </p>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <p className="text-sm text-muted-foreground text-center font-mono">
            © {currentYear} Rohan Chandrasekar · Built with React + Next.js · Hosted on Vercel
          </p>
          <p className="text-xs text-muted-foreground/50 text-center mt-4">
            Crafted with attention to design, performance, and accessibility
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
