import React from 'react'
import { motion } from 'framer-motion'

const EnhancedResultCard = ({ result }) => {
  const getEmojiColor = (prediction) => {
    const colors = {
      '❤️ Genuine Interest': 'from-green-500 to-emerald-500',
      '💬 Mixed Signals': 'from-yellow-500 to-orange-500',
      '😐 Neutral / Formal': 'from-blue-500 to-cyan-500',
      '💔 Losing Interest': 'from-red-500 to-pink-500'
    }
    return colors[prediction] || 'from-gray-500 to-gray-600'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      'High Priority 🚀': 'bg-red-100 text-red-800 border-red-300',
      'Medium Priority ⏰': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Normal Priority 📝': 'bg-blue-100 text-blue-800 border-blue-300',
      'Low Priority 💤': 'bg-gray-100 text-gray-800 border-gray-300'
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-gradient-to-br ${getEmojiColor(result.prediction)} p-1 rounded-2xl shadow-2xl ${
        result.confidence > 0.8 ? 'pulse-glow' : ''
      }`}
    >
      <div className="bg-white rounded-xl p-6 text-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className={`text-5xl ${result.prediction.includes('❤️') ? 'heartbeat' : 'floating'}`}
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: result.prediction.includes('❤️') ? [0, 5, -5, 0] : [0, 3, -3, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            {result.prediction.split(' ')[0]}
          </motion.div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {result.prediction}
            </div>
            <div className="text-sm opacity-70 mt-1">Signal Strength: {result.signal_strength}</div>
          </div>
        </div>
        
        {/* Confidence Bar */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Confidence Level:</span>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-gray-200 rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${
                    result.confidence > 0.7 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    result.confidence > 0.5 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                    'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence * 100}%` }}
                  transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
                />
              </div>
              <span className="font-bold text-lg w-12">{Math.round(result.confidence * 100)}%</span>
            </div>
          </div>
          
          {/* Trend */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">Emotional Trend:</span>
            <motion.span 
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                result.trend === 'Increasing' ? 'bg-green-100 text-green-800 border-green-300' :
                result.trend === 'Decreasing' ? 'bg-red-100 text-red-800 border-red-300' :
                'bg-blue-100 text-blue-800 border-blue-300'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              {result.trend} {result.trend === 'Increasing' ? '📈' : result.trend === 'Decreasing' ? '📉' : '➡️'}
            </motion.span>
          </div>
        </div>

        {/* Advanced Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="text-sm text-blue-600 mb-1">Emotional Depth</div>
            <div className="text-2xl font-bold text-blue-800">{Math.round(result.emotional_depth * 100)}%</div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${result.emotional_depth * 100}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div className="text-sm text-purple-600 mb-1">Romantic Potential</div>
            <div className="text-2xl font-bold text-purple-800">{Math.round(result.romantic_potential * 100)}%</div>
            <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${result.romantic_potential * 100}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="text-sm text-orange-600 mb-1">Urgency Level</div>
            <div className="text-2xl font-bold text-orange-800">{Math.round(result.urgency_level * 100)}%</div>
            <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
              <div 
                className="bg-orange-600 h-2 rounded-full" 
                style={{ width: `${result.urgency_level * 100}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="text-sm text-gray-600 mb-1">Complexity</div>
            <div className="text-2xl font-bold text-gray-800">{Math.round(result.message_complexity * 100)}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gray-600 h-2 rounded-full" 
                style={{ width: `${result.message_complexity * 100}%` }}
              ></div>
            </div>
          </motion.div>
        </div>

        {/* Priority */}
        <motion.div 
          className={`mb-6 p-4 rounded-xl border-2 text-center font-semibold ${getPriorityColor(result.response_priority)}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          💡 {result.response_priority}
        </motion.div>
        
        {/* Explanation */}
        <motion.div 
          className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="font-semibold mb-2 flex items-center">
            <span className="text-lg">💡 Analysis</span>
          </div>
          <div className="text-sm leading-relaxed">{result.explanation}</div>
        </motion.div>

        {/* Insights */}
        {result.insights && result.insights.length > 0 && (
          <motion.div 
            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <div className="font-semibold mb-2 flex items-center">
              <span className="text-lg">🌟 Key Insights</span>
            </div>
            <div className="space-y-2">
              {result.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                >
                  <span className="mr-2">•</span>
                  {insight}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default EnhancedResultCard