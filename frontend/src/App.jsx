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


const App = () => {
  return (
    <div>
    <Hero />
    <Signup />
    <AccountCreationForm />
    {/* <Interview /> */}
    {/* <Forms /> */}
    {/* <JobCreationForm />
    <JobListingsManagement /> */}
    <JobManagementSystem />
    {/* <JobCategoriesManagement /> */}
    {/* <Dashboard />
    <ApplicationsManagement />
    <Chatbot />
    <Chats />
    <Final_Confetti />
    <Meeting /> */}
    </div>
  )
}

export default App
