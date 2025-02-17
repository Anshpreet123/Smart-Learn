import React from 'react';
import Playlist from '../../components/playlist/Playlist';
import Video from '../../components/video/Video';
import CourseDescription from '../../components/courseDescription/CourseDescription';
import CourseContent from '../../components/courseContent/CourseContent';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// This page will contain the introduction video
// course content and About the instructor
// and the comments section -- Future scope

const Course = () => {
  const navigate = useNavigate();
  const handleBuy = () => {
    navigate('/checkout');
    console.log('Buy this course');
  };
  const base = 'http://localhost:5000';
  const { courseId } = useParams();
  console.log(courseId);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${base}/api/v1/courses/${courseId}`);
      setData(response.data);
      console.log('response', response.data.weeklyContent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courseId]);

  if (!data) {
    return <div>Loading...</div>;
  }
  const src = '../../../assets/random.mp4';

  return (
    <div className="mt-20">
      <h2 className="text-2xl text-left font-bold text-gray-900 mb-5">
        Introduction
      </h2>
      <Video src={src} />
      <div className="flex justify-start mt-10">
        <Button name="Buy This course" onClick={handleBuy}></Button>
      </div>
      <CourseDescription description={data.description} />
      <h2 className="text-2xl text-left font-bold text-gray-900 mb-5">
        Course Content
      </h2>
      <CourseContent weekContent={data.weeklyContent || []} />
      <CourseDescription description={data.description} />
    </div>
  );
};

export default Course;
