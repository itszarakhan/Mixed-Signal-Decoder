import React from 'react'
import { motion } from 'framer-motion'

const ResultCard = ({ result }) => {
  const getEmojiColor = (prediction) => {
    const colors = {
      '❤️ Genuine Interest': 'from-green-500 to-emerald-500',
      '💬 Mixed Signals': 'from-yellow-500 to-orange-500',
      '😐 Neutral / Formal': 'from-blue-500 to-cyan-500',
      '💔 Losing Interest': 'from-red-500 to-pink-500'
    }
    return colors[prediction] || 'from-gray-500 to-gray-600'
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-gradient-to-br ${getEmojiColor(result.prediction)} p-1 rounded-2xl shadow-2xl`}
    >
      <div className="bg-white rounded-xl p-6 text-gray-800">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className="text-4xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            {result.prediction.split(' ')[0]}
          </motion.div>
          <div className="text-right">
            <div className="text-2xl font-bold">{result.prediction}</div>
            <div className="text-sm opacity-70">Signal Strength: {result.signal_strength}</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Confidence:</span>
            <motion.div 
              className="w-32 bg-gray-200 rounded-full h-4"
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className={`h-4 rounded-full ${
                  result.confidence > 0.7 ? 'bg-green-500' :
                  result.confidence > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence * 100}%` }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </motion.div>
            <span className="font-bold text-lg">{Math.round(result.confidence * 100)}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-semibold">Trend:</span>
            <motion.span 
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                result.trend === 'Increasing' ? 'bg-green-100 text-green-800' :
                result.trend === 'Decreasing' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              {result.trend} {result.trend === 'Increasing' ? '📈' : result.trend === 'Decreasing' ? '📉' : '➡️'}
            </motion.span>
          </div>
        </div>
        
        <motion.div 
          className="mt-4 p-4 bg-gray-50 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="font-semibold mb-2">💡 Analysis:</div>
          <div className="text-sm leading-relaxed">{result.explanation}</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ResultCard