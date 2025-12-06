import React, { useState } from 'react'

export default function ComplaintRegistrationForm({ addComplaint, setView }) {
  const [formData, setFormData] = useState({
    title: '',
    dept: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComplaint = {
      id: "CMP" + Math.floor(Math.random() * 900 + 100),
      title: formData.title,
      dept: formData.dept,
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      tone: "amber",
      description: formData.description
    }
    addComplaint(newComplaint)
    setView('dashboard')
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-6">
        <p className="eyebrow">New Complaint</p>
        <h2 className="text-3xl font-bold">Register Complaint</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-panel">
        <div className="text-field">
          <label htmlFor="title">Complaint Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter complaint title"
          />
        </div>
        <div className="text-field">
          <label htmlFor="dept">Department</label>
          <select
            id="dept"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Public Works">Public Works</option>
            <option value="Water Resources">Water Resources</option>
            <option value="Electricity">Electricity</option>
            <option value="General">General</option>
          </select>
        </div>
        <div className="text-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe your complaint in detail"
          ></textarea>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="primary-btn"
          >
            Submit Complaint
          </button>
          <button
            type="button"
            onClick={() => setView('dashboard')}
            className="secondary-link"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
