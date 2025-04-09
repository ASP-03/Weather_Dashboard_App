import { Box, Text, HStack, Image, useColorModeValue, VStack, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const capitalizeFirstLetter = (string) => {
  return string.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const ForecastDay = ({ data }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const date = new Date(data.dt * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <VStack
      spacing={2}
      p={4}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      boxShadow="sm"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
      }}
      transition="all 0.2s"
    >
      <Text fontWeight="bold" color={textColor}>
        {day}
      </Text>
      <Image
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
        width="50px"
        height="50px"
      />
      <Text fontSize="lg" fontWeight="bold">
        {Math.round(data.main.temp)}°C
      </Text>
      <Text fontSize="sm" color={textColor} textAlign="center">
        {capitalizeFirstLetter(data.weather[0].description)}
      </Text>
    </VStack>
  );
};

export const ForecastCard = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Get one forecast per day (at noon)
  const dailyForecasts = [];
  const processedDates = new Set();

  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toDateString();

    if (!processedDates.has(dateString) && date.getTime() > new Date().getTime()) {
      processedDates.add(dateString);
      dailyForecasts.push(item);
    }
  });

  // Take only the next 5 days
  const nextFiveDays = dailyForecasts.slice(0, 5);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        w="100%"
        maxW="800px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          mb={6}
          color="white"
          textShadow="0 2px 4px rgba(0,0,0,0.2)"
          w="100%"
          textAlign="left"
        >
          5-Day Forecast
        </Text>
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(5, 1fr)',
          }}
          gap={4}
          w="100%"
        >
          {nextFiveDays.map((day) => (
            <ForecastDay key={day.dt} data={day} />
          ))}
        </Grid>
      </Box>
    </MotionBox>
  );
}; 