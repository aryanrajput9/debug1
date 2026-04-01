import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();

  const { register, handleSubmit, reset } = useForm();

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completed: false,
    };

    addHabit(payload);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onCommit)}
      className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4"
    >
      <h2 className="text-lg font-bold text-slate-800">Add New Habit</h2>

      {/* Habit Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-600 font-medium">
          Habit Name
        </label>
        <input
          {...register("name", { required: true })}
          placeholder="e.g. Drink Water"
          className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Goal Value */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-600 font-medium">
          Goal Value
        </label>
        <input
          type="number"
          {...register("goalValue", { valueAsNumber: true })}
          placeholder="e.g. 5"
          className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm font-medium transition"
      >
        Create Habit
      </button>
    </form>
  );
};

export default HabitForm;