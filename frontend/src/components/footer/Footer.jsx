import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-orange-200 text-orange-800 p-6 w-full fixed bottom-0 left-0 right-0 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="font-bold text-lg">CourseHub</h2>
          <p className="text-sm">Your one-stop solution for online learning.</p>
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-orange-900">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-orange-900">
            Terms of Service
          </a>
          <a href="#" className="hover:text-orange-900">
            Refund Policy
          </a>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CourseHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
