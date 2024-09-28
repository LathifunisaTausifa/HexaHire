import React, { useState } from 'react';
import { FaBars, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import AccountCreationForm from '../Login/AccountCreationForm';


const UserSideMenu = () => {
    const [activeComponent, setActiveComponent] = useState('AccountCreationForm'); // Default component to show
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLineDropdownOpen, setIsLineDropdownOpen] = useState(false); // State to toggle Line dropdown
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false); // State to toggle Product dropdown

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleLineDropdown = () => {
        setIsLineDropdownOpen(!isLineDropdownOpen);
    };

    const toggleProductDropdown = () => {
        setIsProductDropdownOpen(!isProductDropdownOpen);
    };

    return (
        <div className="flex">
            {/* Side Menu */}
            <div
                className={`${isSidebarOpen ? 'w-1/8' : 'w-16'
                    } h-screen bg-[#007272] text-white p-4 transition-width duration-300 ease-in-out`}
            >
                <div className="flex items-center justify-between">
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <FaBars size={24} />
                    </button>
                    {isSidebarOpen && (
                        <h1 className="text-xl font-bold">Menu</h1>
                    )}
                </div>
                <ul className={`${!isSidebarOpen && 'hidden'} mt-4`}>
                    <li
                        className={`cursor-pointer p-2 mt-2 ${activeComponent === 'AccountCreationForm' && 'bg-slate-500/70 rounded-xl'
                            }`}
                        onClick={() => setActiveComponent('AccountCreationForm')}
                    >
                        AccountCreationForm
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className={`${isSidebarOpen ? 'w-3/4' : 'w-full'} p-4 transition-width duration-300 ease-in-out`}>
                {activeComponent === 'AccountCreationForm' && <AccountCreationForm />}
            </div>
        </div>
    );
};

export default UserSideMenu;
