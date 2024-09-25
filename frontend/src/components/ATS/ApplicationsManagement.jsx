// src/components/ApplicationsManagement.jsx
import React, { useState } from 'react';

const ApplicationsManagement = () => {
  const [filters, setFilters] = useState({
    jobTitle: '',
    status: '',
    dateRange: '',
  });

  const jobTitles = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer'];
  const statuses = ['Applied', 'In Review', 'Interview', 'Offered', 'Rejected'];

  const applications = [
    { id: 1, name: 'John Doe', jobTitle: 'Frontend Developer', status: 'In Review', dateApplied: '2024-09-20' },
    { id: 2, name: 'Jane Smith', jobTitle: 'Backend Developer', status: 'Interview', dateApplied: '2024-09-19' },
    { id: 3, name: 'Tom Brown', jobTitle: 'UI/UX Designer', status: 'Rejected', dateApplied: '2024-09-18' },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Filters Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Job Title Filter */}
          <div>
            <label className="block text-gray-600 mb-2">Job Title</label>
            <select
              name="jobTitle"
              value={filters.jobTitle}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select job title</option>
              {jobTitles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-gray-600 mb-2">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select status</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Picker */}
          <div>
            <label className="block text-gray-600 mb-2">Date Applied</label>
            <input
              type="date"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Applications List Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Applications List</h3>
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4">Applicant Name</th>
              <th className="py-2 px-4">Job Title</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Date Applied</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{app.name}</td>
                <td className="py-2 px-4">{app.jobTitle}</td>
                <td className="py-2 px-4">{app.status}</td>
                <td className="py-2 px-4">{app.dateApplied}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">
                    View
                  </button>
                  <button className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600">
                    Move to Next Stage
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsManagement;
