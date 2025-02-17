import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CourseContent = () => {
  const [openWeek, setOpenWeek] = useState(null);

  const toggleWeek = (week) => {
    setOpenWeek(openWeek === week ? null : week);
  };

  const data = [
    { id: 1, week: 1, content: 'Introduction to React' },
    { id: 2, week: 2, content: 'Introduction to React Hooks' },
    { id: 3, week: 3, content: 'Introduction to React Router' },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {data.map((item) => (
        <div
          key={item.id}
          className="border border-gray-300 rounded-2xl mb-4 shadow-lg overflow-hidden"
        >
          <button
            onClick={() => toggleWeek(item.week)}
            className="w-full flex items-left justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Week {item.week}
            </h2>
            {openWeek === item.week ? (
              <ChevronUp className="text-gray-600" />
            ) : (
              <ChevronDown className="text-gray-600" />
            )}
          </button>

          {openWeek === item.week && (
            <div className="p-4 bg-white text-left text-gray-700 animate-fadeIn">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
