import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

interface CinematicSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  /** 'up' | 'left' | 'right' | 'scale' — direction the element enters from */
  direction?: 'up' | 'left' | 'right' | 'scale'
}

const EASE = [0.25, 0.46, 0.45, 0.94]

/**
 * Cinematic scroll reveal wrapper.
 * - Enters with fade + directional slide + slight blur clear
 * - Scroll-linked parallax gives subtle depth while scrolling past
 * - Supports multiple entry directions for visual variety
 */
export default function CinematicSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })

  // Scroll-linked parallax — subtle depth as user scrolls past
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [15, -15])

  // Entry animation config based on direction
  const initial = {
    opacity: 0,
    filter: 'blur(6px)',
    ...(direction === 'up' && { y: 70 }),
    ...(direction === 'left' && { x: -80 }),
    ...(direction === 'right' && { x: 80 }),
    ...(direction === 'scale' && { scale: 0.85, y: 30 }),
  }

  const animate = isInView
    ? {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        x: 0,
        scale: 1,
      }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 1.4,
        delay,
        ease: EASE,
        filter: { duration: 0.8 },
      }}
      style={{ y: parallaxY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
