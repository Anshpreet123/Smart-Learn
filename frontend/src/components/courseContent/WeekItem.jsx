import { ChevronDown, ChevronUp } from 'lucide-react';
import LessonItem from './LessonItem';

const WeekItem = ({ item, isOpen, toggleWeek }) => {
  return (
    <div className="border border-gray-300 rounded-2xl mb-4 shadow-lg overflow-hidden w-full">
      {/* Week Header */}
      <button
        onClick={() => toggleWeek(item.weekNumber)}
        className="w-full flex items-left justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-all"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Week {item.weekNumber} : {item.title}
        </h2>
        {isOpen ? (
          <ChevronUp className="text-gray-600" />
        ) : (
          <ChevronDown className="text-gray-600" />
        )}
      </button>

      {/* Week Content */}
      {isOpen && (
        <div className="p-4 bg-white text-gray-700 animate-fadeIn">
          <p className="mb-4">{item.description}</p>

          {/* Learning Objectives */}
          <h3 className="font-semibold text-gray-900">Learning Objectives:</h3>
          <ul className="list-disc ml-5 mb-4">
            {item.learningObjectives.map((objective, idx) => (
              <li key={idx}>{objective}</li>
            ))}
          </ul>

          {/* Lessons */}
          <h3 className="font-semibold text-gray-900">Lessons:</h3>
          {item.lessons.map((lesson) => (
            <LessonItem
              className="item-left text-left"
              key={lesson._id}
              lesson={lesson}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeekItem;
