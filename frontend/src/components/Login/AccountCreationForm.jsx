import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import Swal from 'sweetalert2';
import bgImg from '../../assets/Account/place.jpg'
import bgImg2 from '../../assets/Account/place2.jpg'

const AccountCreationForm = () => {
  const [atsScore, setAtsScore] = useState(null); // State to hold the ATS score

  const scrollToForm = () => {
    const formSection = document.getElementById("form-section");
    formSection.scrollIntoView({ behavior: "smooth" });
  };
  
  const generateRandomScore = () => {
    // Generate a random number between 71 and 100
    return Math.floor(Math.random() * (100 - 71 + 1)) + 71;
  };

  const Submit = (event) => {
    event.preventDefault(); // Prevent form submission
    Swal.fire({
      title: "Are you sure you want to Submit?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Generate ATS score
        const score = generateRandomScore();
        setAtsScore(score); // Update the state with the score

        Swal.fire({
          title: "Submitted!",
          text: "Your profile has been created successfully",
          icon: "success",
          showCloseButton: true, // Optional: show a close button
          confirmButtonText: "OK", // Optional: custom button text
          timer: null, // Disable the auto-close feature
        });
      }
    });
  };

  return (
    <div>
      <div className='text-white bg-[#007272] py-4 px-2 font-2xl font-bold'>HexaHire</div>
      <div className="relative w-full h-[500px] mb-48"> {/* Container for image */}
        <img 
          src={bgImg2} 
          alt="Descriptive Alt Text" // Provide alt text for accessibility
          className="object-cover w-full h-full opacity-80" // Full width, height, and opacity
          style={{ backdropFilter: 'blur(5px)' }} // Backdrop blur effect
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Overlay for opacity */}
       {/* Button to trigger form */}
       <div className="absolute inset-x-0  my-5  flex items-center flex-col justify-center">
       <p className='px-5 text-[#007272]/70 text-xl font-semibold '><span className=' text-5xl text-[#007272] font-vibes italic'>HexaHire</span>: Revolutionizing the way talent meets opportunity with a seamless, next-gen hiring experience that empowers both employers and candidates to unlock their full potential.</p>
          <button 
            className='bg-[#007272] text-white py-4 px-16 rounded-full'             onClick={scrollToForm}
          >
            Get Started
          </button>
        </div>
      </div>
      <div id="form-section" className="bg-[#e6faf8]  min-h-screen flex items-center justify-center">
        <div className="bg-white my-10 rounded-lg shadow-lg p-8 w-full max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#007272]">HexaHire
            </h1>
            <h2 className="text-xl font-semibold text-[#007272]/70">Create account</h2>
          </div>

          <div className="flex mb-8">
            {/* <div className="w-1/3 pr-4">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#007272] text-white flex items-center justify-center mr-2">✓</div>
                <span className="font-medium">Personal Details</span>
              </li>
              {['Account Details', 'Tax Details', 'Summary', 'Receipt'].map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-2">{index + 2}</div>
                  <span className="text-gray-500">{item}</span>
                </li>
              ))}
            </ul>
          </div> */}
            <div className="w-full">
              <form>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-[#007272]/70">YOUR PERSONAL DETAILS</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-1">First Name</label>
                    <input type="text" className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block mb-1">Last Name</label>
                    <input type="text" className="w-full border rounded px-3 py-2" />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-[#007272]/70">YOUR RESIDENTIAL ADDRESS</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-1">Street Address</label>
                      <input type="text" className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block mb-1">Street Address (optional)</label>
                      <input type="text" className="w-full border rounded px-3 py-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1">Post Code</label>
                      <input type="text" className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block mb-1">City</label>
                      <input type="text" className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block mb-1">Country</label>
                      <div className="relative">
                        <select className="w-full border rounded px-3 py-2 appearance-none">
                          <option>Select country</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-[#007272]/70">CONTACT DETAILS</h3>
                  <div className="flex mb-4">
                    <div className="w-1/4 pr-2">
                      <label className="block mb-1">Country Code</label>
                      <div className="relative">
                        <select className="w-full border rounded px-3 py-2 appearance-none">
                          <option>IND +91</option>
                          <option>USA +91</option>
                          <option>UK +44</option>
                          <option>CAN +1</option>
                          <option>IND +91</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div className="w-3/4 pl-2">
                      <label className="block mb-1">Your Phone Number</label>
                      <div className="relative">
                        <input type="tel" className="w-full border rounded px-3 py-2" />
                        <IoMdCall className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1">Your Email Address</label>
                    <div className="relative">
                      <input type="email" className="w-full border rounded px-3 py-2" />
                      <MdOutlineMailOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-[#007272]/70 uppercase">File uploads</h3>
                  <div className="flex mb-4">
                    <div className="w-full pr-2">
                      <label className="block mb-1">Upload Resume</label>
                      <input type='file' name="resume" className='block text-slate-500'></input>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>

                <div className="text-center">
                  <button onClick={Submit} type="submit" className="bg-[#007272] text-white px-6 py-2 rounded">
                    Submit
                  </button>
                </div>
                {/* Display ATS Score if available */}
                {atsScore && (
                  <p className="mt-4 text-[#007272] font-semibold text-center">
                    Your ATS Score is <span className="text-xl font-bold">{atsScore}%</span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AccountCreationForm;