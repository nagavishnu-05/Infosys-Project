import { useState } from 'react';
import { X, Search, User, Mail, Phone, Briefcase, Award } from 'lucide-react';

const mockOfficersByDepartment = {
  'Public Works': [
    {
      id: 'O001',
      name: 'Mike Johnson',
      department: 'Public Works',
      email: 'mike.j@civichub.gov',
      phone: '555-0101',
      activeComplaints: 3,
    },
    {
      id: 'O002',
      name: 'Sarah Williams',
      department: 'Public Works',
      email: 'sarah.w@civichub.gov',
      phone: '555-0102',
      activeComplaints: 5,
    },
    {
      id: 'O003',
      name: 'Tom Anderson',
      department: 'Public Works',
      email: 'tom.a@civichub.gov',
      phone: '555-0103',
      activeComplaints: 2,
    },
  ],
  'Public Safety': [
    {
      id: 'O004',
      name: 'David Brown',
      department: 'Public Safety',
      email: 'david.b@civichub.gov',
      phone: '555-0104',
      activeComplaints: 4,
    },
    {
      id: 'O005',
      name: 'Emily Davis',
      department: 'Public Safety',
      email: 'emily.d@civichub.gov',
      phone: '555-0105',
      activeComplaints: 6,
    },
    {
      id: 'O006',
      name: 'James Wilson',
      department: 'Public Safety',
      email: 'james.w@civichub.gov',
      phone: '555-0106',
      activeComplaints: 3,
    },
  ],
  Sanitation: [
    {
      id: 'O007',
      name: 'Sarah Davis',
      department: 'Sanitation',
      email: 'sarah.d@civichub.gov',
      phone: '555-0107',
      activeComplaints: 2,
    },
    {
      id: 'O008',
      name: 'Chris Martinez',
      department: 'Sanitation',
      email: 'chris.m@civichub.gov',
      phone: '555-0108',
      activeComplaints: 4,
    },
    {
      id: 'O009',
      name: 'Lisa Garcia',
      department: 'Sanitation',
      email: 'lisa.g@civichub.gov',
      phone: '555-0109',
      activeComplaints: 1,
    },
  ],
  'Water Department': [
    {
      id: 'O010',
      name: 'Robert Lee',
      department: 'Water Department',
      email: 'robert.l@civichub.gov',
      phone: '555-0110',
      activeComplaints: 5,
    },
    {
      id: 'O011',
      name: 'Jennifer Taylor',
      department: 'Water Department',
      email: 'jennifer.t@civichub.gov',
      phone: '555-0111',
      activeComplaints: 3,
    },
    {
      id: 'O012',
      name: 'Michael Chen',
      department: 'Water Department',
      email: 'michael.c@civichub.gov',
      phone: '555-0112',
      activeComplaints: 2,
    },
  ],
};

export function OfficerAssignmentModal({
  isOpen,
  onClose,
  complaint,
  onAssign,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  if (!isOpen) return null;

  const departmentOfficers = mockOfficersByDepartment[complaint.department] || [];
  
  const filteredOfficers = departmentOfficers.filter((officer) =>
    officer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedOfficer) {
      onAssign(complaint.id, `Officer ${selectedOfficer.name}`);
      onClose();
      setSearchQuery('');
      setSelectedOfficer(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white flex items-center gap-2">
                <Award size={24} />
                Assign Officer
              </h2>
              <p className="text-sm text-cyan-50 mt-1">
                {complaint.title} • {complaint.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-cyan-400 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Department Info */}
          <div className="mb-6 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
            <div className="flex items-center gap-2 text-cyan-700 mb-1">
              <Briefcase size={18} />
              <span className="text-sm">Department</span>
            </div>
            <p className="text-cyan-900">{complaint.department}</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">
              Search Officer by Name
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter officer name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Officers List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Available Officers in {complaint.department}
              </p>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
                {filteredOfficers.length} officers
              </span>
            </div>
            
            {filteredOfficers.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <User size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-600">
                  {searchQuery
                    ? 'No officers found matching your search'
                    : 'No officers available in this department'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOfficers.map((officer) => (
                  <div
                    key={officer.id}
                    onClick={() => setSelectedOfficer(officer)}
                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedOfficer?.id === officer.id
                        ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-cyan-300 hover:shadow-sm bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                          <User size={24} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-gray-900">{officer.name}</p>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              {officer.email}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Phone size={14} className="text-gray-400" />
                              {officer.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right bg-white rounded-lg px-3 py-2 border border-gray-200">
                        <p className="text-xs text-gray-600">Active Cases</p>
                        <p className="text-cyan-600">{officer.activeComplaints}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedOfficer}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Officer
          </button>
        </div>
      </div>
    </div>
  );
}