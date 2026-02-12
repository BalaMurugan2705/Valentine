import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

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
 * A cinematic floating glassmorphism photo card with:
 * - Scroll-linked parallax on the image inside the card
 * - Staggered fade-in reveal
 * - Gentle floating animation with offset timing
 * - 3D tilt effect on hover (desktop)
 * - Soft romantic glow shadow that intensifies on hover
 * - Image shimmer / shine sweep on hover
 *
 * REPLACING PHOTOS:
 * Simply change the `src` prop to point to your own image.
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Scroll-linked parallax — the image moves slightly inside the card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -12, y: x * 12 })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  // Unique float offset per card so they don't all float in sync
  const floatDuration = 5 + delay * 2
  const floatDelay = delay * 0.5

  return (
    <motion.div
      ref={cardRef}
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 80, scale: 0.9 }
      }
      transition={{ duration: 1.2, delay, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="rounded-2xl overflow-hidden relative"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: [0, -14, 0],
        }}
        transition={{
          rotateX: { duration: 0.4, ease: 'easeOut' },
          rotateY: { duration: 0.4, ease: 'easeOut' },
          y: { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          boxShadow: isHovered
            ? '0 30px 80px rgba(255, 77, 109, 0.25), 0 10px 30px rgba(0, 0, 0, 0.4)'
            : '0 20px 60px rgba(255, 77, 109, 0.12), 0 8px 20px rgba(0, 0, 0, 0.3)',
          transition: 'box-shadow 0.6s ease',
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Image container with inner parallax */}
        <div className="relative overflow-hidden">
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-52 sm:h-60 md:h-68 object-cover"
            style={{ y: imageY, objectPosition }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1, ease: EASE }}
          />

          {/* Gradient overlay — more dramatic */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Hover shine sweep — a light streak across the image */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
            }}
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Corner romantic accent dot */}
          <motion.div
            className="absolute top-3 right-3 w-2 h-2 rounded-full bg-romantic-pink"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Caption area with subtle border top */}
        {caption && (
          <div className="p-4 md:p-5 border-t border-white/5">
            <motion.p
              className="font-poppins text-sm md:text-base text-white/70 text-center italic"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: delay + 0.8, ease: EASE }}
            >
              "{caption}"
            </motion.p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
