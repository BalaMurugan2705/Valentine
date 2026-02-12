import { motion } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94]

/**
 * Wraps a page with cinematic enter/exit transitions.
 * - Enter: fades in from black with slight upward drift + blur clear
 * - Exit: fades to black with downward drift + blur
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 1, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
