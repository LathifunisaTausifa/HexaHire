import React, { useState } from 'react';
import { IoCreateOutline  } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import Dashboard from '../DashBoard';
import JobManagementSystem from '../Job/JobManagementSystem';
import AdminDashboard from '../AdminDashboard'
import { MdAssuredWorkload } from "react-icons/md";
import CustomReportsModule from '../CustomReportsModule';
import { TbReportSearch , TbReportAnalytics } from "react-icons/tb";
import Metric from '../Metric';
import { GrGroup , GrContact } from "react-icons/gr";
import Chats from '../Chats';
import InterviewScheduling from '../../components/InterviewScheduling';
import RecruitmentManagementSystem from '../ATS';

const AdminSideMenu = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard'); // Default component to show

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-[#003285] text-white flex flex-col items-center py-6 transition-width duration-300 ease-in-out">
        <ul className="space-y-8">
          {/* Dashboard Icon */}
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'Dashboard' ? '' : ''}`}
            onClick={() => setActiveComponent('Dashboard')}
          >
            <RxDashboard  size={24} />
          </li>

          {/* Job Creation Form Icon */}
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'JobManagementSystem' ? '' : ''}`}
            onClick={() => setActiveComponent('JobManagementSystem')}
          >
            <IoCreateOutline size={24} />
          </li>
          {/* <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'AdminDashboard' ? '' : ''}`}
            onClick={() => setActiveComponent('AdminDashboard')}
          >
            <MdAssuredWorkload   size={24} />
          </li> */}
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'RecruitmentManagementSystem' ? '' : ''}`}
            onClick={() => setActiveComponent('RecruitmentManagementSystem')}
          >
            <MdAssuredWorkload  size={24} />
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'CustomReportsModule' ? '' : ''}`}
            onClick={() => setActiveComponent('CustomReportsModule')}
          >
            <TbReportSearch size={24} />
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'Metric' ? '' : ''}`}
            onClick={() => setActiveComponent('Metric')}
          >
            <TbReportAnalytics size={24} />
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'InterviewScheduling' ? '' : ''}`}
            onClick={() => setActiveComponent('InterviewScheduling')}
          >
            <GrGroup  size={24} />
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'Chats' ? '' : ''}`}
            onClick={() => setActiveComponent('Chats')}
          >
            <GrContact  size={24} />
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white">
        {/* Dynamically Render Components */}
        {activeComponent === 'Dashboard' && <Dashboard />}
        {activeComponent === 'JobManagementSystem' && <JobManagementSystem />}
        {activeComponent === 'AdminDashboard' && <AdminDashboard />}
        {activeComponent === 'CustomReportsModule' && <CustomReportsModule />}
        {activeComponent === 'Metric' && <Metric />}
        {activeComponent === 'Chats' && <Chats />}
        {activeComponent === 'InterviewScheduling' && <InterviewScheduling />}
        {activeComponent === 'RecruitmentManagementSystem' && <RecruitmentManagementSystem />}
      </div>
    </div>
  );
};

export default AdminSideMenu;
