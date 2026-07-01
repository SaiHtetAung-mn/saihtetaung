import { useId, type SVGProps } from 'react'

type HaProxyIconProps = SVGProps<SVGSVGElement> & {
  size?: string | number
  title?: string
}

export function SiHaproxy({
  size = '1em',
  color = 'currentColor',
  title,
  style,
  ...props
}: HaProxyIconProps) {
  const maskId = useId()

  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color, ...style }}
      {...props}
    >
      {title && <title>{title}</title>}
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <circle cx="6.6" cy="14.4" r="1" fill="black" />
          <circle cx="10.8" cy="7.3" r="1" fill="black" />
          <circle cx="14.9" cy="14.4" r="1" fill="black" />
          <circle cx="19.1" cy="7.3" r="1" fill="black" />
        </mask>
      </defs>

      <g fill="currentColor" mask={`url(#${maskId})`}>
        <path
          d="M10.8 7.3h8.3m-12.5 7.1h8.3m-8.3 0L10.8 7.3m4.1 7.1L19.1 7.3"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <circle cx="6.6" cy="14.4" r="2.1" />
        <circle cx="10.8" cy="7.3" r="2.1" />
        <circle cx="14.9" cy="14.4" r="2.1" />
        <circle cx="19.1" cy="7.3" r="2.1" />
      </g>
    </svg>
  )
}
