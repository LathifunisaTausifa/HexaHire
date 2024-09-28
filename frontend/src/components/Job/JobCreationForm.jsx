import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { AlertCircle, Calendar, DollarSign, MapPin, Briefcase } from 'lucide-react';
import { Alert, AlertDescription } from '../Job/Alert';
import AdminNavbar from '../Navbar/AdminNavbar';
import Swal from 'sweetalert2'
import { Controller } from 'react-hook-form';

const JobCreationForm = ({ onJobCreate }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [departments, setDepartments] = useState([
    { value: 'HR', label: 'HR' },
    { value: 'IT', label: 'IT' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
  ]);
  const [employmentTypes, setEmploymentTypes] = useState([
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' }
  ]);

  const onSubmit = (data, isDraft = false) => {
    // Call your job creation function here
    onJobCreate(data, isDraft);
    Swal.fire({
      title: "Success!",
      text: "Job Has been in Draft!",
      icon: "success"
    });
    // reset(); // Reset form after submission
  };

  const jobcreation = (event) => {
    event.preventDefault(); // Prevent form submission
    Swal.fire({
      title: "Success!",
      text: "Job Created Successfully!",
      icon: "success"
    });
  }

  return (
    <div className="">
      <AdminNavbar />
      <div className="container mx-auto flex justify-center p-2">
        <h1 className="text-red-500 text-3xl uppercase font-bold">Create New Job Postings</h1>
      </div>
      <div className="max-w-4xl mt-10 mx-auto p-6 border-2 border-indigo-600 bg-white shadow-lg rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Job Details</h2>
        <form className='' onSubmit={handleSubmit((data) => onSubmit(data, false))}>
          <div className="grid grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 ">Job Title</label>
              <input
                {...register('jobTitle', { required: 'Job title is required' })}
                id="jobTitle"
                name="jobTitle"
                className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 "
                placeholder="Enter job title"
              />
              {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>}
            </div>

            {/* Department */}
            <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <select
              id="department"
              name="department"
              className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 focus:border-indigo-300 "
            >
              <option value="">Select a department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
          </div>

            {/* Job Description */}
            <div className="col-span-2">
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea
                {...register('jobDescription', { required: 'Job description is required', minLength: { value: 50, message: 'Minimum 50 characters required' } })}
                id="jobDescription"
                rows="3"
                className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter job description"
              />
              {errors.jobDescription && <p className="mt-1 text-sm text-red-600">{errors.jobDescription.message}</p>}
            </div>

            {/* Job Location */}
            <div>
              <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700">Job Location</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('jobLocation', { required: 'Job location is required' })}
                  id="jobLocation"
                  name="jobLocation"
                  className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 pl-10 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter job location"
                />
              </div>
              {errors.jobLocation && <p className="mt-1 text-sm text-red-600">{errors.jobLocation.message}</p>}
            </div>

            {/* Employment Type */}
            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
              <Select
                options={employmentTypes}
                className="mt-1"
                placeholder="Select employment type"
                onChange={(selectedOption) => register('employmentType').onChange({ target: { value: selectedOption.value } })}
              />
              {errors.employmentType && <p className="mt-1 text-sm text-red-600">{errors.employmentType.message}</p>}
            </div>

            {/* Salary Range Min */}
            <div>
              <label htmlFor="salaryRangeMin" className="block text-sm font-medium text-gray-700">Salary Range Min</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  {...register('salaryRangeMin', { required: 'Minimum salary is required' })}
                  id="salaryRangeMin"
                  className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 pl-10 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Min Salary"
                />
              </div>
              {errors.salaryRangeMin && <p className="mt-1 text-sm text-red-600">{errors.salaryRangeMin.message}</p>}
            </div>

            {/* Salary Range Max */}
            <div>
              <label htmlFor="salaryRangeMax" className="block text-sm font-medium text-gray-700">Salary Range Max</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  {...register('salaryRangeMax', { required: 'Maximum salary is required' })}
                  id="salaryRangeMax"
                  className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 pl-10 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Max Salary"
                />
              </div>
              {errors.salaryRangeMax && <p className="mt-1 text-sm text-red-600">{errors.salaryRangeMax.message}</p>}
            </div>

            {/* Application Deadline */}
            <div>
              <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">Application Deadline</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  {...register('applicationDeadline', { required: 'Application deadline is required' })}
                  id="applicationDeadline"
                  className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 pl-10 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {errors.applicationDeadline && <p className="mt-1 text-sm text-red-600">{errors.applicationDeadline.message}</p>}
            </div>

            {/* Required Qualifications */}
            <div className="col-span-2">
              <label htmlFor="requiredQualifications" className="block text-sm font-medium text-gray-700">Required Qualifications</label>
              <textarea
                {...register('requiredQualifications', { required: 'Required qualifications are mandatory' })}
                id="requiredQualifications"
                rows="3"
                className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter required qualifications"
              />
              {errors.requiredQualifications && <p className="mt-1 text-sm text-red-600">{errors.requiredQualifications.message}</p>}
            </div>

            {/* Preferred Qualifications */}
            <div className="col-span-2">
              <label htmlFor="preferredQualifications" className="block text-sm font-medium text-gray-700">Preferred Qualifications</label>
              <textarea
                {...register('preferredQualifications')}
                id="preferredQualifications"
                rows="3"
                className="mt-1 p-2 border-2 border-gray-200 block w-full rounded-md  hover:border-indigo-500 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter preferred qualifications (optional)"
              />
            </div>

          </div>
          {/* Draft and Publish Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => handleSubmit((data) => onSubmit(data, true))()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg shadow"
            >
              Save as Draft
            </button>
            <button
              type="submit" onClick={jobcreation}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
      <br></br>    <hr></hr></div>
  );
};

export default JobCreationForm;
