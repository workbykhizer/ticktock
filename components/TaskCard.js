export default function TaskCard({ task, onEdit }) {
  return (
    <div className="bg-white p-3 border rounded mb-2 flex justify-between items-center">
      <span>{task.name}</span>
      <div className="flex items-center gap-4">
        <span className="text-gray-500">{task.hours} hrs</span>
        <span className="text-sm text-gray-500">{task.project}</span>
        <button onClick={onEdit} className="text-blue-600">...</button>
      </div>
    </div>
  );
}
