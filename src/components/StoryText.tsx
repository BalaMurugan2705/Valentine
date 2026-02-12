import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StoryTextProps {
  text: string
  subtitle?: string
  className?: string
  wordByWord?: boolean
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

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
      <div ref={ref} className={className}>
        <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: words.length * 0.06 + 0.2, ease: EASE }}
          >
            <p className="font-poppins text-base md:text-lg text-white/50 leading-relaxed">
              {subtitle}
            </p>
            <motion.div
              className="mt-4 h-px w-16 bg-gradient-to-r from-romantic-pink/60 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: words.length * 0.06 + 0.5, ease: EASE }}
            />
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div ref={ref} className={className}>
      <motion.h2
        className="font-playfair text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.7, ease: EASE }}
      >
        {text}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="font-poppins text-base md:text-lg text-white/50 mt-6 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
