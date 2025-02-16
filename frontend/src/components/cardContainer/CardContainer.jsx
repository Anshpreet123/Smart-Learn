import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import axios from 'axios';

const CardContainer = () => {
  const [courses, setCourses] = useState([]);
  const base = 'http://localhost:5000';
  const handleCourses = async () => {
    try {
      const response = await axios.get(`${base}/api/v1/courses/`);
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCourses();
  }, []);

  return (
    <div className="container flex-row gap-4 mx-auto mt-10 md:grid md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CardContainer;
