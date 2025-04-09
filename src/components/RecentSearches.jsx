import { Box, Text, Wrap, WrapItem, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { WiTime8 } from 'react-icons/wi';

const MotionBox = motion(Box);

export const RecentSearches = ({ searchHistory, onSearch }) => {
  const bgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.400');
  const textColor = useColorModeValue('gray.800', 'white');

  if (!searchHistory.length) return null;

  const handleSearch = (city) => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Call the onSearch function with the selected city
    onSearch(city);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      w="100%"
      maxW="600px"
      bg={bgColor}
      backdropFilter="blur(8px)"
      p={4}
      borderRadius="xl"
      boxShadow="sm"
      mt={4}
    >
      <Box mb={3} display="flex" alignItems="center">
        <Icon as={WiTime8} boxSize={5} color="gray.500" mr={2} />
        <Text color={textColor} fontWeight="medium">
          Recent Searches
        </Text>
      </Box>
      <Wrap spacing={2}>
        {searchHistory.map((item) => (
          <WrapItem key={item}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSearch(item)}
              borderRadius="full"
              color={textColor}
              borderColor={useColorModeValue('gray.300', 'whiteAlpha.300')}
              _hover={{
                bg: useColorModeValue('gray.100', 'whiteAlpha.200'),
              }}
            >
              {item}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </MotionBox>
  );
}; 