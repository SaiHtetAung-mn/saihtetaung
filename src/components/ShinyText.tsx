import type { CSSProperties } from 'react'

type ShinyTextProps = {
  text: string
  className?: string
  speed?: number
}

export default function ShinyText({ text, className = '', speed = 4 }: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${className}`}
      data-text={text}
      style={{ '--shine-duration': `${speed}s` } as CSSProperties}
    >
      {text}
    </span>
  )
}
