import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdCall } from "react-icons/io";


const AccountCreationForm = () => {
  return (
    <div>
    <div className='text-white bg-[#007272] py-4 px-2 font-2xl font-bold'>HexaHire</div>
    <div className="bg-[#e6faf8] min-h-screen flex items-center justify-center">
      <div className="bg-white my-10 rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#007272]">HexaHire
          </h1>
          <h2 className="text-xl font-semibold text-[#007272]/70">Create account</h2>
        </div>

        <div className="flex mb-8">
          <div className="w-1/3 pr-4">
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
          </div>

          <div className="w-2/3">
            <form>
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-[#007272]/70">YOUR PERSONAL DETAILS</h3>
                <label className="block mb-1">National Identity Number/D-number</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="01010102302"
                />
                <p className="text-xs text-gray-500 mt-1">This should be 11 digits long</p>
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
                        <option>🇳🇴 +47</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="w-3/4 pl-2">
                    <label className="block mb-1">Your Phone Number</label>
                    <div className="relative">
                      <input type="tel" className="w-full border rounded px-3 py-2" />
                      <IoMdCall  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Your Email Address</label>
                  <div className="relative">
                    <input type="email" className="w-full border rounded px-3 py-2" />
                    <MdOutlineMailOutline  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="text-right">
                <button type="submit" className="bg-[#007272] text-white px-6 py-2 rounded">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AccountCreationForm;