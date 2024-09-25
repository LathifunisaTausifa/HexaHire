import React, { useState } from 'react';
import axios from 'axios';

const JobCreationForm = () => {
  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobDescription: '',
    department: '',
    jobLocation: '',
    employmentType: '',
    salaryMin: '',
    salaryMax: '',
    applicationDeadline: '',
    requiredQualifications: '',
    preferredQualifications: '',
    responsibilities: '',
  });

  const departments = ['HR', 'IT', 'Marketing', 'Sales'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  const handleInputChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (status) => {
    axios.post('http://localhost:5000/api/jobs', { ...jobData, status })
      .then((response) => {
        alert(`${status === 'draft' ? 'Draft' : 'Job'} saved successfully!`);
      })
      .catch((error) => {
        alert('Error saving the job. Please try again.');
      });
  };

  return (
    <div>
    <div className=' bg-blue-700 text-white  font-bold text-2xl py-3 px-2 mb-8'>
    HexaHire
    </div>
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Job Posting</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-bold">Job Title</label>
          <input 
            type="text" 
            name="jobTitle" 
            value={jobData.jobTitle} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            placeholder="Enter the job title" 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Job Description</label>
          <textarea 
            name="jobDescription" 
            value={jobData.jobDescription} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            placeholder="Enter the job description (min 50 characters)" 
            minLength={50}
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Department</label>
          <select 
            name="department" 
            value={jobData.department} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            required
          >
            <option value="">Select a department</option>
            {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Job Location</label>
          <input 
            type="text" 
            name="jobLocation" 
            value={jobData.jobLocation} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            placeholder="Enter the job location" 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Employment Type</label>
          <select 
            name="employmentType" 
            value={jobData.employmentType} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            required
          >
            <option value="">Select employment type</option>
            {employmentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold">Salary Min</label>
            <input 
              type="number" 
              name="salaryMin" 
              value={jobData.salaryMin} 
              onChange={handleInputChange} 
              className="w-full p-2 border rounded-lg" 
              placeholder="Minimum salary" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold">Salary Max</label>
            <input 
              type="number" 
              name="salaryMax" 
              value={jobData.salaryMax} 
              onChange={handleInputChange} 
              className="w-full p-2 border rounded-lg" 
              placeholder="Maximum salary" 
              required 
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Application Deadline</label>
          <input 
            type="date" 
            name="applicationDeadline" 
            value={jobData.applicationDeadline} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            min={new Date().toISOString().split('T')[0]} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Required Qualifications</label>
          <textarea 
            name="requiredQualifications" 
            value={jobData.requiredQualifications} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            placeholder="Enter the required qualifications" 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Preferred Qualifications</label>
          <textarea 
            name="preferredQualifications" 
            value={jobData.preferredQualifications} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            placeholder="Enter the preferred qualifications" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold">Responsibilities</label>
          <textarea 
            name="responsibilities" 
            value={jobData.responsibilities} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-lg" 
            placeholder="Enter the job responsibilities" 
            required 
          />
        </div>

        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={() => handleSubmit('draft')} 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Save as Draft
          </button>
          <button 
            type="button" 
            onClick={() => handleSubmit('published')} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default JobCreationForm;
