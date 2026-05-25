import React, { useState } from 'react';
import type { StaticImageData } from 'next/image';
import ImageSkeleton from './ImageSkeleton';

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | StaticImageData;
}

export default function ImageWithSkeleton({ src, alt, className = '', style, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imageSrc = typeof src === 'string' ? src : src.src;

  return (
    <>
      {!loaded && <ImageSkeleton className={className} style={style} />}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${loaded ? '' : 'hidden'}`}
        style={style}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </>
  );
}
