export default function QuestionOption({ option, index, selected, correct, isAnswered, onClick }) {
  const getStyles = () => {
    if (!isAnswered) {
      return selected === index
        ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-600'
        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50';
    }
    if (index === correct) return 'border-green-500 bg-green-50';
    if (index === selected && index !== correct) return 'border-red-500 bg-red-50';
    return 'border-gray-200 opacity-50';
  };

  return (
    <button onClick={() => !isAnswered && onClick(index)}
      disabled={isAnswered}
      className={`w-full p-4 text-left border-2 rounded-xl transition-all ${getStyles()}`}>
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium flex-shrink-0">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="text-gray-800">{option}</span>
        {isAnswered && index === correct && <span className="ml-auto text-green-600">✓</span>}
        {isAnswered && index === selected && index !== correct && <span className="ml-auto text-red-600">✗</span>}
      </div>
    </button>
  );
}
