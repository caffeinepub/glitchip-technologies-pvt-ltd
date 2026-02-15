import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackClassName?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  className = '', 
  fallbackClassName = '',
  ...props 
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    // Render a gradient placeholder that maintains layout
    return (
      <div 
        className={`bg-gradient-to-br from-muted via-muted/80 to-muted/60 ${fallbackClassName || className}`}
        role="img"
        aria-label={alt || 'Image placeholder'}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
