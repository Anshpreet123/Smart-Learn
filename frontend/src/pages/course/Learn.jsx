import React from 'react';
import Video from '../../components/video/Video';
import Playlist from '../../components/playlist/Playlist';

const Learn = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-10 mt-20">
      <div className="lg:w-9/12 w-full">
        <Video src="../../../assets/random.mp4" />
      </div>
      <div className="lg:w-3/6 w-full mt-10 lg:mt-0">
        <Playlist />
      </div>
    </div>
  );
};

export default Learn;
