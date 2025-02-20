import { useState } from 'react';
import WeekItem from './WeekItem';

const CourseContent = ({ weekContent = [] }) => {
  const [openWeek, setOpenWeek] = useState(null);

  const toggleWeek = (week) => {
    setOpenWeek(openWeek === week ? null : week);
  };

  return (
    <div className="text-left w-full mx-auto mt-8">
      {weekContent.map((item) => (
        <WeekItem
          key={item._id}
          item={item}
          isOpen={openWeek === item.weekNumber}
          toggleWeek={toggleWeek}
        />
      ))}
    </div>
  );
};

export default CourseContent;
