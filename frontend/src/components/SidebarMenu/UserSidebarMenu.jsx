import React, { useState } from 'react';
import { IoCreateOutline  } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdAssuredWorkload } from "react-icons/md";
import { TbReportSearch , TbReportAnalytics } from "react-icons/tb";
import { GrGroup , GrContact } from "react-icons/gr";
import Chats from '../Chats';
import AccountCreationForm from '../Login/AccountCreationForm';
import UserDashboard from '../UserDashboard';
import { MdOutlineKeyboardCommandKey , MdOutlineAssessment } from "react-icons/md";
import TechnicalQuiz from '../Assessment';
import JobApplicationProgress from '../JobApplicationProgress';
import { GiProgression } from "react-icons/gi";

const UserSideMenu = () => {
  const [activeComponent, setActiveComponent] = useState('AccountCreationForm'); // Default component to show

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-[#003C43] text-white flex flex-col items-center py-6 transition-width duration-300 ease-in-out">
        <ul className="space-y-8">
          {/* Dashboard Icon */}
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'AccountCreationForm' ? '' : ''}`}
            onClick={() => setActiveComponent('AccountCreationForm')}
          >
            <RxDashboard  size={24} />
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'UserDashboard' ? '' : ''}`}
            onClick={() => setActiveComponent('UserDashboard')}
          >
            <MdOutlineKeyboardCommandKey   size={24} />
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'TechnicalQuiz' ? '' : ''}`}
            onClick={() => setActiveComponent('TechnicalQuiz')}
          >
            <MdOutlineAssessment  size={24} />
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeComponent === 'JobApplicationProgress' ? '' : ''}`}
            onClick={() => setActiveComponent('JobApplicationProgress')}
          >
            <GiProgression  size={24} />
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
        {activeComponent === 'AccountCreationForm' && <AccountCreationForm />}
        {activeComponent === 'UserDashboard' && <UserDashboard />}
        {activeComponent === 'Chats' && <Chats />}
        {activeComponent === 'TechnicalQuiz' && <TechnicalQuiz />}
        {activeComponent === 'JobApplicationProgress' && <JobApplicationProgress />}
      </div>
    </div>
  );
};

export default UserSideMenu;
