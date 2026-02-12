import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * "MY PROMISES TO YOU" — Romantic vows revealed one by one
 *
 * PERSONALIZE: Edit the `promises` array below.
 */
const promises = [
  { text: 'I promise to never again be the reason for your silent tears.', icon: '🤍' },
  { text: 'I promise to carry the weight with you — you will never face anything alone again.', icon: '🤝' },
  { text: 'I promise to be the husband you always deserved, not just the one you got.', icon: '💍' },
  { text: 'I promise to listen to your silence — because I know now that it speaks the loudest.', icon: '👂' },
  { text: 'I promise to make the next 12 years so beautiful, they heal every wound from the past.', icon: '✨' },
  { text: 'I promise to never take your strength for granted — you held us together when I could not.', icon: '💪' },
  { text: 'I promise to love you louder than every pain I ever caused you in silence.', icon: '❤️' },
  { text: 'I promise that from this moment, your happiness is my life\'s mission — always.', icon: '💖' },
]

export default function PromisesScene() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= promises.length) { clearInterval(timer); return c }
        return c + 1
      })
    }, 800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0f1520 0%, #0D1B2A 70%)' }}
    >
      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-romantic-gold/6 blur-[140px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-romantic-pink/6 blur-[100px]"
        animate={{ scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="font-poppins text-romantic-gold text-xs uppercase tracking-[0.4em] mb-3">For Everything You Endured</p>
          <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-white mb-4">
            My <span className="text-romantic-gradient">Promises</span> To You
          </h2>
          <motion.span
            className="inline-block text-3xl"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            💍
          </motion.span>
        </motion.div>

        {/* Promise cards */}
        <div className="space-y-5">
          {promises.map((promise, i) => (
            <motion.div
              key={i}
              className="glass-strong rounded-2xl p-5 md:p-6 flex items-start gap-4"
              initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(6px)' }}
              animate={
                i < visibleCount
                  ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                  : {}
              }
              transition={{ duration: 0.8, ease: EASE }}
              style={{ boxShadow: i < visibleCount ? '0 12px 36px rgba(255,77,109,0.06)' : 'none' }}
            >
              <motion.span
                className="text-2xl flex-shrink-0"
                initial={{ scale: 0, rotate: -20 }}
                animate={i < visibleCount ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {promise.icon}
              </motion.span>
              <p className="font-poppins text-sm md:text-base text-white/75 leading-relaxed pt-0.5">
                {promise.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Completion */}
        {visibleCount >= promises.length && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="font-playfair text-lg italic text-romantic-pink-light/50"
            >
              I owe you a lifetime of happiness — and I intend to give it
            </motion.p>
            <motion.span
              className="inline-block text-xl mt-3"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
