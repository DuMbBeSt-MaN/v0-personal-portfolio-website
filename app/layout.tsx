import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { JetBrains_Mono, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Rohan Chandrasekar | Full-Stack Developer",
  description: "CS Sophomore @ VIT Chennai | Full-Stack Developer | AI/ML Explorer | Design Lead",
  openGraph: {
    title: "Rohan Chandrasekar",
    description: "Portfolio showcasing projects, experience, and skills",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
