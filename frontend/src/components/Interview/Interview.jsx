// App.js
import React, { useState } from 'react';
import InterviewDashboard from './InterviewDashboard';
import InterviewScheduler from './InterviewScheduler';
import InterviewDetails from './InterviewDetails';

const Main = () => {
  const [view, setView] = useState('dashboard');
  const [selectedInterview, setSelectedInterview] = useState(null);

  const handleScheduleNew = () => {
    setView('scheduler');
  };

  const handleViewDetails = (id) => {
    // Fetch interview details from your API or Google Calendar
    // This is a placeholder for demonstration
    const interviewDetails = {
      id,
      applicantName: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      jobLocation: 'New York',
      date: new Date(),
      mode: 'Video Call',
      interviewers: ['Alice', 'Bob'],
    };
    setSelectedInterview(interviewDetails);
    setView('details');
  };

  const handleReschedule = (id) => {
    // Implement rescheduling logic
    console.log(`Rescheduling interview ${id}`);
  };

  const handleCancel = (id) => {
    // Implement cancellation logic
    console.log(`Cancelling interview ${id}`);
  };

  const handleSchedule = (interviewData) => {
    // Implement scheduling logic, including Google Calendar integration
    console.log('Scheduling interview:', interviewData);
    setView('dashboard');
  };

  return (
    <div className="container mx-auto">
      {view === 'dashboard' && (
        <InterviewDashboard
          onScheduleNew={handleScheduleNew}
          onViewDetails={handleViewDetails}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />
      )}
      {view === 'scheduler' && (
        <InterviewScheduler onSchedule={handleSchedule} />
      )}
      {view === 'details' && (
        <InterviewDetails
          interview={selectedInterview}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Main;