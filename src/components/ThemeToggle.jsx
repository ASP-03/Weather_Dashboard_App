// This is our theme toggle component - it lets users switch between light and dark modes.
// We've made it pretty fancy with smooth animations and a nice hover effect.
// It's also responsive, showing just an icon on mobile and text + icon on larger screens.
import { IconButton, useColorMode, useColorModeValue, HStack, Text, Tooltip, Box, useBreakpointValue } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Wrap our components with motion for smooth animations
const MotionBox = motion(Box);
const MotionHStack = motion(HStack);

export const ThemeToggle = () => {
  // Get the current color mode and the function to toggle it
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Set up our color scheme based on the current mode
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(0, 0, 0, 0.7)');
  const textColor = useColorModeValue('gray.800', 'white');
  const iconBg = useColorModeValue('blue.500', 'yellow.400');
  const iconColor = useColorModeValue('white', 'gray.800');
  
  // Figure out if we're in dark mode and set up the tooltip text
  const isDarkMode = colorMode === 'dark';
  const tooltipLabel = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  
  // Make our component responsive - adjust sizes based on screen width
  const showText = useBreakpointValue({ base: false, sm: true });
  const buttonSize = useBreakpointValue({ base: "24px", sm: "28px" });
  const iconSize = useBreakpointValue({ base: 12, sm: 14 });
  const spacing = useBreakpointValue({ base: 2, sm: 3 });
  const padding = useBreakpointValue({ 
    base: { px: 1.5, py: 1 },
    sm: { px: 2, py: 1.5 }
  });

  // Render our beautiful theme toggle button
  return (
    <Tooltip label={tooltipLabel} placement="bottom" hasArrow>
      <MotionHStack
        position="absolute"
        top={2}
        right={2}
        zIndex={10}
        bg={bgColor}
        backdropFilter="blur(12px)"
        borderRadius="full"
        boxShadow="lg"
        px={padding?.px}
        py={padding?.py}
        spacing={spacing}
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
        {/* Show the mode text on larger screens */}
        {showText && (
          <Text 
            fontSize="sm" 
            fontWeight="bold" 
            color={textColor}
            letterSpacing="tight"
            userSelect="none"
          >
            {isDarkMode ? 'Dark' : 'Light'}
          </Text>
        )}
        {/* The icon container with rotation animation */}
        <MotionBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={iconBg}
          color={iconColor}
          borderRadius="full"
          w={buttonSize}
          h={buttonSize}
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
          {/* Show sun or moon icon based on current mode */}
          {isDarkMode ? <FaMoon size={iconSize} style={{ transform: 'rotate(135deg)' }} /> : <FaSun size={iconSize} />}
        </MotionBox>
      </MotionHStack>
    </Tooltip>
  );
}; 