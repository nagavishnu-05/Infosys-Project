import React from 'react'
import { Home, FileText, Search, Bell, User, Settings, LogOut } from 'lucide-react'

export default function Sidebar({ toggleTheme, isDark, complaints, setCurrentView, open }) {
  return (
    <aside
      className={`sidebar ${open ? 'translate-x-0 w-64 p-6 md:w-64 md:p-6 md:border-r' : '-translate-x-full w-0 p-0 md:w-0 md:p-0 md:border-r-0'} fixed md:static md:translate-x-0 top-0 left-0 h-screen md:h-auto z-40 md:z-auto transition-[transform,width,padding] duration-300 border-r border-[var(--border-soft)] md:border-transparent flex flex-col overflow-y-auto overflow-x-hidden bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] md:bg-transparent text-black dark:text-gray-200`}
      role="complementary"
      aria-label="Sidebar"
      data-sidebar="true"
    >

      <nav className={`${open ? 'block' : 'hidden'} md:block space-y-2 flex-1`} aria-hidden={!open}>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors font-medium"
        >
          <Home className="w-5 h-5" color="currentColor" />
          Dashboard
        </button>
        <button
          onClick={() => setCurrentView('registerForm')}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors font-medium text-black dark:text-gray-200"
        >
          <FileText className="w-5 h-5" color="currentColor" />
          Submit Grievance
        </button>
        <button
          onClick={() => setCurrentView('tracking')}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors font-medium text-black dark:text-gray-200"
        >
          <Search className="w-5 h-5" color="currentColor" />
          Track My Complaints
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors font-medium text-black dark:text-gray-200">
          <Bell className="w-5 h-5" color="currentColor" />
          Notifications
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors font-medium text-black dark:text-gray-200">
          <User className="w-5 h-5" color="currentColor" />
          Profile
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors font-medium text-black dark:text-gray-200">
          <Settings className="w-5 h-5" color="currentColor" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors font-medium">
          <LogOut className="w-5 h-5" color="currentColor" />
          Logout
        </button>
      </nav>

      <div className="mt-auto" />
    </aside>
  )
}