import React, { useState } from 'react';
import AdminNavbar from './Navbar/AdminNavbar';


// Mock data
const initialInterviews = [
  { id: 1, applicantName: 'John Doe', jobTitle: 'Software Engineer', date: '2024-10-01', time: '10:00 AM', status: 'Scheduled', interviewers: ['Alice', 'Bob'], mode: 'Video Call' },
  { id: 2, applicantName: 'Jane Smith', jobTitle: 'Product Manager', date: '2024-10-02', time: '02:00 PM', status: 'Scheduled', interviewers: ['Charlie', 'David'], mode: 'In-Person', location: 'Office A' },
];


const interviewModes = ['In-Person', 'Video Call', 'Phone Call', 'Teams call'];


// Main App Component
const App = () => {
  const [interviews, setInterviews] = useState(initialInterviews);
  const [currentView, setCurrentView] = useState('dashboard'); // State to manage the current view


  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard interviews={interviews} setInterviews={setInterviews} setCurrentView={setCurrentView} />;
      case 'schedule':
        return <InterviewScheduling interviews={interviews} setInterviews={setInterviews} setCurrentView={setCurrentView} />;
      case 'details':
        return <InterviewDetails interviews={interviews} setCurrentView={setCurrentView} />;
      case 'reschedule':
        return <RescheduleInterview interviews={interviews} setInterviews={setInterviews} setCurrentView={setCurrentView} />;
      default:
        return <Dashboard interviews={interviews} setInterviews={setInterviews} setCurrentView={setCurrentView} />;
    }
  };


  return (
    <div>
      <AdminNavbar />
      <div className="p-4">
        <div className="container mx-auto flex justify-center p-2">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-t from-blue-500/90 to-purple-500/90 text-3xl uppercase font-bold">Interview Scheduling</h1>
        </div>
        <nav className="my-6">
          <button onClick={() => setCurrentView('dashboard')} className="mr-4 text-xl text-red-500 font-medium cursor-pointer border-r-2 border-b-2 border-red-500 hover:scale-105 duration-300 py-2 px-4">Dashboard</button>
          <button onClick={() => setCurrentView('schedule')} className="mr-4 text-xl text-red-500 font-medium cursor-pointer border-r-2 border-b-2 hover:scale-105 duration-300 border-red-500 py-2 px-4">Schedule New Interview</button>
        </nav>
        {renderView()} {/* Render the current view */}
      </div>
    </div>
  );
};


// Dashboard Component
const Dashboard = ({ interviews, setInterviews, setCurrentView }) => {
  const handleView = (id) => {
    setCurrentView('details');
  };


  const handleReschedule = (id) => {
    setCurrentView('reschedule');
  };


  const handleCancel = (id) => {
    setInterviews(interviews.filter(interview => interview.id !== id));
  };


  return (
    <div>
      <div className="bg-white shadow-md rounded-lg mb-4 p-4 border-2 border-red-600">
        <h2 className="text-xl font-bold">Upcoming Interviews</h2>
        <div className="text-2xl font-bold mt-2">{interviews.length}</div>
      </div>


      <button
        onClick={() => setCurrentView('schedule')}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
      >
        Schedule New Interview
      </button>


      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Applicant Name</th>
            <th className="px-6 py-3 border-b">Job Title</th>
            <th className="px-6 py-3 border-b">Interview Date</th>
            <th className="px-6 py-3 border-b">Interview Time</th>
            <th className="px-6 py-3 border-b">Status</th>
            <th className="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview.id}>
              <td className="px-6 py-4 border-b">{interview.applicantName}</td>
              <td className="px-6 py-4 border-b">{interview.jobTitle}</td>
              <td className="px-6 py-4 border-b">{interview.date}</td>
              <td className="px-6 py-4 border-b">{interview.time}</td>
              <td className="px-6 py-4 border-b">{interview.status}</td>
              <td className="px-6 py-4 border-b">
                <button
                  onClick={() => handleView(interview.id)}
                  className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleReschedule(interview.id)}
                  className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleCancel(interview.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// Interview Scheduling Component
const InterviewScheduling = ({ interviews, setInterviews, setCurrentView }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    jobTitle: '',
    date: '',
    time: '',
    interviewers: [],
    mode: '',
    location: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newInterview = {
      id: interviews.length + 1,
      ...formData,
      status: 'Scheduled',
    };
    setInterviews([...interviews, newInterview]);
    setCurrentView('dashboard'); // Navigate back to dashboard
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="applicantName"
        placeholder="Applicant Name"
        value={formData.applicantName}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
      />
      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
      />
      <select
        name="mode"
        value={formData.mode}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
      >
        <option value="">Select mode</option>
        {interviewModes.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>


      {formData.mode === 'In-Person' && (
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />
      )}


      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Schedule Interview
      </button>
    </form>
  );
};


// Interview Details Component
const InterviewDetails = ({ interviews, setCurrentView }) => {
  const [interview, setInterview] = useState(interviews[0]); // Default to the first interview


  return (
    <div>
      <h2 className="text-xl font-bold">Interview Details</h2>
      <p><strong>Applicant Name:</strong> {interview.applicantName}</p>
      <p><strong>Job Title:</strong> {interview.jobTitle}</p>
      <p><strong>Date:</strong> {interview.date}</p>
      <p><strong>Time:</strong> {interview.time}</p>
      <p><strong>Status:</strong> {interview.status}</p>
      <p><strong>Interviewers:</strong> {interview.interviewers.join(', ')}</p>
      <p><strong>Mode:</strong> {interview.mode}</p>
      {interview.mode === 'In-Person' && <p><strong>Location:</strong> {interview.location}</p>}


      <button onClick={() => setCurrentView('dashboard')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Back to Dashboard</button>
    </div>
  );
};


// Reschedule Interview Component
const RescheduleInterview = ({ interviews, setInterviews, setCurrentView }) => {
  const [selectedInterview, setSelectedInterview] = useState(interviews[0]); // Default to the first interview
  const [newDate, setNewDate] = useState(selectedInterview.date);
  const [newTime, setNewTime] = useState(selectedInterview.time);


  const handleReschedule = () => {
    setInterviews(interviews.map(interview =>
      interview.id === selectedInterview.id ? { ...interview, date: newDate, time: newTime } : interview
    ));
    setCurrentView('dashboard');
  };


  return (
    <div>
      <h2 className="text-xl font-bold">Reschedule Interview for {selectedInterview.applicantName}</h2>
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        className="border rounded w-full p-2"
        required
      />
      <input
        type="time"
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)}
        className="border rounded w-full p-2"
        required
      />
      <button onClick={handleReschedule} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      <button onClick={() => setCurrentView('dashboard')} className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
    </div>
  );
};


export default App;