import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';

// Mock data
const initialInterviews = [
  { id: 1, applicantName: 'John Doe', jobTitle: 'Software Engineer', date: '2024-10-01', time: '10:00 AM', status: 'Scheduled', interviewers: ['Alice', 'Bob'], mode: 'Video Call' },
  { id: 2, applicantName: 'Jane Smith', jobTitle: 'Product Manager', date: '2024-10-02', time: '02:00 PM', status: 'Scheduled', interviewers: ['Charlie', 'David'], mode: 'In-Person', location: 'Office A' },
];

const applicants = ['John Doe', 'Jane Smith', 'Bob Johnson'];
const jobTitles = ['Software Engineer', 'Product Manager', 'Designer'];
const interviewers = ['Alice', 'Bob', 'Charlie', 'David'];
const interviewModes = ['In-Person', 'Video Call', 'Phone Call', 'Teams call'];

// Main App Component
const App = () => {
  const [interviews, setInterviews] = useState(initialInterviews);

  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4">Dashboard</Link>
          <Link to="/schedule">Schedule New Interview</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard interviews={interviews} setInterviews={setInterviews} />} />
          <Route path="/schedule" element={<InterviewScheduling interviews={interviews} setInterviews={setInterviews} />} />
          <Route path="/details/:id" element={<InterviewDetails interviews={interviews} setInterviews={setInterviews} />} />
          <Route path="/reschedule/:id" element={<RescheduleInterview interviews={interviews} setInterviews={setInterviews} />} />
        </Routes>
      </div>
    </Router>
  );
};

// Dashboard Component
const Dashboard = ({ interviews, setInterviews }) => {
  const navigate = useNavigate(); // Use useNavigate here

  const handleView = (id) => {
    navigate(`/details/${id}`);
  };

  const handleReschedule = (id) => {
    navigate(`/reschedule/${id}`);
  };

  const handleCancel = (id) => {
    setInterviews(interviews.filter(interview => interview.id !== id));
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <h2 className="text-xl font-bold">Upcoming Interviews</h2>
        <div className="text-2xl font-bold mt-2">{interviews.length}</div>
      </div>

      <button
        onClick={() => navigate('/schedule')}
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
const InterviewScheduling = ({ interviews, setInterviews }) => {
  const navigate = useNavigate(); // Use useNavigate here
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
    navigate('/'); // Use navigate instead of history.push
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
const InterviewDetails = ({ interviews }) => {
  const { id } = useParams();
  const interview = interviews.find((i) => i.id === parseInt(id));

  const handleReschedule = () => {
    // Navigate to reschedule interview
  };

  const handleCancel = () => {
    // Handle canceling the interview
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">Interview Details</h2>
      <p>Applicant: {interview.applicantName}</p>
      <p>Job Title: {interview.jobTitle}</p>
      <p>Date: {interview.date}</p>
      <p>Time: {interview.time}</p>
      <p>Mode: {interview.mode}</p>
      {interview.mode === 'In-Person' && <p>Location: {interview.location}</p>}
      <p>Interviewers: {interview.interviewers.join(', ')}</p>
      <p>Status: {interview.status}</p>
      <button
        onClick={handleReschedule}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Reschedule
      </button>
      <button
        onClick={handleCancel}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

// Reschedule Interview Component
const RescheduleInterview = ({ interviews, setInterviews }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate here
  const interview = interviews.find((i) => i.id === parseInt(id));
  const [date, setDate] = useState(interview?.date || '');
  const [time, setTime] = useState(interview?.time || '');

  const handleReschedule = (e) => {
    e.preventDefault();
    const updatedInterviews = interviews.map((i) =>
      i.id === parseInt(id) ? { ...i, date, time } : i
    );
    setInterviews(updatedInterviews);
    navigate('/'); // Use navigate instead of history.push
  };

  return (
    <form onSubmit={handleReschedule} className="space-y-4">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded w-full p-2"
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border rounded w-full p-2"
        required
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Reschedule
      </button>
    </form>
  );
};

export default App;
