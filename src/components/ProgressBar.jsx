export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
