import React from 'react';

const Course = () => {
  return (
    <div className="container mx-auto mt-10 flex flex-col gap-4">
      <div>
        {/* this div will have the video and then followed by comment s */}
        <video class="w-full h-auto max-w-full" controls>
          <source src="../../../public/flowbit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div></div>
    </div>
  );
};

export default Course;
