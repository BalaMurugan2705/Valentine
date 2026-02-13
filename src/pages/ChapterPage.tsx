import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function ChapterPage({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="relative min-h-screen">
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/story')}
          className="fixed top-4 left-4 md:top-6 md:left-6 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: EASE }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="15" y1="9" x2="3" y2="9" />
            <polyline points="9,3 3,9 9,15" />
          </svg>
        </motion.button>

        {children}
      </div>
    </PageTransition>
  )
}
