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
} from '@chakra-ui/react'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { ForecastCard } from './components/ForecastCard'
import { useWeather } from './hooks/useWeather'

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
  
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const apiKeyError = !apiKey || apiKey === 'your_api_key_here'

  const handleRefresh = () => {
    if (currentCity) {
      fetchWeather(currentCity)
    }
  }

  const getBackgroundStyle = (weatherType, isDay) => {
    console.log('Weather type:', weatherType, 'Is Day:', isDay);
    const styles = {
      Clear: {
        day: {
          gradient: 'linear(to-b, blue.400, blue.200)',
          overlay: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
          image: 'url("https://images.unsplash.com/photo-1622278647429-71bc97e904e8?auto=format&fit=crop&w=1200&q=60")',
        },
        night: {
          gradient: 'linear(to-b, gray.900, blue.900)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
          image: 'url("https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=1200&q=60")',
        },
      },
      Clouds: {
        day: {
          gradient: 'linear(to-b, gray.400, gray.300)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)',
          image: 'url("https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=60")',
        },
        night: {
          gradient: 'linear(to-b, gray.800, gray.700)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
          image: 'url("https://images.unsplash.com/photo-1594156596782-656c93e4d504?auto=format&fit=crop&w=1200&q=60")',
        },
      },
      Rain: {
        day: {
          gradient: 'linear(to-b, gray.600, blue.600)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
          image: 'url("https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1200&q=80")',
        },
        night: {
          gradient: 'linear(to-b, gray.900, blue.900)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
          image: 'url("https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1200&q=80")',
        },
      },
      Snow: {
        day: {
          gradient: 'linear(to-b, gray.100, blue.50)',
          overlay: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
          image: 'url("https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2008&auto=format&fit=crop")',
        },
        night: {
          gradient: 'linear(to-b, gray.300, blue.100)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
          image: 'url("https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=2065&auto=format&fit=crop")',
        },
      },
      Thunderstorm: {
        day: {
          gradient: 'linear(to-b, gray.700, purple.800)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
          image: 'url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop")',
        },
        night: {
          gradient: 'linear(to-b, gray.900, purple.900)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
          image: 'url("https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?q=80&w=1937&auto=format&fit=crop")',
        },
      },
      Mist: {
        day: {
          gradient: 'linear(to-b, gray.300, gray.200)',
          overlay: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
          image: 'url("https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2076&auto=format&fit=crop")',
        },
        night: {
          gradient: 'linear(to-b, gray.600, gray.500)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
          image: 'url("https://images.unsplash.com/photo-1543968996-ee822b8176ba?q=80&w=2068&auto=format&fit=crop")',
        },
      },
      default: {
        day: {
          gradient: 'linear(to-b, blue.400, blue.200)',
          overlay: 'none',
          image: 'url("https://images.unsplash.com/photo-1598717123623-994ab270a08e?auto=format&fit=crop&w=1200&q=60")',
        },
        night: {
          gradient: 'linear(to-b, gray.800, gray.700)',
          overlay: 'none',
          image: 'url("https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=1200&q=60")',
        },
      },
    }

    const timeOfDay = isDay ? 'day' : 'night'
    console.log('Weather condition received:', weatherType);
    const style = styles[weatherType] || styles.default
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
                  <SearchBar onSearch={fetchWeather} searchHistory={searchHistory} />
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
              </VStack>
            )}
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App
