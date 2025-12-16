import React from 'react'
import { Eye } from 'lucide-react'

function Badge({ text, tone }) {
  const cls =
    tone === 'amber'
      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
      : tone === 'blue'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        : tone === 'red'
          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {text}
    </span>
  );
}

export default function ComplaintsTable({ rows, isAdmin = false, updateComplaint, onView }) {
  return (
    <div className="overflow-x-auto"> 
      <caption className="sr-only">Complaints list</caption>
      <table className="w-full text-left min-w-[700px]">
        <thead className="border-b-2 border-gray-200 dark:border-gray-700">
          <tr key="header">
            <th className="py-4 text-sm font-semibold text-black dark:text-gray-300">Complaint ID</th>
            <th className="text-sm font-semibold text-black dark:text-gray-300">Title</th>
            <th className="text-sm font-semibold text-black dark:text-gray-300">Department</th>
            <th className="text-sm font-semibold text-black dark:text-gray-300">Status</th>
            <th className="text-sm font-semibold text-black dark:text-gray-300">Date</th>
            <th className="text-sm font-semibold text-black dark:text-gray-300">Action</th>
          </tr>
        </thead>

        <tbody className="text-black dark:text-slate-200">
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-gray-200 dark:border-white/6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-5 font-medium text-black dark:text-white">{r.id}</td>
              <td className="text-black dark:text-gray-200">{r.title}</td>
              <td className="text-black dark:text-gray-300">{r.dept}</td>
              <td><Badge text={r.status} tone={r.tone} /></td>
              <td className="text-black dark:text-gray-300">{r.date}</td>
              <td>
                <button
                  onClick={(e) => { e.preventDefault(); onView(r); }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

