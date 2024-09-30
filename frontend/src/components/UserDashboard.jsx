import React, { useState } from "react";
import jobsData from "./jobsData.json"; // Assuming jobsData.json is in the same directory
import UserNavbar from "./Navbar/UserNavbar";
import avatar from '../../src/assets/avatar.png'
const UserDashboard = () => {
    const [selectedInterest, setSelectedInterest] = useState("");
    const [savedJobs, setSavedJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    const areasOfInterest = [
        "Web Development",
        "Data Science",
        "Cyber Security",
        "Machine Learning",
        "AI & Automation",
        "Cloud Computing",
        "Mobile App Development",
        "Blockchain",
        "DevOps",
        "UI/UX Design",
    ];

    const handleSelectChange = (e) => {
        setSelectedInterest(e.target.value);
    };

    const handleSaveJob = (job) => {
        setSavedJobs((prev) => [...prev, job]);
    };

    const handleRemoveJob = (jobToRemove) => {
        setSavedJobs((prev) => prev.filter((job) => job !== jobToRemove));
    };

    const handleApplyJob = (job) => {
        setApplications((prev) => [...prev, { ...job, status: "Applied" }]);
    };

    const updateApplicationStatus = (index, newStatus) => {
        const updatedApplications = [...applications];
        updatedApplications[index].status = newStatus;
        setApplications(updatedApplications);
    };

    return (
        <div>
            <UserNavbar />
            <div className="flex h-screen bg-gray-100">
                {/* Main Content */}
                <div className="flex-1 p-10 overflow-auto">
                    <h1 className="text-4xl font-bold mb-4 text-[#003C43]">Welcome to HexaHire!</h1>
                    <p className="text-orange-600">
                        This is your recruiting dashboard where you can manage candidates, job postings, and settings.
                    </p>

                    {/* User Banner */}
                    <div className="bg-white shadow-md rounded-lg mt-6 p-6 flex items-center justify-center border-2 border-orange-500">
                        {/* Profile Section */}
                        <div className="flex items-center">
                            {/* Profile Image */}
                            <div className="w-40 h-40 rounded-full  bg-gray-300 flex-shrink-0 overflow-hidden">
                                <img
                                    src={avatar}
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* User Details */}
                            <div className="ml-6 ">
                                <h3 className="text-4xl font-semibold uppercase text-green-700">John Doe J</h3>
                                <p className="text-gray-500 text-lg">Full stack web Developer Intern at Sona Comstar | Canva designer | Power BI analyst | Final year student | B.Tech IT | Tagore Engineering College</p>
                                <a className="text-blue-600 font-medium">www.myportfolio.com</a>
                                <div className="mt-4">
                                    <p className="text-gray-600">
                                        Performance: <span className="font-bold text-blue-600">85%</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Total Hires: <span className="font-bold text-green-600">120</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Pending Reviews: <span className="font-bold text-red-600">5</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Calendar Section */}
                        <div className="ml-6 bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Events</h3>
                            {/* Calendar */}
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {/* Days of the Week */}
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day} className="font-semibold text-gray-600">{day}</div>
                                ))}

                                {/* Empty cells for previous month */}
                                <div></div>
                                <div></div>
                                <div></div>

                                {/* Dates */}
                                {[...Array(30)].map((_, i) => {
                                    const date = i + 1;
                                    const isEvent = [7, 14, 21].includes(date); // Mark some dates with events
                                    return (
                                        <div
                                            key={date}
                                            className={`p-1 rounded-full w-8 h-8 flex items-center justify-center 
                    ${isEvent ? "bg-blue-400 text-white" : "text-gray-700"}`}
                                        >
                                            {date}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Area of Interest Dropdown */}
                    <div className="mt-8">
                        <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="areaOfInterest">
                            Candidate Area of Interest:
                        </label>
                        <select
                            id="areaOfInterest"
                            className="p-2 border border-gray-300 rounded-md w-full text-gray-700"
                            value={selectedInterest}
                            onChange={handleSelectChange}
                        >
                            <option value="">Select an area of interest</option>
                            {areasOfInterest.map((interest, index) => (
                                <option key={index} value={interest}>
                                    {interest}
                                </option>
                            ))}
                        </select>

                        {/* Show selected interest */}
                        {selectedInterest && (
                            <div className="mt-4 text-gray-600">
                                <p>
                                    Selected Area of Interest:{" "}
                                    <span className="font-bold text-blue-600">{selectedInterest}</span>
                                </p>

                                {/* Display job levels based on selected interest */}
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {jobsData[selectedInterest]?.map((job, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300 overflow-hidden"
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800">{job.experience}</h3>
                                            <p className="text-gray-600 mt-2 font-bold">{job.title}</p>
                                            <p className="text-gray-500 mt-2">{job.description}</p>
                                            <p className="text-gray-600 mt-2">
                                                Salary: <span className="font-bold">{job.expected_salary}</span>
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                Posted On: <span className="font-bold">{job.posted_on}</span>
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                Location: <span className="font-bold">{job.location}</span>
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                Employment Type: <span className="font-bold">{job.employment_type}</span>
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                Required Skills:{" "}
                                                <span className="font-bold">
                                                    {job.required_skills ? job.required_skills.join(", ") : "N/A"}
                                                </span>
                                            </p>

                                            {/* Apply Now Button */}
                                            <div className="mt-4">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                                                    onClick={() => handleApplyJob(job)} // Apply for job
                                                >
                                                    Apply Now
                                                </button>
                                                <button
                                                    className="mt-2 bg-yellow-400 text-white p-2 rounded w-full"
                                                    onClick={() => handleSaveJob(job)}
                                                >
                                                    Save Job
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Saved jobs */}
                                    {savedJobs.length > 0 && (
                                        <div className="mt-8">
                                            <h2 className="text-2xl font-bold">Saved Jobs</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                                                {savedJobs.map((job, index) => (
                                                    <div key={index} className="bg-white p-6 shadow-md rounded-lg">
                                                        <h3 className="text-xl font-semibold">{job.title}</h3>
                                                        <p className="text-gray-600 mt-2 font-bold">{job.title}</p>
                                                        <button
                                                            className="mt-2 bg-red-500 text-white p-2 rounded"
                                                            onClick={() => handleRemoveJob(job)}
                                                        >
                                                            Remove from Saved Jobs
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Applications Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">Applications</h2>
                        {applications.length === 0 ? (
                            <p className="text-gray-500">You have not applied for any jobs yet.</p>
                        ) : (
                            <ul className="mt-4">
                                {applications.map((app, index) => (
                                    <li key={index} className="bg-white p-4 shadow-md rounded-lg mb-4">
                                        <h3 className="text-lg font-semibold">{app.title}</h3>
                                        <p className="text-gray-600">Status: {app.status}</p>

                                        {app.status === "Applied" ? (
                                            <button
                                                className="mt-2 bg-yellow-500 text-white p-2 rounded"
                                                onClick={() => updateApplicationStatus(index, "Assessment In Progress")}
                                            >
                                                Take Assessment
                                            </button>
                                        ) : app.status === "Assessment In Progress" ? (
                                            <p className="mt-2 text-blue-600 font-bold">Result will be updated soon</p>
                                        ) : (
                                            <>
                                                <button
                                                    className="mt-2 bg-green-500 text-white p-2 rounded"
                                                    onClick={() => updateApplicationStatus(index, "Interview Scheduled")}
                                                >
                                                    Schedule Interview
                                                </button>
                                                <button
                                                    className="mt-2 bg-red-500 text-white p-2 rounded"
                                                    onClick={() => updateApplicationStatus(index, "Rejected")}
                                                >
                                                    Reject Application
                                                </button>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
