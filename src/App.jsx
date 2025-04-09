// Hey there! This is our main App component that brings together all the weather magic.
// We're using Chakra UI for our beautiful interface and some custom hooks for weather data.
import { useState, useEffect } from 'react'
import {
  ChakraProvider,
  VStack,
  Container,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Box,
  extendTheme,
  HStack,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { ForecastCard } from './components/ForecastCard'
import { RecentSearches } from './components/RecentSearches'
import { ThemeToggle } from './components/ThemeToggle'
import { useWeather } from './hooks/useWeather'
import { BACKGROUND_STYLES } from './config/weatherConfig'

// Let's set up our theme - we want it to start in light mode by default
// but users can toggle between light and dark as they prefer
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

// This sneaky little component preloads our background images
// so they're ready to go when we need them - no more waiting for images to load!
const ImagePreloader = () => {
  const imagesToPreload = [
    "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?auto=format&fit=crop&w=1200&q=60", // Clear sky day
    "https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=1200&q=60", // Clear sky night
    "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1594156596782-656c93e4d504?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1200&q=80"
  ]

  useEffect(() => {
    imagesToPreload.forEach(url => {
      const img = new Image()
      img.src = url
    })
  }, [])

  return null
}

// The main App component - this is where all the weather magic happens!
function App() {
  // Get all our weather data and functions from our custom hook
  const { weather, forecast, loading, error, searchHistory, fetchWeather, currentCity } = useWeather()
  const { colorMode } = useColorMode()
  
  // Check if we have a valid API key - we need this to get weather data
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const apiKeyError = !apiKey || apiKey === 'your_api_key_here'

  // When user wants to refresh the weather data
  const handleRefresh = () => {
    if (currentCity) {
      fetchWeather(currentCity)
    }
  }

  // Figure out which background style to use based on weather and time of day
  const getBackgroundStyle = (weatherType, isDay) => {
    console.log('Weather type:', weatherType, 'Is Day:', isDay);
    const timeOfDay = isDay ? 'day' : 'night'
    console.log('Weather condition received:', weatherType);
    const style = BACKGROUND_STYLES[weatherType] || BACKGROUND_STYLES.default
    console.log('Selected style:', style[timeOfDay]);
    return style[timeOfDay]
  }

  // Check if it's daytime based on sunrise/sunset times
  const isDay = weather ? 
    new Date().getTime() / 1000 > weather.sys.sunrise && 
    new Date().getTime() / 1000 < weather.sys.sunset : 
    true

  // Get the appropriate background style for current conditions
  const bgStyle = weather ? 
    getBackgroundStyle(weather.weather[0].main, isDay) : 
    getBackgroundStyle('default', true)

  // Keep track of weather changes for debugging
  useEffect(() => {
    if (weather) {
      console.log('Current weather:', {
        condition: weather.weather[0].main,
        description: weather.weather[0].description,
        isDay,
        selectedStyle: getBackgroundStyle(weather.weather[0].main, isDay)
      });
    }
  }, [weather, isDay]);

  // Set up our card background colors based on light/dark mode
  const cardsBgColor = useColorModeValue(
    'rgba(255, 255, 255, 0.2)',
    'rgba(0, 0, 0, 0.7)'
  );

  // The main UI render - let's make it beautiful!
  return (
    <ChakraProvider theme={theme}>
      <ImagePreloader />
      {/* Main container with dynamic background */}
      <Box
        minH="100vh"
        w="100%"
        bgGradient={bgStyle.gradient}
        bgImage={bgStyle.image}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        transition="all 0.3s ease-in-out"
        position="relative"
        overflow="auto"
      >
        {/* Weather-specific overlay for extra atmosphere */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={bgStyle.overlay}
          pointerEvents="none"
          zIndex={1}
        />
        
        {/* Dark mode overlay for better contrast */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={colorMode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'transparent'}
          transition="all 0.3s ease-in-out"
          pointerEvents="none"
          zIndex={2}
        />
        
        {/* Main content container with blur effect */}
        <Box 
          w="100%"
          minH="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          px={4}
          py={8}
          position="relative"
          zIndex={3}
          backdropFilter={colorMode === 'dark' ? "brightness(0.7) blur(8px)" : "blur(8px)"}
        >
          <VStack 
            w="100%"
            maxW="1200px"
            spacing={8}
            align="center"
            position="relative"
          >
            {/* Header with theme toggle and title */}
            <Box
              w="100%"
              position="relative"
              pt={{ base: 10, sm: 2 }}
              pb={4}
            >
              <ThemeToggle />
              <Text
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                fontWeight="bold"
                color="white"
                textShadow="0 2px 4px rgba(0,0,0,0.2)"
                letterSpacing="tight"
                textAlign="center"
                w="100%"
              >
                Weather Dashboard
              </Text>
            </Box>

            {/* Show API key error if not configured */}
            {apiKeyError ? (
              <Alert status="error" borderRadius="lg" w="100%" maxW="800px">
                <AlertIcon />
                Please configure your OpenWeatherMap API key in the .env file
              </Alert>
            ) : (
              <VStack spacing={8} w="100%" align="center">
                {/* Search bar for finding weather */}
                <Box w="100%" maxW="600px">
                  <SearchBar onSearch={fetchWeather} />
                </Box>

                {/* Loading spinner while fetching data */}
                {loading && (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="white"
                    size="xl"
                  />
                )}

                {/* Error message if something goes wrong */}
                {error && (
                  <Alert status="error" borderRadius="lg" w="100%" maxW="800px">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                {/* Weather cards with current conditions and forecast */}
                {weather && (
                  <Box
                    w="100%"
                    bg={cardsBgColor}
                    backdropFilter={colorMode === 'dark' ? "blur(12px) brightness(0.8)" : "blur(12px)"}
                    borderRadius="xl"
                    p={6}
                    transition="all 0.3s ease-in-out"
                    boxShadow={colorMode === 'dark' ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "0 4px 30px rgba(255, 255, 255, 0.2)"}
                  >
                    <VStack spacing={8} w="100%" align="center">
                      <Box w="100%" display="flex" justifyContent="center">
                        <WeatherCard weather={weather} onRefresh={handleRefresh} />
                      </Box>
                      {forecast && (
                        <Box w="100%" display="flex" justifyContent="center">
                          <ForecastCard forecast={forecast} />
                        </Box>
                      )}
                    </VStack>
                  </Box>
                )}
                
                {/* Recent searches for quick access */}
                <Box w="100%" maxW="600px" mt={4}>
                  <RecentSearches searchHistory={searchHistory} onSearch={fetchWeather} />
                </Box>
              </VStack>
            )}
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App
