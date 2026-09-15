export default function Avatar({ initials, color = 'bg-primary-600', size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  return (
    <div
      className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0 ${className}`}
    >
      {initials}
    </div>
  );
}
