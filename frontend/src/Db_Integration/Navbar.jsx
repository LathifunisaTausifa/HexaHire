import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/react.svg';
import placeholderImage from '../assets/react.svg'; // Add your image path here
import { FaEnvelope } from 'react-icons/fa6';
import { IoCall } from 'react-icons/io5';
import { HiOutlineBars3 } from 'react-icons/hi2';

const Menu = [
  { id: 1, name: "Home", link: "/Home" },
  { id: 2, name: "About Us", link: "/About" },
  { id: 3, name: "Products", link: "/Product" },
  { id: 4, name: "Certifications", link: "/Certificates" },
  { id: 5, name: "Companies", link: "/Companies" },
  { id: 6, name: "Contact Us", link: "/Contact" },
];

const Navbar = () => {
  const [showLowerNav, setShowLowerNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      setShowLowerNav(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav className='fixed top-0 left-0 w-full z-40 text-white shadow-md' aria-label='Main Navigation'>
      {/* Upper Navbar */}
      <div className='bg-[#201E43] py-2'>
        <div className='flex justify-between items-center container mx-auto px-4'>
          {/* Logo */}
          <div className='flex items-center'>
            <a href='/' className='text-md lg:text-3xl flex items-center gap-2 font-semibold font-serif' aria-label='Aarthi Industries Home'>
              <img src={logo} className='w-10 h-10 rounded-full object-cover' alt='Aarthi Industries Logo' />
            </a>
            <img src={placeholderImage} className='w-[120px]  md:w-[200px]  mt-1 ml-2 md:ml-4 lg:ml-5'  alt='Placeholder' />
          </div>
          {/* Email and Call */}
          <div className='flex justify-end items-center gap-4'>
            <div className='flex items-center gap-2'>
              <button
                className='bg-[#30336b] rounded-full text-white py-1 px-4 flex items-center transition-all duration-200 gap-3 hover:bg-gray-600'
                onClick={() => window.location.href = 'mailto:aarthiindustries@gmail.com'}
                aria-label='Send Email to Aarthi Industries'
              >
                <span className='transition-all hidden md:block duration-200'>aarthiindustries@gmail.com</span>
                <FaEnvelope className='text-xl text-white drop-shadow-sm cursor-pointer' />
              </button>
              <button
                className='bg-[#30336b] rounded-full text-white py-1 px-4 flex items-center gap-3 transition-all duration-200 hover:bg-gray-600'
                onClick={() => window.location.href = 'tel:+919444074727'}
                aria-label='Call Aarthi Industries'
              >
                <span className='transition-all duration-200 hidden md:block'>+91 9444 074 727</span>
                <IoCall className='text-xl text-white drop-shadow-sm cursor-pointer' />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Lower Navbar */}
      <div className={`bg-[#30336b] py-2 ${showLowerNav ? 'block' : 'hidden'} transition-all duration-300`}>
        <div className='flex md:justify-center container mx-auto px-4'>
          {/* Menu Items */}
          <div className='hidden md:flex items-center gap-8'>
            {Menu.map((menu) => (
              <NavLink
                key={menu.id}
                to={menu.link}
                className={({ isActive }) =>
                  `text-sm md:text-md lg:text-lg px-2 tracking-wide ${isActive ? 'text-yellow-400' : 'text-white'} hover:text-yellow-400 transition-colors duration-200`
                }
                aria-label={`Navigate to ${menu.name}`}
              >
                {menu.name}
              </NavLink>
            ))}
          </div>
          {/* Mobile Menu Icon */}
          <div className='md:hidden flex items-center'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label='Open Mobile Menu'>
              <HiOutlineBars3 className='text-2xl text-white' />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden flex flex-col items-center py-4 bg-[#30336b]'>
            {Menu.map((menu) => (
              <div
                key={menu.id}
                className={`relative w-[300px] text-center border-b border-slate-100/30`}
              >
                <NavLink
                  to={menu.link}
                  className={({ isActive }) =>
                    `text-sm tracking-wide ${isActive ? 'text-yellow-400' : 'text-white'} hover:text-yellow-400 transition-colors duration-200 block py-2 mx-4`
                  }
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={`Navigate to ${menu.name}`}
                >
                  {menu.name}
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
