"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"

// Typewriter hook for animated text
const useTypewriter = (text: string, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return { displayedText, isComplete }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { displayedText: typewriterText, isComplete } = useTypewriter("Igniting Innovation", 60)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })

    renderer.setSize(window.innerWidth, window.innerHeight * 0.8)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)

    camera.position.z = 2.5

    // Low-poly sphere with emissive teal rim
    const geometry = new THREE.IcosahedronGeometry(1, 32)
    const material = new THREE.MeshPhongMaterial({
      color: 0x00d9ff,
      emissive: 0x00a8cc,
      shininess: 100,
      wireframe: false,
    })

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Enhanced lighting with teal accents
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8)
    light1.position.set(5, 3, 5)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0x00d9ff, 0.6)
    light2.position.set(-5, -3, -5)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", onMouseMove)

    const rotationVelocity = { x: 0.001, y: 0.002 }

    const animate = () => {
      requestAnimationFrame(animate)

      // Smooth spring-like rotation following cursor
      rotationVelocity.x += (mouseY * 0.05 - rotationVelocity.x) * 0.1
      rotationVelocity.y += (mouseX * 0.05 - rotationVelocity.y) * 0.1

      sphere.rotation.x += rotationVelocity.x
      sphere.rotation.y += rotationVelocity.y

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight * 0.8
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00d9ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass glass-hover p-8 rounded-lg max-w-2xl">
          {/* Name */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-accent mb-2">Rohan </h1>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Typewriter Headline */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-balance flex items-center gap-2 min-h-[64px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {typewriterText}
            {!isComplete && <span className="inline-block w-1 h-12 bg-primary animate-blink" />}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-4 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            CS Sophomore @ VIT Chennai | Full-Stack Developer @ MIC | AI/ML Explorer | Design Lead @ OSPC
          </motion.p>

          {/* Subheading */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-primary mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Shaping the Future of Tech
          </motion.h3>

          {/* LinkedIn Link */}
          <motion.p
            className="text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Explore more on my{" "}
            <a
              href="https://www.linkedin.com/in/rohan-chandrasekar-ba45a228a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors hover:underline"
            >
              LinkedIn
            </a>
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-background rounded-lg font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 active:scale-95 uppercase text-sm tracking-wide"
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(0, 217, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Explore My Work
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
