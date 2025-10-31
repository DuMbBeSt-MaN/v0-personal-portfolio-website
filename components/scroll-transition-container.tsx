"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollTransitionContainerProps {
  children: ReactNode
}

export default function ScrollTransitionContainer({ children }: ScrollTransitionContainerProps) {
  const { scrollY } = useScroll()

  // Content appears and pushes laptop away as you scroll
  const contentOpacity = useTransform(scrollY, [400, 800], [0, 1])
  const contentY = useTransform(scrollY, [400, 800], [100, 0])

  return (
    <motion.div
      className="relative z-20 w-full"
      style={{
        opacity: contentOpacity,
        y: contentY,
      }}
    >
      {children}
    </motion.div>
  )
}
