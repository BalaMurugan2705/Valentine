import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface FloatingHeartsProps {
  count?: number
  className?: string
}

const emojis = ['❤️', '🌹', '💕', '🌹', '❤️', '💗', '🌹', '❤️', '💖', '🌹']

export default function FloatingHearts({ count = 15, className = '' }: FloatingHeartsProps) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 16 + 18,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.35 + 0.35,
        emoji: emojis[i % emojis.length],
      })),
    [count]
  )

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-[5] ${className}`}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
          }}
          initial={{ y: '110vh' }}
          animate={{ y: '-10vh' }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  )
}
