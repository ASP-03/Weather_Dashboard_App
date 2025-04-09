# Weather Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.3-646CFF.svg)](https://vitejs.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2.8.2-319795.svg)](https://chakra-ui.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployment-Live-success.svg)](https://weather-dashboard-app-eta.vercel.app/)

A modern, responsive weather dashboard application built with React and Chakra UI. View live weather conditions and forecasts with beautiful dynamic backgrounds that change based on weather conditions and time of day.

🌐 **Live Demo**: [Weather Dashboard](https://weather-dashboard-app-eta.vercel.app/)

![Weather Dashboard Preview](preview.png)

## Table of Contents
- [Features](#features)
  - [Core Functionality](#core-functionality)
  - [Visual Features](#visual-features)
  - [Technical Features](#technical-features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)
- [Troubleshooting](#troubleshooting)
- [Repository](#repository)
- [Acknowledgments](#acknowledgments)
- [Development](#development)

## Features

### Core Functionality
- Real-time weather data from OpenWeatherMap API
- Current weather conditions display
- 5-day weather forecast
- Search for any city worldwide
- Search history with quick access to previous searches
- Auto-refresh capability
- Metric units (Celsius)

### Visual Features
- Dynamic backgrounds that change based on:
  - Weather conditions (Clear, Cloudy, Rain, Snow, Thunderstorm, Mist)
  - Time of day (Day/Night)
- Smooth transitions between weather states
- Responsive design for all screen sizes
- Beautiful blur effects and overlays
- Modern, clean UI with Chakra UI components

### Technical Features
- Optimized image loading with preloading for common weather states
- Responsive image sizing and compression
- Smooth state transitions
- Accessibility features
- Respect for user's motion preferences
- Error handling and loading states

### Features Preview

#### Dynamic Weather Backgrounds
The application features dynamic backgrounds that change based on:
- Current weather conditions (Clear, Cloudy, Rain, Snow, etc.)
- Time of day in the searched location (Day/Night)
- Smooth transitions between states

#### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interface
- Optimized for both portrait and landscape orientations

#### Weather Information
- Current temperature and conditions
- Feels like temperature
- Humidity levels
- Wind speed
- Atmospheric pressure
- 5-day forecast with daily summaries

## Technology Stack

- **Frontend Framework**: React + Vite
- **UI Library**: Chakra UI
- **API**: OpenWeatherMap
- **Hosting**: Vercel
- **State Management**: React Hooks
- **Styling**: Chakra UI + Custom CSS

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ASP-03/Weather_Dashboard_App.git
   cd Weather_Dashboard_App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Get your API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/)
   - Generate an API key from your account
   - Replace `your_api_key_here` in the `.env` file with your actual API key

5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is deployed and live on Vercel! You can view it at [https://weather-dashboard-app-eta.vercel.app/](https://weather-dashboard-app-eta.vercel.app/)

To deploy your own instance:

1. Fork this repository
2. Sign up on [Vercel](https://vercel.com)
3. Import your forked repository
4. Select "Vite" as your framework preset when prompted
5. Add your OpenWeatherMap API key to the environment variables:
   - Name: `VITE_OPENWEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key
6. Deploy!

The Vite framework preset ensures that:
- Build commands are correctly configured
- Output directory is properly set
- Environment variables are handled correctly
- Hot module replacement works in development

## Environment Variables

Required environment variables:
- `VITE_OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Background images from [Unsplash](https://unsplash.com/)
- UI components from [Chakra UI](https://chakra-ui.com/)

## API Integration

This project uses the OpenWeatherMap API:
- Current Weather API: https://api.openweathermap.org/data/2.5/weather
- 5-Day Forecast API: https://api.openweathermap.org/data/2.5/forecast
- Rate Limit: 60 calls/minute for free tier
- Units: Metric (Celsius)

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

### Project Structure
```
weather-dashboard/
├── public/
│   └── preview.png
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── WeatherCard.jsx
│   │   └── ForecastCard.jsx
│   ├── services/
│   │   └── weatherService.js
│   ├── hooks/
│   │   └── useWeather.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

### Code Style
- ESLint configuration for React
- Consistent code formatting with Prettier
- React best practices and hooks
- Chakra UI component patterns

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Repository

🔗 **GitHub**: [ASP-03/Weather_Dashboard_App](https://github.com/ASP-03/Weather_Dashboard_App)

## Troubleshooting

- **API Key Issues**: If you see an error about the API key, make sure you've correctly added it to the `.env` file.
- **City Not Found**: Check the spelling of the city name or try a more specific location (e.g., "London, UK" instead of just "London").
- **Rate Limiting**: The free tier of OpenWeatherMap API has a limit of 60 calls per minute. If you exceed this, you'll need to wait before making more requests.