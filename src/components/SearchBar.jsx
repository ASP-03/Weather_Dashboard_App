import { useState } from 'react';
import {
  Input,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const textColor = useColorModeValue('gray.800', 'white');
  const buttonBg = useColorModeValue('blue.500', 'blue.400');
  const inputBg = useColorModeValue('whiteAlpha.900', 'whiteAlpha.100');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <VStack spacing={4} w="100%" align="center">
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <HStack w="100%" spacing={2}>
          <InputGroup size="lg" flex={1}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              bg={inputBg}
              color={textColor}
              borderRadius="full"
              fontSize="lg"
              _placeholder={{ color: 'gray.400' }}
              _hover={{ bg: useColorModeValue('gray.50', 'whiteAlpha.200') }}
              _focus={{
                bg: useColorModeValue('white', 'whiteAlpha.300'),
                borderColor: 'blue.400',
              }}
            />
          </InputGroup>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            px={8}
            borderRadius="full"
            bg={buttonBg}
            _hover={{ bg: useColorModeValue('blue.600', 'blue.500') }}
          >
            Search
          </Button>
        </HStack>
      </form>
    </VStack>
  );
}; 