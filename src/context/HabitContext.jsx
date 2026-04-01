import { createContext, useContext, useState } from "react";

const HabitContext = createContext();

const getToday = () => new Date().toISOString().split("T")[0];

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today),
  ).length;
  const categoryCount = habits.reduce((acc, h) => {
    const category = h.category || "other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const topCategory =
    Object.keys(categoryCount).length > 0
      ? Object.keys(categoryCount).reduce((a, b) =>
        categoryCount[a] > categoryCount[b] ? a : b
      )
      : null;
  const progressPercent =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  const addHabit = (habit) => {
    const newHabit = {
      id: Date.now(),
      completedDates: [],
      ...habit,
    };

    setHabits((prev) => [...prev, newHabit]);
  };

  const toggleHabit = (id) => {
    const today = getToday();

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const alreadyDone = h.completedDates.includes(today);

        return {
          ...h,
          completedDates: alreadyDone
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      }),
    );
  };

  const getStreak = (completedDates) => {
    let streak = 0;
    let currentDate = new Date();

    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];

      if (completedDates.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }


    return streak;
  };
  const bestStreak = habits.reduce((max, h) => {
    const streak = getStreak(h.completedDates);
    return streak > max ? streak : max;
  }, 0);

  const updateHabit = (id, data) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...data } : h)));
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        toggleHabit,
        updateHabit,
        deleteHabit,
        getStreak,
        showAll,
        setShowAll,
        progressPercent,
        topCategory,
        bestStreak
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => useContext(HabitContext);