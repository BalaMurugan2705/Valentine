import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import StoryText from '../components/StoryText'
import CinematicSection from '../components/CinematicSection'
import FloatingHearts from '../components/FloatingHearts'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const storyBlocks = [
  {
    text: 'It started in 2013 — a shy glance across the classroom',
    subtitle: 'Two kids who barely knew the world, but somehow found each other in school. That first look, that nervous smile — the beginning of a love story 12 years in the making.',
    emoji: '🏫',
  },
  {
    text: '2014 — "I love you" changed everything',
    subtitle: 'One year of stolen glances turned into the three words that changed our lives forever. From that moment, college distance could never break what we had. Four years apart, 2014 to 2018, but our hearts were never far.',
    emoji: '💕',
  },
  {
    text: 'Chennai, Vellore, and back — every city became ours',
    subtitle: '2019 brought us together in Chennai, then Vellore gave us new memories in 2020-21, and Chennai welcomed us back in 2021. Every city, every chapter — we turned it all into love.',
    emoji: '🌆',
  },
  {
    text: '2024 — after 11 years, you finally became my wife',
    subtitle: 'From school sweethearts to standing at the altar. Every year of waiting, every tear, every long-distance call — it all led to the most beautiful day of our lives. You said yes, and my world was complete.',
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
    subtitle: 'From a school classroom in 2013 to building our forever in 2025. Every year with you teaches me something new about love. You are my past, my present, my forever — and the best is yet to come.',
    emoji: '💍',
  },
]

const storyImages = [
  { src: '/photos/college.jpg' },                                    // school days
  { src: '/photos/early-days.jpg', objectPosition: 'center 30%' },   // early days — face higher
  { src: '/photos/chennai-2019a.jpg' },                              // 2019 — Chennai memories
  { src: '/photos/prewedding.jpg' },                                 // prewedding
  { src: '/photos/together-2022.jpg' },                              // 2022 — tough chapter
  { src: '/photos/together-2023a.jpg' },                             // 2023 — you stayed
  { src: '/photos/anniversary.jpg' },                                // love anniversary 12
]

const dialogues = [
  {
    left: '"Do you remember me from class? 2013..."',
    right: '"How could I forget... you were the shy one who always stared"',
    leftEmoji: '🙈',
    rightEmoji: '😊',
  },
  {
    left: '"College is taking me away... but my heart stays with you"',
    right: '"4 years is nothing. I will wait forever if I have to"',
    leftEmoji: '💌',
    rightEmoji: '🤞',
  },
  {
    left: '"Chennai, Vellore... every city feels like home with you"',
    right: '"Because home is not a place. Home is you"',
    leftEmoji: '🏙️',
    rightEmoji: '🥰',
  },
  {
    left: '"After 11 years... will you marry me?"',
    right: '"I have been saying yes since 2013... finally!"',
    leftEmoji: '💍',
    rightEmoji: '😭❤️',
  },
  {
    left: '"I know I hurt you... I see every tear you hid"',
    right: '"..."',
    leftEmoji: '😔',
    rightEmoji: '🥀',
  },
  {
    left: '"I will spend forever making it right"',
    right: '"I stayed because I believed in us... I always will"',
    leftEmoji: '🤍',
    rightEmoji: '💕',
  },
]

const timeline = [
  { year: '2013', label: 'Met in school — where it all began', emoji: '🏫' },
  { year: '2014', label: 'First "I love you"', emoji: '💕' },
  { year: '2014–18', label: 'College years — distance but never apart', emoji: '📱' },
  { year: '2019', label: 'Chennai love memories', emoji: '🌆' },
  { year: '2020–21', label: 'Vellore — a new chapter together', emoji: '💑' },
  { year: '2021–23', label: 'Back to Chennai — building our life', emoji: '🏙️' },
  { year: '2024', label: 'Married — finally forever', emoji: '💒' },
  { year: '2025', label: '12 years & still falling in love', emoji: '💖' },
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
      <FloatingHearts count={10} />
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,77,109,0.12) 0%, transparent 60%)',
          opacity: gradientOpacity,
        }}
      />

      <HeroIntro />

      {storyBlocks.map((block, index) => (
        <div key={index}>
          <StoryBlock
            block={block}
            image={storyImages[index].src}
            imagePosition={storyImages[index].objectPosition}
            index={index}
            isLast={index === storyBlocks.length - 1}
          />
          {index < dialogues.length && (
            <DialogueBubbles dialogue={dialogues[index]} index={index} />
          )}
        </div>
      ))}

      <ClosingSection />
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
      Array.from({ length: 8 }, (_, i) => ({
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
      {/* Sparkles — reduced count */}
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

      {/* Floating school icons — simple y float only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['📚', '✏️', '🎒', '💕'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.08]"
            style={{
              left: `${15 + i * 22}%`,
              top: `${20 + (i % 2) * 35}%`,
              fontSize: 20,
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {emoji}
          </motion.div>
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
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            12 Years of Love
          </motion.p>
        </motion.div>

        <StoryText
          text="From school sweethearts to soulmates — our love story"
          subtitle="Scroll down to relive 12 beautiful years together..."
          wordByWord
        />

        <motion.div
          className="mt-8 text-3xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            💕
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
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

function DialogueBubbles({
  dialogue,
  index,
}: {
  dialogue: (typeof dialogues)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <div ref={ref} className="max-w-lg mx-auto px-6 py-10 md:py-14 relative">
      {/* Connector line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-romantic-pink/20 to-transparent pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {/* Heart on line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.span
          className="text-sm"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❤️
        </motion.span>
      </motion.div>

      <div className="space-y-4 relative z-10">
        {/* Left bubble (Him) */}
        <motion.div
          className="flex items-end gap-2 justify-start"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          <motion.span
            className="text-lg flex-shrink-0"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {dialogue.leftEmoji}
          </motion.span>
          <div
            className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]"
            style={{
              background: 'rgba(255,77,109,0.12)',
              border: '1px solid rgba(255,77,109,0.15)',
            }}
          >
            <p className="font-poppins text-sm text-white/70 italic leading-relaxed">
              {dialogue.left}
            </p>
          </div>
        </motion.div>

        {/* Right bubble (Her) */}
        <motion.div
          className="flex items-end gap-2 justify-end"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
        >
          <div
            className="rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]"
            style={{
              background: 'rgba(212,165,116,0.12)',
              border: '1px solid rgba(212,165,116,0.15)',
            }}
          >
            <p className="font-poppins text-sm text-white/70 italic leading-relaxed">
              {dialogue.right}
            </p>
          </div>
          <motion.span
            className="text-lg flex-shrink-0"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {dialogue.rightEmoji}
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}

function StoryBlock({
  block,
  image,
  imagePosition,
  index,
  isLast,
}: {
  block: (typeof storyBlocks)[0]
  image: string
  imagePosition?: string
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const blockOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, isLast ? 1 : 0.3])
  const blockScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.99])
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 md:py-24 relative"
      style={{ opacity: blockOpacity, scale: blockScale }}
    >
      {/* Floating emoji */}
      <motion.div
        className="absolute top-20 right-[10%] text-3xl md:text-4xl pointer-events-none opacity-15"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {block.emoji}
      </motion.div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <CinematicSection
          className={isEven ? '' : 'lg:order-2'}
          delay={0.1}
          direction={isEven ? 'left' : 'right'}
        >
          <StoryText text={block.text} subtitle={block.subtitle} wordByWord />
        </CinematicSection>

        <CinematicSection
          className={isEven ? '' : 'lg:order-1'}
          delay={0.25}
          direction={isEven ? 'right' : 'left'}
        >
          <ParallaxImage src={image} alt={block.text} index={index} objectPosition={imagePosition} />
        </CinematicSection>
      </div>
    </motion.div>
  )
}

function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  const closingSparkles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        dur: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      })),
    []
  )

  return (
    <div ref={ref} className="relative px-6 py-24 md:py-36 overflow-hidden">
      {/* Ambient glow — static, no animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-romantic-pink/8 blur-[160px] pointer-events-none opacity-20" />

      {/* Sparkles — reduced count */}
      <div className="absolute inset-0 pointer-events-none">
        {closingSparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-romantic-gold"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Section heading */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <motion.p
          className="font-poppins text-romantic-gold text-xs uppercase tracking-[0.4em] mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Our Timeline
        </motion.p>
        <motion.h2
          className="font-playfair text-3xl md:text-5xl font-semibold text-white mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          Every chapter of{' '}
          <span className="text-romantic-gradient">us</span>
        </motion.h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Vertical line */}
        <motion.div
          className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-romantic-pink/40 via-romantic-gold/30 to-romantic-pink/40"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          style={{ originY: 0 }}
        />

        {timeline.map((item, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={i}
              className={`relative flex items-center gap-4 mb-10 md:mb-12 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE }}
            >
              {/* Dot */}
              <motion.div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-romantic-pink z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              />

              {/* Content card */}
              <div
                className={`ml-14 md:ml-0 md:w-[42%] ${
                  isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'
                }`}
              >
                <div
                  className="glass-strong rounded-xl p-4 md:p-5 inline-block"
                  style={{ boxShadow: '0 8px 30px rgba(255,77,109,0.06)' }}
                >
                  <span className="text-2xl block mb-2">{item.emoji}</span>
                  <p className="font-playfair text-romantic-gold text-sm font-semibold mb-1">
                    {item.year}
                  </p>
                  <p className="font-poppins text-xs md:text-sm text-white/60">
                    {item.label}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Romantic quotes */}
      <RomanticQuotes isInView={isInView} />

      {/* Final message */}
      <motion.div
        className="text-center mt-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.8, ease: EASE }}
      >
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-romantic-pink/40" />
          <motion.span
            className="text-romantic-pink text-lg"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            ✦
          </motion.span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-romantic-pink/40" />
        </motion.div>

        <motion.p
          className="font-playfair text-xl md:text-3xl italic text-white/60 max-w-xl mx-auto mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.7, ease: EASE }}
        >
          "From that first shy glance in school in 2013 to standing at the altar in 2024 — every second with you was worth the wait"
        </motion.p>

        <motion.p
          className="font-poppins text-sm text-white/30 mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          — and the best chapters are still unwritten
        </motion.p>

        <motion.div
          className="flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.7, duration: 0.6 }}
        >
          {['❤️', '💕', '💖'].map((heart, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              {heart}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

function RomanticQuotes({ isInView }: { isInView: boolean }) {
  const quotes = [
    '"You are my today and all of my tomorrows"',
    '"In a sea of people, my eyes will always search for you"',
    '"I fell in love with you in school, and I fall deeper every day"',
    '"The best love story is ours — and it has no last page"',
  ]

  return (
    <div className="relative z-10 mt-16 max-w-xl mx-auto">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <p className="font-poppins text-romantic-pink/50 text-xs uppercase tracking-[0.3em]">
          Words from my heart
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quotes.map((quote, i) => (
          <motion.div
            key={i}
            className="glass rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.5 + i * 0.1, ease: EASE }}
          >
            <span className="text-lg block mb-2">💭</span>
            <p className="font-poppins text-xs md:text-sm text-white/50 italic leading-relaxed">
              {quote}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ParallaxImage({ src, alt, index, objectPosition = 'center' }: { src: string; alt: string; index: number; objectPosition?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const imgY = useTransform(scrollYProgress, [0, 1], [15, -15])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.01, 0.95])

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden"
      style={{
        y, scale,
        boxShadow: '0 20px 60px rgba(255,77,109,0.1), 0 8px 24px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
          style={{ y: imgY, objectPosition }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-romantic-dark/70 via-transparent to-romantic-dark/20" />
        <div className="absolute inset-0 bg-romantic-pink/3" />

        <motion.div
          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-romantic-pink"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
