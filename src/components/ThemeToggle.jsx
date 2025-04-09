import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionIconButton = motion(IconButton);

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.400');
  const iconColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.200');

  return (
    <MotionIconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      position="fixed"
      top={4}
      right={4}
      zIndex={10}
      borderRadius="full"
      bg={bgColor}
      color={iconColor}
      backdropFilter="blur(8px)"
      boxShadow="sm"
      _hover={{
        bg: hoverBg,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}; 