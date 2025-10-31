"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import * as THREE from "three"

export default function Laptop3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Transform values based on scroll position
  const scaleProgress = useTransform(scrollY, [0, 800], [1, 0.3])
  const yProgress = useTransform(scrollY, [0, 800], [0, -300])
  const opacityProgress = useTransform(scrollY, [0, 800], [1, 0])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  // 3D Laptop setup with Three.js
  useEffect(() => {
    if (!canvasRef.current || isMobile) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)

    camera.position.z = 3

    // Create simplified laptop geometry
    const laptopGroup = new THREE.Group()

    // Laptop base (keyboard area)
    const baseGeometry = new THREE.BoxGeometry(2, 0.1, 1.2)
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a3a1a,
      shininess: 80,
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.z = -0.3
    laptopGroup.add(base)

    // Laptop screen
    const screenGeometry = new THREE.PlaneGeometry(2, 1.25)
    const screenMaterial = new THREE.MeshPhongMaterial({
      color: 0x0a1a0a,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.3,
      shininess: 100,
    })
    const screen = new THREE.Mesh(screenGeometry, screenMaterial)
    screen.position.z = 0.3
    screen.position.y = 0.4
    laptopGroup.add(screen)

    // Screen bezel
    const bezelGeometry = new THREE.BoxGeometry(2.2, 1.45, 0.05)
    const bezelMaterial = new THREE.MeshPhongMaterial({
      color: 0x08cb00,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.2,
    })
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial)
    bezel.position.z = 0.32
    bezel.position.y = 0.4
    laptopGroup.add(bezel)

    scene.add(laptopGroup)

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8)
    light1.position.set(5, 3, 5)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0x00d9ff, 0.6)
    light2.position.set(-5, -3, -5)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    let targetRotX = 0
    let targetRotY = 0

    const animate = () => {
      requestAnimationFrame(animate)

      // Smooth cursor-following rotation (±12 degrees max)
      targetRotX = mousePos.y * 0.15
      targetRotY = mousePos.x * 0.15

      laptopGroup.rotation.x += (targetRotX - laptopGroup.rotation.x) * 0.1
      laptopGroup.rotation.y += (targetRotY - laptopGroup.rotation.y) * 0.1

      // Smooth idle rotation when mouse is centered
      if (Math.abs(mousePos.x) < 0.1 && Math.abs(mousePos.y) < 0.1) {
        laptopGroup.rotation.y += 0.005
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      baseGeometry.dispose()
      baseMaterial.dispose()
      screenGeometry.dispose()
      screenMaterial.dispose()
      bezelGeometry.dispose()
      bezelMaterial.dispose()
    }
  }, [isMobile, mousePos])

  // Mobile fallback with animated image
  if (isMobile) {
    return (
      <motion.div
        ref={containerRef}
        className="relative w-full h-screen flex items-center justify-center bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="w-32 h-32 mx-auto mb-6 glass rounded-lg flex items-center justify-center">
            <svg className="w-24 h-24 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 17H7a2 2 0 00-2 2v2a2 2 0 002 2h10a2 2 0 002-2v-2a2 2 0 00-2-2h-2m0-4V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4m0 0a2 2 0 104 0m-6 8h12"
              />
            </svg>
          </div>
          <p className="text-primary font-bold text-lg">Portfolio Loading</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{
        scale: scaleProgress,
        y: yProgress,
        opacity: opacityProgress,
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
