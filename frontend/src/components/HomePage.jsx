import React from 'react'
import { motion } from 'framer-motion'

const FloatingEmoji = ({ emoji, delay }) => (
  <motion.div
    className="text-2xl absolute"
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [-20, 20, -20],
      opacity: [0, 1, 0],
      x: Math.random() * 100 - 50
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    {emoji}
  </motion.div>
)

const HomePage = ({ onStartAnalysis, theme }) => {
  const emojis = ['❤️', '💬', '😐', '💔', '🤔', '😊', '😢', '🎯']
  
  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      theme === 'dark' ? 'gradient-bg' : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'
    }`}>
      {/* Floating Emojis */}
      {emojis.map((emoji, index) => (
        <FloatingEmoji key={index} emoji={emoji} delay={index * 0.5} />
      ))}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💬 Mixed Signal Decoder
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Let AI tell you if they're interested, confused, or just busy!
        </motion.p>
        
        <motion.button
          onClick={onStartAnalysis}
          className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-semibold hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Start Analysis 🚀
        </motion.button>
        
        <motion.div
          className="mt-12 text-sm opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          Paste chat messages • Get instant insights • Understand the signals
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HomePage