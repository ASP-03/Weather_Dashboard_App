import { useState } from 'react';
import {
  Input,
  Button,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  Box,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SearchIcon } from '@chakra-ui/icons';
import { WiTime8 } from 'react-icons/wi';

const MotionBox = motion(Box);

export const SearchBar = ({ onSearch, searchHistory }) => {
  const [city, setCity] = useState('');
  const bgColor = useColorModeValue('white', 'gray.800');
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
    <VStack spacing={6} w="100%" align="center">
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

      {searchHistory.length > 0 && (
        <MotionBox
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          w="100%"
          bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.400')}
          backdropFilter="blur(8px)"
          p={4}
          borderRadius="xl"
          boxShadow="sm"
        >
          <HStack spacing={2} mb={3}>
            <Icon as={WiTime8} boxSize={5} color="gray.500" />
            <Text color={textColor} fontWeight="medium">
              Recent Searches
            </Text>
          </HStack>
          <Wrap spacing={2}>
            {searchHistory.map((item) => (
              <WrapItem key={item}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSearch(item)}
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
      )}
    </VStack>
  );
}; 