export default function ProgressBar({ value = 0, color = 'bg-primary-600', height = 'h-2', className = '' }) {
  return (
    <div className={`w-full bg-gray-100 rounded-full ${height} overflow-hidden ${className}`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
