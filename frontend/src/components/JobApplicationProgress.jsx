import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { AiFillCheckCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import UserNavbar from './Navbar/UserNavbar';

Modal.setAppElement('#root');

const steps = [
  { name: 'Application Submitted', icon: '📄' },
  { name: 'Resume Screening', icon: '👀' },
  { name: 'Interview Scheduled', icon: '🕒' },
  { name: 'Final Decision', icon: '🏢' },
];

function Final_Confetti() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    setModalIsOpen(true);
    const timer = setTimeout(() => setShowConfetti(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center  flex-col">
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setModalIsOpen(false)}
      >
        Close
      </button> */}
      {showConfetti && <Confetti />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="flex justify-center items-center h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <AiFillCheckCircle className="text-green-500 text-5xl mb-4" />
          <h2 className="text-2xl font-bold mb-4">Hurrah!</h2>
          <p className="mb-4">You have been selected for the job.</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

const JobApplicationProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
      } else {
        clearInterval(interval);
        setIsCompleted(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStep]);

  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div>
<UserNavbar/>
    <div className="w-full max-w-md mx-auto m-10 border-2 border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Job Application Progress</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Track your application status</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="py-3 sm:py-5 sm:px-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <dl className="divide-y divide-gray-200">
            {steps.map((step, index) => (
              <div key={step.name} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <span className={`mr-2 text-2xl ${index <= currentStep ? 'opacity-100' : 'opacity-50'}`}>
                    {step.icon}
                  </span>
                  <span className={index <= currentStep ? 'font-semibold text-gray-900' : ''}>
                    {step.name}
                  </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {index <= currentStep ? 'Completed' : 'Pending'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {isCompleted && <Final_Confetti />}
    </div>
    </div>
  );
};

export default JobApplicationProgress;