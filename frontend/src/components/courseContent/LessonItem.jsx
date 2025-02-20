const LessonItem = ({ lesson }) => {
  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold">{lesson.title}</h4>
      <p className="text-sm mb-2">{lesson.description}</p>

      {/* Videos */}
      {lesson.videos.length > 0 && (
        <>
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
        </>
      )}

      {/* Resources */}
      {lesson.resources.length > 0 && (
        <>
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
        </>
      )}

      {/* Assignment */}
      {lesson.assignment && (
        <>
          <h5 className="font-semibold mt-2">Assignment:</h5>
          <p>{lesson.assignment.description}</p>
          <p className="text-sm text-gray-600">
            Due Date: {new Date(lesson.assignment.dueDate).toDateString()} |
            Points: {lesson.assignment.totalPoints}
          </p>
        </>
      )}
    </div>
  );
};

export default LessonItem;
