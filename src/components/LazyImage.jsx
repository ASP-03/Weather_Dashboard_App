import { useState, useEffect } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';

export const LazyImage = ({ src, alt, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false);
      setIsError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (isLoading) {
    return (
      <Skeleton
        height="100%"
        width="100%"
        {...props}
      />
    );
  }

  if (isError) {
    return (
      <Box
        height="100%"
        width="100%"
        bg="gray.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        Failed to load image
      </Box>
    );
  }

  return (
    <Box
      as="img"
      src={src}
      alt={alt}
      {...props}
    />
  );
}; 