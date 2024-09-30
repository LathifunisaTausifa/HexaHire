import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, FileDown, X, Upload } from 'lucide-react';
import Navbar from '../components/Navbar/AdminNavbar';
import { faker } from '@faker-js/faker';

const initialReports = [
    {
        id: 1,
        name: 'Monthly Hiring Report',
        dateCreated: '2024-09-15',
        createdBy: 'John Doe',
        dateRange: '2024-08-01 to 2024-08-31',
        status: 'All',
        position: 'All',
        source: 'All',
        fields: ['Applicant Name', 'Date Applied', 'Status', 'Source'],
        data: [
            { applicantName: 'Alice Johnson', dateApplied: '2024-08-05', status: 'Hired', source: 'LinkedIn' },
            { applicantName: 'Bob Smith', dateApplied: '2024-08-12', status: 'Rejected', source: 'Job Board' },
            { applicantName: 'Carol Williams', dateApplied: '2024-08-20', status: 'In Progress', source: 'Referral' },
        ]
    },
    {
        id: 2,
        name: 'Source Effectiveness Report',
        dateCreated: '2024-09-20',
        createdBy: 'Jane Smith',
        dateRange: '2024-09-01 to 2024-09-20',
        status: 'Hired',
        position: 'Software Engineer',
        source: 'All',
        fields: ['Applicant Name', 'Source', 'Date Applied'],
        data: [
            { applicantName: 'David Brown', source: 'LinkedIn', dateApplied: '2024-09-03' },
            { applicantName: 'Eva Garcia', source: 'Referral', dateApplied: '2024-09-10' },
            { applicantName: 'Frank Lee', source: 'Job Board', dateApplied: '2024-09-15' },
        ]
    },
    {
        id: 3,
        name: "Weekly Hiring Report",
        dateCreated: "2024-09-22",
        createdBy: "Jane Smith",
        dateRange: "2024-09-15 to 2024-09-21",
        status: "Hired",
        position: "Software Engineer",
        source: "LinkedIn",
        fields: ["Applicant Name", "Date Applied", "Status", "Position", "Source"],
        data: [
            { applicantName: "David Brown", dateApplied: "2024-09-16", status: "Hired", position: "Software Engineer", source: "LinkedIn" },
            { applicantName: "Emily Davis", dateApplied: "2024-09-18", status: "Hired", position: "Software Engineer", source: "LinkedIn" },
            { applicantName: "Frank Miller", dateApplied: "2024-09-19", status: "Hired", position: "Software Engineer", source: "LinkedIn" }
        ]
    },
    {
        id: 4,
        name: "Quarterly Hiring Report",
        dateCreated: "2024-09-30",
        createdBy: "Robert Taylor",
        dateRange: "2024-07-01 to 2024-09-30",
        status: "In Progress",
        position: "Marketing Manager",
        source: "All",
        fields: ["Applicant Name", "Date Applied", "Status", "Position", "Source"],
        data: [
            { applicantName: "Grace Lee", dateApplied: "2024-07-15", status: "In Progress", position: "Marketing Manager", source: "Job Board" },
            { applicantName: "Henry White", dateApplied: "2024-08-10", status: "In Progress", position: "Marketing Manager", source: "Referral" },
            { applicantName: "Ivy Green", dateApplied: "2024-09-05", status: "In Progress", position: "Marketing Manager", source: "Career Fair" }
        ]
    },    
];


const CustomReportsModule = () => {
    const [reports, setReports] = useState(initialReports);
    const [showCreateReport, setShowCreateReport] = useState(false);
    const [showReportDetails, setShowReportDetails] = useState(false);
    const [showEditReport, setShowEditReport] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [newReport, setNewReport] = useState({
        name: '',
        dateRange: '',
        status: '',
        position: '',
        source: '',
        fields: [],
    });

    // Create Report Handler
    const handleCreateReport = () => {
        const reportToAdd = {
            ...newReport,
            id: reports.length + 1,
            dateCreated: new Date().toISOString().split('T')[0],
            createdBy: 'Current User',
            data: []
        };
        setReports([...reports, reportToAdd]);
        setShowCreateReport(false);
        setNewReport({ name: '', dateRange: '', status: '', position: '', source: '', fields: [] });
    };

    // Delete Report Handler
    const handleDeleteReport = (id) => {
        setReports(reports.filter(report => report.id !== id));
    };

    // View Report Handler
    const handleViewReport = (report) => {
        setSelectedReport(report);
        setShowReportDetails(true);
    };

    // Edit Report Handler
    const handleEditReport = (report) => {
        setSelectedReport(report);
        setNewReport({
            name: report.name,
            dateRange: report.dateRange,
            status: report.status,
            position: report.position,
            source: report.source,
            fields: report.fields,
        });
        setShowEditReport(true);
    };

    // Update Report Handler
    const handleUpdateReport = () => {
        const updatedReports = reports.map(report =>
            report.id === selectedReport.id ? { ...report, ...newReport } : report
        );
        setReports(updatedReports);
        setShowEditReport(false);
        setSelectedReport(null);
        setNewReport({ name: '', dateRange: '', status: '', position: '', source: '', fields: [] });
    };

    // Import Report Handler
    const handleImportReport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedReport = JSON.parse(e.target.result);
                    const newReport = {
                        ...importedReport,
                        id: reports.length + 1,
                        dateCreated: new Date().toISOString().split('T')[0],
                        createdBy: 'Current User',
                    };
                    setReports([...reports, newReport]);
                } catch (error) {
                    console.error('Error importing report:', error);
                    alert('Failed to import report. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    const ReportForm = ({ onSubmit }) => (
        <div className="space-y-4">
            <div>
                <label className="block mb-1">Report Name</label>
                <input
                    type="text"
                    value={newReport.name}
                    onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                    className="w-full border rounded p-2"
                    placeholder="Enter report name"
                />
            </div>
            <div>
                <label className="block mb-1">Date Range</label>
                <input
                    type="text"
                    value={newReport.dateRange}
                    onChange={(e) => setNewReport({ ...newReport, dateRange: e.target.value })}
                    className="w-full border rounded p-2"
                    placeholder="e.g., 2024-01-01 to 2024-01-31"
                />
            </div>
            <div>
                <label className="block mb-1">Application Status</label>
                <select
                    value={newReport.status}
                    onChange={(e) => setNewReport({ ...newReport, status: e.target.value })}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select status</option>
                    <option value="All">All</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div>
                <label className="block mb-1">Position</label>
                <input
                    type="text"
                    value={newReport.position}
                    onChange={(e) => setNewReport({ ...newReport, position: e.target.value })}
                    className="w-full border rounded p-2"
                    placeholder="Enter position or 'All'"
                />
            </div>
            <div>
                <label className="block mb-1">Source</label>
                <select
                    value={newReport.source}
                    onChange={(e) => setNewReport({ ...newReport, source: e.target.value })}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select source</option>
                    <option value="All">All</option>
                    <option value="Job Board">Job Board</option>
                    <option value="Referral">Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                </select>
            </div>
            <div>
                <label className="block mb-1">Fields to Include</label>
                <div className="space-y-2">
                    {['Applicant Name', 'Date Applied', 'Status', 'Source'].map((field) => (
                        <label key={field} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={newReport.fields.includes(field)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setNewReport({ ...newReport, fields: [...newReport.fields, field] });
                                    } else {
                                        setNewReport({ ...newReport, fields: newReport.fields.filter(f => f !== field) });
                                    }
                                }}
                                className="mr-2"
                            />
                            {field}
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    onClick={() => {
                        setShowCreateReport(false);
                        setShowEditReport(false);
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    onClick={onSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    {showEditReport ? 'Update Report' : 'Generate Report'}
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="flex-1 p-6 space-y-6">
                    <div className="container mx-auto flex justify-center p-2">
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-t from-blue-500/90 to-purple-500/90 text-3xl uppercase font-bold">Custom Reports Module</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setShowCreateReport(true)}
                            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 flex items-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Generate New Report</span>
                        </button>
                        <div className="flex items-center space-x-4">
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImportReport}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
                            >
                                <Upload className="w-5 h-5" />
                                <span>Import Report</span>
                            </label>
                            <button className="bg-[#F7CA44] text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center space-x-2">
                                <FileDown className="w-5 h-5" />
                                <span>Download CSV</span>
                            </button>
                        </div>
                    </div>
                    {/* List of Reports */}
                    <div className="space-y-4">
                        {reports.map((report) => (
                            <div key={report.id} className=" p-4 rounded shadow-md flex justify-between items-center bg-[#B7E0FF] text-slate-600 border-2 ">
                                <div>
                                    <h2 className="text-xl font-semibold">{report.name}</h2>
                                    {/* <p className="text-slate-200">Created by {report.createdBy} on {report.dateCreated}</p> */}
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleViewReport(report)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
                                    >
                                        <Eye className="w-5 h-5" />
                                        <span>View</span>
                                    </button>
                                    <button
                                        onClick={() => handleEditReport(report)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center space-x-2"
                                    >
                                        <Edit className="w-5 h-5" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteReport(report.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Create or Edit Report Form */}
                    {(showCreateReport || showEditReport) && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-[#F3F7EC] p-6 rounded shadow-lg w-full max-w-lg mx-4 my-8 overflow-y-auto max-h-[90vh]">
                                <h2 className="text-2xl font-semibold mb-4 text-red-600">
                                    {showEditReport ? 'Edit Report' : 'Generate New Report'}
                                </h2>
                                <ReportForm onSubmit={showEditReport ? handleUpdateReport : handleCreateReport} />
                            </div>
                        </div>
                    )}


                    {/* Report Details Modal */}
                    {showReportDetails && selectedReport && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-[#F3F7EC] border-2 border-slate-600 p-6 rounded shadow-lg w-full max-w-2xl space-y-4">
                                <div className="flex justify-between items-center ">
                                    <h2 className="text-2xl font-semibold text-red-600">Report Details: {selectedReport.name}</h2>
                                    <button
                                        onClick={() => setShowReportDetails(false)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <p>
                                    <strong>Date Range:</strong> {selectedReport.dateRange}
                                </p>
                                <p>
                                    <strong>Status:</strong> {selectedReport.status}
                                </p>
                                <p>
                                    <strong>Position:</strong> {selectedReport.position}
                                </p>
                                <p>
                                    <strong>Source:</strong> {selectedReport.source}
                                </p>
                                <h3 className="text-xl font-semibold">Data</h3>
                                <table className="min-w-full bg-white border rounded shadow">
                                    <thead>
                                        <tr>
                                            {selectedReport.fields.map((field) => (
                                                <th key={field} className="px-4 py-2 border">{field}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedReport.data.map((row, idx) => (
                                            <tr key={idx} className="border-t">
                                                {selectedReport.fields.map((field) => {
                                                    // Map the field to the correct data key
                                                    const fieldKey = field.toLowerCase().replace(/ /g, '');
                                                    const fieldValue = row[fieldKey];

                                                    // Determine if the field is "Applicant Name" or "Date Applied"
                                                    if (field.toLowerCase().includes('applicant name')) {
                                                        // Generate random name if missing
                                                        return (
                                                            <td key={field} className="px-4 py-2 border">
                                                                {fieldValue || faker.name.fullName()}
                                                            </td>
                                                        );
                                                    } else if (field.toLowerCase().includes('date applied')) {
                                                        // Generate random date if missing
                                                        return (
                                                            <td key={field} className="px-4 py-2 border">
                                                                {fieldValue || faker.date.past().toLocaleDateString()}
                                                            </td>
                                                        );
                                                    } else {
                                                        // Show other data fields or fallback to a generic value
                                                        return (
                                                            <td key={field} className="px-4 py-2 border">
                                                                {fieldValue || "N/A"}
                                                            </td>
                                                        );
                                                    }
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default CustomReportsModule;
