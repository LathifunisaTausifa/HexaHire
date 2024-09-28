// InterviewScheduler.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InterviewScheduler = ({ onSchedule }) => {
  const [applicant, setApplicant] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [interviewers, setInterviewers] = useState([]);
  const [mode, setMode] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule({ applicant, jobTitle, date, interviewers, mode, location });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Schedule New Interview</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Applicant Name</label>
          <input
            type="text"
            value={applicant}
            onChange={(e) => setApplicant(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Interview Date and Time</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="w-full border border-gray-300 rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Interviewers</label>
          <input
            type="text"
            value={interviewers}
            onChange={(e) => setInterviewers(e.target.value.split(','))}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Enter comma-separated names"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Interview Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            required
          >
            <option value="">Select mode</option>
            <option value="In-Person">In-Person</option>
            <option value="Video Call">Video Call</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Teams call">Teams call</option>
          </select>
        </div>
        {mode === 'In-Person' && (
          <div>
            <label className="block mb-1">Interview Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Schedule Interview
        </button>
      </form>
    </div>
  );
};
export default InterviewScheduler;
