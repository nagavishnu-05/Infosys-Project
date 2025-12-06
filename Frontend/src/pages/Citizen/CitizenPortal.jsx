import React, { useState } from 'react'
import { Sun, Moon, Menu } from 'lucide-react'
import CitizenDashboard from './CitizenDashboard'
import ComplaintRegistrationForm from './ComplaintRegistrationForm'
import ComplaintTracking from './ComplaintTracking'
import Sidebar from '../../components/Sidebar'
import { useThemePreference } from '../../hooks/useThemePreference'

export default function CitizenPortal() {
    const { theme, toggleTheme } = useThemePreference()
    const [currentView, setCurrentView] = useState('dashboard')
    const [selectedComplaint, setSelectedComplaint] = useState(null)
    const isDark = theme === 'dark'
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    // Mock initial data
    const [complaints, setComplaints] = useState([
        {
            id: "CMP1001",
            title: "Street Light Not Working",
            dept: "Electricity",
            status: "Pending",
            date: "2023-10-25",
            tone: "red",
            description: "The street light in front of house #12, Main St is flickering and mostly off."
        },
        {
            id: "CMP1002",
            title: "Garbage Not Collected",
            dept: "Public Works",
            status: "In Progress",
            date: "2023-10-24",
            tone: "amber",
            description: "Garbage truck skipped our lane for the last 2 days."
        },
        {
            id: "CMP1003",
            title: "Water Leakage",
            dept: "Water Resources",
            status: "Resolved",
            date: "2023-10-20",
            tone: "green",
            description: "Main pipe leakage near the park entrance."
        }
    ])

    const addComplaint = (newComplaint) => {
        setComplaints([newComplaint, ...complaints])
    }

    const downloadReports = () => {
        alert("Downloading reports... (Mock Function)")
    }

    const handleTrack = () => {
        setCurrentView('tracking')
    }

    return (
        <div className="page">
            <header className="app-header">
                <div className="logo-group">
                    <button
                        type="button"
                        aria-label="Toggle sidebar"
                        onClick={() => setIsSidebarOpen((v) => !v)}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] hover:border-[var(--primary)]"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <img
                        src="/src/assets/Logo.jpg"
                        alt="CivicPulse Hub logo"
                        onClick={() => setIsSidebarOpen((v) => !v)}
                        style={{ cursor: 'pointer' }}
                        title={isSidebarOpen ? 'Hide menu' : 'Show menu'}
                    />
                    <p className="logo-title">CivicPulse</p>
                </div>
                <button type="button" className="theme-toggle" onClick={toggleTheme}>
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
                </button>
            </header>

            {/* Mobile overlay to close sidebar when tapping outside */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 md:hidden z-30"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <div className="flex gap-0">
                <Sidebar
                    toggleTheme={toggleTheme}
                    isDark={isDark}
                    complaints={complaints}
                    setCurrentView={setCurrentView}
                    open={isSidebarOpen}
                />

                <div className="flex-1 p-6">
                    {currentView === 'dashboard' && (
                        <CitizenDashboard
                            isDark={isDark}
                            toggleTheme={toggleTheme}
                            complaints={complaints}
                            addComplaint={addComplaint}
                            setCurrentView={setCurrentView}
                            setSelectedComplaint={setSelectedComplaint}
                            downloadReports={downloadReports}
                            onTrack={handleTrack}
                        />
                    )}

                    {currentView === 'registerForm' && (
                        <ComplaintRegistrationForm
                            addComplaint={addComplaint}
                            setView={setCurrentView}
                        />
                    )}

                    {currentView === 'tracking' && (
                        <ComplaintTracking
                            selectedComplaint={selectedComplaint}
                            complaints={complaints}
                            setSelectedComplaint={setSelectedComplaint}
                            setCurrentView={setCurrentView}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
