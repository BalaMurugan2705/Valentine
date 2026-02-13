import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import IntroScene from './scenes/IntroScene'
import StoryPage from './pages/StoryPage'
import ChapterPage from './pages/ChapterPage'

// Scenes
import StoryScene from './scenes/StoryScene'
import ReasonsScene from './scenes/ReasonsScene'
import MemoriesScene from './scenes/MemoriesScene'
import MomentsScene from './scenes/MomentsScene'
import QuizScene from './scenes/QuizScene'
import PromisesScene from './scenes/PromisesScene'
import LetterScene from './scenes/LetterScene'
import VideoScene from './scenes/VideoScene'
import FinalScene from './scenes/FinalScene'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IntroScene />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/story/our-story" element={<ChapterPage><StoryScene /></ChapterPage>} />
        <Route path="/story/reasons" element={<ChapterPage><ReasonsScene /></ChapterPage>} />
        <Route path="/story/memories" element={<ChapterPage><MemoriesScene /></ChapterPage>} />
        <Route path="/story/moments" element={<ChapterPage><MomentsScene /></ChapterPage>} />
        <Route path="/story/quiz" element={<ChapterPage><QuizScene /></ChapterPage>} />
        <Route path="/story/promises" element={<ChapterPage><PromisesScene /></ChapterPage>} />
        <Route path="/story/letter" element={<ChapterPage><LetterScene /></ChapterPage>} />
        <Route path="/story/videos" element={<ChapterPage><VideoScene /></ChapterPage>} />
        <Route path="/story/forever" element={<ChapterPage><FinalScene /></ChapterPage>} />
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
