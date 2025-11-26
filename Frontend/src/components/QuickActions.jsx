import React from 'react'
import { Plus, Search, Download } from 'lucide-react'

export default function QuickActions({ onAddComplaint, setCurrentView, onTrack, onDownloadReports, isDark }) {

  return (
    <div className="space-y-3">

      <button
        className={`w-full py-3.5 px-4 rounded-xl ${isDark
            ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
          } text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold`}
        onClick={() => setCurrentView('registerForm')}
      >
        <Plus className="w-5 h-5" />
        Register New Complaint
      </button>

      <button
        className={`w-full py-3.5 px-4 rounded-xl ${isDark
            ? 'bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
          } text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold`}
        onClick={onTrack}
      >
        <Search className="w-5 h-5" />
        Track Complaint
      </button>

      <button
        className={`w-full py-3.5 px-4 rounded-xl ${isDark
            ? 'bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800'
            : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
          } text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold`}
        onClick={onDownloadReports}
      >
        <Download className="w-5 h-5" />
        Download Reports
      </button>

    </div>
  )
}
