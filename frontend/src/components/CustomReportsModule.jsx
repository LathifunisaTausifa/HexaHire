import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, FileDown, X, Upload } from 'lucide-react';
import Navbar from '../components/Navbar/AdminNavbar';

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


    const handleCreateReport = () => {
        const reportToAdd = {
            ...newReport,
            id: reports.length + 1,
            dateCreated: new Date().toISOString().split('T')[0],
            createdBy: 'Current User',
            data: [] // In a real app, this would be populated with actual data
        };
        setReports([...reports, reportToAdd]);
        setShowCreateReport(false);
        setNewReport({ name: '', dateRange: '', status: '', position: '', source: '', fields: [] });
    };


    const handleDeleteReport = (id) => {
        setReports(reports.filter(report => report.id !== id));
    };


    const handleViewReport = (report) => {
        setSelectedReport(report);
        setShowReportDetails(true);
    };


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


    const handleUpdateReport = () => {
        const updatedReports = reports.map(report =>
            report.id === selectedReport.id ? { ...report, ...newReport } : report
        );
        setReports(updatedReports);
        setShowEditReport(false);
        setSelectedReport(null);
        setNewReport({ name: '', dateRange: '', status: '', position: '', source: '', fields: [] });
    };


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


    const ReportForm = ({ onSubmit, initialData = {} }) => (
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
                    {initialData.id ? 'Update Report' : 'Generate Report'}
                </button>
            </div>
        </div>
    );


    return (
        <div>
            <Navbar />
            <div className="p-6 max-w-6xl mx-auto">
                <div className="container mx-auto flex justify-center p-2">
                    <h1 className="text-red-500 text-3xl uppercase font-bold">Custom Reports</h1>
                </div>
                <div className=" my-6">
                    <div className="space-x-2 flex justify-center gap-6">
                        <button
                            onClick={() => setShowCreateReport(true)}
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            <Plus className="mr-2" size={20} />
                            Create New Report
                        </button>
                        <label className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
                            <Upload className="mr-2" size={20} />
                            Import Report
                            <input type="file" className="hidden" onChange={handleImportReport} accept=".json" />
                        </label>
                    </div>
                </div>


                {(showCreateReport || showEditReport) && (
                    <div className="bg-white p-6 rounded shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">{showEditReport ? 'Edit Report' : 'Create New Report'}</h2>
                        <ReportForm onSubmit={showEditReport ? handleUpdateReport : handleCreateReport} initialData={selectedReport} />
                    </div>
                )}
                {!showCreateReport && !showEditReport && (
                    <div className="bg-white rounded shadow overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr className='text-black bg-gray-100 uppercase border-2 border-gray-500 text-sm leading-normal'>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white font-light">
                                {reports.map((report) => (
                                    <tr key={report.id} className='border-b border-gray-500 hover:bg-gray-100'>
                                        <td className="px-6 py-4 whitespace-nowrap">{report.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{report.dateCreated}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{report.createdBy}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleViewReport(report)} className="text-blue-600 hover:text-blue-900"><Eye size={20} /></button>
                                                <button onClick={() => handleEditReport(report)} className="text-green-600 hover:text-green-900"><Edit size={20} /></button>
                                                <button onClick={() => handleDeleteReport(report.id)} className="text-red-600 hover:text-red-900"><Trash2 size={20} /></button>
                                                <button onClick={() => {
                                                    const jsonStr = JSON.stringify(report);
                                                    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
                                                    const link = document.createElement('a');
                                                    link.href = dataUri;
                                                    link.download = `${report.name}.json`;
                                                    link.click();
                                                }} className="text-gray-600 hover:text-gray-900"><FileDown size={20} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


                {showReportDetails && selectedReport && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{selectedReport.name}</h2>
                                <button onClick={() => setShowReportDetails(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <p><strong>Date Range:</strong> {selectedReport.dateRange}</p>
                                <p><strong>Status:</strong> {selectedReport.status}</p>
                                <p><strong>Position:</strong> {selectedReport.position}</p>
                                <p><strong>Source:</strong> {selectedReport.source}</p>
                                <div>
                                    <h3 className="font-semibold mb-2">Report Data:</h3>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {selectedReport.fields.map((field) => (
                                                    <th key={field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{field}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {selectedReport.data.map((row, index) => (
                                                <tr key={index}>
                                                    {selectedReport.fields.map((field) => (
                                                        <td key={field} className="px-6 py-4 whitespace-nowrap">{row[field.toLowerCase().replace(' ', '')]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CustomReportsModule;
