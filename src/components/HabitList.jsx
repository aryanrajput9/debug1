import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll, setShowAll } = useHabit();



  const topCategory =
    habits.reduce((acc, h) => {
      acc[h.category] = (acc[h.category] || 0) + 1;
      return acc;
    }, {});

  const mainFocus =
    Object.keys(topCategory).length > 0
      ? Object.keys(topCategory).reduce((a, b) =>
        topCategory[a] > topCategory[b] ? a : b
      )
      : null;

  if (habits.length === 0) {
    return null;
  }

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <div className="max-w-md mx-auto mt-6 px-4 pb-20">
      <div className="space-y-3">
        {visibleHabits.map((habit, index) => (
          <HabitItem key={index} habit={habit} />
        ))}
      </div>
      {habits.length > 3 && (
        <button
          className="mt-4 text-sm text-indigo-600 font-medium"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      )}
    </div>
  );
};

export default HabitList;