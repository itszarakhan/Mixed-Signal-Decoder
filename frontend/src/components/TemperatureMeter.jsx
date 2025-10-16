import React from 'react'
import { motion } from 'framer-motion'

const TemperatureMeter = ({ result }) => {
  const getTemperature = () => {
    const { prediction, confidence } = result
    
    if (prediction === '❤️ Genuine Interest') {
      if (confidence > 0.8) return { level: 'Boiling', emoji: '❤️‍🔥', color: 'from-red-500 to-orange-500', width: '95%' }
      if (confidence > 0.6) return { level: 'Warm', emoji: '💕', color: 'from-pink-500 to-red-500', width: '75%' }
      return { level: 'Lukewarm', emoji: '😊', color: 'from-yellow-500 to-orange-500', width: '55%' }
    }
    
    if (prediction === '💬 Mixed Signals') {
      return { level: 'Lukewarm', emoji: '😐', color: 'from-yellow-400 to-orange-400', width: '50%' }
    }
    
    if (prediction === '😐 Neutral / Formal') {
      return { level: 'Cold', emoji: '❄️', color: 'from-blue-400 to-cyan-400', width: '35%' }
    }
    
    if (prediction === '💔 Losing Interest') {
      if (confidence > 0.7) return { level: 'Ice', emoji: '🧊', color: 'from-blue-800 to-purple-800', width: '20%' }
      return { level: 'Cold', emoji: '💔', color: 'from-blue-500 to-purple-500', width: '30%' }
    }
    
    return { level: 'Neutral', emoji: '😶', color: 'from-gray-400 to-gray-500', width: '45%' }
  }

  const temp = getTemperature()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-lg border"
    >
      <h3 className="text-xl font-bold mb-4 text-center">Emotional Temperature</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-3xl">{temp.emoji}</span>
          <span className="text-2xl font-bold">{temp.level}</span>
          <span className="text-3xl">{temp.emoji}</span>
        </div>
        
        <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
          <motion.div
            className={`h-6 rounded-full bg-gradient-to-r ${temp.color}`}
            initial={{ width: 0 }}
            animate={{ width: temp.width }}
            transition={{ delay: 0.8, duration: 1.5, type: "spring" }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Ice 🧊</span>
          <span>Cold ❄️</span>
          <span>Lukewarm 😐</span>
          <span>Warm 💕</span>
          <span>Boiling ❤️‍🔥</span>
        </div>
      </div>
    </motion.div>
  )
}

export default TemperatureMeter