import React from 'react';
import Webcam from "react-webcam";
import { FaDownload, FaVideo, FaStop } from 'react-icons/fa';

const WebcamDisplay = ({ setImageSrc, startCall, stopCall, isCallActive }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef, setImageSrc]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-64" />
      <div className="mt-4 flex space-x-4">
        <button 
          onClick={capture} 
          className="p-2 bg-blue-500 text-white rounded flex items-center"
        >
          <FaDownload className="mr-2" />
          Capture Photo
        </button>
        {!isCallActive ? (
          <button 
            onClick={startCall} 
            className="p-2 bg-green-500 text-white rounded flex items-center"
          >
            <FaVideo className="mr-2" />
            Start Call
          </button>
        ) : (
          <button 
            onClick={stopCall} 
            className="p-2 bg-red-500 text-white rounded flex items-center"
          >
            <FaStop className="mr-2" />
            Stop Call
          </button>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [isCallActive, setIsCallActive] = React.useState(false);
  const [callTimeout, setCallTimeout] = React.useState(null);

  const startCall = () => {
    setIsCallActive(true);
    const timeout = setTimeout(() => {
      stopCall();
    }, 30 * 60 * 1000); // 30 minutes
    setCallTimeout(timeout);
  };

  const stopCall = () => {
    setIsCallActive(false);
    if (callTimeout) {
      clearTimeout(callTimeout);
      setCallTimeout(null);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'webcam_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen m-2">
      <h1 className="font-semibold text-3xl m-2">
        Smile! 📷
      </h1>
      <WebcamDisplay 
        setImageSrc={setImageSrc} 
        startCall={startCall} 
        stopCall={stopCall} 
        isCallActive={isCallActive} 
      />
      {imageSrc && (
        <button 
          onClick={downloadImage} 
          className="mt-4 p-2 bg-green-500 text-white rounded flex items-center"
        >
          <FaDownload className="mr-2" />
          Download Photo
        </button>
      )}
    </div>
  );
};

export default App;
