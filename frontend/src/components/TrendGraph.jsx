import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const TrendGraph = ({ history }) => {
  const getScore = (result) => {
    const scores = {
      '❤️ Genuine Interest': 100,
      '💬 Mixed Signals': 50,
      '😐 Neutral / Formal': 25,
      '💔 Losing Interest': 0
    }
    return scores[result.prediction] * result.confidence
  }

  const data = {
    labels: history.map((_, index) => `Message ${index + 1}`),
    datasets: [
      {
        label: 'Interest Level',
        data: history.map(getScore),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(147, 51, 234)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Interest Trend Over Messages',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            if (value === 100) return 'High ❤️'
            if (value === 50) return 'Medium 💬'
            if (value === 25) return 'Neutral 😐'
            if (value === 0) return 'Low 💔'
            return value
          }
        }
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-lg border"
    >
      <Line data={data} options={options} />
    </motion.div>
  )
}

export default TrendGraph