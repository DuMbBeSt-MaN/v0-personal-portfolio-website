"use client"

import { useEffect, useRef } from "react"
import { useScroll } from "framer-motion"

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollY } = useScroll()
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      baseX: number
      baseY: number
    }>
  >([])
  const mousePos = useRef({ x: 0, y: 0 })
  const lastScrollProgress = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const initializeParticles = () => {
      const particles = particlesRef.current
      particles.length = 0
      for (let i = 0; i < 120; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.1,
          baseX: x,
          baseY: y,
        })
      }
    }

    initializeParticles()

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      // Clear canvas with slight transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const currentScroll = scrollY.get()
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = documentHeight > 0 ? Math.min(currentScroll / documentHeight, 1) : 0
      const scrollDirection = scrollProgress > lastScrollProgress.current ? 1 : -1
      lastScrollProgress.current = scrollProgress

      if (scrollProgress === 0 && lastScrollProgress.current > 0.01) {
        initializeParticles()
      }

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      particlesRef.current.forEach((particle, i) => {
        const scrollInfluence = scrollProgress * 2
        const towardsCenterX = (centerX - particle.baseX) * scrollInfluence * 0.2
        const towardsCenterY = (centerY - particle.baseY) * scrollInfluence * 0.2

        const targetX = particle.baseX + towardsCenterX
        const targetY = particle.baseY + towardsCenterY

        // Smooth interpolation to target
        particle.x += (targetX - particle.x) * 0.1
        particle.y += (targetY - particle.y) * 0.1

        const dx = mousePos.current.x - particle.x
        const dy = mousePos.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Repulsion from mouse
        if (distance < 200) {
          const angle = Math.atan2(dy, dx)
          const force = (200 - distance) / 200
          particle.vx -= Math.cos(angle) * force * 2
          particle.vy -= Math.sin(angle) * force * 2
        }

        // Damping
        particle.vx *= 0.96
        particle.vy *= 0.96

        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, `rgba(0, 217, 255, ${particle.opacity * 0.8})`)
        gradient.addColorStop(1, `rgba(0, 217, 255, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(
          particle.x - particle.size * 3,
          particle.y - particle.size * 3,
          particle.size * 6,
          particle.size * 6,
        )

        // Core particle
        ctx.fillStyle = `rgba(8, 203, 0, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < Math.min(i + 6, particlesRef.current.length); j++) {
          const other = particlesRef.current[j]
          const dx2 = other.x - particle.x
          const dy2 = other.y - particle.y
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (distance2 < 120) {
            const opacity = (1 - distance2 / 120) * 0.4 * particle.opacity
            ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      })

      const pulseSize = 100 + Math.sin(Date.now() * 0.005) * 30
      const gradient = ctx.createRadialGradient(
        mousePos.current.x,
        mousePos.current.y,
        20,
        mousePos.current.x,
        mousePos.current.y,
        pulseSize,
      )
      gradient.addColorStop(0, `rgba(0, 217, 255, 0.4)`)
      gradient.addColorStop(0.5, `rgba(0, 217, 255, 0.1)`)
      gradient.addColorStop(1, `rgba(0, 217, 255, 0)`)
      ctx.fillStyle = gradient
      ctx.fillRect(mousePos.current.x - pulseSize, mousePos.current.y - pulseSize, pulseSize * 2, pulseSize * 2)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [scrollY])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ background: "#000000" }} />
    </div>
  )
}
