// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  const recentApplications = [
    { id: 1, name: 'John Doe', jobTitle: 'Frontend Developer', status: 'In Review', dateApplied: '2024-09-20' },
    { id: 2, name: 'Jane Smith', jobTitle: 'Backend Developer', status: 'Interview Scheduled', dateApplied: '2024-09-19' },
    { id: 3, name: 'Tom Brown', jobTitle: 'UI/UX Designer', status: 'Rejected', dateApplied: '2024-09-18' },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Job Openings Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Job Openings</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
        </div>

        {/* Applications Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Applications</h3>
          <p className="text-3xl font-bold text-green-600">25</p>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Applications</h3>
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
            {recentApplications.map(app => (
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

      {/* View All Applications Button */}
      <div className="text-center">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          onClick={() => console.log('Navigating to Applications Management')}
        >
          View All Applications
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
