# Mixed-Signal-Decoder
AI-Powered Conversation Emotion Analyzer

**Mixed Signal Decoder** is a lightweight full-stack **AI-powered application** that analyzes human conversation patterns to decode emotional signals, including: 
- **Genuine Interest**
- **Mixed Signals**
- **Neutral/Formal**
- **Losing Interest**

The application combines a **Flask-based backend** featuring a **Naive Bayes machine learning classifier** with a **React + Tailwind CSS frontend** for **interactive emotional visualization**. 

## ⚙️ Features

- **Emotional Tone Detection** - Analyzes messages for emotional patterns
- **Multi-format Support** - Works with both emoji and text-based emotion detection
- **Interactive Dashboard** - Animated, visual results presentation
- **Offline Capable** - Fully functional with local ML model, no API dependencies
- **Trainable Model** - Simple process for training and retraining the classifier

## 🛠️ Setup & Installation

### Backend Setup

1. cd backend
2. pip install -r requirements.txt
3. python lightweight_ml.py
4. python app.py

The backend server will start at http://127.0.0.1:5000

### Frontend Setup
1. cd frontend
2. npm install
3. npm run dev

The frontend will be available at http://localhost:3000
