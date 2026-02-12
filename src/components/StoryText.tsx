import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StoryTextProps {
  text: string
  subtitle?: string
  className?: string
  wordByWord?: boolean
}

const EASE = [0.25, 0.46, 0.45, 0.94]

/**
 * Cinematic text reveal with:
 * - Word-by-word stagger with 3D rotateX flip
 * - Each word enters from below with blur-to-clear
 * - Subtitle fades in with a glowing underline accent
 * - Non-word-by-word mode has a dramatic scale-up entrance
 */
export default function StoryText({
  text,
  subtitle,
  className = '',
  wordByWord = false,
}: StoryTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-12% 0px' })

  if (wordByWord) {
    const words = text.split(' ')
    return (
      <div ref={ref} className={`${className}`} style={{ perspective: '800px' }}>
        <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 50, rotateX: -40, filter: 'blur(4px)' }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 50, rotateX: -40, filter: 'blur(4px)' }
                }
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: EASE,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {subtitle && (
          <motion.div
            className="mt-6 max-w-xl"
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 1, delay: words.length * 0.1 + 0.3, ease: EASE }}
          >
            <p className="font-poppins text-base md:text-lg text-white/50 leading-relaxed">
              {subtitle}
            </p>
            {/* Glowing accent line under subtitle */}
            <motion.div
              className="mt-4 h-px w-16 bg-gradient-to-r from-romantic-pink/60 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: words.length * 0.1 + 0.8, ease: EASE }}
            />
          </motion.div>
        )}
      </div>
    )
  }

  // Non-word-by-word — dramatic scale entrance
  return (
    <div ref={ref} className={className} style={{ perspective: '600px' }}>
      <motion.h2
        className="font-playfair text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight animate-text-glow"
        initial={{ opacity: 0, y: 60, scale: 0.92, filter: 'blur(8px)' }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, y: 60, scale: 0.92, filter: 'blur(8px)' }
        }
        transition={{ duration: 1.4, ease: EASE }}
      >
        {text}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="font-poppins text-base md:text-lg text-white/50 mt-6 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 30, filter: 'blur(4px)' }
          }
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
