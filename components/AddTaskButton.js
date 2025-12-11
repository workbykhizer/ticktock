export default function AddTaskButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full border border-gray-300 py-2 rounded text-blue-600"
    >
      + Add new task
    </button>
  );
}
