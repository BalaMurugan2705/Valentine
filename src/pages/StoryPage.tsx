import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import OverlayModal from '../components/OverlayModal'
import FloatingHearts from '../components/FloatingHearts'
import PageTransition from '../components/PageTransition'

// Scenes
import StoryScene from '../scenes/StoryScene'
import MemoriesScene from '../scenes/MemoriesScene'
import QuizScene from '../scenes/QuizScene'
import LetterScene from '../scenes/LetterScene'
import FinalScene from '../scenes/FinalScene'
import ReasonsScene from '../scenes/ReasonsScene'
import PromisesScene from '../scenes/PromisesScene'
import MomentsScene from '../scenes/MomentsScene'
import VideoScene from '../scenes/VideoScene'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * STORY PAGE — Grid of Roses & Gift Boxes
 *
 * Single page with a grid of 8 interactive items.
 * Each is a rose or gift box that opens a full-screen overlay.
 */

interface GridItem {
  id: string
  label: string
  subtitle: string
  type: 'rose' | 'gift'
  emoji: string
  color: string
  scene: React.ComponentType
}

const gridItems: GridItem[] = [
  {
    id: 'story',
    label: 'Our Story',
    subtitle: 'School to forever',
    type: 'rose',
    emoji: '🏫',
    color: 'from-rose-900/40 to-pink-900/30',
    scene: StoryScene,
  },
  {
    id: 'reasons',
    label: 'Why I Love You',
    subtitle: '12 reasons, 12 years',
    type: 'rose',
    emoji: '❤️',
    color: 'from-red-900/40 to-rose-900/30',
    scene: ReasonsScene,
  },
  {
    id: 'memories',
    label: 'Our Memories',
    subtitle: 'A journey in photos',
    type: 'gift',
    emoji: '📸',
    color: 'from-purple-900/40 to-pink-900/30',
    scene: MemoriesScene,
  },
  {
    id: 'moments',
    label: 'Our Journey',
    subtitle: 'Every chapter of us',
    type: 'rose',
    emoji: '✨',
    color: 'from-amber-900/40 to-orange-900/30',
    scene: MomentsScene,
  },
  {
    id: 'quiz',
    label: 'Know Me?',
    subtitle: 'After 12 years...',
    type: 'gift',
    emoji: '🎮',
    color: 'from-indigo-900/40 to-purple-900/30',
    scene: QuizScene,
  },
  {
    id: 'promises',
    label: 'My Promises',
    subtitle: 'For everything you endured',
    type: 'rose',
    emoji: '💍',
    color: 'from-yellow-900/30 to-amber-900/30',
    scene: PromisesScene,
  },
  {
    id: 'letter',
    label: 'A Letter For You',
    subtitle: '12 years in words',
    type: 'gift',
    emoji: '💌',
    color: 'from-pink-900/40 to-rose-900/30',
    scene: LetterScene,
  },
  {
    id: 'videos',
    label: 'Our Reels',
    subtitle: 'Love in motion',
    type: 'gift',
    emoji: '🎬',
    color: 'from-violet-900/40 to-purple-900/30',
    scene: VideoScene,
  },
  {
    id: 'forever',
    label: '12 Years & Forever',
    subtitle: 'My final surprise',
    type: 'gift',
    emoji: '💖',
    color: 'from-rose-900/40 to-red-900/30',
    scene: FinalScene,
  },
]

export default function StoryPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeItem = gridItems.find((item) => item.id === activeId)
  const ActiveScene = activeItem?.scene ?? null

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        dur: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      })),
    []
  )

  return (
    <PageTransition>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a0a14 0%, #0D1B2A 50%, #060d16 100%)' }}
      >
        {/* ── AMBIENT LAYERS ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div
            className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-romantic-pink/6 blur-[150px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], x: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-romantic-gold/5 blur-[120px]"
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />

          {stars.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <FloatingHearts count={8} />

        {/* ── PAGE HEADER ── */}
        <div className="relative z-10 text-center pt-12 pb-6 md:pt-16 md:pb-8 px-6">
          <motion.p
            className="font-poppins text-romantic-pink/70 text-xs md:text-sm uppercase tracking-[0.4em] mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            12 Years of Love
          </motion.p>
          <motion.h1
            className="font-playfair text-3xl md:text-5xl font-semibold text-white mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            Open each{' '}
            <span className="text-romantic-gradient">chapter</span>
          </motion.h1>
          <motion.p
            className="font-poppins text-white/35 text-sm md:text-base max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Tap to relive our journey from school to forever
          </motion.p>
        </div>

        {/* ── GRID ── */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-16 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {gridItems.map((item, index) => (
              <GridCard
                key={item.id}
                item={item}
                index={index}
                onOpen={() => setActiveId(item.id)}
              />
            ))}
          </div>
        </div>

        {/* ── BOTTOM SIGNATURE ── */}
        <motion.div
          className="relative z-10 text-center pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.span
            className="text-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ❤️
          </motion.span>
          <p className="font-poppins text-[10px] text-white/15 mt-2">Made with love, just for you</p>
        </motion.div>

        {/* ── OVERLAY MODAL ── */}
        <OverlayModal isOpen={!!activeId} onClose={() => setActiveId(null)}>
          {ActiveScene && <ActiveScene />}
        </OverlayModal>
      </div>
    </PageTransition>
  )
}

/** A single grid item — rose or gift box card */
function GridCard({
  item,
  index,
  onOpen,
}: {
  item: GridItem
  index: number
  onOpen: () => void
}) {
  return (
    <motion.button
      onClick={onOpen}
      className="group relative rounded-2xl p-4 md:p-5 text-center cursor-pointer overflow-hidden"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: EASE }}
      whileHover={{ scale: 1.05, y: -4, boxShadow: '0 20px 60px rgba(255,77,109,0.15)' }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-80`} />

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)' }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      <div className="relative z-10">
        {/* Main icon — rose or gift */}
        <motion.div
          className="text-4xl md:text-5xl mb-3"
          animate={
            item.type === 'rose'
              ? { rotate: [0, -5, 5, -5, 0], y: [0, -3, 0] }
              : { y: [0, -6, 0] }
          }
          transition={{ duration: item.type === 'rose' ? 4 : 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.type === 'rose' ? '🌹' : '🎁'}
        </motion.div>

        {/* Content emoji */}
        <motion.div
          className="text-lg mb-2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        >
          {item.emoji}
        </motion.div>

        {/* Label */}
        <h3 className="font-playfair text-sm md:text-base font-semibold text-white mb-1 leading-tight">
          {item.label}
        </h3>
        <p className="font-poppins text-[10px] md:text-xs text-white/40 leading-snug">
          {item.subtitle}
        </p>

        {/* Tap hint */}
        <motion.div
          className="mt-3 inline-flex items-center gap-1 text-[10px] text-romantic-pink/50 font-poppins"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>tap to open</span>
        </motion.div>
      </div>

      {/* Corner sparkle */}
      <motion.div
        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-romantic-pink"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
      />
    </motion.button>
  )
}
