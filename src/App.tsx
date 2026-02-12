import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import IntroScene from './scenes/IntroScene'
import StoryPage from './pages/StoryPage'

/**
 * VALENTINE CINEMATIC EXPERIENCE — Router
 *
 * Two separate screens with cinematic transitions:
 * - "/" — Gift box opening screen
 * - "/story" — The full scrollable love story experience
 *
 * AnimatePresence handles cross-page transitions.
 */
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IntroScene />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
