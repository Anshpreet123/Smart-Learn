import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CourseContent = ({ weekContent = [] }) => {
  const [openWeek, setOpenWeek] = useState(null);

  const toggleWeek = (week) => {
    setOpenWeek(openWeek === week ? null : week);
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-8">
      {weekContent.map((item) => (
        <div
          key={item._id}
          className="border border-gray-300 rounded-2xl mb-4 shadow-lg overflow-hidden"
        >
          {/* Week Header */}
          <button
            onClick={() => toggleWeek(item.weekNumber)}
            className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Week {item.weekNumber}: {item.title}
            </h2>
            {openWeek === item.weekNumber ? (
              <ChevronUp className="text-gray-600" />
            ) : (
              <ChevronDown className="text-gray-600" />
            )}
          </button>

          {/* Week Content */}
          {openWeek === item.weekNumber && (
            <div className="p-4 bg-white text-gray-700 animate-fadeIn">
              <p className="mb-4">{item.description}</p>

              {/* Learning Objectives */}
              <h3 className="font-semibold text-gray-900">
                Learning Objectives:
              </h3>
              <ul className="list-disc ml-5 mb-4">
                {item.learningObjectives.map((objective, idx) => (
                  <li key={idx}>{objective}</li>
                ))}
              </ul>

              {/* Lessons */}
              <h3 className="font-semibold text-gray-900">Lessons:</h3>
              {item.lessons.map((lesson) => (
                <div key={lesson._id} className="mt-4">
                  <h4 className="text-lg font-semibold">{lesson.title}</h4>
                  <p className="text-sm mb-2">{lesson.description}</p>

                  {/* Videos */}
                  <h5 className="font-semibold mt-2">Videos:</h5>
                  {lesson.videos.map((video) => (
                    <div key={video._id} className="mt-2">
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {video.title} ({video.duration} min)
                      </a>
                    </div>
                  ))}

                  {/* Resources */}
                  <h5 className="font-semibold mt-2">Resources:</h5>
                  {lesson.resources.map((resource) => (
                    <div key={resource._id} className="mt-2">
                      <a
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {resource.title}
                      </a>
                    </div>
                  ))}

                  {/* Assignment */}
                  <h5 className="font-semibold mt-2">Assignment:</h5>
                  <p>{lesson.assignment.description}</p>
                  <p className="text-sm text-gray-600">
                    Due Date:{' '}
                    {new Date(lesson.assignment.dueDate).toDateString()} |
                    Points: {lesson.assignment.totalPoints}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
