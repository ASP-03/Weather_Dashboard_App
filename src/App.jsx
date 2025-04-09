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

// Define theme configuration
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

// Add this new component before the App function
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

function App() {
  const { weather, forecast, loading, error, searchHistory, fetchWeather, currentCity } = useWeather()
  const { colorMode } = useColorMode()
  
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const apiKeyError = !apiKey || apiKey === 'your_api_key_here'

  const handleRefresh = () => {
    if (currentCity) {
      fetchWeather(currentCity)
    }
  }

  const getBackgroundStyle = (weatherType, isDay) => {
    console.log('Weather type:', weatherType, 'Is Day:', isDay);
    const timeOfDay = isDay ? 'day' : 'night'
    console.log('Weather condition received:', weatherType);
    const style = BACKGROUND_STYLES[weatherType] || BACKGROUND_STYLES.default
    console.log('Selected style:', style[timeOfDay]);
    return style[timeOfDay]
  }

  const isDay = weather ? 
    new Date().getTime() / 1000 > weather.sys.sunrise && 
    new Date().getTime() / 1000 < weather.sys.sunset : 
    true

  const bgStyle = weather ? 
    getBackgroundStyle(weather.weather[0].main, isDay) : 
    getBackgroundStyle('default', true)

  // Add debug logging
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

  // Calculate dark mode overlay opacity
  const darkModeOverlayOpacity = colorMode === 'dark' ? 0.5 : 0;

  return (
    <ChakraProvider theme={theme}>
      <ImagePreloader />
      <Box
        minH="100vh"
        w="100%"
        bgGradient={bgStyle.gradient}
        bgImage={bgStyle.image}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        transition="background-image 0.3s ease-in-out"
        position="relative"
        overflow="auto"
        sx={{
          '@media (prefers-reduced-motion: no-preference)': {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: bgStyle.image,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }
          }
        }}
      >
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={bgStyle.overlay}
          pointerEvents="none"
          zIndex={0}
        />
        
        {/* Dark mode overlay */}
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="black"
          opacity={darkModeOverlayOpacity}
          transition="opacity 0.3s ease-in-out"
          pointerEvents="none"
          zIndex={0}
        />
        
        <Box 
          w="100%"
          minH="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          px={4}
          py={8}
          position="relative"
          zIndex={1}
          backdropFilter="blur(8px)"
        >
          <ThemeToggle />
          
          <VStack 
            w="100%"
            maxW="1200px"
            spacing={8}
            align="center"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 2px 4px rgba(0,0,0,0.2)"
              letterSpacing="tight"
              textAlign="center"
              w="100%"
            >
              Weather Dashboard
            </Text>

            {apiKeyError ? (
              <Alert status="error" borderRadius="lg" w="100%" maxW="800px">
                <AlertIcon />
                Please configure your OpenWeatherMap API key in the .env file
              </Alert>
            ) : (
              <VStack spacing={8} w="100%" align="center">
                <Box w="100%" maxW="600px">
                  <SearchBar onSearch={fetchWeather} />
                </Box>

                {loading && (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="white"
                    size="xl"
                  />
                )}

                {error && (
                  <Alert status="error" borderRadius="lg" w="100%" maxW="800px">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                {weather && (
                  <VStack spacing={8} w="100%" align="center">
                    <Box w="100%" display="flex" justifyContent="center">
                      <WeatherCard weather={weather} onRefresh={handleRefresh} />
                    </Box>
                    {forecast && (
                      <Box w="100%" display="flex" justifyContent="center" mt={4}>
                        <ForecastCard forecast={forecast} />
                      </Box>
                    )}
                  </VStack>
                )}
                
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
