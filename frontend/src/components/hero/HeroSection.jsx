import React from 'react';
import Button from '../button/Button';

const HeroSection = () => {
  return (
    <div className="mt-20">
      <section className="bg-orange-100 text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-orange-800">
          Unlock Your Potential
        </h1>
        <p className="text-lg md:text-xl text-orange-700 mt-4 mb-6">
          Learn from industry experts and grow your skills.
        </p>
        <Button name="Browse Courses" className="mt-16"></Button>
      </section>
    </div>
  );
};
export default HeroSection;
