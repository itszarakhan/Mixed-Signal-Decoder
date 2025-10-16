import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ChatSimulator = ({ onMessageSelect }) => {
  const [conversation, setConversation] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const sampleMessages = [
    "Hey! How was your day? 😊",
    "I miss you so much! ❤️",
    "Can we talk later? I'm kinda busy right now...",
    "You're the best thing that ever happened to me 💕",
    "I need some space right now",
    "That sounds amazing! Tell me more!",
    "Whatever, do what you want",
    "I can't stop thinking about you 🥰",
    "Sorry, I was busy. What's up?",
    "I love spending time with you! 💖"
  ]

  const addMessage = (text = null) => {
    const messageText = text || newMessage
    if (!messageText.trim()) return

    const message = {
      id: Date.now(),
      text: messageText,
      sender: conversation.length % 2 === 0 ? 'You' : 'Them',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setConversation(prev => [...prev, message])
    setNewMessage('')
  }

  const clearConversation = () => {
    setConversation([])
  }

  const useConversation = () => {
    const fullText = conversation.map(msg => msg.text).join(' ')
    onMessageSelect(fullText)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200"
    >
      <h3 className="text-xl font-bold mb-4 text-center">💬 Chat Simulator</h3>
      
      {/* Conversation Display */}
      <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4 border">
        {conversation.length === 0 ? (
          <div className="text-center text-gray-500 h-full flex items-center justify-center">
            Start a conversation by adding messages below...
          </div>
        ) : (
          conversation.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-3 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}
            >
              <div className="text-xs text-gray-500 mb-1">{msg.sender} • {msg.timestamp}</div>
              <div
                className={`inline-block px-4 py-2 rounded-2xl max-w-xs ${
                  msg.sender === 'You'
                    ? 'bg-purple-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Quick Message Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {sampleMessages.slice(0, 4).map((msg, index) => (
          <motion.button
            key={index}
            onClick={() => addMessage(msg)}
            className="p-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {msg.substring(0, 20)}...
          </motion.button>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
        />
        <button
          onClick={() => addMessage()}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Send
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={clearConversation}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear Chat
        </button>
        <button
          onClick={useConversation}
          disabled={conversation.length === 0}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            conversation.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Analyze This Chat
        </button>
      </div>
    </motion.div>
  )
}

export default ChatSimulator