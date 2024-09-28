// InterviewDetails.js
import React from 'react';
import { format } from 'date-fns';

const InterviewDetails = ({ interview, onReschedule, onCancel }) => {
  if (!interview) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Interview Details</h2>
      <div className="space-y-4">
        <section>
          <h3 className="font-bold">Applicant Information</h3>
          <p>Name: {interview.applicantName}</p>
          <p>Email: {interview.email}</p>
          <p>Phone: {interview.phone}</p>
        </section>
        <section>
          <h3 className="font-bold">Job Information</h3>
          <p>Job Title: {interview.jobTitle}</p>
          <p>Department: {interview.department}</p>
          <p>Location: {interview.jobLocation}</p>
        </section>
        <section>
          <h3 className="font-bold">Interview Information</h3>
          <p>Date: {format(interview.date, 'yyyy-MM-dd')}</p>
          <p>Time: {format(interview.date, 'HH:mm')}</p>
          <p>Mode: {interview.mode}</p>
          {interview.mode === 'In-Person' && <p>Location: {interview.location}</p>}
          <p>Interviewers: {interview.interviewers.join(', ')}</p>
        </section>
        <div className="space-x-4">
          <button
            onClick={() => onReschedule(interview.id)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Reschedule Interview
          </button>
          <button
            onClick={() => onCancel(interview.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel Interview
          </button>
        </div>
      </div>
    </div>
  );
};
export default InterviewDetails;
