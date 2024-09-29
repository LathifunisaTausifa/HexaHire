import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, RefreshCw } from 'lucide-react';
import AdminNavbar from './Navbar/AdminNavbar';


const generateRandomData = () => ({
  totalApplications: Math.floor(Math.random() * 1000),
  applicationsInProgress: Math.floor(Math.random() * 500),
  hiredCandidates: Math.floor(Math.random() * 100),
  rejectedCandidates: Math.floor(Math.random() * 200),
});


const generateChartData = () => [
  { status: 'New', count: Math.floor(Math.random() * 100) },
  { status: 'In Progress', count: Math.floor(Math.random() * 100) },
  { status: 'Hired', count: Math.floor(Math.random() * 50) },
  { status: 'Rejected', count: Math.floor(Math.random() * 50) },
];


const generateTableData = () => [
  { name: 'John Doe', position: 'Software Engineer', source: 'LinkedIn', dateApplied: '2024-09-15', status: 'In Progress' },
  { name: 'Jane Smith', position: 'Product Manager', source: 'Referral', dateApplied: '2024-09-18', status: 'New' },
  { name: 'Bob Johnson', position: 'UX Designer', source: 'Job Board', dateApplied: '2024-09-20', status: 'Hired' },
];


const Metric = () => {
  const [metrics, setMetrics] = useState(generateRandomData());
  const [chartData, setChartData] = useState(generateChartData());
  const [tableData, setTableData] = useState(generateTableData());


  const refreshData = () => {
    setMetrics(generateRandomData());
    setChartData(generateChartData());
    setTableData(generateTableData());
  };


  return (
    <div>
      <AdminNavbar />
    <div className="py-3 max-w-6xl mx-auto">
    {/* <div className="container mx-auto flex justify-center p-2">
        <h1 className="text-red-500 text-3xl uppercase font-bold">Recruitment Dashboard</h1>
      </div> */}
      <br></br>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-t from-blue-500/90 to-purple-500/90 text-4xl font-bold uppercase">Recruitment Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="mr-2 text-indigo-600" />
            <input type="date" className="border rounded p-2" />
          </div>
          <button onClick={refreshData} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 hover:scale-105 duration-300">
            <RefreshCw className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 p-4 rounded shadow border-2 border-indigo-600 hover:scale-105 duration-300">
            <h2 className="text-lg text-white font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>

      <div className="mb-6">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-t from-blue-500/90 to-purple-500 text-4xl font-bold mb-4 uppercase">Applications by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <br></br>
      <br></br>

      <div>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-t from-blue-500/90 to-purple-500/90 text-4xl font-bold mb-4 uppercase">Recent Applications</h2>
        <div className="overflow-x-auto  ">
          <table className="min-w-full bg-white">
            <thead>
              <tr className=" text-black bg-gray-100 uppercase border-2 border-gray-500 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Position</th>
                <th className="py-3 px-6 text-left">Source</th>
                <th className="py-3 px-6 text-left">Date Applied</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-black text-sm font-light">
              {tableData.map((row, index) => (
                <tr key={index} className="border-b border-gray-500 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{row.name}</td>
                  <td className="py-3 px-6 text-left">{row.position}</td>
                  <td className="py-3 px-6 text-left">{row.source}</td>
                  <td className="py-3 px-6 text-left">{row.dateApplied}</td>
                  <td className="py-3 px-6 text-left">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br></br>
    <br></br>
      <br></br>
    </div>
  );
};


export default Metric;
