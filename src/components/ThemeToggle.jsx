import { IconButton, useColorMode, useColorModeValue, HStack, Text, Tooltip, Box } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHStack = motion(HStack);

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(0, 0, 0, 0.7)');
  const textColor = useColorModeValue('gray.800', 'white');
  const iconBg = useColorModeValue('blue.500', 'yellow.400');
  const iconColor = useColorModeValue('white', 'gray.800');
  
  const isDarkMode = colorMode === 'dark';
  const tooltipLabel = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  return (
    <Tooltip label={tooltipLabel} placement="bottom" hasArrow>
      <MotionHStack
        position="fixed"
        top={4}
        right={4}
        zIndex={10}
        bg={bgColor}
        backdropFilter="blur(12px)"
        borderRadius="full"
        boxShadow="lg"
        px={2}
        py={1.5}
        spacing={3}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        _hover={{
          boxShadow: "xl",
          transform: "translateY(-2px)",
        }}
        style={{
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onClick={toggleColorMode}
        cursor="pointer"
        role="button"
        aria-label={tooltipLabel}
      >
        <Text 
          fontSize="sm" 
          fontWeight="bold" 
          color={textColor}
          letterSpacing="tight"
          userSelect="none"
        >
          {isDarkMode ? 'Dark' : 'Light'}
        </Text>
        <MotionBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={iconBg}
          color={iconColor}
          borderRadius="full"
          w="28px"
          h="28px"
          initial={false}
          animate={{
            rotate: isDarkMode ? 225 : 0,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {isDarkMode ? <FaMoon size={14} style={{ transform: 'rotate(135deg)' }} /> : <FaSun size={14} />}
        </MotionBox>
      </MotionHStack>
    </Tooltip>
  );
}; 