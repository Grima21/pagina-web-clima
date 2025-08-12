import { WeatherData, ForecastData, CitySearchResult } from '../types/weather';
import { mockWeatherData, mockForecastData, mockCitySearchResults } from './mockWeatherData';

const API_KEY = 'demo_key'; // Usuario debe reemplazar con su clave de OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0';

// Función para verificar si la API key es válida
const isValidApiKey = (key: string): boolean => {
  return key !== 'demo_key' && key.length > 10;
};

// Función para generar datos mock basados en coordenadas
const generateMockWeatherForLocation = (lat: number, lon: number, cityName?: string): WeatherData => {
  const baseTemp = 20 + Math.sin(lat * Math.PI / 180) * 10; // Temperatura basada en latitud
  const weatherConditions = [
    { id: 800, main: 'Clear', description: 'cielo claro', icon: '01d' },
    { id: 801, main: 'Clouds', description: 'algo nublado', icon: '02d' },
    { id: 500, main: 'Rain', description: 'lluvia ligera', icon: '10d' }
  ];
  const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  
  return {
    ...mockWeatherData,
    coord: { lat, lon },
    name: cityName || 'Ubicación Actual',
    main: {
      ...mockWeatherData.main,
      temp: Math.round(baseTemp),
      feels_like: Math.round(baseTemp + 2),
      temp_min: Math.round(baseTemp - 4),
      temp_max: Math.round(baseTemp + 4)
    },
    weather: [randomCondition]
  };
};

export const weatherApi = {
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    // Si no hay una API key válida, devolver datos mock
    if (!isValidApiKey(API_KEY)) {
      console.warn('Usando datos de demostración. Para datos reales, obtén una API key de OpenWeatherMap.');
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(generateMockWeatherForLocation(lat, lon));
        }, 500); // Simular delay de red
      });
    }

    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener datos del clima');
    }
    
    return response.json();
  },

  getCurrentWeatherByCity: async (city: string): Promise<WeatherData> => {
    // Si no hay una API key válida, devolver datos mock
    if (!isValidApiKey(API_KEY)) {
      console.warn('Usando datos de demostración. Para datos reales, obtén una API key de OpenWeatherMap.');
      return new Promise(resolve => {
        setTimeout(() => {
          // Generar coordenadas mock basadas en el nombre de la ciudad
          const lat = 40.4168 + (Math.random() - 0.5) * 10;
          const lon = -3.7038 + (Math.random() - 0.5) * 10;
          resolve(generateMockWeatherForLocation(lat, lon, city));
        }, 500);
      });
    }

    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!response.ok) {
      throw new Error('Ciudad no encontrada');
    }
    
    return response.json();
  },

  getForecast: async (lat: number, lon: number): Promise<ForecastData> => {
    // Si no hay una API key válida, devolver datos mock
    if (!isValidApiKey(API_KEY)) {
      console.warn('Usando datos de demostración. Para datos reales, obtén una API key de OpenWeatherMap.');
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ...mockForecastData,
            city: {
              ...mockForecastData.city,
              coord: { lat, lon }
            }
          });
        }, 500);
      });
    }

    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener pronóstico');
    }
    
    return response.json();
  },

  searchCities: async (query: string): Promise<CitySearchResult[]> => {
    if (query.length < 3) return [];
    
    // Si no hay una API key válida, devolver resultados mock filtrados
    if (!isValidApiKey(API_KEY)) {
      console.warn('Usando datos de demostración. Para datos reales, obtén una API key de OpenWeatherMap.');
      return new Promise(resolve => {
        setTimeout(() => {
          const filtered = mockCitySearchResults.filter(city =>
            city.name.toLowerCase().includes(query.toLowerCase())
          );
          resolve(filtered);
        }, 300);
      });
    }

    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Error en búsqueda de ciudades');
    }
    
    return response.json();
  }
};