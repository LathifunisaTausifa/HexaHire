import React, { useState } from 'react';
import { FaUserCircle, FaPaperPlane, FaRobot } from 'react-icons/fa';

const initialChatData = [
  {
    user: 'Bot',
    message: 'Hello! How can I assist you with your recruitment needs today?'
  },
  {
    user: 'User1',
    message: 'I am looking for job opportunities.'
  },
  {
    user: 'Bot',
    message: 'We have several job openings. Can you specify the department?'
  },
  {
    user: 'User2',
    message: 'I am interested in the Engineering department.'
  },
  {
    user: 'Bot',
    message: 'We have openings in Engineering, Marketing, and Sales. Which one are you interested in?'
  },
  {
    user: 'User3',
    message: 'Tell me more about the Software Engineer positions.'
  },
  {
    user: 'Bot',
    message: 'Great! We have positions for Software Engineers and DevOps Engineers. Would you like to know more?'
  }
];

const ChatBubble = ({ user, message, isRight }) => {
  return (
    <div className={`flex justify-${isRight ? 'end' : 'start'} my-1`}>
      <div className={`bg-${isRight ? 'blue' : 'gray'}-500 text-white rounded-lg py-2 px-4 max-w-xs`}>
        {message}
      </div>
    </div>
  );
};

const getBotResponse = (message) => {
  if (message.toLowerCase().includes('job')) {
    return 'We have several job openings. Can you specify the department?';
  } else if (message.toLowerCase().includes('department')) {
    return 'We have openings in Engineering, Marketing, and Sales. Which one are you interested in?';
  } else if (message.toLowerCase().includes('engineering')) {
    return 'Great! We have positions for Software Engineers and DevOps Engineers. Would you like to know more?';
  } else {
    return "I'm not sure how to help with that. Can you please provide more details?";
  }
};

const Chatbot = ({ isVisible, toggleVisibility }) => {
  const [chatData, setChatData] = useState(initialChatData);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newChatData = [
        ...chatData,
        { user: 'Me', message: inputValue },
        { user: 'Bot', message: getBotResponse(inputValue) }
      ];
      setChatData(newChatData);
      setInputValue('');
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-gray-900 text-white rounded-lg shadow-lg ${isVisible ? 'block' : 'hidden'} w-80 h-96 flex flex-col`}>
      <div className="bg-gray-800 text-white flex justify-between items-center p-4 rounded-t-lg">
        <h1 className="font-semibold text-lg">Smart Recruitment Chatbot</h1>
        <FaUserCircle className="text-2xl" onClick={toggleVisibility} />
      </div>
      <div className="flex-1 overflow-y-scroll p-4 bg-gray-700">
        <div className="flex flex-col space-y-2">
          {chatData.map((chat, index) => (
            <ChatBubble
              key={index}
              user={chat.user}
              message={chat.message}
              isRight={chat.user === 'Me'}
            />
          ))}
        </div>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message here"
            className="flex-1 bg-gray-700 rounded-lg py-2 px-4 text-white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-500 rounded-lg py-2 px-4 ml-2 flex items-center justify-center"
            onClick={handleSendMessage}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
        onClick={toggleChatVisibility}
      >
        <FaRobot className="text-2xl" />
      </button>
      <Chatbot isVisible={isChatVisible} toggleVisibility={toggleChatVisibility} />
    </div>
  );
}
