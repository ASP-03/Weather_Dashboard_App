import { Box, Text, VStack, HStack, Image, useColorModeValue, Icon, Flex, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { WiHumidity, WiStrongWind, WiThermometer, WiBarometer } from 'react-icons/wi';
import { RepeatIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);

const WeatherStat = ({ icon, label, value, unit }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  return (
    <VStack spacing={1} align="center" flex="1">
      <Icon as={icon} boxSize="24px" color={textColor} />
      <Text fontSize="sm" color={textColor}>{label}</Text>
      <Text fontWeight="bold" fontSize="lg">
        {value}{unit}
      </Text>
    </VStack>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const WeatherCard = ({ weather, onRefresh }) => {
  if (!weather) return null;

  const bgColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      w="100%"
      display="flex"
      justifyContent="center"
    >
      <Box
        bg={cardBg}
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        boxShadow="xl"
        overflow="visible"
        position="relative"
        w="100%"
        maxW="600px"
      >
        {/* Refresh Button */}
        <IconButton
          icon={<RepeatIcon boxSize={4} />}
          position="absolute"
          top={2}
          right={2}
          borderRadius="full"
          size="md"
          aria-label="Refresh weather"
          onClick={onRefresh}
          bg="white"
          color="blue.500"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          _hover={{
            bg: 'white',
            transform: 'rotate(180deg)',
            color: 'blue.600',
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)'
          }}
          _active={{
            bg: 'blue.50',
            transform: 'rotate(180deg) scale(0.95)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          zIndex={3}
          width="36px"
          height="36px"
          minW="36px"
        />

        {/* Main Weather Info */}
        <Box p={6} position="relative">
          <VStack spacing={4} align="stretch" w="100%">
            <Flex justify="space-between" align="center">
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                  {weather.name}, {weather.sys.country}
                </Text>
                <Text fontSize="lg" color={textColor} opacity={0.8}>
                  {capitalizeFirstLetter(weather.weather[0].description)}
                </Text>
              </VStack>
              <Box position="relative" w="80px" h="80px">
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </Box>
            </Flex>

            <Text fontSize="6xl" fontWeight="bold" color={textColor}>
              {Math.round(weather.main.temp)}°C
            </Text>

            {/* Weather Stats */}
            <Box
              mt={6}
              p={4}
              bg={useColorModeValue('gray.50', 'gray.700')}
              borderRadius="lg"
            >
              <HStack spacing={4} justify="space-between">
                <WeatherStat
                  icon={WiThermometer}
                  label="Feels Like"
                  value={Math.round(weather.main.feels_like)}
                  unit="°C"
                />
                <WeatherStat
                  icon={WiHumidity}
                  label="Humidity"
                  value={weather.main.humidity}
                  unit="%"
                />
                <WeatherStat
                  icon={WiStrongWind}
                  label="Wind"
                  value={Math.round(weather.wind.speed * 3.6)}
                  unit=" km/h"
                />
                <WeatherStat
                  icon={WiBarometer}
                  label="Pressure"
                  value={weather.main.pressure}
                  unit=" hPa"
                />
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Box>
    </MotionBox>
  );
}; 