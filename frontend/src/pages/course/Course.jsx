import React from 'react';
import Playlist from '../../components/playlist/Playlist';
import Video from '../../components/video/Video';
import CourseDescription from '../../components/courseDescription/CourseDescription';
import CourseContent from '../../components/courseContent/CourseContent';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
// This page will contain the introduction video
// course content and About the instructor
// and the comments section -- Future scope

const Course = () => {
  const navigate = useNavigate();
  const handleBuy = () => {
    navigate('/checkout');
    console.log('Buy this course');
  };
  return (
    <div className="mt-20">
      <h2 className="text-2xl text-left font-bold text-gray-900 mb-5">
        Introduction
      </h2>
      <Video />
      <div className="flex justify-start mt-10">
        <Button name="Buy This course" onClick={handleBuy}></Button>
      </div>

      <CourseDescription />
      <CourseContent />
      <CourseDescription />
    </div>
  );
};

export default Course;
