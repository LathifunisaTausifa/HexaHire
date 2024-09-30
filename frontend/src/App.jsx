import React from 'react'
import Hero from './components/Hero/Hero'
import Signup from './components/Login/Signup'
import AccountCreationForm from './components/Login/AccountCreationForm'
import Interview from './components/Interview'
import Forms from './components/Forms'
import JobCreationForm from './components/Job/JobCreationForm'
import JobListingsManagement from './components/Job/JobListingsManagement'
import JobManagementSystem from './components/Job/JobManagementSystem'
import JobCategoriesManagement from './components/Job/JobCategoriesManagement'
import Dashboard from './components/DashBoard'
import ApplicationsManagement from './components/ATS/ApplicationsManagement'
import Final_Confetti from './components/Final_Confetti'
import Chats from './components/Chats'
import Chatbot from './components/initialChatData'
import Meeting from './components/Meeting'
import Main from './components/Interview/Interview'
import UserSideMenu from './components/SidebarMenu/UserSidebarMenu'
import AdminSideMenu from './components/SidebarMenu/AdminSidebarMenu'
import AdminNavbar from './components/Navbar/AdminNavbar'
import CustomReportsModule from './components/CustomReportsModule'
import Metric from './components/Metric'
import InterviewScheduling from './components/InterviewScheduling'
import UserDashboard from './components/UserDashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
      {/* <UserDashboard/>
    <InterviewScheduling/> */}
      {/* <AdminSideMenu /> */}
      {/* <UserSideMenu/>
    <Chatbot /> */}
      <Hero />
      <Signup />
      {/* <AccountCreationForm /> */}
      {/* <Interview /> */}
      {/* <Forms /> */}

      
    </div>
  )
}

export default App
