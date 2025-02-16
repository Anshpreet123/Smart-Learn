import React from 'react';

const Video = () => {
  return (
    <video className="w-full h-auto max-w-full" controls>
      <source src="../../../public/flowbit.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
