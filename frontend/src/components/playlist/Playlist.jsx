import { useState } from 'react';

const Playlist = () => {
  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Video 1',
      description: 'This is the first video description.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
    },
    {
      id: '3JZ_D3ELwOQ',
      title: 'Video 2',
      description: 'This is the second video description.',
      thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg',
    },
    {
      id: 'L_jWHffIx5E',
      title: 'Video 3',
      description: 'This is the third video description.',
      thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/0.jpg',
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Video 1',
      description: 'This is the first video description.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
    },
    {
      id: '3JZ_D3ELwOQ',
      title: 'Video 2',
      description: 'This is the second video description.',
      thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg',
    },
    {
      id: 'L_jWHffIx5E',
      title: 'Video 3',
      description: 'This is the third video description.',
      thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/0.jpg',
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Video 1',
      description: 'This is the first video description.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
    },
    {
      id: '3JZ_D3ELwOQ',
      title: 'Video 2',
      description: 'This is the second video description.',
      thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg',
    },
    {
      id: 'L_jWHffIx5E',
      title: 'Video 4',
      description: 'This is the third video description.',
      thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/0.jpg',
    },
  ];

  const [currentVideo, setCurrentVideo] = useState(videos[0].id);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="w-full p-4 bg-orange-200 text-white rounded-lg shadow-lg h-auto max-h-96 overflow-y-auto no-scrollbar">
      <h2 className="text-lg text-red-500 font-semibold mb-2">Playlist</h2>
      <ul className="space-y-3">
        {videos.map((video, index) => (
          <li
            key={video.id}
            className="p-3 bg-gray-300 rounded-lg cursor-pointer hover:bg-red-400 transition-all"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            <div className="flex items-center gap-4">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-16 h-10 rounded-lg"
              />
              <div>
                <p className="font-medium">{video.title}</p>
              </div>
            </div>
            {expanded === index && (
              <p className="mt-2 text-sm text-gray-300">{video.description}</p>
            )}
          </li>
        ))}
      </ul>

      {/* {if width of screen decrease then take playlist to bottom
      } */}
    </div>
  );
};

export default Playlist;
