import React, { useRef } from 'react';
import Signup from '../Login/Signup'
const Body = () => {
  const signupRef = useRef(null); // Create a ref for the Signup component

  // Function to handle smooth scrolling
  const scrollToSignup = () => {
    if (signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-black/20 h-full text-white relative z-50'>
      <div className='flex justify-center items-center h-full p-4'>
        <div className='container text-center gap-4'>
          <div className='space-y-4 lg:pr-36 ml-16'>
            <h1 data-aos="fade-up" className='font-bold text-7xl uppercase '>
              Smart Recruitment System
            </h1>
            <p data-aos="fade-up" data-aos-delay='300'>
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay='500'
              className='bg-orange-400 hover:bg-orange-500 rounded-md px-6 py-2 duration-300 m-4'
              onClick={scrollToSignup} // Trigger scroll on click
            >
              Login
            </button>
            <button
              data-aos="fade-up"
              data-aos-delay='500'
              className='bg-orange-400 hover:bg-orange-500 rounded-md px-6 py-2 duration-300'
              onClick={scrollToSignup} // Trigger scroll on click
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div ref={signupRef}> {/* Signup component reference */}
        <Signup /> {/* Your Signup component */}
      </div>
    </div>
  );
};

export default Body;
