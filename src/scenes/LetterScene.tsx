import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import CinematicSection from '../components/CinematicSection'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * SCENE 5 — LOVE LETTER REVEAL (CINEMATIC)
 *
 * - Envelope-open inspired entrance (card rises from below with rotation)
 * - Scroll-linked parallax on the entire card
 * - Typing reveal with cursor blink
 * - Ambient warm aurora glows
 * - Decorative wax-seal heart
 * - Floating sparkles
 */

const letterLines = [
  'My Dearest Love,',
  '',
  'Do you remember that shy kid in school who could barely talk to you?',
  'That was me — completely mesmerized by you from the very first day.',
  '',
  '12 years ago, our story began in a classroom,',
  'and today I write this as your husband, still just as in love.',
  '',
  'But I need to tell you something I should have said long ago.',
  '',
  'I know marriage was not easy for you.',
  'I know there were days you cried in silence,',
  'nights you carried pain you never showed anyone,',
  'moments you faced everything alone — because of me.',
  '',
  'You went through every tough moment without a word.',
  'You held this family together when I was the reason it was shaking.',
  'You swallowed your tears and still smiled for me.',
  '',
  'I see it now. I see all of it.',
  'And I am so deeply sorry for every silent tear you shed.',
  '',
  'You are the strongest person I have ever known.',
  'Not because you never broke — but because you broke',
  'and still chose to stay, to love, to forgive.',
  '',
  'You are not just my wife — you are my school sweetheart,',
  'my best friend, my greatest strength,',
  'and the reason I want to be a better man every single day.',
  '',
  'Thank you for 12 incredible years.',
  'Thank you for every silent sacrifice.',
  'Thank you for choosing me, even when I did not deserve it.',
  '',
  "I promise — the best of me is still coming, and it's all for you.",
  '',
  'Forever yours, since school ❤️',
]

export default function LetterScene() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-15% 0px' })
  const [visibleLines, setVisibleLines] = useState(0)

  // Scroll parallax on the card
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, -1])

  // Sparkles
  const sparkles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        dur: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      })),
    []
  )

  // Typing reveal — line by line
  useEffect(() => {
    if (!isInView) return
    let lineIndex = 0
    const interval = setInterval(() => {
      lineIndex++
      setVisibleLines(lineIndex)
      if (lineIndex >= letterLines.length) clearInterval(interval)
    }, 160)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 md:py-32 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-romantic-gold/8 blur-[140px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-romantic-pink/8 blur-[100px]"
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-romantic-gold/5 blur-[80px]"
          animate={{ scale: [0.9, 1.3, 0.9] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-romantic-gold"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Section heading */}
        <CinematicSection className="text-center mb-10" direction="scale">
          <motion.div className="overflow-hidden mb-3">
            <motion.p
              className="font-poppins text-romantic-pink text-sm uppercase tracking-[0.4em]"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              A Letter For You
            </motion.p>
          </motion.div>

          {/* Wax seal heart */}
          <motion.div
            className="relative inline-block"
            animate={{ scale: [1, 1.1, 1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-4xl">💌</span>
            {/* Glow behind seal */}
            <div className="absolute inset-0 rounded-full bg-romantic-gold/20 blur-[16px] -z-10 scale-150" />
          </motion.div>
        </CinematicSection>

        {/* Letter card — envelope-open style entrance */}
        <motion.div
          ref={cardRef}
          className="glass-strong rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 100, rotateX: 15, filter: 'blur(8px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }
              : {}
          }
          transition={{ duration: 1.5, ease: EASE }}
          style={{
            y: cardY,
            rotate: cardRotate,
            boxShadow: '0 40px 100px rgba(255,77,109,0.1), 0 15px 40px rgba(0,0,0,0.35)',
            perspective: '800px',
          }}
        >
          {/* Card shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
          />

          {/* Decorative corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-romantic-pink/15 rounded-tl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-romantic-pink/15 rounded-br-lg" />

          {/* Letter lines */}
          <div className="space-y-1 relative z-10">
            {letterLines.map((line, index) => (
              <motion.p
                key={index}
                className={`font-poppins text-sm md:text-base leading-relaxed ${
                  index === 0
                    ? 'font-playfair text-lg md:text-xl text-romantic-pink-light font-medium mb-1'
                    : line === ''
                      ? 'h-4'
                      : index >= letterLines.length - 2
                        ? 'font-playfair text-base md:text-lg italic text-romantic-pink-light'
                        : 'text-white/75'
                }`}
                style={{
                  opacity: index < visibleLines ? 1 : 0,
                  transform: index < visibleLines ? 'translateY(0) translateX(0)' : 'translateY(8px) translateX(-4px)',
                  filter: index < visibleLines ? 'blur(0px)' : 'blur(2px)',
                  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {line || '\u00A0'}
              </motion.p>
            ))}
          </div>

          {/* Typing cursor */}
          {isInView && visibleLines < letterLines.length && (
            <motion.span
              className="inline-block w-0.5 h-5 bg-romantic-pink ml-1 mt-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}

          {/* Completion heart */}
          {visibleLines >= letterLines.length && (
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.span
                className="text-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ❤️
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
