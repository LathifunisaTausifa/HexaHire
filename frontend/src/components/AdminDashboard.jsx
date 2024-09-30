import React, { useState } from "react";
import candidateData from "./candidateData.json"; // Import the updated candidate data
import AdminNavbar from "./Navbar/AdminNavbar";

const AdminDashboard = () => {
    const [candidates, setCandidates] = useState(candidateData);

    // Function to update the assessment marks of a candidate
    const handleAssessmentMarkChange = (id, mark) => {
        const updatedCandidates = candidates.map((candidate) =>
            candidate.id === id ? { ...candidate, assessmentMark: mark } : candidate
        );
        setCandidates(updatedCandidates);
    };

    // Function to update the status of a candidate
    const updateCandidateStatus = (id, newStatus) => {
        const updatedCandidates = candidates.map((candidate) =>
            candidate.id === id ? { ...candidate, status: newStatus } : candidate
        );
        setCandidates(updatedCandidates);
    };

    return (
        <div>
            <AdminNavbar />
            <div className="flex h-screen bg-white">
                {/* Main Content */}
                <div className="flex-1 p-10 overflow-auto ">
                    <div className="container mx-auto flex justify-center p-2">
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-t from-blue-500/90 to-purple-500/90 text-3xl uppercase font-bold">Manage</h1>
                    </div>                
                    <p className="text-indigo-600 text-center ">
                        Manage candidates who have applied for the assessment.
                    </p>

                    {/* Candidates Table */}
                    <div className="mt-8 bg-white shadow-md rounded-lg p-6  border-2 border-indigo-500">
                        <h2 className="text-2xl font-bold mb-4">Candidates</h2>
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr className="text-black text-center bg-gray-100 uppercase border-2 border-gray-300 text-sm leading-normal">
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Experience</th>
                                    <th className="px-4 py-2">Skills</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Assessment Mark</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody >
                                {candidates.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-gray-200 text-center uppercase font-thin">
                                        <td className="border px-4 py-2">{candidate.name}</td>
                                        <td className="border px-4 py-2">{candidate.experience}</td>
                                        <td className="border px-4 py-2">{candidate.skills.join(", ")}</td>
                                        <td className="border px-4 py-2">{candidate.status}</td>
                                        <td className="border px-4 py-2">
                                            {candidate.assessmentMark !== null ? (
                                                candidate.assessmentMark
                                            ) : (
                                                <input
                                                    type="number"
                                                    placeholder="Enter Mark"
                                                    className="p-2 border border-gray-300 rounded-md"
                                                    onChange={(e) =>
                                                        handleAssessmentMarkChange(candidate.id, parseInt(e.target.value))
                                                    }
                                                />
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {candidate.status === "Applied" ? (
                                                <button
                                                    className="bg-yellow-500 text-white p-2 rounded"
                                                    onClick={() =>
                                                        updateCandidateStatus(candidate.id, "Assessment In Progress")
                                                    }
                                                >
                                                    Start Assessment
                                                </button>
                                            ) : candidate.status === "Assessment In Progress" ? (
                                                <>
                                                    <button
                                                        className="bg-green-500 text-white p-2 rounded"
                                                        onClick={() =>
                                                            updateCandidateStatus(candidate.id, "Interview Scheduled")
                                                        }
                                                    >
                                                        Schedule Interview
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white p-2 rounded ml-2"
                                                        onClick={() =>
                                                            updateCandidateStatus(candidate.id, "Rejected")
                                                        }
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : candidate.status === "Interview Scheduled" ? (
                                                <span className="text-blue-500 font-semibold">Interview Scheduled</span>
                                            ) : (
                                                <span className="text-red-500 font-semibold">Rejected</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
