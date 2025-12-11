"use client";
import { useState } from "react";

export default function AddTaskModal({ open, onClose, onSuccess, selectedDate, timesheetId }) {
  // Hooks must be called at top level
  const [project, setProject] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(1);
  const [error, setError] = useState("");

  if (!open) return null; // conditional rendering is fine here

  const addTask = async () => {
    if (!project || !typeOfWork || !description || !hours) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch(`/api/timesheets/${timesheetId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          project,
          workType: typeOfWork,
          description,
          hours,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      onSuccess(data.task);
      onClose();
    } catch (err) {
      setError("Failed to add task. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Entry</h2>
          <button onClick={onClose} className="text-gray-600 text-2xl">&times;</button>
        </div>

        <div className="space-y-4">
          {/* Project */}
          <div>
            <label className="block font-medium mb-1">Select Project *</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Project A">Project A</option>
              <option value="Project B">Project B</option>
            </select>
          </div>

          {/* Type of Work */}
          <div>
            <label className="block font-medium mb-1">Type of Work *</label>
            <select
              value={typeOfWork}
              onChange={(e) => setTypeOfWork(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Bug Fixes">Bug Fixes</option>
              <option value="Development">Development</option>
              <option value="Review">Review</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Task Description *</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              placeholder="Write text here..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Hours */}
          <div>
            <label className="block font-medium mb-1">Hours *</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHours(Math.max(1, hours - 1))}
                className="px-3 py-2 border rounded"
              >
                -
              </button>
              <span className="text-lg font-semibold">{hours}</span>
              <button
                onClick={() => setHours(hours + 1)}
                className="px-3 py-2 border rounded"
              >
                +
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 mt-6">
            <button
              onClick={addTask}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Add entry
            </button>
            <button
              onClick={onClose}
              className="border px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
