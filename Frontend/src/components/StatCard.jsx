import React from 'react'

export default function StatCard({ title, value, icon, isDark }) {
  // Determine background gradient based on title and theme
  const getCardStyle = () => {
    if (title.includes('Total')) {
      return isDark
        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500'
        : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400'
    } else if (title.includes('Pending')) {
      return isDark
        ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white border-amber-500'
        : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-amber-400'
    } else if (title.includes('Progress')) {
      return isDark
        ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white border-green-500'
        : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-400'
    }
    return isDark
      ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-purple-500'
      : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-purple-400'
  }

  return (
    <div className={`${getCardStyle()} rounded-xl p-5 border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-white/90 font-medium">{title}</p>
          <div className="text-3xl font-bold mt-3">{value}</div>
        </div>
        <div className="w-14 h-14 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  )
}
