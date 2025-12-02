import React, { useState } from 'react';
import ImageSkeleton from './ImageSkeleton';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export default function ImageWithSkeleton({ src, alt, className = '', style, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {/* @ts-ignore */}
      {!loaded && <ImageSkeleton className={className} style={style} />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? '' : 'hidden'}`}
        style={style}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </>
  );
}
