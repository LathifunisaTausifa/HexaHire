import React, { useState } from 'react';
import JobCreationForm from './JobCreationForm';
import JobListingsManagement from './JobListingsManagement';

const JobManagementSystem = () => {
  const [draftJobs, setDraftJobs] = useState([]);
  const [publishedJobs, setPublishedJobs] = useState([]);

  const handleJobCreation = (jobData, isDraft) => {
    const newJob = {
      ...jobData,
      id: Date.now(), // Use a more robust ID generation in production
      dateCreated: new Date().toISOString().split('T')[0],
    };

    if (isDraft) {
      setDraftJobs(prevDrafts => [...prevDrafts, newJob]);
    } else {
      setPublishedJobs(prevPublished => [...prevPublished, {
        ...newJob,
        datePublished: newJob.dateCreated
      }]);
    }
  };

  const handleEditJob = (jobId, isDraft, updatedJobData) => {
    if (isDraft) {
      setDraftJobs(prevDrafts =>
        prevDrafts.map(job => job.id === jobId ? { ...job, ...updatedJobData } : job)
      );
    } else {
      setPublishedJobs(prevPublished =>
        prevPublished.map(job => job.id === jobId ? { ...job, ...updatedJobData } : job)
      );
    }
  };

  const handleDeleteDraft = (jobId) => {
    setDraftJobs(prevDrafts => prevDrafts.filter(job => job.id !== jobId));
  };

  const handlePublishDraft = (jobId) => {
    const jobToPublish = draftJobs.find(job => job.id === jobId);
    if (jobToPublish) {
      setPublishedJobs(prevPublished => [...prevPublished, {
        ...jobToPublish,
        datePublished: new Date().toISOString().split('T')[0]
      }]);
      setDraftJobs(prevDrafts => prevDrafts.filter(job => job.id !== jobId));
    }
  };

  const handleUnpublishJob = (jobId) => {
    const jobToUnpublish = publishedJobs.find(job => job.id === jobId);
    if (jobToUnpublish) {
      setDraftJobs(prevDrafts => [...prevDrafts, {
        ...jobToUnpublish,
        dateCreated: new Date().toISOString().split('T')[0]
      }]);
      setPublishedJobs(prevPublished => prevPublished.filter(job => job.id !== jobId));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Management System</h1>
      
      <JobCreationForm onJobCreate={handleJobCreation} />
      
      <JobListingsManagement
        draftJobs={draftJobs}
        publishedJobs={publishedJobs}
        onEditJob={handleEditJob}
        onDeleteDraft={handleDeleteDraft}
        onPublishDraft={handlePublishDraft}
        onUnpublishJob={handleUnpublishJob}
      />
    </div>
  );
};

export default JobManagementSystem;