import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiBriefcase, FiUsers, FiEye, FiChevronRight, FiX } from 'react-icons/fi';
import AdminNavbar from './Navbar/AdminNavbar';

const Dashboard = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', jobTitle: 'Frontend Developer', status: 'Applied', dateApplied: '2024-09-20' },
    { id: 2, name: 'Jane Smith', jobTitle: 'Backend Developer', status: 'In Review', dateApplied: '2024-09-19' },
    { id: 3, name: 'Bob Johnson', jobTitle: 'UX Designer', status: 'Interview', dateApplied: '2024-09-18' },
  ]);

  const handleMoveToNextStage = (id) => {
    setApplications(applications.map(app => {
      if (app.id === id) {
        const newStatus = getNextStatus(app.status);
        toast.success(`Moved ${app.name} to ${newStatus}`);
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  const handleReject = (id) => {
    setApplications(applications.map(app => {
      if (app.id === id) {
        toast.error(`Rejected ${app.name}'s application`);
        return { ...app, status: 'Rejected' };
      }
      return app;
    }));
  };

  const getNextStatus = (currentStatus) => {
    const statuses = ['Applied', 'In Review', 'Interview', 'Offered', 'Rejected'];
    const currentIndex = statuses.indexOf(currentStatus);
    return statuses[currentIndex + 1] || currentStatus;
  };

  return (
    <div className="min-h-screen bg-gray-100  inset-0 top-0">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <AdminNavbar />
      <main className="container mx-auto p-4">
        {activeScreen === 'dashboard' && (
          <DashboardScreen 
            applications={applications} 
            onViewAllApplications={() => setActiveScreen('applications')}
            onMoveToNextStage={handleMoveToNextStage}
            onReject={handleReject}
          />
        )}
        {activeScreen === 'applications' && (
          <ApplicationsManagementScreen 
            applications={applications}
            onMoveToNextStage={handleMoveToNextStage}
            onReject={handleReject}
            onBack={() => setActiveScreen('dashboard')}
          />
        )}
      </main>
    </div>
  );
};

const DashboardScreen = ({ applications, onViewAllApplications, onMoveToNextStage, onReject }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryCard icon={<FiBriefcase />} label="Job Openings" value={5} />
        <SummaryCard icon={<FiUsers />} label="Applications" value={applications.length} />
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
        <ApplicationsTable 
          applications={applications.slice(0, 5)} 
          onMoveToNextStage={onMoveToNextStage}
          onReject={onReject}
        />
        <button 
          onClick={onViewAllApplications}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
        >
          View All Applications
        </button>
      </div>
    </div>
  );
};

const ApplicationsManagementScreen = ({ applications, onMoveToNextStage, onReject, onBack }) => {
  const [filters, setFilters] = useState({ jobTitle: '', status: '', dateRange: '' });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredApplications = applications.filter(app => {
    return (
      (filters.jobTitle === '' || app.jobTitle === filters.jobTitle) &&
      (filters.status === '' || app.status === filters.status)
    );
  });

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300">
        Back to Dashboard
      </button>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Applications Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select name="jobTitle" onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">Select Job Title</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="UX Designer">UX Designer</option>
          </select>
          <select name="status" onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">Select Status</option>
            <option value="Applied">Applied</option>
            <option value="In Review">In Review</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input type="date" name="dateRange" onChange={handleFilterChange} className="p-2 border rounded" />
        </div>
        <ApplicationsTable 
          applications={filteredApplications} 
          onMoveToNextStage={onMoveToNextStage}
          onReject={onReject}
        />
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, label, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center">
      <div className="text-indigo-500 text-4xl mr-4">{icon}</div>
      <div>
        <h3 className="text-gray-500">{label}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

const ApplicationsTable = ({ applications, onMoveToNextStage, onReject }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="px-6 py-4 whitespace-nowrap">{application.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{application.jobTitle}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{application.dateApplied}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => {}} className="text-indigo-600 hover:text-indigo-900 mr-2">
                  <FiEye className="inline" /> View
                </button>
                <button onClick={() => onMoveToNextStage(application.id)} className="text-green-600 hover:text-green-900 mr-2">
                  <FiChevronRight className="inline" /> Move
                </button>
                <button onClick={() => onReject(application.id)} className="text-red-600 hover:text-red-900">
                  <FiX className="inline" /> Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Applied': return 'bg-yellow-100 text-yellow-800';
    case 'In Review': return 'bg-blue-100 text-blue-800';
    case 'Interview': return 'bg-purple-100 text-purple-800';
    case 'Offered': return 'bg-green-100 text-green-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default Dashboard;