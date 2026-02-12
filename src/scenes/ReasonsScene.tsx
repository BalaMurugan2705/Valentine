import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * "WHY I LOVE YOU" — Romantic reasons revealed one by one
 *
 * Each reason fades in with a stagger, creating an emotional
 * cascade effect. A heart counter pulses with each new reason.
 *
 * PERSONALIZE: Edit the `reasons` array below.
 */
const reasons = [
  'You chose me back in school when we were just kids with big dreams',
  'You waited 10 years to marry me — that patience is pure love',
  'You faced the toughest times in silence and never once gave up on us',
  'You believed in us when the whole world said we were too young',
  'The way you carried every pain quietly, just to keep us together',
  'You stood by me through college, career changes, and everything in between',
  'Your silent strength during our hardest days — I see it, I feel it, I am grateful',
  'You forgave me even when I did not deserve it — that is the purest love',
  'How you became my wife and endured every storm with grace',
  'The way you still smile at me after everything you went through because of me',
  'You grew up with me, fought for me, and loved me through my worst',
  'Because after 12 years, you still choose me — and that is the greatest love I know',
]

export default function ReasonsScene() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= reasons.length) { clearInterval(timer); return c }
        return c + 1
      })
    }, 600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a0a14 0%, #0D1B2A 70%)' }}
    >
      <FloatingHearts count={10} />
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-romantic-pink/8 blur-[140px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-xl mx-auto w-full text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="font-poppins text-romantic-pink text-xs uppercase tracking-[0.4em] mb-3">12 Years & Counting</p>
          <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-white mb-2">
            Why I Still <span className="text-romantic-gradient">Love</span> You
          </h2>
          <motion.div
            className="text-2xl mt-2 mb-8"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* Counter */}
        <motion.p
          className="font-poppins text-romantic-pink/60 text-sm mb-8"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {visibleCount} of {reasons.length} reasons...
        </motion.p>

        {/* Reasons list */}
        <div className="space-y-4 text-left">
          <AnimatePresence>
            {reasons.slice(0, visibleCount).map((reason, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 glass rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ boxShadow: '0 8px 24px rgba(255,77,109,0.06)' }}
              >
                <motion.span
                  className="text-romantic-pink text-sm mt-0.5 flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  ❤
                </motion.span>
                <p className="font-poppins text-sm md:text-base text-white/75 leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completion message */}
        {visibleCount >= reasons.length && (
          <motion.p
            className="font-playfair text-lg italic text-romantic-pink-light/50 mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            ...and a million more reasons, every year since school
          </motion.p>
        )}
      </div>
    </div>
  )
}
