import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();


  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(habit);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates?.includes(today);

  const handleSave = () => {
    updateHabit(habit.id, editData);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <input
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        />
      ) : (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">

          {/* LEFT SIDE */}
          <div>
            <h3
              className={`text-sm font-semibold ${isDoneToday ? "line-through text-gray-400" : "text-slate-800"
                }`}
            >
              {habit.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {getStreak(habit.completedDates)} day streak
            </p>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex gap-2">

            <button
              className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              onClick={() => deleteHabit(habit.id)}
            >
              Delete
            </button>

            <button
              className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>

            <button
              className={`px-2 py-1 text-xs rounded-md text-white transition ${isDoneToday
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 hover:bg-gray-500"
                }`}
              onClick={() => toggleHabit(habit.id)}
            >
              {isDoneToday ? "Done" : "Mark"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default HabitItem;