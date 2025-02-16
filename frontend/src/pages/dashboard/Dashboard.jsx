import React, { useState } from 'react';
import { Menu } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`bg-gray-800 mt-16 text-white h-screen p-5 transition-all duration-300 ${isOpen ? 'w-60' : 'w-16'}`}
    >
      <ul>
        <li className="py-2">{isOpen && 'Dashboard'}</li>
        <li className="py-2">{isOpen && 'Profile'}</li>
        <li className="py-2">{isOpen && 'Settings'}</li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <button
        className="p-2 m-2 text-white bg-gray-800 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>
      <Sidebar isOpen={isOpen} />
      <div className="p-5 flex-1">Dashboard</div>
    </div>
  );
};

export default Dashboard;
