import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import EnhancedResultCard from './EnhancedResultCard'
import TemperatureMeter from './TemperatureMeter'
import TrendGraph from './TrendGraph'
import ChatSimulator from './ChatSimulator'

const loveQuotes = [
  "The best thing to hold onto in life is each other. - Audrey Hepburn",
  "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more. - Angelita Lim",
  "You know you're in love when you can't fall asleep because reality is finally better than your dreams. - Dr. Seuss",
  "Love is composed of a single soul inhabiting two bodies. - Aristotle",
  "To love and be loved is to feel the sun from both sides. - David Viscott",
  "Love doesn't make the world go 'round. Love is what makes the ride worthwhile. - Franklin P. Jones"
]

const secretCommands = {
  'i miss you': () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    })
    return loveQuotes[Math.floor(Math.random() * loveQuotes.length)]
  },
  'i love you': () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    })
    return "Love recognized is the fastest path to happiness! 💖"
  },
  'help me': () => "Don't worry! Communication is key. Be honest and express your feelings clearly. 💪",
  'what should i do': () => "Trust your instincts! If it feels right, go for it. If not, take your time. 🧭",
  'is there hope': () => "There's always hope! Every conversation is a new opportunity. 🌟",
  'hello': () => "Hello there! Ready to decode some signals? 🔍"
}

const AnalysisPage = ({ onBack, theme }) => {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [showSimulator, setShowSimulator] = useState(false)
  const [typingEffect, setTypingEffect] = useState('')

  useEffect(() => {
    // Check for secret commands
    const lowerText = text.toLowerCase().trim()
    for (const [command, action] of Object.entries(secretCommands)) {
      if (lowerText === command) {
        const message = action()
        setTimeout(() => {
          alert(`🎯 ${message}`)
        }, 300)
        break
      }
    }

    // Typing effect for placeholder
    const phrases = [
      "Paste chat messages here...",
      "Try: 'I miss you so much! ❤️'",
      "Try: 'I'm busy right now, maybe later'",
      "Try: 'Whatever, do what you want'",
      "Try: 'Hi, how are you doing today?'"
    ]
    
    let currentPhrase = 0
    let currentLetter = 0
    let isDeleting = false
    
    const type = () => {
      const current = phrases[currentPhrase]
      
      if (isDeleting) {
        setTypingEffect(current.substring(0, currentLetter - 1))
        currentLetter--
      } else {
        setTypingEffect(current.substring(0, currentLetter + 1))
        currentLetter++
      }
      
      if (!isDeleting && currentLetter === current.length) {
        setTimeout(() => isDeleting = true, 2000)
      } else if (isDeleting && currentLetter === 0) {
        isDeleting = false
        currentPhrase = (currentPhrase + 1) % phrases.length
      }
      
      setTimeout(type, isDeleting ? 50 : 100)
    }
    
    type()
  }, [text])

  const analyzeText = async () => {
    if (!text.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      
      const data = await response.json()
      setResult(data)
      
      // Add to history for trend graph
      setHistory(prev => [...prev.slice(-4), data])
      
      // Trigger celebration for high positive results
      if (data.prediction === '❤️ Genuine Interest' && data.confidence > 0.8) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.8 }
          })
        }, 1000)
      }
      
    } catch (error) {
      console.error('Error analyzing text:', error)
      alert('Failed to analyze text. Make sure the backend is running!')
    } finally {
      setLoading(false)
    }
  }

  const quickExamples = [
    { text: "I miss you so much! Can't wait to see you again ❤️", emoji: "❤️" },
    { text: "I'm busy right now, maybe later idk", emoji: "🤔" },
    { text: "Whatever, do what you want", emoji: "😐" },
    { text: "Hi, how are you doing today?", emoji: "👋" }
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all font-semibold"
            >
              ← Back to Home
            </button>
            
            <button
              onClick={() => setShowSimulator(!showSimulator)}
              className="px-6 py-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-all font-semibold"
            >
              {showSimulator ? 'Close Simulator' : '💬 Chat Simulator'}
            </button>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Chat Analysis
          </h1>
          <p className="text-lg opacity-80">Paste your chat messages and decode the signals!</p>
        </motion.div>

        {/* Chat Simulator */}
        <AnimatePresence>
          {showSimulator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <ChatSimulator onMessageSelect={setText} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold mb-3 text-center">Quick Examples:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickExamples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setText(example.text)}
                className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-purple-200 hover:bg-white/80 transition-all text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{example.emoji}</span>
                {example.text.substring(0, 15)}...
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Text Area */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={typingEffect}
            className="w-full h-48 p-6 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none resize-none text-lg bg-white/80 backdrop-blur-sm shadow-lg"
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              {text.length > 0 && `${text.length} characters • ${text.split(' ').length} words`}
            </div>
            
            <motion.button
              onClick={analyzeText}
              disabled={loading || !text.trim()}
              className={`px-8 py-4 rounded-xl text-xl font-semibold transition-all ${
                loading || !text.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 shadow-lg'
              }`}
              whileHover={!loading && text.trim() ? { scale: 1.05 } : {}}
              whileTap={!loading && text.trim() ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span className="flex items-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    🔍
                  </motion.span>
                  Analyzing...
                </span>
              ) : (
                'Analyze Signals 💘'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Secret Commands Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-gray-600 mb-8"
        >
          💡 Try typing: "i miss you", "i love you", or "help me" for special responses!
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="space-y-6"
            >
              <EnhancedResultCard result={result} />
              <TemperatureMeter result={result} />
              {history.length > 1 && <TrendGraph history={history} />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center opacity-60 mt-12"
          >
            <div className="text-6xl mb-4">🔮</div>
            <p className="text-lg">Paste some chat messages above to start decoding signals!</p>
            <p className="text-sm mt-2">The AI will analyze emotional cues, romantic potential, and communication patterns.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AnalysisPage