import React, { useState } from 'react';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <nav className="bg-orange-100 p-4 shadow-md w-full fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Left Side Links */}
        <div className="hidden md:flex space-x-6 text-orange-700 font-semibold">
          <a href="/" className="hover:text-orange-900">
            Home
          </a>
          <a href="/" className="hover:text-orange-900">
            About
          </a>
          <a href="/" className="hover:text-orange-900">
            Contact
          </a>
          <a href="/profile" className="hover:text-orange-900">
            Profile
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
          <Link to="/auth" state={{ tf: false }}>
            <Button name="Sign Up" />
          </Link>
          <Link to="/auth" state={{ tf: true }}>
            <Button name="Sign In" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-orange-100 p-4 w-full absolute top-full left-0 right-0 shadow-md">
          <a
            onClick={handleHome}
            className="block py-2 text-orange-700 hover:text-orange-900"
          >
            Home
          </a>
          <a
            href="/"
            className="block py-2 text-orange-700 hover:text-orange-900"
          >
            About
          </a>
          <a
            href="/"
            className="block py-2 text-orange-700 hover:text-orange-900"
          >
            Contact
          </a>
          <a
            href="/profile"
            className="block py-2 text-orange-700 hover:text-orange-900"
          >
            Profile
          </a>

          <Link to="/auth" state={{ isLogin: true }}>
            <Button name="Sign In" />
          </Link>
          <Link to="/auth" state={{ isLogin: false }}>
            <Button name="Sign Up" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
