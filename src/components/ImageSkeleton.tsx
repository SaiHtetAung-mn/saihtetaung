export default function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-full flex items-center justify-center ${className}`}
      style={{ minHeight: '100px' }}
    >
      <div className="w-2/3 h-2/3 bg-gray-300 dark:bg-gray-600 rounded-full" />
    </div>
  );
}
