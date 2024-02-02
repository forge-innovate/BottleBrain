const ProgressBar = ({ value }) => {
  if (value === undefined || value === null) {
    // If value is not present, don't render the progress bar
    return null;
  }

  // Define color classes based on the value range
  const getColorClass = () => {
    if (value >= 0 && value <= 3) {
      return "bg-red-500";
    } else if (value > 3 && value <= 6) {
      return "bg-yellow-500";
    } else if (value > 6 && value <= 10) {
      return "bg-green-500";
    }
    return ""; // Default color class
  };

  return (
    <div className="w-full bg-gray-200 h-8 rounded-full overflow-hidden relative">
      <div
        className={`h-full ${getColorClass()} transition-all ease-in-out`}
        style={{ width: `${(value / 10) * 100}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-black">
        {(value * 10).toFixed(2)}%{" "}
        {/* Show the percentage to 2 decimal places */}
      </div>
    </div>
  );
};

export default ProgressBar;
