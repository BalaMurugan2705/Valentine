import { useMemo } from 'react'

interface FloatingHeartsProps {
  count?: number
  className?: string
}

const emojis = ['❤️', '🌹', '💕', '🌹', '❤️', '💗', '🌹', '❤️', '💖', '🌹']

/**
 * Lightweight floating hearts using pure CSS animations
 * instead of Framer Motion for much better performance on mobile/TV.
 */
export default function FloatingHearts({ count = 6, className = '' }: FloatingHeartsProps) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 12 + 16,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.25 + 0.2,
        emoji: emojis[i % emojis.length],
      })),
    [count]
  )

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-[5] ${className}`}>
      <style>{`
        @keyframes floatUp {
          from { transform: translateY(110vh); }
          to { transform: translateY(-10vh); }
        }
      `}</style>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animation: `floatUp ${item.duration}s ${item.delay}s linear infinite`,
            willChange: 'transform',
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  )
}
