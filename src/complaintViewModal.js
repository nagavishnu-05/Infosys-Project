import { useState } from 'react';
import { X, Upload, Trash2, Image as ImageIcon, MapPin, Calendar, User as UserIcon, AlertCircle, FileText } from 'lucide-react';

export function ComplaintViewModal({
  isOpen,
  onClose,
  complaint,
  onPhotosUpdated,
}) {
  const [photos, setPhotos] = useState(complaint.photos || []);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = (files) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
    const updatedPhotos = [...photos, ...imageUrls];
    setPhotos(updatedPhotos);
    onPhotosUpdated(complaint.id, updatedPhotos);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onPhotosUpdated(complaint.id, updatedPhotos);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white flex items-center gap-2">
                <FileText size={24} />
                Complaint Details
              </h2>
              <p className="text-sm text-cyan-50 mt-1">ID: {complaint.id}</p>
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
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Status Bar */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <span
                className={`px-4 py-2 rounded-lg text-sm border ${getStatusColor(
                  complaint.status
                )}`}
              >
                {complaint.status === 'in-progress' ? 'In Progress' : complaint.status}
              </span>
              <span
                className={`px-4 py-2 rounded-lg text-sm border ${getPriorityColor(
                  complaint.priority
                )}`}
              >
                {complaint.priority} Priority
              </span>
              <div className="ml-auto text-sm text-gray-600 flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                <Calendar size={16} className="text-cyan-500" />
                {new Date(complaint.submittedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Complaint Title</p>
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {complaint.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Department</p>
                  <p className="text-gray-900 p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                    {complaint.department}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-cyan-500" />
                    Location
                  </p>
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {complaint.location}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <UserIcon size={16} className="text-cyan-500" />
                    Submitted By
                  </p>
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {complaint.submittedBy}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Assigned Officer</p>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {complaint.assignedOfficer ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">
                            {complaint.assignedOfficer.split(' ')[1]?.charAt(0) || 'O'}
                          </span>
                        </div>
                        <span className="text-gray-900">{complaint.assignedOfficer}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Not assigned yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-cyan-500" />
                Description
              </p>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-900 leading-relaxed">{complaint.description}</p>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon size={20} className="text-cyan-500" />
                Action Photos
              </h3>
              
              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isDragging
                    ? 'border-cyan-500 bg-cyan-50 scale-[1.01]'
                    : 'border-gray-300 hover:border-cyan-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Upload size={32} className="text-cyan-600" />
                  </div>
                  <p className="text-gray-900 mb-2">
                    Drag and drop photos here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload photos related to complaint resolution or action taken
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                    />
                    <span className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer inline-block">
                      Browse Files
                    </span>
                  </label>
                </div>
              </div>

              {/* Photo Gallery */}
              {photos.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-4 flex items-center justify-between">
                    <span>Uploaded Photos</span>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs">
                      {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
                    </span>
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 group hover:border-cyan-300 transition-all"
                      >
                        <img
                          src={photo}
                          alt={`Action photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                          <button
                            onClick={() => handleRemovePhoto(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 text-sm shadow-lg"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {photos.length === 0 && (
                <div className="mt-6 text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <ImageIcon size={56} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No photos uploaded yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Upload photos to document the resolution process
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleString()}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert('Complaint details saved successfully!');
                onClose();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}