import React, { useState } from 'react';
import { AlertCircle, Calendar, DollarSign, MapPin, Briefcase } from 'lucide-react';
import { Alert, AlertDescription } from '../Job/Alert';

const JobCreationForm = ({ onJobCreate }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    department: '',
    jobLocation: '',
    employmentType: '',
    salaryRangeMin: '',
    salaryRangeMax: '',
    applicationDeadline: '',
    requiredQualifications: '',
    preferredQualifications: '',
    responsibilities: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (formData.jobDescription.length < 50) newErrors.jobDescription = 'Job description must be at least 50 characters';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.jobLocation) newErrors.jobLocation = 'Job location is required';
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
    if (!formData.salaryRangeMin || !formData.salaryRangeMax) newErrors.salaryRange = 'Salary range is required';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    if (!formData.requiredQualifications) newErrors.requiredQualifications = 'Required qualifications are required';
    if (!formData.responsibilities) newErrors.responsibilities = 'Responsibilities are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e, isDraft = false) => {
    e.preventDefault();
    if (validateForm()) {
      onJobCreate(formData, isDraft);
      setFormData({
        jobTitle: '',
        jobDescription: '',
        department: '',
        jobLocation: '',
        employmentType: '',
        salaryRangeMin: '',
        salaryRangeMax: '',
        applicationDeadline: '',
        requiredQualifications: '',
        preferredQualifications: '',
        responsibilities: ''
      });
    }
  };

  // ... rest of the component remains the same ...
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-6">Create New Job Posting</h2>
      <form onSubmit={(e) => handleSubmit(e, false)}>
        {/* ... form fields remain the same ... */}
        <div className="space-y-6">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter the job title"
            />
            {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
          </div>

          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter the job description"
            ></textarea>
            {errors.jobDescription && <p className="mt-1 text-sm text-red-600">{errors.jobDescription}</p>}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
          </div>

          <div>
            <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700">Job Location</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="jobLocation"
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter the job location"
              />
            </div>
            {errors.jobLocation && <p className="mt-1 text-sm text-red-600">{errors.jobLocation}</p>}
          </div>

          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            {errors.employmentType && <p className="mt-1 text-sm text-red-600">{errors.employmentType}</p>}
          </div>

          <div>
            <label htmlFor="salaryRangeMin" className="block text-sm font-medium text-gray-700">Salary Range</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="salaryRangeMin"
                name="salaryRangeMin"
                value={formData.salaryRangeMin}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Min"
              />
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="salaryRangeMax"
                name="salaryRangeMax"
                value={formData.salaryRangeMax}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Max"
              />
            </div>
            {errors.salaryRange && <p className="mt-1 text-sm text-red-600">{errors.salaryRange}</p>}
          </div>

          <div>
            <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">Application Deadline</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="applicationDeadline"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            {errors.applicationDeadline && <p className="mt-1 text-sm text-red-600">{errors.applicationDeadline}</p>}
          </div>

          <div>
            <label htmlFor="requiredQualifications" className="block text-sm font-medium text-gray-700">Required Qualifications</label>
            <textarea
              id="requiredQualifications"
              name="requiredQualifications"
              value={formData.requiredQualifications}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter the required qualifications"
            ></textarea>
            {errors.requiredQualifications && <p className="mt-1 text-sm text-red-600">{errors.requiredQualifications}</p>}
          </div>

          <div>
            <label htmlFor="preferredQualifications" className="block text-sm font-medium text-gray-700">Preferred Qualifications</label>
            <textarea
              id="preferredQualifications"
              name="preferredQualifications"
              value={formData.preferredQualifications}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter the preferred qualifications"
            ></textarea>
          </div>

          <div>
            <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">Responsibilities</label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter the job responsibilities"
            ></textarea>
            {errors.responsibilities && <p className="mt-1 text-sm text-red-600">{errors.responsibilities}</p>}
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please correct the errors in the form before submitting.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mt-8 space-x-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobCreationForm;