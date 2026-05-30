import React, { useEffect, useRef, useState } from 'react';
import type { StaticImageData } from 'next/image';
import ImageSkeleton from '@/components/ImageSkeleton';

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | StaticImageData;
}

export default function ImageWithSkeleton({ src, alt, className = '', style, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null)
  const imageSrc = typeof src === 'string' ? src : src.src;

  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoaded(true)
    }
  }, [imageSrc])

  return (
    <>
      {!loaded && <ImageSkeleton className={className} style={style} />}
      <img
        ref={imageRef}
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
