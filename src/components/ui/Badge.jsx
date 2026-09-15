export default function Badge({ children, color = 'bg-gray-100 text-gray-700', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ${className}`}>
      {children}
    </span>
  );
}
