import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const videos = [
  {
    id: '14IIVdUBw8rqs1LZe2a0W-VbKTYouYBfh',
    title: 'Our First Reel',
    subtitle: 'Where it all began on camera',
    emoji: '🎬',
    gradient: 'from-rose-900/50 via-pink-800/40 to-red-900/50',
    accent: 'rgba(255,77,109,0.3)',
  },
  {
    id: '1GUMoMoFU9cq_q8ErjQ76aDmOTU4XSg10',
    title: 'Stolen Moments',
    subtitle: 'The little things that matter',
    emoji: '🎥',
    gradient: 'from-purple-900/50 via-indigo-800/40 to-pink-900/50',
    accent: 'rgba(168,85,247,0.3)',
  },
  {
    id: '1sp6ibuPXj8DV_IGVkiITOrYNyRchW5HS',
    title: 'Us Together',
    subtitle: 'Memories in motion',
    emoji: '📽️',
    gradient: 'from-amber-900/50 via-orange-800/40 to-rose-900/50',
    accent: 'rgba(212,165,116,0.3)',
  },
  {
    id: '1KQ42c-2DT8-bZld8wJ8cy6MB8d_r1sBV',
    title: 'Forever Ours',
    subtitle: 'The best is yet to come',
    emoji: '💝',
    gradient: 'from-red-900/50 via-rose-800/40 to-pink-900/50',
    accent: 'rgba(255,77,109,0.3)',
    rotate: -90,
  },
]

const PASSWORD = 'Feb142013'

export default function VideoScene() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [pendingVideoId, setPendingVideoId] = useState<string | null>(null)
  const [pwValue, setPwValue] = useState('')
  const [pwError, setPwError] = useState(false)
  const [shake, setShake] = useState(false)
  const activeRotate = videos.find((v) => v.id === activeVideo)?.rotate ?? 0

  const handleCardClick = (videoId: string) => {
    if (unlocked) {
      setActiveVideo(videoId)
    } else {
      setPendingVideoId(videoId)
      setPwValue('')
      setPwError(false)
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pwValue === PASSWORD) {
      setUnlocked(true)
      setPendingVideoId(null)
      setActiveVideo(pendingVideoId)
    } else {
      setPwError(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a0a14 0%, #0D1B2A 70%)' }}
    >
      <FloatingHearts count={5} />

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-romantic-pink/8 blur-[60px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-romantic-gold/6 blur-[50px]"
        animate={{ scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Header */}
      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <p className="font-poppins text-romantic-pink text-xs uppercase tracking-[0.4em] mb-3">
          Our Love in Motion
        </p>
        <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-white mb-4">
          Watch <span className="text-romantic-gradient">Our Story</span>
        </h2>
        <motion.span
          className="inline-block text-3xl"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          🎬
        </motion.span>
      </motion.div>

      {/* Video cards grid */}
      <div className="relative z-10 w-full max-w-2xl mx-auto grid grid-cols-2 gap-4 md:gap-6">
        {videos.map((video, i) => (
          <motion.button
            key={video.id}
            onClick={() => handleCardClick(video.id)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer text-left"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: EASE }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient}`} />

            {/* Animated film grain texture */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
              }}
            />

            {/* Glass border */}
            <div className="absolute inset-0 rounded-2xl border border-white/10" />

            {/* Content */}
            <div className="relative z-10 p-5 md:p-6 flex flex-col items-center text-center min-h-[180px] md:min-h-[220px] justify-center">
              {/* Animated emoji */}
              <motion.div
                className="text-4xl md:text-5xl mb-4"
                animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              >
                {video.emoji}
              </motion.div>

              {/* Play button ring */}
              <motion.div
                className="relative mb-4"
              >
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  style={{ width: 48, height: 48, top: -4, left: -4 }}
                />
                <div
                  className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors"
                >
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white ml-0.5" />
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="font-playfair text-sm md:text-base font-semibold text-white mb-1">
                {video.title}
              </h3>
              <p className="font-poppins text-[10px] md:text-xs text-white/40">
                {video.subtitle}
              </p>
            </div>

            {/* Corner sparkle */}
            <motion.div
              className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-romantic-pink"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: `0 20px 60px ${video.accent}` }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Password overlay */}
      <AnimatePresence>
        {pendingVideoId && !unlocked && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/90"
              onClick={() => setPendingVideoId(null)}
            />
            <motion.button
              onClick={() => setPendingVideoId(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer border border-white/10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✕
            </motion.button>
            <motion.div
              className="relative z-[205] w-[90vw] max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="text-center">
                <motion.div
                  className="text-5xl mb-5"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🔒
                </motion.div>
                <h3 className="font-playfair text-xl md:text-2xl font-semibold text-white mb-2">
                  Private <span className="text-romantic-gradient">videos</span>
                </h3>
                <p className="font-poppins text-white/40 text-xs mb-6">
                  Enter the password to watch
                </p>
                <form onSubmit={handlePasswordSubmit} className="space-y-3">
                  <motion.div
                    animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <input
                      type="password"
                      value={pwValue}
                      onChange={(e) => { setPwValue(e.target.value); setPwError(false) }}
                      placeholder="Enter password..."
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-poppins text-sm text-center placeholder-white/25 outline-none focus:border-romantic-pink/40 focus:bg-white/8 transition-all"
                      autoFocus
                    />
                  </motion.div>
                  {pwError && (
                    <motion.p
                      className="font-poppins text-red-400/80 text-xs"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Wrong password. Try again!
                    </motion.p>
                  )}
                  <p className="font-poppins text-white/20 text-[10px]">
                    Hint: When did we first meet? (MmmDDYYYY)
                  </p>
                  <motion.button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-romantic-pink/15 border border-romantic-pink/30 text-white font-poppins text-sm font-medium cursor-pointer hover:bg-romantic-pink/25 hover:border-romantic-pink/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Unlock & Play
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video player overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90"
              onClick={() => setActiveVideo(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close button */}
            <motion.button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer border border-white/10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✕
            </motion.button>

            {/* Video iframe */}
            <motion.div
              className="relative z-[205] w-[90vw] max-w-3xl aspect-video rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: activeRotate }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}
            >
              <iframe
                src={`https://drive.google.com/file/d/${activeVideo}/preview`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
