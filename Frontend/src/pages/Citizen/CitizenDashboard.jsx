import React, { useState } from 'react'
import { FileText, Clock, CheckCircle, Search, Moon, Sun } from 'lucide-react'
import StatCard from '../../components/StatCard'
import ComplaintsTable from '../../components/ComplaintsTable'
import QuickActions from '../../components/QuickActions'

export default function CitizenDashboard({ isDark, toggleTheme, complaints, addComplaint, setCurrentView, setSelectedComplaint, downloadReports, onTrack }) {
  const [selectedComplaint, setSelectedComplaintLocal] = useState(null)
  const [showTracking, setShowTracking] = useState(false)

  const handleView = (complaint) => {
    setSelectedComplaintLocal(complaint)
  }

  const handleToggleTracking = () => {
    setShowTracking(!showTracking)
  }

  return (
    <div className="max-w-[1200px] mx-auto">

      <div className="mb-8">
        <p className="eyebrow">Citizen Dashboard</p>
        <h2 className="text-3xl font-bold">Welcome Back</h2>
      </div>

      {/* stats + actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Complaints" value={complaints.length} icon={<FileText className="w-6 h-6 text-white" />} isDark={isDark} />
          <StatCard title="Pending Complaints" value={complaints.filter(c => c.status === 'Pending').length} icon={<Clock className="w-6 h-6 text-white" />} isDark={isDark} />
          <StatCard title="In-Progress" value={complaints.filter(c => c.status === 'In Progress').length} icon={<CheckCircle className="w-6 h-6 text-white" />} isDark={isDark} />
        </div>

        <div className="lg:col-span-1">
          <QuickActions onAddComplaint={addComplaint} setCurrentView={setCurrentView} onTrack={onTrack} onDownloadReports={downloadReports} isDark={isDark} />
        </div>
      </div>

      {/* table */}
      <div className="form-panel">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Complaints</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search complaints..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 bg-white text-black placeholder-gray-500 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-600"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* TABLE RECEIVES THE LATEST COMPLAINT LIST */}
        <ComplaintsTable rows={complaints} onView={(complaint) => { setSelectedComplaint(complaint); setCurrentView('tracking'); }} />
      </div>
    </div>
  )
}
