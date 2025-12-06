import { useState } from 'react';
import { Eye, UserPlus, MapPin, Download, Search, Filter, Clock } from 'lucide-react';
import { ComplaintViewModal } from './ComplaintViewModal';
import { OfficerAssignmentModal } from './OfficerAssignmentModal';

const mockComplaints = [
  {
    id: 'C001',
    title: 'Broken Street Light',
    description: 'Street light on Main St has been non-functional for 2 weeks',
    department: 'Public Works',
    status: 'pending',
    priority: 'high',
    location: 'Main St, Block A',
    submittedBy: 'John Doe',
    submittedDate: '2025-11-25',
  },
  {
    id: 'C002',
    title: 'Pothole on Highway',
    description: 'Large pothole causing traffic issues',
    department: 'Public Works',
    status: 'in-progress',
    priority: 'high',
    location: 'Highway 101, Exit 5',
    submittedBy: 'Jane Smith',
    submittedDate: '2025-11-28',
    assignedOfficer: 'Officer Mike Johnson',
  },
  {
    id: 'C003',
    title: 'Noise Complaint',
    description: 'Excessive noise from construction site after hours',
    department: 'Public Safety',
    status: 'pending',
    priority: 'medium',
    location: '123 Oak Avenue',
    submittedBy: 'Bob Williams',
    submittedDate: '2025-11-30',
  },
  {
    id: 'C004',
    title: 'Garbage Collection Missed',
    description: 'Garbage not collected for 2 weeks in residential area',
    department: 'Sanitation',
    status: 'resolved',
    priority: 'medium',
    location: 'Elm Street, Zone 3',
    submittedBy: 'Alice Brown',
    submittedDate: '2025-11-20',
    assignedOfficer: 'Officer Sarah Davis',
  },
  {
    id: 'C005',
    title: 'Water Leak',
    description: 'Water main leak on residential street',
    department: 'Water Department',
    status: 'in-progress',
    priority: 'high',
    location: 'Pine Road, Block B',
    submittedBy: 'Charlie Wilson',
    submittedDate: '2025-12-01',
    assignedOfficer: 'Officer Robert Lee',
  },
  {
    id: 'C006',
    title: 'Damaged Sidewalk',
    description: 'Cracked sidewalk poses safety hazard for pedestrians',
    department: 'Public Works',
    status: 'pending',
    priority: 'medium',
    location: 'Maple Drive, Near Park',
    submittedBy: 'David Martinez',
    submittedDate: '2025-11-29',
  },
  {
    id: 'C007',
    title: 'Illegal Dumping',
    description: 'Construction debris dumped in vacant lot',
    department: 'Sanitation',
    status: 'pending',
    priority: 'high',
    location: '456 Industrial Blvd',
    submittedBy: 'Emma Garcia',
    submittedDate: '2025-12-02',
  },
  {
    id: 'C008',
    title: 'Traffic Signal Malfunction',
    description: 'Traffic light stuck on red at major intersection',
    department: 'Public Works',
    status: 'resolved',
    priority: 'high',
    location: 'Main St & Oak Ave',
    submittedBy: 'Frank Thompson',
    submittedDate: '2025-11-18',
    assignedOfficer: 'Officer Mike Johnson',
  },
];

export function ComplaintsPage() {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [complaintToAssign, setComplaintToAssign] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setViewModalOpen(true);
  };

  const handleAssignOfficer = (complaint) => {
    setComplaintToAssign(complaint);
    setAssignModalOpen(true);
  };

  const handleOfficerAssigned = (complaintId, officerName) => {
    setComplaints(
      complaints.map((c) =>
        c.id === complaintId
          ? { ...c, assignedOfficer: officerName, status: 'in-progress' }
          : c
      )
    );
  };

  const handlePhotosUpdated = (complaintId, photos) => {
    setComplaints(
      complaints.map((c) => (c.id === complaintId ? { ...c, photos } : c))
    );
    if (selectedComplaint?.id === complaintId) {
      setSelectedComplaint({ ...selectedComplaint, photos });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    if (filterStatus !== 'all' && complaint.status !== filterStatus) return false;
    if (filterDepartment !== 'all' && complaint.department !== filterDepartment)
      return false;
    if (
      searchQuery &&
      !complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !complaint.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const departments = Array.from(new Set(complaints.map((c) => c.department)));

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Total Complaints</p>
          <p className="text-gray-900">{complaints.length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-sm border border-yellow-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-yellow-700 mb-1">Pending</p>
          <p className="text-yellow-900">
            {complaints.filter((c) => c.status === 'pending').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm border border-blue-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-blue-700 mb-1">In Progress</p>
          <p className="text-blue-900">
            {complaints.filter((c) => c.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl shadow-sm border border-green-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-green-700 mb-1">Resolved</p>
          <p className="text-green-900">
            {complaints.filter((c) => c.status === 'resolved').length}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[280px]">
            <label className="block text-sm text-gray-700 mb-2">Search Complaints</label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID or title..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Department</label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[180px]"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-cyan-50 via-blue-50 to-cyan-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-900">
                  Complaint ID
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-900">Title</th>
                <th className="px-6 py-4 text-left text-sm text-gray-900">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm text-gray-900">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-900">
                  Officer Location
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredComplaints.map((complaint, index) => (
                <tr
                  key={complaint.id}
                  className={`hover:bg-cyan-50/50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="text-cyan-600">{complaint.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900">{complaint.title}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={14} className="text-gray-400" />
                        {complaint.location}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{complaint.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-xs border ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {complaint.status === 'in-progress' ? 'In Progress' : complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-xs border ${getPriorityColor(
                        complaint.priority
                      )}`}
                    >
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {complaint.assignedOfficer ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs text-cyan-700">
                              {complaint.assignedOfficer.split(' ')[1]?.charAt(0) || 'O'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-900">
                            {complaint.assignedOfficer}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Not assigned</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} className="text-gray-400" />
                      {new Date(complaint.submittedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewComplaint(complaint)}
                        className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                        title="View Complaint"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleAssignOfficer(complaint)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Assign Officer"
                      >
                        <UserPlus size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No complaints found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedComplaint && (
        <ComplaintViewModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          complaint={selectedComplaint}
          onPhotosUpdated={handlePhotosUpdated}
        />
      )}

      {complaintToAssign && (
        <OfficerAssignmentModal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          complaint={complaintToAssign}
          onAssign={handleOfficerAssigned}
        />
      )}
    </div>
  );
}