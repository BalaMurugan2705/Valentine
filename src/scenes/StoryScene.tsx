import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import StoryText from '../components/StoryText'
import CinematicSection from '../components/CinematicSection'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * SCENE 2 + 3 — CINEMATIC SCROLL STORY (FULL OVERHAUL)
 *
 * Apple-style scroll storytelling with:
 * - Hero intro with scroll-linked fade/scale
 * - Sparkle particles around heading
 * - Each story block: scroll-linked opacity + scale transitions
 * - Parallax images with blur-to-clear reveal + shimmer
 * - Floating section emojis
 * - Decorative elements between blocks
 */

const storyBlocks = [
  {
    text: 'It started in school — a shy glance across the classroom',
    subtitle: 'Two kids who barely knew the world, but somehow found each other. That first look, that nervous smile — the beginning of a love story 12 years in the making.',
    emoji: '🏫',
  },
  {
    text: 'From passing notes to building dreams together',
    subtitle: 'School days turned into college years. Through exams, distances, and growing up — we never let go. Every challenge only made us stronger.',
    emoji: '📝',
  },
  {
    text: 'Ten years of love led to one beautiful "I do"',
    subtitle: 'After a decade of loving you through every season of life, we stood before the world and made it official. The best decision I ever made.',
    emoji: '💒',
  },
  {
    text: 'You faced the hardest days in silence — because of me',
    subtitle: 'Marriage was not always kind. There were days you cried alone, moments you carried everything in silence. You went through it all without a word — and still chose to stay. I see your strength now, and I am so deeply sorry.',
    emoji: '🥀',
  },
  {
    text: 'But you stayed — and that changed everything',
    subtitle: 'You could have walked away. But you held on, forgave, and loved me through my worst. Your silent sacrifice is the bravest thing anyone has ever done for me. I will spend the rest of my life making it right.',
    emoji: '🤍',
  },
  {
    text: '12 years later — still my favorite person, now more than ever',
    subtitle: 'From school sweethearts who survived the storm. Every year with you teaches me something new about love. You are my past, my present, my forever — and the best is yet to come.',
    emoji: '💍',
  },
]

const storyImages = [
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
  'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&q=80',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
  'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80',
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80',
  'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&q=80',
]

export default function StoryScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.05, 0.15, 0.1, 0.2])

  return (
    <section ref={containerRef} className="relative">
      {/* Scroll-linked background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,77,109,0.12) 0%, transparent 60%)',
          opacity: gradientOpacity,
        }}
      />

      <HeroIntro />

      {storyBlocks.map((block, index) => (
        <StoryBlock
          key={index}
          block={block}
          image={storyImages[index]}
          index={index}
          isLast={index === storyBlocks.length - 1}
        />
      ))}
    </section>
  )
}

function HeroIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const headingScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9])
  const headingY = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60,
        y: 40 + (Math.random() - 0.5) * 40,
        size: Math.random() * 3 + 1,
        dur: Math.random() * 3 + 2,
        delay: Math.random() * 3,
      })),
    []
  )

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-romantic-pink"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="text-center max-w-3xl mx-auto relative z-10"
        style={{ opacity: headingOpacity, scale: headingScale, y: headingY }}
      >
        <motion.div className="overflow-hidden mb-6">
          <motion.p
            className="font-poppins text-romantic-pink text-sm md:text-base uppercase tracking-[0.4em]"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            12 Years of Love
          </motion.p>
        </motion.div>

        <StoryText
          text="From school sweethearts to soulmates — our love story"
          subtitle="Scroll down to relive 12 beautiful years together..."
          wordByWord
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-romantic-pink"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.span
          className="font-poppins text-[10px] text-white/20 uppercase tracking-widest"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          scroll
        </motion.span>
      </motion.div>
    </div>
  )
}

function StoryBlock({
  block,
  image,
  index,
  isLast,
}: {
  block: (typeof storyBlocks)[0]
  image: string
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const blockOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, isLast ? 1 : 0.3])
  const blockScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98])
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 md:py-24 relative"
      style={{ opacity: blockOpacity, scale: blockScale }}
    >
      {/* Floating emoji */}
      <motion.div
        className="absolute top-20 right-[10%] text-3xl md:text-4xl pointer-events-none opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {block.emoji}
      </motion.div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <CinematicSection
          className={isEven ? '' : 'lg:order-2'}
          delay={0.2}
          direction={isEven ? 'left' : 'right'}
        >
          <StoryText text={block.text} subtitle={block.subtitle} wordByWord />
        </CinematicSection>

        <CinematicSection
          className={isEven ? '' : 'lg:order-1'}
          delay={0.4}
          direction={isEven ? 'right' : 'left'}
        >
          <ParallaxImage src={image} alt={block.text} index={index} />
        </CinematicSection>
      </div>
    </motion.div>
  )
}

function ParallaxImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.02, 0.92])
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 2 : -2, index % 2 === 0 ? -1 : 1])

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden"
      style={{
        y, scale, rotate,
        boxShadow: '0 30px 80px rgba(255,77,109,0.12), 0 10px 30px rgba(0,0,0,0.4)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
          style={{ y: imgY }}
          initial={{ scale: 1.2, filter: 'blur(12px)' }}
          animate={isInView ? { scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.8, ease: EASE }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-romantic-dark/70 via-transparent to-romantic-dark/20" />
        <div className="absolute inset-0 bg-romantic-pink/3" />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)' }}
          initial={{ x: '-100%' }}
          animate={isInView ? { x: ['100%', '-100%'] } : {}}
          transition={{ duration: 3, delay: 1, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-romantic-pink"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
