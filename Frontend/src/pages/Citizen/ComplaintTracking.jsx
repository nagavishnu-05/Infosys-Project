import React from 'react'
import ComplaintsTable from '../../components/ComplaintsTable'

export default function ComplaintTracking({ selectedComplaint, complaints, setSelectedComplaint, setCurrentView }) {

  const handleBackToList = () => {
    setSelectedComplaint(null)
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
  }

  if (selectedComplaint) {
    return (
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="eyebrow">Details</p>
            <h2 className="text-3xl font-bold">Complaint #{selectedComplaint.id}</h2>
          </div>
          <button
            onClick={handleBackToList}
            className="secondary-link"
          >
            Back to List
          </button>
        </div>
        <div className="form-panel">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Complaint Details</h3>
            <p><strong>Title:</strong> {selectedComplaint.title}</p>
            <p><strong>Department:</strong> {selectedComplaint.dept}</p>
            <p><strong>Status:</strong> {selectedComplaint.status}</p>
            <p><strong>Date:</strong> {selectedComplaint.date}</p>
            <p><strong>Description:</strong> {selectedComplaint.description}</p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleBackToDashboard}
              className="primary-btn"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="eyebrow">Tracking</p>
          <h2 className="text-3xl font-bold">Track Complaints</h2>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="primary-btn"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="form-panel">
        <ComplaintsTable rows={complaints} onView={(complaint) => setSelectedComplaint(complaint)} />
      </div>
    </div>
  )
}
