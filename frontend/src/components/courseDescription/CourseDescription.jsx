import React from 'react';

const CourseDescription = ({ description }) => {
  return (
    <div className="container mt-6 border-gray-300 text-left">
      <h2 className="text-2xl font-bold text-gray-900 mb-5">
        Course Description
      </h2>
      <p>
        {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque corporis
        assumenda consequuntur quia dolorum tempora quam quos odit accusamus
        optio, minima voluptatibus eaque cumque inventore aspernatur nostrum
        natus quisquam illo? Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Neque corporis assumenda consequuntur quia dolorum tempora quam
        quos odit accusamus optio, minima voluptatibus eaque cumque inventore
        aspernatur nostrum natus quisquam illo? Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Neque corporis assumenda consequuntur quia
        dolorum tempora quam quos odit accusamus optio, minima voluptatibus
        eaque cumque inventore aspernatur nostrum natus quisquam illo? */}
        {description}
      </p>
    </div>
  );
};

export default CourseDescription;
