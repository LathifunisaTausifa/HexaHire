import React from 'react';
import { Eye, Edit, Trash, XCircle, CheckCircle } from 'lucide-react';

const JobListingsManagement = ({ 
  draftJobs, 
  publishedJobs, 
  onEditJob, 
  onDeleteDraft, 
  onPublishDraft, 
  onUnpublishJob 
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Job Listings Management</h2>
      
      {/* Draft Jobs Section */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Draft Jobs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Job Title</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Date Created</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {draftJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{job.jobTitle}</td>
                  <td className="py-3 px-4">{job.department}</td>
                  <td className="py-3 px-4">{job.dateCreated}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onEditJob(job.id, true)}
                      className="mr-2 text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteDraft(job.id)}
                      className="mr-2 text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                    <button
                      onClick={() => onPublishDraft(job.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Publish"
                    >
                      <CheckCircle size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Published Jobs Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Published Jobs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Job Title</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Date Published</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishedJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{job.jobTitle}</td>
                  <td className="py-3 px-4">{job.department}</td>
                  <td className="py-3 px-4">{job.datePublished}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onEditJob(job.id, false)}
                      className="mr-2 text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onUnpublishJob(job.id)}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Unpublish"
                    >
                      <XCircle size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default JobListingsManagement;