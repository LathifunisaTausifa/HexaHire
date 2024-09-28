// InterviewDashboard.js
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const InterviewDashboard = ({ onScheduleNew, onViewDetails, onReschedule, onCancel }) => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    // Fetch interviews from your API or Google Calendar
    // This is a placeholder for demonstration
    setInterviews([
      { id: 1, applicantName: 'John Doe', jobTitle: 'Software Engineer', date: new Date(), status: 'Scheduled' },
      { id: 2, applicantName: 'Jane Smith', jobTitle: 'Product Manager', date: new Date(Date.now() + 86400000), status: 'Scheduled' },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interview Scheduling Dashboard</h1>
      <div className="mb-4">
        <span className="font-bold">Upcoming Interviews:</span> {interviews.length}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={onScheduleNew}
      >
        Schedule New Interview
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Applicant Name</th>
            <th className="border border-gray-300 p-2">Job Title</th>
            <th className="border border-gray-300 p-2">Interview Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview.id}>
              <td className="border border-gray-300 p-2">{interview.applicantName}</td>
              <td className="border border-gray-300 p-2">{interview.jobTitle}</td>
              <td className="border border-gray-300 p-2">{format(interview.date, 'yyyy-MM-dd HH:mm')}</td>
              <td className="border border-gray-300 p-2">{interview.status}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => onViewDetails(interview.id)}
                >
                  View
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => onReschedule(interview.id)}
                >
                  Reschedule
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => onCancel(interview.id)}
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

export default InterviewDashboard;

