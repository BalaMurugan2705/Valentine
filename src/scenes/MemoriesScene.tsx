import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import PhotoCard from '../components/PhotoCard'
import CinematicSection from '../components/CinematicSection'

/**
 * SCENE 4 — FLOATING MEMORY CARDS (CINEMATIC VERSION)
 *
 * Full cinematic treatment with:
 * - Parallax-driven heading with word-by-word stagger
 * - Decorative vertical timeline connecting cards
 * - Animated sparkle particles throughout the section
 * - Multiple ambient glow orbs that drift independently
 * - Cards stagger in with rotation + scale + opacity
 * - Emotional subtext between card rows
 *
 * TO REPLACE PHOTOS: Update the `memories` array below.
 */

const memories = [
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
    alt: 'School days together',
    caption: 'Where our story began — in school',
    date: 'School Days',
  },
  {
    src: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80',
    alt: 'Growing up together',
    caption: 'Growing up, never growing apart',
    date: 'College Years',
  },
  {
    src: 'https://images.unsplash.com/photo-1529519195486-b6a60e9e8406?w=600&q=80',
    alt: 'Through the distance',
    caption: 'Distance tested us, love won',
    date: 'The Long Path',
  },
  {
    src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&q=80',
    alt: 'The proposal',
    caption: 'The day I asked forever',
    date: 'The Proposal',
  },
  {
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80',
    alt: 'Our wedding day',
    caption: 'Two hearts, one beautiful promise',
    date: 'Wedding Day',
  },
  {
    src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&q=80',
    alt: 'Married life together',
    caption: '12 years and still counting',
    date: 'Forever Begins',
  },
]

// Emotional mid-section quotes shown between card rows
const midQuotes = [
  'From school corridors to wedding aisles...',
  '12 years of memories, and every one is golden...',
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function MemoriesScene() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-10% 0px' })

  // Parallax for the entire section — subtle depth effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])
  const headingScale = useTransform(scrollYProgress, [0, 0.2], [0.92, 1])

  // Sparkle particles
  const sparkles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      })),
    []
  )

  // Heading words for staggered reveal
  const headingWords = '12 years of moments I treasure forever'.split(' ')

  // Split memories into rows of 3 for mid-quote insertion
  const firstRow = memories.slice(0, 3)
  const secondRow = memories.slice(3, 6)

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 px-4 sm:px-6 overflow-hidden">
      {/* ── AMBIENT BACKGROUND LAYER ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary glow orb — drifts with parallax */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-romantic-pink/10 blur-[140px]"
          style={{ y: bgY }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Secondary glow — offset timing for depth */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-romantic-gold/8 blur-[100px]"
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.15, 0.35, 0.15], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        {/* Tertiary glow — top right for balance */}
        <motion.div
          className="absolute top-1/6 right-1/4 w-[300px] h-[300px] rounded-full bg-romantic-pink/6 blur-[80px]"
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />

        {/* Sparkle particles — scattered twinkling dots */}
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── CINEMATIC HEADING ── */}
      <div ref={headingRef} className="text-center mb-20 md:mb-32 relative z-10">
        {/* Decorative top sparkle cluster */}
        <motion.div
          className="flex justify-center gap-1 mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={headingInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: EASE }}
        >
          {['✦', '❤', '✦'].map((char, i) => (
            <motion.span
              key={i}
              className="text-romantic-pink/60 text-xs"
              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Sub-label with line reveal */}
        <motion.div className="overflow-hidden mb-8">
          <motion.p
            className="font-poppins text-romantic-pink text-sm uppercase tracking-[0.4em]"
            initial={{ y: '100%', opacity: 0 }}
            animate={headingInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Our Memories
          </motion.p>
        </motion.div>

        {/* Main heading — word-by-word stagger with parallax */}
        <motion.h2
          className="font-playfair text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mx-auto"
          style={{ y: headingY, scale: headingScale }}
        >
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 50, rotateX: -40 }}
              animate={headingInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: EASE }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Subtitle with soft fade */}
        <motion.p
          className="font-poppins text-white/40 text-sm md:text-base mt-6 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
        >
          From school love to married life — our journey
        </motion.p>

        {/* Animated line extending down from heading */}
        <motion.div
          className="mx-auto mt-10 w-px bg-gradient-to-b from-romantic-pink/50 to-transparent"
          initial={{ height: 0 }}
          animate={headingInView ? { height: 80 } : {}}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE }}
        />
      </div>

      {/* ── FIRST ROW OF CARDS ── */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {firstRow.map((memory, index) => (
            <MemoryCardWithLabel
              key={index}
              memory={memory}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* ── MID-SECTION CINEMATIC QUOTE ── */}
      <CinematicQuoteDivider quote={midQuotes[0]} />

      {/* ── SECOND ROW OF CARDS ── */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {secondRow.map((memory, index) => (
            <MemoryCardWithLabel
              key={index + 3}
              memory={memory}
              index={index + 3}
            />
          ))}
        </div>
      </div>

      {/* ── BOTTOM CINEMATIC QUOTE ── */}
      <CinematicQuoteDivider quote={midQuotes[1]} />

      {/* ── BOTTOM DECORATIVE ELEMENTS ── */}
      <motion.div
        className="flex justify-center gap-2 mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-romantic-pink/30 self-center" />
        <motion.span
          className="text-romantic-pink/50 text-lg"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❤
        </motion.span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-romantic-pink/30 self-center" />
      </motion.div>
    </section>
  )
}

/**
 * A single memory card with a date label floating above it,
 * staggered cinematic entrance (rotation + blur clear).
 */
function MemoryCardWithLabel({
  memory,
  index,
}: {
  memory: (typeof memories)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  // Alternate cards enter from slightly different directions for dynamism
  const enterDirection = index % 3 === 0 ? -30 : index % 3 === 2 ? 30 : 0
  const enterRotation = index % 2 === 0 ? -3 : 3

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, x: enterDirection, rotate: enterRotation, filter: 'blur(8px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, rotate: 0, filter: 'blur(0px)' }
          : {}
      }
      transition={{ duration: 1.2, delay: (index % 3) * 0.2, ease: EASE }}
    >
      {/* Date label above card */}
      <motion.div
        className="text-center mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: (index % 3) * 0.2 + 0.6, ease: EASE }}
      >
        <span className="font-playfair text-xs md:text-sm italic text-romantic-pink/60 tracking-wider">
          {memory.date}
        </span>
      </motion.div>

      <PhotoCard
        src={memory.src}
        alt={memory.alt}
        caption={memory.caption}
        delay={0} // Delay handled by parent wrapper
      />
    </motion.div>
  )
}

/**
 * A cinematic quote divider between card rows — fades in with
 * decorative lines, adding emotional pacing to the scroll.
 */
function CinematicQuoteDivider({ quote }: { quote: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} className="py-16 md:py-24 relative z-10">
      <motion.div
        className="flex items-center justify-center gap-4 md:gap-6 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {/* Left decorative line */}
        <motion.div
          className="h-px flex-1 bg-gradient-to-r from-transparent to-romantic-pink/30"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        />

        {/* Quote text */}
        <motion.p
          className="font-playfair text-sm md:text-lg italic text-white/40 text-center whitespace-nowrap px-2"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
        >
          {quote}
        </motion.p>

        {/* Right decorative line */}
        <motion.div
          className="h-px flex-1 bg-gradient-to-l from-transparent to-romantic-pink/30"
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        />
      </motion.div>
    </div>
  )
}
