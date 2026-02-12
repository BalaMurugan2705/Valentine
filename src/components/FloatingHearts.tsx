import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

interface FloatingHeartsProps {
  /** Number of heart particles */
  count?: number
  className?: string
}

/**
 * Renders a background of gently floating heart particles.
 * Each heart has randomized position, size, speed, and opacity
 * to create an organic, dreamy particle field.
 */
export default function FloatingHearts({ count = 20, className = '' }: FloatingHeartsProps) {
  const hearts: Heart[] = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 18 + 8,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [count]
  )

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-romantic-pink"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          initial={{ y: '110vh', rotate: 0 }}
          animate={{ y: '-10vh', rotate: 360 }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}
