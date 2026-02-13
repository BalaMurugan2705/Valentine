import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface PhotoCardProps {
  src: string
  alt: string
  caption?: string
  delay?: number
  className?: string
  objectPosition?: string
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * A cinematic photo card with:
 * - Staggered fade-in reveal
 * - Soft romantic glow shadow
 */
export default function PhotoCard({
  src,
  alt,
  caption,
  delay = 0,
  className = '',
  objectPosition = 'center',
}: PhotoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={cardRef}
      className={`group ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          boxShadow: '0 20px 60px rgba(255, 77, 109, 0.12), 0 8px 20px rgba(0, 0, 0, 0.3)',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Image container */}
        <div className="relative overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-52 sm:h-60 md:h-68 object-cover"
            style={{ objectPosition }}
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Corner romantic accent dot */}
          <motion.div
            className="absolute top-3 right-3 w-2 h-2 rounded-full bg-romantic-pink"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Caption area */}
        {caption && (
          <div className="p-4 md:p-5 border-t border-white/5">
            <motion.p
              className="font-poppins text-sm md:text-base text-white/70 text-center italic"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: delay + 0.5, ease: EASE }}
            >
              "{caption}"
            </motion.p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
