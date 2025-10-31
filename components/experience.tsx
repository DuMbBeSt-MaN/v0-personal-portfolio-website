"use client"

import { motion } from "framer-motion"

export default function Experience() {
  const experience = [
    {
      company: "Microsoft Innovations Club VITC",
      role: "Web Developer",
      period: "Oct 2025 – Present",
      description: "Building innovative web solutions and leading development initiatives.",
      skills: ["Web Development", "React", "Full Stack"],
    },
    {
      company: "Open Source Programming Club VITC",
      role: "Design Lead",
      period: "Jun 2025 – Present",
      description: "Leading design direction and team collaboration on open source projects.",
      skills: ["Team Leadership", "Graphic Design", "UI/UX", "Design Systems"],
    },
  ]

  const education = [
    {
      institution: "Vellore Institute of Technology (VIT Chennai)",
      degree: "B.Tech, Computer Science & Engineering",
      period: "Jun 2024 – Jul 2028",
      location: "Chennai, India",
    },
    {
      institution: "Sri Chaitanya College of Education",
      degree: "Senior Secondary (XII)",
      period: "May 2022 – Jun 2024",
      location: "India",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  const cardVariants = {
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
    <section id="experience" className="py-20 px-6 bg-background/50 relative">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="text-4xl md:text-5xl font-bold mb-12 text-accent" variants={itemVariants}>
          Experience & Education
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <motion.h3
              className="text-2xl font-bold mb-8 text-primary uppercase tracking-widest text-sm"
              variants={itemVariants}
            >
              // Experience
            </motion.h3>
            <div className="space-y-6">
              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass glass-hover p-6 rounded-lg transition-all duration-300"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{item.role}</h4>
                      <p className="text-primary font-mono text-sm">{item.company}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">{item.period}</p>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="text-xs px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm text-primary font-mono transition-all duration-300"
                        whileHover={{
                          backgroundColor: "rgba(0, 217, 255, 0.2)",
                          borderColor: "rgba(0, 217, 255, 0.6)",
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <motion.h3
              className="text-2xl font-bold mb-8 text-accent uppercase tracking-widest text-sm"
              variants={itemVariants}
            >
              // Education
            </motion.h3>
            <div className="space-y-6">
              {education.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass glass-hover p-6 rounded-lg transition-all duration-300"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <h4 className="text-lg font-bold text-foreground mb-1">{item.institution}</h4>
                  <p className="text-primary font-mono text-sm mb-2">{item.degree}</p>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">{item.period}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
