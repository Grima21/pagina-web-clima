import React, { useState, useEffect } from 'react';
import { Thermometer, MapPin } from 'lucide-react';
import { WeatherData, ForecastData, CitySearchResult } from './types/weather';
import { weatherApi } from './utils/weatherApi';
import { getWeatherGradient } from './utils/weatherHelpers';
import { useGeolocation } from './hooks/useGeolocation';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const { latitude, longitude, error: geoError } = useGeolocation();

  const loadWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeather(lat, lon),
        weatherApi.getForecast(lat, lon)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Error loading weather data:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar datos del clima');
    } finally {
      setLoading(false);
    }
  };

  const loadWeatherByCity = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherApi.getCurrentWeatherByCity(city);
      const forecastData = await weatherApi.getForecast(weatherData.coord.lat, weatherData.coord.lon);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Error loading weather by city:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar datos del clima');
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city: CitySearchResult) => {
    loadWeatherData(city.lat, city.lon);
  };

  const handleLocationClick = () => {
    if (latitude && longitude) {
      loadWeatherData(latitude, longitude);
    }
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  useEffect(() => {
    if (latitude && longitude) {
      loadWeatherData(latitude, longitude);
    } else if (geoError) {
      // Si hay error de geolocalización, cargar clima de Madrid por defecto
      loadWeatherByCity('Madrid');
    }
  }, [latitude, longitude, geoError]);

  const backgroundGradient = weather 
    ? getWeatherGradient(weather.weather[0].main, weather.weather[0].icon.includes('n'))
    : 'from-blue-400 via-blue-500 to-blue-600';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">App del Clima</h1>
          <p className="text-white/80">Consulta el clima en cualquier lugar del mundo</p>
        </header>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <SearchBar onCitySelect={handleCitySelect} loading={loading} />
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleLocationClick}
              disabled={!latitude || !longitude || loading}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl transition-colors"
              title="Usar ubicación actual"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Mi ubicación</span>
            </button>
            
            <button
              onClick={toggleUnit}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-colors"
              title={`Cambiar a ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
            >
              <Thermometer className="w-4 h-4" />
              <span>°{unit}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {loading && <LoadingSpinner />}
          
          {error && (
            <ErrorMessage 
              message={error} 
              onRetry={() => {
                if (latitude && longitude) {
                  loadWeatherData(latitude, longitude);
                } else {
                  loadWeatherByCity('Madrid');
                }
              }} 
            />
          )}
          
          {weather && !loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <WeatherCard weather={weather} unit={unit} />
              </div>
              
              <div className="lg:col-span-1">
                {forecast && <ForecastCard forecast={forecast} unit={unit} />}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-white/60 text-sm">
          <p>
            Datos proporcionados por OpenWeatherMap API
            <br />
            <span className="text-xs">
              Nota: Para uso completo, necesitas una clave API de OpenWeatherMap
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;