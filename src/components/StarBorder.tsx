import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  innerClassName = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative overflow-hidden ${className || 'inline-block rounded-[20px]'}`}
      {...(rest as any)}
      style={{
        padding: thickness,
        ...(rest as any).style
      }}
    >
      <div
        className="pointer-events-none absolute bottom-[-11px] right-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70 animate-star-movement-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="pointer-events-none absolute left-[-250%] top-[-10px] z-0 h-[50%] w-[300%] rounded-full opacity-70 animate-star-movement-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className={`relative z-[1] rounded-[20px] ${innerClassName || 'bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px]'}`}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
