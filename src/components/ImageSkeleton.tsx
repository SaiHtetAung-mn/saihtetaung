import type { CSSProperties } from 'react'

export default function ImageSkeleton({
  className = '',
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-black/10 dark:bg-white/10 ${className}`}
      style={{ minHeight: '100px', ...style }}
    >
      <div className="h-2/3 w-2/3 rounded-full bg-black/10 dark:bg-white/10" />
    </div>
  );
}
