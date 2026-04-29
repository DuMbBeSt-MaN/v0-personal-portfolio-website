"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import portfolio from "@/data/portfolio.json"

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
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const [focused, setFocused] = useState<string | null>(null)

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!name.trim()) {
      errors.name = "Name is required"
    } else if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (!email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!message.trim()) {
      errors.message = "Message is required"
    } else if (message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
    } else if (message.length > 1000) {
      errors.message = "Message must be less than 1000 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: email, message, recipientEmail: portfolio.personal.email }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setName("")
        setEmail("")
        setMessage("")
        setValidationErrors({})
        setTimeout(() => setSubmitted(false), 4000)
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

  const isFormValid = name.trim() && email.trim() && message.trim() && Object.keys(validationErrors).length === 0

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
          {portfolio.contact.title}
        </motion.h2>

        <motion.p className="text-lg text-muted-foreground mb-12" variants={itemVariants}>
          {portfolio.contact.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-4" variants={itemVariants}>
            {/* Name Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-primary font-mono uppercase tracking-widest">Name</label>
                <span className={`text-xs font-mono ${name.length > 0 ? "text-primary/60" : "text-muted-foreground"}`}>
                  {name.length}/50
                </span>
              </div>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value.slice(0, 50))
                  if (validationErrors.name) {
                    setValidationErrors({ ...validationErrors, name: "" })
                  }
                }}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                maxLength={50}
                className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ${
                  validationErrors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                    : "border-border hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/50"
                }`}
              />
              {validationErrors.name && <p className="text-red-500 text-xs mt-1 font-mono">{validationErrors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-primary font-mono uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (validationErrors.email) {
                    setValidationErrors({ ...validationErrors, email: "" })
                  }
                }}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ${
                  validationErrors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                    : "border-border hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/50"
                }`}
              />
              {validationErrors.email && <p className="text-red-500 text-xs mt-1 font-mono">{validationErrors.email}</p>}
            </div>

            {/* Message Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-primary font-mono uppercase tracking-widest">Message</label>
                <span className={`text-xs font-mono ${message.length > 0 ? "text-primary/60" : "text-muted-foreground"}`}>
                  {message.length}/1000
                </span>
              </div>
              <textarea
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value.slice(0, 1000))
                  if (validationErrors.message) {
                    setValidationErrors({ ...validationErrors, message: "" })
                  }
                }}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                maxLength={1000}
                rows={5}
                className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 resize-none ${
                  validationErrors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                    : "border-border hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/50"
                }`}
              />
              {validationErrors.message && (
                <p className="text-red-500 text-xs mt-1 font-mono">{validationErrors.message}</p>
              )}
            </div>

            {error && (
              <motion.div
                className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-500 text-sm font-mono">{error}</p>
              </motion.div>
            )}

            {submitted && (
              <motion.div
                className="p-3 bg-primary/10 border border-primary/50 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-primary text-sm font-mono">✓ Message sent successfully! I'll get back to you soon.</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-full px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-all duration-300 ${
                isFormValid
                  ? "bg-gradient-to-r from-primary to-accent text-background hover:shadow-lg"
                  : "bg-muted opacity-50 text-muted-foreground cursor-not-allowed"
              }`}
              whileHover={isFormValid ? { scale: 1.02 } : {}}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⟳</span> Sending...
                </span>
              ) : submitted ? (
                "✓ Message Sent!"
              ) : (
                "Send Message"
              )}
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.a
              href={`mailto:${portfolio.personal.email}`}
              className="glass glass-hover flex items-center gap-4 p-4 rounded-lg transition-all duration-300"
              whileHover={{ x: 8 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <MailIcon />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Email</p>
                <p className="font-bold text-foreground">{portfolio.personal.email}</p>
              </div>
            </motion.a>

            <motion.a
              href={portfolio.personal.linkedin}
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
              href={portfolio.personal.github}
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
              href={portfolio.personal.resume}
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
