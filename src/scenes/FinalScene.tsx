import { useRef, useMemo } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * SCENE 6 — FINAL CELEBRATION (CINEMATIC CLIMAX)
 *
 * The emotional peak of the entire experience:
 * - Massive particle explosion (hearts, sparkles, stars)
 * - Falling confetti with rotation + fade
 * - Multiple aurora glow orbs pulsing dramatically
 * - Scroll-linked scale-up on the heart
 * - Grand heading with animated gradient text
 * - Staggered paragraph reveals
 * - Decorative ring animations
 * - Subtle final "Made with love" footer
 */

export default function FinalScene() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const heartScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.6, 1, 1.1])
  const bgGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.2, 0.3])

  // Celebration particles
  const particles = useMemo(() => {
    const emojis = ['❤️', '💕', '💖', '✨', '💗', '🌸', '💝', '🤍', '⭐', '💫']
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 22 + 12,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 6,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      opacity: Math.random() * 0.5 + 0.2,
    }))
  }, [])

  // Confetti
  const confetti = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#FF4D6D', '#FF758F', '#D4A574', '#FFF0F3', '#FFB3C1', '#FFD700'][
          Math.floor(Math.random() * 6)
        ],
        size: Math.random() * 8 + 3,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 4,
        wobble: Math.random() * 40 - 20,
      })),
    []
  )

  // Ring burst animations
  const rings = [0, 0.6, 1.2]

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      <FloatingHearts count={5} />
      {/* Celebration particles */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{ left: `${p.x}%`, fontSize: `${p.size}px`, opacity: p.opacity }}
              initial={{ y: '115vh', rotate: 0, scale: 0 }}
              animate={{ y: '-15vh', rotate: 720, scale: [0, 1, 1, 0.5, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            >
              {p.emoji}
            </motion.div>
          ))}

          {confetti.map((c) => (
            <motion.div
              key={`c-${c.id}`}
              className="absolute rounded-sm"
              style={{
                left: `${c.x}%`,
                width: `${c.size}px`,
                height: `${c.size * 0.6}px`,
                backgroundColor: c.color,
              }}
              initial={{ y: '-5%', rotate: 0, opacity: 0, x: 0 }}
              animate={{
                y: '115vh',
                rotate: [0, 360, 720],
                opacity: [0, 1, 1, 0.6, 0],
                x: [0, c.wobble, -c.wobble, c.wobble / 2, 0],
              }}
              transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
      )}

      {/* Aurora glows — dramatic */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-romantic-pink/10 blur-[80px]"
          style={{ opacity: bgGlow }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-romantic-gold/8 blur-[60px]"
          animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.15, 0.35, 0.15], x: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-romantic-pink/6 blur-[50px]"
          animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Heart with scroll-linked scale + ring bursts */}
        <motion.div
          className="relative inline-flex items-center justify-center mb-8"
          style={{ scale: heartScale }}
        >
          {/* Ring bursts */}
          {isInView &&
            rings.map((d) => (
              <motion.span
                key={d}
                className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border border-romantic-pink/15"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                transition={{ duration: 3, delay: d, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}

          <motion.div
            className="text-6xl md:text-8xl lg:text-9xl relative z-10"
            initial={{ scale: 0, rotate: -20 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.span
              className="inline-block"
              animate={isInView ? { scale: [1, 1.15, 1, 1.15, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              ❤️
            </motion.span>
          </motion.div>
          {/* Glow behind heart */}
          <div className="absolute inset-0 rounded-full bg-romantic-pink/15 blur-[40px] scale-150 -z-10" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-playfair text-4xl md:text-6xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
        >
          <span className="text-romantic-gradient-animated">12 Years</span>{' '}
          <span className="text-white">& Forever</span>
        </motion.h1>

        <motion.p
          className="font-poppins text-white/50 text-base md:text-lg max-w-lg mx-auto mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
        >
          You went through every silence, every hard day, every moment alone — because of me. And still, you chose to stay. That is the greatest love story ever written.
        </motion.p>

        <motion.p
          className="font-poppins text-white/40 text-sm md:text-base max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.6, ease: EASE }}
        >
          From today, I promise — your tears will only be from happiness. You are my school love, my soulmate, my wife, my everything.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 2, ease: EASE }}
        >
          <motion.div
            className="h-px w-20 bg-gradient-to-r from-transparent to-romantic-pink/40"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 2.2, ease: EASE }}
          />
          <motion.span
            className="text-romantic-pink text-xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            ✦
          </motion.span>
          <motion.div
            className="h-px w-20 bg-gradient-to-l from-transparent to-romantic-pink/40"
            initial={{ scaleX: 0, originX: 1 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 2.2, ease: EASE }}
          />
        </motion.div>

        {/* Signature */}
        <motion.p
          className="font-playfair text-lg md:text-2xl italic text-romantic-pink-light/50"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.5, ease: EASE }}
        >
          — Your school sweetheart, forever grateful, forever yours
        </motion.p>
      </div>

      {/* Bottom fade */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-romantic-dark to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
      />

      <motion.p
        className="absolute bottom-6 font-poppins text-[10px] text-white/10 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 3.5, duration: 1 }}
      >
        Made with ❤️ for you
      </motion.p>
    </section>
  )
}
