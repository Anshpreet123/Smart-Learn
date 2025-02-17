import React from 'react';

const Video = (props) => {
  const videoSrc = props.src;

  return (
    <video className="w-full h-auto max-w-full" controls>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
