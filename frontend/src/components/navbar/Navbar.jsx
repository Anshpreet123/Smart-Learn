import React, { useState } from 'react';
import Button from '../button/Button';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-100 p-4 shadow-md w-full fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Left Side Links */}
        <div className="hidden md:flex space-x-6 text-orange-700 font-semibold">
          <a href="#" className="hover:text-orange-900">
            Home
          </a>
          <a href="#" className="hover:text-orange-900">
            About
          </a>
          <a href="#" className="hover:text-orange-900">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-orange-700"
          >
            ☰
          </button>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex space-x-4">
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-orange-100 p-4 w-full absolute top-full left-0 right-0 shadow-md">
          <a
            href="#"
            className="block py-2 text-orange-700 hover:text-orange-900"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 text-orange-700 hover:text-orange-900"
          >
            About
          </a>
          <a
            href="#"
            className="block py-2 text-orange-700 hover:text-orange-900"
          >
            Contact
          </a>
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
