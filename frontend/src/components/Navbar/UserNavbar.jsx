import React from 'react'
import logo from '../../assets/Hero/logo.png'


const UserNavbar = () => {
  return (
    <div>
      <nav className="bg-[#007272] p-4">
        <div className="container mx-auto">
        <div className='flex gap-4 text-white items-center text-2xl font-bold'>
            <img src={logo} alt = 'logo' className='w-10'/><span>HexaHire</span>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default UserNavbar
