export const SiHaproxy = ({ size = '1em', color = 'rgb(255, 59, 92)', title, ...props }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://w3.org"
      style={{ color: color }}
      {...props}
    >
      {title && <title>{title}</title>}
      <g fill="currentColor">
        {/* Connection Bars */}
        <path d="M10.8 7.3h8.3m-12.5 7.1h8.3m-8.3 0L10.8 7.3m4.1 7.1L19.1 7.3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
        
        {/* Nodes - Outer Rings */}
        <circle cx="6.6" cy="14.4" r="2.1" />
        <circle cx="10.8" cy="7.3" r="2.1" />
        <circle cx="14.9" cy="14.4" r="2.1" />
        <circle cx="19.1" cy="7.3" r="2.1" />
        
        {/* Nodes - Inner Cutouts */}
        <circle cx="6.6" cy="14.4" r="1.0" fill="context-fill" stroke="transparent" style={{ mixBlendMode: 'xor' }} />
        <circle cx="10.8" cy="7.3" r="1.0" fill="context-fill" stroke="transparent" style={{ mixBlendMode: 'xor' }} />
        <circle cx="14.9" cy="14.4" r="1.0" fill="context-fill" stroke="transparent" style={{ mixBlendMode: 'xor' }} />
        <circle cx="19.1" cy="7.3" r="1.0" fill="context-fill" stroke="transparent" style={{ mixBlendMode: 'xor' }} />
      </g>
    </svg>
  );
};