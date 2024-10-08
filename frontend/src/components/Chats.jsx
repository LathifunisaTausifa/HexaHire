import React, { useState } from 'react';
import { FaUserCircle, FaPaperPlane } from 'react-icons/fa';

const initialChatData = [
  {
    user: 'Bot',
    message: 'Hello! How can I assist you with your recruitment needs today?'
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

export default function Chats() {
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
    <div className="flex flex-col h-screen">
      <div className="bg-[#266F89] text-white flex justify-between items-center p-4">
        <h1 className="font-semibold text-lg">Smart Recruitment Chatbot</h1>
        <FaUserCircle className="text-2xl" />
      </div>
      <div className="flex-1 overflow-y-scroll p-4 bg-[#E4F5E5]">
        <div className="flex flex-col space-y-2 ">
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
      <div className="bg-[#266F89] text-white p-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message here"
            className="flex-1 bg-[#3D93A3] rounded-lg py-2 px-4 text-white"
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
}
