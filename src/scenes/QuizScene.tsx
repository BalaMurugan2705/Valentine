import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import CinematicSection from '../components/CinematicSection'

/**
 * QUIZ SCENE — "How Well Do You Know Me?" Game
 *
 * An interactive romantic quiz embedded in the cinematic flow.
 * The user answers multiple-choice questions, sees instant feedback,
 * and gets a final score with an emotional result message.
 *
 * PERSONALIZE: Edit the `questions` array below with your own
 * questions and answers. Set `correctIndex` to the index (0-based)
 * of the correct option.
 */

interface Question {
  question: string
  options: string[]
  /** Index of the correct answer (0-based) */
  correctIndex: number
}

// ──────────────────────────────────────────────
// EDIT YOUR QUESTIONS HERE
// ──────────────────────────────────────────────
const questions: Question[] = [
  {
    question: 'Where did we first meet?',
    options: ['At a friend\'s party', 'In school — where it all began', 'At a family gathering', 'Online'],
    correctIndex: 1,
  },
  {
    question: 'How many years have we been in love?',
    options: ['8 years', '10 years', '12 beautiful years', '15 years'],
    correctIndex: 2,
  },
  {
    question: 'What was the hardest part of our journey?',
    options: ['The distance during college', 'Convincing our families', 'Waiting 10 years to get married', 'All of the above — but worth every moment'],
    correctIndex: 3,
  },
  {
    question: 'What do I love most about our story?',
    options: ['That it started so young', 'That we never gave up', 'That we grew up together', 'Everything — it\'s perfectly ours'],
    correctIndex: 3,
  },
  {
    question: 'What was I feeling on our wedding day?',
    options: ['"Finally, after 10 years!"', '"She looks even more beautiful"', '"This is the best day of my life"', 'All of the above, and tears of joy'],
    correctIndex: 3,
  },
  {
    question: 'What is my favorite memory from school?',
    options: ['Seeing you for the first time', 'Our secret conversations', 'Walking home together', 'Every single moment with you'],
    correctIndex: 3,
  },
  {
    question: 'Where would I love to celebrate our next anniversary?',
    options: ['Paris — the city of love', 'Maldives — just us and the ocean', 'Back to our school town — where it began', 'Anywhere, as long as it\'s with you'],
    correctIndex: 3,
  },
  {
    question: 'If I could go back in time, I would...',
    options: ['Change nothing — our journey is perfect', 'Marry you even sooner', 'Tell school-me that this girl is your forever', 'All of the above'],
    correctIndex: 0,
  },
]

// Score-based result messages
function getResultMessage(score: number, total: number): { title: string; subtitle: string; emoji: string } {
  const pct = score / total
  if (pct === 1) return { title: 'You know me perfectly!', subtitle: '12 years together and you still know my heart better than anyone. We truly are soulmates, from school till forever.', emoji: '💖' }
  if (pct >= 0.75) return { title: 'You know me so well!', subtitle: 'After 12 years, you still pay attention to every detail. That is why I fell in love with you in school and never stopped.', emoji: '❤️' }
  if (pct >= 0.5) return { title: 'You know me pretty well!', subtitle: "12 years and still learning about each other — that's what makes our love so exciting!", emoji: '💕' }
  return { title: 'Let me remind you!', subtitle: "After all these years, I still have surprises left. That's the beauty of us — we never stop discovering each other.", emoji: '💗' }
}

// Luxury easing
const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function QuizScene() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  const [gameStarted, setGameStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [finished, setFinished] = useState(false)

  const question = questions[currentQ]
  const isCorrect = selectedAnswer === question?.correctIndex
  const result = getResultMessage(score, questions.length)

  const handleSelect = (index: number) => {
    if (showFeedback) return // prevent double-click
    setSelectedAnswer(index)
    setShowFeedback(true)
    if (index === question.correctIndex) {
      setScore((s) => s + 1)
    }

    // Auto-advance after feedback
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        setFinished(true)
      }
    }, 1800)
  }

  const handleReplay = () => {
    setGameStarted(true)
    setCurrentQ(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setFinished(false)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 md:py-32 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-romantic-pink/8 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-romantic-gold/6 blur-[100px]"
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* ── START SCREEN ── */}
          {!gameStarted && !finished && (
            <motion.div
              key="start"
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <CinematicSection>
                <motion.p className="font-poppins text-romantic-pink text-sm uppercase tracking-[0.3em] mb-6">
                  A Little Game
                </motion.p>
                <motion.div
                  className="text-5xl md:text-6xl mb-6"
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                >
                  🎮
                </motion.div>
                <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-white mb-4">
                  After 12 years, how well do you{' '}
                  <span className="text-romantic-gradient">know me?</span>
                </h2>
                <p className="font-poppins text-white/50 text-base md:text-lg mb-10 max-w-md mx-auto">
                  {questions.length} questions about our journey from school to forever.
                </p>
                <motion.button
                  onClick={() => setGameStarted(true)}
                  className="font-poppins text-sm md:text-base font-medium text-white px-8 py-4 rounded-full border border-romantic-pink/40 bg-romantic-pink/10 backdrop-blur-sm cursor-pointer hover:bg-romantic-pink/20 hover:border-romantic-pink/60 hover:shadow-[0_0_40px_rgba(255,77,109,0.3)] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's play ❤️
                </motion.button>
              </CinematicSection>
            </motion.div>
          )}

          {/* ── QUESTION SCREEN ── */}
          {gameStarted && !finished && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-poppins text-xs text-white/40 uppercase tracking-wider">
                    Question {currentQ + 1} of {questions.length}
                  </span>
                  <span className="font-poppins text-xs text-romantic-pink">
                    Score: {score}
                  </span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-romantic-pink to-romantic-pink-light rounded-full"
                    initial={{ width: `${(currentQ / questions.length) * 100}%` }}
                    animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="glass-strong rounded-2xl p-6 md:p-10" style={{ boxShadow: '0 20px 60px rgba(255,77,109,0.08), 0 8px 24px rgba(0,0,0,0.3)' }}>
                {/* Question text */}
                <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-8 text-center leading-snug">
                  {question.question}
                </h3>

                {/* Answer options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrectAnswer = index === question.correctIndex

                    let borderColor = 'border-white/10 hover:border-romantic-pink/40'
                    let bgColor = 'bg-white/5 hover:bg-white/8'
                    let textColor = 'text-white/80'
                    let icon = ''

                    if (showFeedback) {
                      if (isCorrectAnswer) {
                        borderColor = 'border-green-400/60'
                        bgColor = 'bg-green-400/10'
                        textColor = 'text-green-300'
                        icon = ' ✓'
                      } else if (isSelected && !isCorrectAnswer) {
                        borderColor = 'border-red-400/40'
                        bgColor = 'bg-red-400/8'
                        textColor = 'text-red-300/80'
                        icon = ' ✗'
                      } else {
                        borderColor = 'border-white/5'
                        bgColor = 'bg-white/3'
                        textColor = 'text-white/30'
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleSelect(index)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 md:p-5 rounded-xl border ${borderColor} ${bgColor} ${textColor} font-poppins text-sm md:text-base transition-all duration-300 cursor-pointer disabled:cursor-default`}
                        whileHover={!showFeedback ? { scale: 1.02, x: 4 } : {}}
                        whileTap={!showFeedback ? { scale: 0.98 } : {}}
                        layout
                      >
                        <span className="flex items-center gap-3">
                          <span className={`flex-shrink-0 w-7 h-7 rounded-full border ${showFeedback && isCorrectAnswer ? 'border-green-400 bg-green-400/20' : showFeedback && isSelected ? 'border-red-400 bg-red-400/20' : 'border-white/20'} flex items-center justify-center text-xs font-medium`}>
                            {showFeedback ? (isCorrectAnswer ? '✓' : isSelected ? '✗' : String.fromCharCode(65 + index)) : String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}{icon && <span className="ml-1">{icon}</span>}</span>
                        </span>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Feedback message */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      className="mt-6 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className={`font-poppins text-sm ${isCorrect ? 'text-green-300' : 'text-romantic-pink-light'}`}>
                        {isCorrect
                          ? ['You know me so well! 💖', 'Perfect answer! ❤️', 'Exactly right! 🥰', 'You really get me! 💕'][currentQ % 4]
                          : ['Not quite, but I still love you! 💗', 'Close! We\'ll learn together 💕', 'That\'s okay, love isn\'t a test 🤍', 'More reasons to spend time together! 💖'][currentQ % 4]
                        }
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── RESULT SCREEN ── */}
          {finished && (
            <motion.div
              key="result"
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE }}
            >
              {/* Score circle */}
              <motion.div
                className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* Outer ring */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                  <motion.circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="url(#scoreGradient)" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / questions.length) }}
                    transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF4D6D" />
                      <stop offset="100%" stopColor="#D4A574" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Score text inside */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="font-playfair text-4xl md:text-5xl font-bold text-romantic-gradient"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {score}/{questions.length}
                  </motion.span>
                  <motion.span
                    className="font-poppins text-xs text-white/40 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    correct
                  </motion.span>
                </div>
              </motion.div>

              {/* Result emoji */}
              <motion.div
                className="text-5xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {result.emoji}
                </motion.span>
              </motion.div>

              {/* Result title */}
              <motion.h2
                className="font-playfair text-2xl md:text-4xl font-semibold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: EASE }}
              >
                {result.title}
              </motion.h2>

              {/* Result subtitle */}
              <motion.p
                className="font-poppins text-white/50 text-sm md:text-base max-w-md mx-auto mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
              >
                {result.subtitle}
              </motion.p>

              {/* Individual question results */}
              <motion.div
                className="glass rounded-xl p-4 md:p-6 mb-8 max-w-lg mx-auto text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.8, ease: EASE }}
                style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.2)' }}
              >
                <p className="font-poppins text-xs text-white/40 uppercase tracking-wider mb-3">Results breakdown</p>
                <div className="space-y-2">
                  {questions.map((q, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 py-1.5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.3 + i * 0.1 }}
                    >
                      <span className="text-sm">{i < score ? '✅' : '💔'}</span>
                      <span className="font-poppins text-xs md:text-sm text-white/60 truncate flex-1">
                        {q.question}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Replay button */}
              <motion.button
                onClick={handleReplay}
                className="font-poppins text-sm font-medium text-white/60 px-6 py-3 rounded-full border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 hover:text-white transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play again 🔄
              </motion.button>

              {/* Scroll hint */}
              <motion.p
                className="font-poppins text-xs text-white/20 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
              >
                Keep scrolling for a surprise...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
