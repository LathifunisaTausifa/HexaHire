import React, { useState, useEffect, useRef } from 'react';


const questions = [
  {
    id: 1,
    question: "What does JSX stand for in React?",
    options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Syntax Extension", "Java XML"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is the purpose of the 'key' prop in React lists?",
    options: ["To style list items", "To uniquely identify elements", "To set the order of elements", "To add event listeners"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is the correct way to create a functional component in React?",
    options: [
      "function MyComponent() { return <div>Hello</div>; }",
      "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
      "const MyComponent = () => { <div>Hello</div> }",
      "React.createComponent(() => <div>Hello</div>)"
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "What does the 'useCallback' hook do?",
    options: [
      "Memoizes a function",
      "Creates a state variable",
      "Handles side effects",
      "Manages context"
    ],
    correctAnswer: 0
  },
  // Add more questions here to reach a total of 20
];


const TechnicalQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');


  useEffect(() => {
    if (showResults) {
      const correctAnswers = Object.keys(selectedAnswers).filter(
        qId => selectedAnswers[qId] === questions[qId - 1].correctAnswer
      ).length;
      setScore(correctAnswers);
    }
  }, [showResults, selectedAnswers]);


  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    setupCamera();
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


  const handleAnswer = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };


  const handleSubmit = () => {
    setShowResults(true);
  };


  const handleSchedule = () => {
    if (startDate && endDate && time) {
      const meetingDetails = {
        startDate,
        endDate,
        time,
      };
      console.log('Meeting scheduled:', meetingDetails);
      // Here you would typically call your API to schedule the meeting
    } else {
      console.error('Please select both date range and time.');
    }
  };


  const renderQuestion = (question) => (
    <div key={question.id} className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <h2 className="text-xl font-bold">Question {question.id}</h2>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.id, index)}
              className={`w-full p-4 text-left rounded-lg border ${
                selectedAnswers[question.id] === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );


  const renderResults = () => (
    <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
        <h2 className="text-2xl font-bold">Quiz Results</h2>
      </div>
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Your Score: {score} / {questions.length}</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="flex items-center">
              {selectedAnswers[question.id] === question.correctAnswer ? (
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
              <span>Question {question.id}: {selectedAnswers[question.id] === question.correctAnswer ? 'Correct' : 'Incorrect'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Technical Web Development Quiz</h1>
        <div className="w-40 h-30 bg-gray-200 rounded-lg overflow-hidden shadow-md">
          {cameraStream ? (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>


      {!showResults ? (
        <>
          {questions.map(renderQuestion)}
          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            Submit Quiz
          </button>
        </>
      ) : (
        <>
          {renderResults()}
          <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
              <h2 className="text-2xl font-bold">Schedule a Follow-up Meeting</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <button
                onClick={handleSchedule}
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
              >
                Schedule Meeting
              </button>
              <button
                onClick={handleSchedule}
                className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
              >
                Send Email Notification
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default TechnicalQuiz;
