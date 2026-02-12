import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/**
 * SCENE 1 — GIFT BOX SCREEN
 *
 * A full-page 3D gift box with:
 * - Starfield background
 * - Light rays from center
 * - 3D gift box (body + lid + ribbon + bow) built with CSS
 * - Floating idle animation on the box
 * - On click: lid opens upward, light bursts out, then navigates to /story
 * - Particles, glows, and sparkles throughout
 */
export default function IntroScene() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'idle' | 'opening' | 'burst'>('idle')

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        dur: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      })),
    []
  )

  const rays = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 10,
        length: Math.random() * 200 + 250,
        dur: Math.random() * 4 + 5,
        delay: Math.random() * 3,
      })),
    []
  )

  // Burst particles that fly out when box opens
  const burstParticles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2
        return {
          id: i,
          x: Math.cos(angle) * (150 + Math.random() * 200),
          y: Math.sin(angle) * (150 + Math.random() * 200) - 100,
          emoji: ['❤️', '💕', '✨', '💖', '🌸', '💗'][Math.floor(Math.random() * 6)],
          size: Math.random() * 16 + 12,
          dur: Math.random() * 0.8 + 0.6,
        }
      }),
    []
  )

  const handleOpen = () => {
    if (phase !== 'idle') return
    setPhase('opening')
    // After lid opens, trigger burst
    setTimeout(() => setPhase('burst'), 800)
    // Navigate after full animation
    setTimeout(() => navigate('/story'), 2400)
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{ background: 'radial-gradient(ellipse at center, #1a0a14 0%, #0D1B2A 60%, #060d16 100%)' }}
      onClick={handleOpen}
    >
      {/* ── STARFIELD ── */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.3, 1, 0.3] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── LIGHT RAYS ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {rays.map((r) => (
          <motion.div
            key={r.id}
            className="absolute w-px bg-gradient-to-t from-romantic-pink/8 via-romantic-pink/4 to-transparent origin-bottom"
            style={{ height: r.length, transform: `rotate(${r.angle}deg)` }}
            animate={{ opacity: [0, 0.12, 0], scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: r.dur, delay: r.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── AURORA GLOWS ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-[400px] md:h-[400px] rounded-full bg-romantic-pink/6 blur-[120px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-72 md:h-72 rounded-full bg-romantic-gold/5 blur-[100px]"
          animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <FloatingHearts count={12} />

      {/* ── TOP TEXT ── */}
      <motion.div
        className="relative z-20 text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
      >
        <motion.p
          className="font-poppins text-romantic-pink/70 text-xs md:text-sm uppercase tracking-[0.4em] mb-3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          12 Years of Us
        </motion.p>
        <h1 className="font-playfair text-2xl md:text-4xl lg:text-5xl font-semibold text-white">
          From school sweethearts to{' '}
          <span className="text-romantic-gradient-animated">forever</span>
        </h1>
      </motion.div>

      {/* ── 3D GIFT BOX ── */}
      <motion.div
        className="relative z-20"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ perspective: '800px' }}
      >
        {/* Floating idle animation wrapper */}
        <motion.div
          animate={phase === 'idle' ? { y: [0, -12, 0], rotate: [0, 1, 0, -1, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Glow under box */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 md:w-56 md:h-10 rounded-full bg-romantic-pink/20 blur-[24px]"
            animate={
              phase === 'burst'
                ? { opacity: 0, scaleX: 2 }
                : { opacity: [0.3, 0.6, 0.3], scaleX: [0.9, 1.1, 0.9] }
            }
            transition={{ duration: phase === 'burst' ? 0.5 : 3, repeat: phase === 'burst' ? 0 : Infinity, ease: 'easeInOut' }}
          />

          {/* ── BOX BODY ── */}
          <div className="relative w-36 h-32 md:w-52 md:h-44">
            {/* Box face */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'linear-gradient(145deg, #c42b50 0%, #8b1a3a 40%, #6d1530 100%)',
                boxShadow: '0 20px 60px rgba(196, 43, 80, 0.3), inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.4)',
              }}
            />

            {/* Vertical ribbon */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-5 md:w-7">
              <div
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(90deg, #d4a574 0%, #e8c89e 30%, #d4a574 50%, #c49564 70%, #d4a574 100%)',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)',
                }}
              />
            </div>

            {/* Horizontal ribbon */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-5 md:h-7">
              <div
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(180deg, #d4a574 0%, #e8c89e 30%, #d4a574 50%, #c49564 70%, #d4a574 100%)',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)',
                }}
              />
            </div>

            {/* Subtle shine on box */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)',
              }}
            />
          </div>

          {/* ── BOX LID ── */}
          <motion.div
            className="absolute -top-3 md:-top-4 left-1/2 w-[calc(100%+16px)] md:w-[calc(100%+20px)]"
            style={{
              translateX: '-50%',
              transformOrigin: 'top center',
              zIndex: 10,
            }}
            animate={
              phase === 'opening' || phase === 'burst'
                ? { rotateX: -120, y: -40, opacity: phase === 'burst' ? 0 : 1 }
                : {}
            }
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Lid face */}
            <div
              className="h-10 md:h-14 rounded-lg"
              style={{
                background: 'linear-gradient(145deg, #d63060 0%, #a02045 40%, #8b1a3a 100%)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            />

            {/* Lid ribbon cross */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-5 md:w-7">
              <div
                className="w-full h-full"
                style={{ background: 'linear-gradient(90deg, #d4a574 0%, #e8c89e 30%, #d4a574 50%, #c49564 70%, #d4a574 100%)' }}
              />
            </div>

            {/* ── BOW ── */}
            <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 flex items-end gap-0">
              {/* Left loop */}
              <motion.div
                className="w-6 h-8 md:w-8 md:h-10 rounded-full border-2"
                style={{
                  borderColor: '#d4a574',
                  background: 'linear-gradient(135deg, #e8c89e 0%, #d4a574 50%, #c49564 100%)',
                  transform: 'rotate(-30deg)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              />
              {/* Center knot */}
              <div
                className="w-3 h-3 md:w-4 md:h-4 rounded-full -mx-1.5 z-10 relative -top-1"
                style={{
                  background: 'radial-gradient(circle, #e8c89e 0%, #c49564 100%)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
              />
              {/* Right loop */}
              <motion.div
                className="w-6 h-8 md:w-8 md:h-10 rounded-full border-2"
                style={{
                  borderColor: '#d4a574',
                  background: 'linear-gradient(225deg, #e8c89e 0%, #d4a574 50%, #c49564 100%)',
                  transform: 'rotate(30deg)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              />
            </div>

            {/* Lid shine */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
              }}
            />
          </motion.div>

          {/* ── LIGHT BURST when box opens ── */}
          {(phase === 'opening' || phase === 'burst') && (
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,77,109,0.6) 0%, rgba(212,165,116,0.3) 30%, transparent 70%)',
                zIndex: 5,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3, 5], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          )}

          {/* ── BURST PARTICLES ── */}
          {phase === 'burst' &&
            burstParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{ fontSize: p.size, zIndex: 15 }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ x: p.x, y: p.y, opacity: [1, 1, 0], scale: [0, 1.2, 0.5] }}
                transition={{ duration: p.dur + 0.5, ease: 'easeOut' }}
              >
                {p.emoji}
              </motion.div>
            ))}
        </motion.div>
      </motion.div>

      {/* ── BOTTOM TEXT ── */}
      <motion.div
        className="relative z-20 text-center mt-8 md:mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={
          phase === 'burst'
            ? { opacity: 0, y: -20 }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: phase === 'burst' ? 0.5 : 1.2, delay: phase === 'burst' ? 0 : 1.2, ease: EASE }}
      >
        <motion.p
          className="font-poppins text-white/30 text-sm md:text-base mb-2"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Tap to unwrap our journey
        </motion.p>

        {/* Animated tap indicator */}
        <motion.div
          className="inline-block"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-lg">👆</span>
        </motion.div>
      </motion.div>

      {/* Full-screen white flash on burst */}
      {phase === 'burst' && (
        <motion.div
          className="fixed inset-0 z-50 bg-white pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      )}

      {/* Sound hint */}
      <motion.p
        className="absolute bottom-6 font-poppins text-[10px] text-white/10 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        a love story 12 years in the making 💕
      </motion.p>
    </div>
  )
}
