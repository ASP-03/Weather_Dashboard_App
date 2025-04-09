// This is our search bar component - it's where users can type in any city
// to get its weather information. Pretty straightforward but super useful!
import { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

// The SearchBar component takes an onSearch prop that gets called
// whenever the user submits a city name
export const SearchBar = ({ onSearch }) => {
  // Keep track of what the user is typing
  const [city, setCity] = useState('');
  
  // Handle form submission - make sure we don't search for empty strings!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity(''); // Clear the input after searching
    }
  };

  // Set up our color scheme based on light/dark mode
  // This makes our search bar look great in both themes
  const inputBg = useColorModeValue('whiteAlpha.900', 'rgba(0, 0, 0, 0.7)');
  const inputColor = useColorModeValue('gray.800', 'white');
  const placeholderColor = useColorModeValue('gray.500', 'whiteAlpha.700');
  const iconColor = useColorModeValue('gray.500', 'whiteAlpha.700');

  // Render our beautiful search interface
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <HStack spacing={4}>
        {/* Input group with search icon */}
        <InputGroup size="lg">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color={iconColor} />}
          />
          {/* The main input field with all our styling */}
          <Input
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            bg={inputBg}
            color={inputColor}
            borderWidth="1px"
            borderColor={useColorModeValue('gray.300', 'whiteAlpha.300')}
            _placeholder={{ color: placeholderColor }}
            _hover={{
              borderColor: useColorModeValue('gray.400', 'whiteAlpha.400'),
            }}
            _focus={{
              borderColor: useColorModeValue('blue.500', 'blue.300'),
              boxShadow: useColorModeValue(
                '0 0 0 1px rgba(66, 153, 225, 0.6)',
                '0 0 0 1px rgba(66, 153, 225, 0.4)'
              ),
            }}
            backdropFilter="blur(8px)"
          />
        </InputGroup>
        {/* Search button that triggers the weather lookup */}
        <Button
          colorScheme="blue"
          size="lg"
          type="submit"
          px={8}
          borderRadius="md"
        >
          Search
        </Button>
      </HStack>
    </form>
  );
}; 