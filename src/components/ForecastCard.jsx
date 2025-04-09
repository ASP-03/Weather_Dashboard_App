// This component shows the 5-day weather forecast in a nice grid layout.
// Each day gets its own card with temperature, weather icon, and description.
// We're using Framer Motion for smooth animations when the forecast loads.
import { Box, Text, HStack, Image, useColorModeValue, VStack, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Wrap Box with motion for smooth animations
const MotionBox = motion(Box);

// Helper function to make weather descriptions look nice
// (e.g., "scattered clouds" becomes "Scattered Clouds")
const capitalizeFirstLetter = (string) => {
  return string.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

// A component for displaying a single day's forecast
// Shows the day name, weather icon, temperature, and description
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

// The main ForecastCard component that displays the 5-day forecast
export const ForecastCard = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Process the forecast data to get one forecast per day
  // We want to show forecasts for noon each day for consistency
  const dailyForecasts = [];
  const processedDates = new Set();

  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toDateString();

    // Only add one forecast per day, and make sure it's in the future
    if (!processedDates.has(dateString) && date.getTime() > new Date().getTime()) {
      processedDates.add(dateString);
      dailyForecasts.push(item);
    }
  });

  // Take only the next 5 days of forecasts
  const nextFiveDays = dailyForecasts.slice(0, 5);

  // Render the forecast grid with smooth animations
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
        {/* Forecast header */}
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
        {/* Responsive grid of forecast cards */}
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',  // 2 columns on mobile
            sm: 'repeat(3, 1fr)',    // 3 columns on small screens
            md: 'repeat(5, 1fr)',    // 5 columns on medium and up
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