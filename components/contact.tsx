"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.725-2.004 1.426-.103.249-.129.597-.129.946v5.433h-3.555V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 2.762 0 4.77 1.776 4.77 5.592l.001 6.149zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
)

const GithubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const FileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

export default function Contact() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setEmail("")
        setMessage("")
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        setError(data.error || "Failed to send message")
      }
    } catch (err) {
      setError("Failed to send message. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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

  return (
    <section id="contact" className="py-20 px-6 relative z-10">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent" variants={itemVariants}>
          Let's Connect
        </motion.h2>

        <motion.p className="text-lg text-muted-foreground mb-12" variants={itemVariants}>
          I'm always interested in hearing about new projects and opportunities. Feel free to reach out or download my
          resume.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-4" variants={itemVariants}>
            <div>
              <label className="block text-sm text-primary font-mono uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm text-primary font-mono uppercase tracking-widest mb-2">Message</label>
              <textarea
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:border-primary/50 resize-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-mono">{error}</p>}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-background rounded-lg font-bold uppercase tracking-wide text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 217, 255, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Sending..." : submitted ? "✓ Message Sent!" : "Send Message"}
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.a
              href="mailto:skulpeace@gmail.com"
              className="glass glass-hover flex items-center gap-4 p-4 rounded-lg transition-all duration-300"
              whileHover={{ x: 8 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <MailIcon />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Email</p>
                <p className="font-bold text-foreground">skulpeace@gmail.com</p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/rohan-chandrasekar-ba45a228a"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover flex items-center gap-4 p-4 rounded-lg transition-all duration-300"
              whileHover={{ x: 8 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <LinkedinIcon />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">LinkedIn</p>
                <p className="font-bold text-foreground">Connect with me</p>
              </div>
            </motion.a>

            <motion.a
              href="https://github.com/DuMbBeSt-MaN"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover flex items-center gap-4 p-4 rounded-lg transition-all duration-300"
              whileHover={{ x: 8 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <GithubIcon />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">GitHub</p>
                <p className="font-bold text-foreground">View my projects</p>
              </div>
            </motion.a>

            {/* Resume Download */}
            <motion.a
              href="/resume.pdf"
              download
              className="glass glass-hover flex items-center gap-4 p-4 rounded-lg transition-all duration-300"
              whileHover={{ x: 8 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <FileIcon />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Resume</p>
                <p className="font-bold text-foreground">Download PDF</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
