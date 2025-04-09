import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const WeatherBackground = ({ weather }) => {
  const getBackgroundGradient = (weatherType) => {
    const gradients = {
      Clear: 'linear(to-b, blue.400, blue.200)',
      Clouds: 'linear(to-b, gray.400, gray.200)',
      Rain: 'linear(to-b, gray.600, blue.400)',
      Snow: 'linear(to-b, gray.100, blue.50)',
      Thunderstorm: 'linear(to-b, gray.700, purple.600)',
      default: 'linear(to-b, blue.400, blue.200)'
    };
    return gradients[weatherType] || gradients.default;
  };

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      bgGradient={getBackgroundGradient(weather?.weather?.[0]?.main)}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNMjggNjZMMCA1MEwyOCAzNEw1NiA1MEwyOCA2NloiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPgo8L3N2Zz4=')"
        opacity={0.1}
        animation="float 20s linear infinite"
      />
    </MotionBox>
  );
}; 