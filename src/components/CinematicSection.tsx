import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface CinematicSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function CinematicSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })

  const initial = {
    opacity: 0,
    ...(direction === 'up' && { y: 50 }),
    ...(direction === 'left' && { x: -50 }),
    ...(direction === 'right' && { x: 50 }),
    ...(direction === 'scale' && { scale: 0.9, y: 20 }),
  }

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0, scale: 1 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
