"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function About() {
  const skills = {
    languages: ["JavaScript", "TypeScript", "Python", "SQL", "C++", "HTML/CSS"],
    frameworks: ["React", "Next.js", "Vite", "TailwindCSS", "Framer Motion", "Three.js"],
    tools: ["Git", "Docker", "VS Code", "Figma", "Vercel", "Webpack"],
  }

  const taglines = [
    { text: "Web Developer", article: "a" },
    { text: "AI/ML Explorer", article: "an" },
    { text: "Design Lead", article: "a" },
    { text: "Open Source Contributor", article: "an" },
  ]
  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const skillCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -8,
      boxShadow: "0 0 30px rgba(0, 217, 255, 0.3), inset 0 0 20px rgba(0, 217, 255, 0.05)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="about" className="py-20 px-6 bg-background/50 relative">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent" variants={itemVariants}>
          About Me
        </motion.h2>

        <motion.div className="mb-8 flex items-baseline gap-3" variants={itemVariants}>
          <p className="text-lg md:text-xl text-muted-foreground">I'm</p>
          <motion.div
            className="text-lg md:text-xl font-bold text-primary"
            key={currentTagline}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {taglines[currentTagline].article} {taglines[currentTagline].text}
          </motion.div>
        </motion.div>

        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-3xl mb-12 leading-relaxed"
          variants={itemVariants}
        >
          Passionate about building elegant solutions that combine design and functionality. Currently exploring AI/ML
          applications while leading design initiatives at OSPC and developing at Microsoft Innovations Club. Committed
          to open source and continuously pushing the boundaries of web development.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              className="glass glass-hover p-6 rounded-lg transition-all duration-300"
              variants={skillCardVariants}
              whileHover="hover"
            >
              <h3 className="text-primary font-bold mb-4 capitalize text-sm tracking-widest uppercase">{category}</h3>
              <ul className="space-y-3">
                {items.map((skill) => (
                  <motion.li
                    key={skill}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                    whileHover={{ x: 4, color: "#00d9ff" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex gap-3 flex-wrap" variants={itemVariants}>
          {["Full-Stack", "UI/UX", "Performance", "Scalability"].map((tag, index) => (
            <motion.span
              key={tag}
              className="px-4 py-2 glass rounded-lg text-sm text-primary border border-primary/50 font-mono transition-all duration-300 cursor-pointer"
              whileHover={{
                scale: 1.08,
                borderColor: "rgba(0, 217, 255, 0.8)",
                boxShadow: "0 0 20px rgba(0, 217, 255, 0.2)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {"// " + tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
