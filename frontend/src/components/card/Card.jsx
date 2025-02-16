import React from 'react';
import { useNavigate } from 'react-router-dom';
const Card = ({ course }) => {
  const navigate = useNavigate();
  const courseId = course._id;
  const handleClick = () => {
    navigate(`/course/${courseId}`);
  };
  return (
    <div
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-orange-200 dark:border-orange-100"
    >
      <a href="#">
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-orange-500">
            {course.title}
          </h5>
        </a>
        {/* img tag to show the thumbnail */}
        <img
          className="w-full h-auto rounded-lg"
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <p className="mb-3 font-normal text-gray-700 dark:text-white-400">
          {course.description}
        </p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Explore
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Card;
