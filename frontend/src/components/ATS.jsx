import React, { useState, useEffect } from 'react';
import AdminNavbar from './Navbar/AdminNavbar';

const RecruitmentManagementSystem = () => {
    // State for Dashboard
    const [jobOpenings, setJobOpenings] = useState(0);
    const [applications, setApplications] = useState([]);

    // State for Applications Management
    const [jobTitles, setJobTitles] = useState([]);
    const [filters, setFilters] = useState({
        jobTitle: '',
        status: '',
        dateStart: '',
        dateEnd: '',
    });


    // State for Application Details
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [notes, setNotes] = useState('');


    // State for Notifications
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        // Fetch initial data
        setJobOpenings(5);
        setApplications([
            { id: 1, name: 'John Doe', jobTitle: 'Software Engineer', status: 'Applied', dateApplied: '2023-09-15', email: 'john@example.com', phone: '123-456-7890', resume: 'john_doe_resume.txt', department: 'Engineering', location: 'New York', notes: '' },
            { id: 2, name: 'Jane Smith', jobTitle: 'Product Manager', status: 'In Review', dateApplied: '2023-09-14', email: 'jane@example.com', phone: '987-654-3210', resume: 'jane_smith_resume.txt', department: 'Product', location: 'San Francisco', notes: '' },
            { id: 3, name: 'Bob Johnson', jobTitle: 'Designer', status: 'Interview', dateApplied: '2023-09-13', email: 'bob@example.com', phone: '456-789-0123', resume: 'bob_johnson_resume.txt', department: 'Design', location: 'Chicago', notes: '' },
        ]);
        setJobTitles(['Software Engineer', 'Product Manager', 'Designer']);
        setNotifications([
            { id: 1, message: 'New application received', date: '2023-09-15', read: false },
            { id: 2, message: 'Interview scheduled', date: '2023-09-14', read: true },
        ]);
    }, []);


    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };


    const filteredApplications = applications.filter(app => {
        return (
            (filters.jobTitle === '' || app.jobTitle === filters.jobTitle) &&
            (filters.status === '' || app.status === filters.status) &&
            (filters.dateStart === '' || app.dateApplied >= filters.dateStart) &&
            (filters.dateEnd === '' || app.dateApplied <= filters.dateEnd)
        );
    });


    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };


    const handleSaveStatus = () => {
        if (selectedApplication && newStatus) {
            setApplications(applications.map(app =>
                app.id === selectedApplication.id ? { ...app, status: newStatus } : app
            ));
            setSelectedApplication({ ...selectedApplication, status: newStatus });
            setNewStatus('');
        }
    };


    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };


    const handleSaveNotes = () => {
        if (selectedApplication) {
            const updatedApplications = applications.map(app =>
                app.id === selectedApplication.id ? { ...app, notes: notes } : app
            );
            setApplications(updatedApplications);
            setSelectedApplication({ ...selectedApplication, notes: notes });
        }
    };


    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };


    const handleDeleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };


    const handleDownloadResume = (name, jobTitle) => {
        const resumeContent = `
${name}
${jobTitle}


Summary:
Experienced professional with a strong background in ${jobTitle.toLowerCase()} roles. Skilled in problem-solving, teamwork, and delivering high-quality results.


Experience:
- ${jobTitle} at XYZ Company (2018-2023)
- Junior ${jobTitle} at ABC Corp (2015-2018)


Education:
Bachelor's Degree in Computer Science, University of Technology (2015)


Skills:
- Programming Languages: JavaScript, Python, Java
- Tools: Git, JIRA, Agile methodologies
- Soft Skills: Communication, Leadership, Time Management
`;


        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.toLowerCase().replace(' ', '_')}_resume.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    return (
        <div>
            <AdminNavbar />
            <div className="p-10 bg-gray-100">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-t from-blue-500/90 to-purple-500/90 text-center text-4xl font-bold mb-10">Recruitment Management System</h1>


                {/* Dashboard Section */}
                <section className="mb-10">
                    <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Job Openings</h3>
                            <p className="text-3xl font-bold">{jobOpenings}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Applications</h3>
                            <p className="text-3xl font-bold">{applications.length}</p>
                        </div>
                    </div>
                </section>


                {/* Applications Management Section */}
                <section className="mb-10">
                    <h2 className="text-3xl font-bold mb-6">Applications Management</h2>
                    <div className="mb-6 flex space-x-4">
                        <select
                            name="jobTitle"
                            value={filters.jobTitle}
                            onChange={handleFilterChange}
                            className="p-2 border rounded"
                        >
                            <option value="">Select job title</option>
                            {jobTitles.map((title) => (
                                <option key={title} value={title}>{title}</option>
                            ))}
                        </select>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="p-2 border rounded"
                        >
                            <option value="">Select status</option>
                            <option value="Applied">Applied</option>
                            <option value="In Review">In Review</option>
                            <option value="Interview">Interview</option>
                            <option value="Offered">Offered</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <input
                            type="date"
                            name="dateStart"
                            value={filters.dateStart}
                            onChange={handleFilterChange}
                            className="p-2 border rounded"
                            placeholder="Start date"
                        />
                        <input
                            type="date"
                            name="dateEnd"
                            value={filters.dateEnd}
                            onChange={handleFilterChange}
                            className="p-2 border rounded"
                            placeholder="End date"
                        />
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-2xl font-semibold mb-4">Applications List</h3>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Applicant Name</th>
                                    <th className="p-2 text-left">Job Title</th>
                                    <th className="p-2 text-left">Status</th>
                                    <th className="p-2 text-left">Date Applied</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplications.map((app) => (
                                    <tr key={app.id} className="border-b">
                                        <td className="p-2">{app.name}</td>
                                        <td className="p-2">{app.jobTitle}</td>
                                        <td className="p-2">{app.status}</td>
                                        <td className="p-2">{app.dateApplied}</td>
                                        <td className="p-2">
                                            <button onClick={() => setSelectedApplication(app)} className="text-blue-500">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>


                {/* Application Details Section */}
                {selectedApplication && (
                    <section className="mb-10">
                        <h2 className="text-3xl font-bold mb-6">Application Details</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded shadow">
                                <h3 className="text-2xl font-semibold mb-4">Applicant Information</h3>
                                <p><strong>Name:</strong> {selectedApplication.name}</p>
                                <p><strong>Email:</strong> {selectedApplication.email}</p>
                                <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                                <p><strong>Resume:</strong> <button onClick={() => handleDownloadResume(selectedApplication.name, selectedApplication.jobTitle)} className="text-blue-500 underline">Download</button></p>
                            </div>
                            <div className="bg-white p-6 rounded shadow">
                                <h3 className="text-2xl font-semibold mb-4">Job Information</h3>
                                <p><strong>Job Title:</strong> {selectedApplication.jobTitle}</p>
                                <p><strong>Department:</strong> {selectedApplication.department}</p>
                                <p><strong>Location:</strong> {selectedApplication.location}</p>
                            </div>
                        </div>
                        <div className="mt-6 bg-white p-6 rounded shadow">
                            <h3 className="text-2xl font-semibold mb-4">Application Status</h3>
                            <p><strong>Current Status:</strong> {selectedApplication.status}</p>
                            <div className="mt-4">
                                <select
                                    value={newStatus}
                                    onChange={handleStatusChange}
                                    className="p-2 border rounded mr-2"
                                >
                                    <option value="">Select new status</option>
                                    <option value="Applied">Applied</option>
                                    <option value="In Review">In Review</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offered">Offered</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <button
                                    onClick={handleSaveStatus}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save Status
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 bg-white p-6 rounded shadow">
                            <h3 className="text-2xl font-semibold mb-4">Notes</h3>
                            <textarea
                                value={notes}
                                onChange={handleNotesChange}
                                className="w-full p-2 border rounded"
                                rows="4"
                                placeholder="Add notes about the application"
                            ></textarea>
                            <button
                                onClick={handleSaveNotes}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save Notes
                            </button>
                        </div>
                    </section>
                )}


                {/* Notifications Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-6">Notifications</h2>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-2xl font-semibold mb-4">Notifications List</h3>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Notification Message</th>
                                    <th className="p-2 text-left">Date</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notifications.map((notif) => (
                                    <tr key={notif.id} className="border-b">
                                        <td className="p-2">{notif.message}</td>
                                        <td className="p-2">{notif.date}</td>
                                        <td className="p-2">
                                            {!notif.read && (
                                                <button onClick={() => handleMarkAsRead(notif.id)} className="text-blue-500 mr-2">
                                                    Mark as Read
                                                </button>
                                            )}
                                            <button onClick={() => handleDeleteNotification(notif.id)} className="text-red-500">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};


export default RecruitmentManagementSystem;
