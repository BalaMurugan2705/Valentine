import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * "OUR FAVORITE MOMENTS" — A flip-card carousel
 *
 * Tap the arrows or swipe to navigate between moments.
 * Each card flips in with a cinematic entrance.
 *
 * PERSONALIZE: Edit the `moments` array below.
 */
const moments = [
  {
    title: 'The Day We Met in School',
    text: 'A classroom, a stolen glance, and a heartbeat that changed my life forever. I had no idea that shy kid would become your husband one day.',
    emoji: '🏫',
    bg: 'from-pink-900/30 to-rose-900/20',
  },
  {
    title: 'Our First Conversation',
    text: 'Nervous words, shaky voice, and a feeling I had never known. From that moment, I knew you were the one I wanted in my life forever.',
    emoji: '💬',
    bg: 'from-red-900/30 to-pink-900/20',
  },
  {
    title: 'Surviving the Distance',
    text: 'College took us to different places, but our love never wavered. Late-night calls, weekend reunions, and the promise that we would make it through.',
    emoji: '📱',
    bg: 'from-indigo-900/30 to-purple-900/20',
  },
  {
    title: 'Our Wedding Day',
    text: 'A decade of love, sealed with vows. Walking around that fire with you, I knew — every second of the wait was worth it.',
    emoji: '💒',
    bg: 'from-rose-900/30 to-red-900/20',
  },
  {
    title: 'The Toughest Chapter',
    text: 'Marriage brought storms I caused and you faced alone. You went through every moment in silence — carrying pain you never showed. I see it now, and I am so sorry.',
    emoji: '🥀',
    bg: 'from-slate-900/30 to-gray-900/20',
  },
  {
    title: 'Your Silent Strength',
    text: 'You could have walked away. You had every reason to. But you stayed, you fought, you forgave. You held us together when I could not. That is the strongest love I have ever known.',
    emoji: '🤍',
    bg: 'from-gray-800/30 to-slate-900/20',
  },
  {
    title: 'A New Beginning',
    text: 'This is not just our 12th year — this is where I become the man you deserve. Every silent tear you shed, I will answer with a lifetime of making you smile.',
    emoji: '🌅',
    bg: 'from-amber-900/30 to-orange-900/20',
  },
  {
    title: 'Forever Yours',
    text: 'From school sweethearts to married soulmates who survived the hardest days. This moment — you reading this, me pouring my heart out — this is my promise that the best is yet to come.',
    emoji: '💖',
    bg: 'from-pink-900/30 to-romantic-pink/20',
  },
]

export default function MomentsScene() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = next, -1 = prev

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const next = () => goTo(current < moments.length - 1 ? current + 1 : 0)
  const prev = () => goTo(current > 0 ? current - 1 : moments.length - 1)

  const moment = moments[current]

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a0a14 0%, #0D1B2A 70%)' }}
    >
      <FloatingHearts count={5} />
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-romantic-pink/6 blur-[60px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <p className="font-poppins text-romantic-pink text-xs uppercase tracking-[0.4em] mb-3">12 Years of Us</p>
        <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-white">
          Our <span className="text-romantic-gradient">Greatest</span> Milestones
        </h2>
      </motion.div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto" style={{ minHeight: 340 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            className={`glass-strong rounded-3xl p-8 md:p-10 text-center bg-gradient-to-br ${moment.bg}`}
            initial={{ x: direction * 80, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: direction * -80, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ boxShadow: '0 30px 80px rgba(255,77,109,0.1), 0 10px 30px rgba(0,0,0,0.3)' }}
          >
            {/* Emoji */}
            <motion.div
              className="text-5xl mb-5"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {moment.emoji}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="font-playfair text-xl md:text-2xl font-semibold text-white mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            >
              {moment.title}
            </motion.h3>

            {/* Text */}
            <motion.p
              className="font-poppins text-sm md:text-base text-white/60 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            >
              {moment.text}
            </motion.p>

            {/* Page indicator */}
            <motion.p
              className="font-poppins text-xs text-white/25 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {current + 1} / {moments.length}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-8 relative z-10">
        <motion.button
          onClick={prev}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {moments.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                i === current ? 'bg-romantic-pink' : 'bg-white/20 hover:bg-white/40'
              }`}
              animate={i === current ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
      </div>
    </div>
  )
}
