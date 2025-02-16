import React from 'react';
import Playlist from '../../components/playlist/Playlist';

const Course = () => {
  return (
    <div className="container mx-auto px-4 flex flex-row justify-between mt-10">
      <div className="w-1/2 p-10">
        {/* this div will have the video and then followed by comment s */}
        <video className="w-full h-auto max-w-full" controls>
          <source src="../../../public/flowbit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* here the video description will be there and followed by comment section */}
      </div>
      <div className="w-1/2 p-10">
        {/* <video class="w-full h-auto max-w-full" controls>
          <source src="../../../public/flowbit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        {/* Here video playlist section is there  */}
        <Playlist />
      </div>
    </div>
  );
};

export default Course;
