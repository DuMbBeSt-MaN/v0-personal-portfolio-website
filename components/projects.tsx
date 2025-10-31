"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  tech: string[]
  github: string
  demo: string
  image: string
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: "1",
      title: "AI Mood Based Playlist Generator",
      description: "Generates personalized playlists based on detected mood using AI algorithms and music APIs.",
      fullDescription:
        "An intelligent system that analyzes user mood through various inputs and recommends personalized music playlists. Features real-time mood detection, integration with popular music streaming APIs, and machine learning algorithms for accurate recommendations.",
      tech: ["Python", "TensorFlow", "React", "Node.js", "Spotify API", "ML"],
      github: "https://github.com/DuMbBeSt-MaN/AI-mood-based-song-recommender.git",
      demo: "https://ai-mood-based-song-recommender-yn86.vercel.app/",
      image: "/ai-mood-based-playlist-generator-interface.jpg",
    },
    {
      id: "2",
      title: "Faculty Slot Allocation Website",
      description: "Streamlined system for managing faculty schedules and slot allocations efficiently.",
      fullDescription:
        "A comprehensive database-driven web application designed to optimize faculty scheduling and room allocation. Features real-time availability tracking, conflict detection, and automated scheduling algorithms to maximize resource utilization.",
      tech: ["React", "Node.js", "PostgreSQL", "Express", "TailwindCSS"],
      github: "https://github.com/Hari-ghm/data_base_project.git",
      demo: "#",
      image: "/faculty-scheduling-dashboard-interface.jpg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section id="projects" className="py-20 px-6 relative">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="text-4xl md:text-5xl font-bold mb-12 text-accent" variants={itemVariants}>
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="glass glass-hover rounded-lg overflow-hidden group cursor-pointer transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-56 overflow-hidden bg-card/50">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">Click to explore</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 border border-primary/30 rounded-sm text-xs text-primary font-mono transition-all duration-300"
                      whileHover={{ backgroundColor: "rgba(0, 217, 255, 0.2)", borderColor: "rgba(0, 217, 255, 0.6)" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-primary/20">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300"
                    whileHover={{ color: "#00d9ff", x: 4 }}
                  >
                    <GithubIcon />
                    View Code
                  </motion.a>
                  {project.demo !== "#" && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300"
                      whileHover={{ color: "#00d9ff", x: 4 }}
                    >
                      <ExternalLinkIcon />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="glass rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all duration-300"
                >
                  ✕
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-accent">{selectedProject.title}</h2>
                <p className="text-muted-foreground mb-6">{selectedProject.fullDescription}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-widest">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm text-sm text-primary font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-primary/20">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-lg font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GithubIcon />
                    View on GitHub
                  </motion.a>
                  {selectedProject.demo !== "#" && (
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 217, 255, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLinkIcon />
                      Try Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
