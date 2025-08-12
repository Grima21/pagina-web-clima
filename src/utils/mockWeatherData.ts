import { WeatherData, ForecastData, CitySearchResult } from '../types/weather';

export const mockWeatherData: WeatherData = {
  coord: { lon: -74.006, lat: 40.7143 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'cielo claro',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 22,
    feels_like: 24,
    temp_min: 18,
    temp_max: 26,
    pressure: 1013,
    humidity: 65
  },
  visibility: 10000,
  wind: {
    speed: 3.5,
    deg: 180
  },
  clouds: {
    all: 0
  },
  dt: Date.now() / 1000,
  sys: {
    type: 1,
    id: 1234,
    country: 'US',
    sunrise: Date.now() / 1000 - 3600,
    sunset: Date.now() / 1000 + 3600
  },
  timezone: -18000,
  id: 5128581,
  name: 'Nueva York',
  cod: 200
};

export const mockForecastData: ForecastData = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: Date.now() / 1000 + 86400,
      main: {
        temp: 24,
        feels_like: 26,
        temp_min: 20,
        temp_max: 28,
        pressure: 1015,
        humidity: 60
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'algo nublado',
          icon: '02d'
        }
      ],
      clouds: { all: 25 },
      wind: { speed: 2.8, deg: 200 },
      visibility: 10000,
      pop: 0.1,
      dt_txt: new Date(Date.now() + 86400000).toISOString().replace('T', ' ').slice(0, 19)
    },
    {
      dt: Date.now() / 1000 + 172800,
      main: {
        temp: 19,
        feels_like: 21,
        temp_min: 15,
        temp_max: 23,
        pressure: 1010,
        humidity: 75
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'lluvia ligera',
          icon: '10d'
        }
      ],
      clouds: { all: 80 },
      wind: { speed: 4.2, deg: 220 },
      visibility: 8000,
      pop: 0.7,
      dt_txt: new Date(Date.now() + 172800000).toISOString().replace('T', ' ').slice(0, 19)
    },
    {
      dt: Date.now() / 1000 + 259200,
      main: {
        temp: 26,
        feels_like: 28,
        temp_min: 22,
        temp_max: 30,
        pressure: 1018,
        humidity: 55
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'cielo claro',
          icon: '01d'
        }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.1, deg: 180 },
      visibility: 10000,
      pop: 0,
      dt_txt: new Date(Date.now() + 259200000).toISOString().replace('T', ' ').slice(0, 19)
    },
    {
      dt: Date.now() / 1000 + 345600,
      main: {
        temp: 21,
        feels_like: 23,
        temp_min: 17,
        temp_max: 25,
        pressure: 1012,
        humidity: 70
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'nubes dispersas',
          icon: '03d'
        }
      ],
      clouds: { all: 40 },
      wind: { speed: 2.5, deg: 160 },
      visibility: 9000,
      pop: 0.2,
      dt_txt: new Date(Date.now() + 345600000).toISOString().replace('T', ' ').slice(0, 19)
    },
    {
      dt: Date.now() / 1000 + 432000,
      main: {
        temp: 23,
        feels_like: 25,
        temp_min: 19,
        temp_max: 27,
        pressure: 1016,
        humidity: 62
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'cielo claro',
          icon: '01d'
        }
      ],
      clouds: { all: 5 },
      wind: { speed: 3.8, deg: 190 },
      visibility: 10000,
      pop: 0,
      dt_txt: new Date(Date.now() + 432000000).toISOString().replace('T', ' ').slice(0, 19)
    }
  ],
  city: {
    id: 5128581,
    name: 'Nueva York',
    coord: { lat: 40.7143, lon: -74.006 },
    country: 'US',
    population: 8175133,
    timezone: -18000,
    sunrise: Date.now() / 1000 - 3600,
    sunset: Date.now() / 1000 + 3600
  }
};

export const mockCitySearchResults: CitySearchResult[] = [
  {
    name: 'Madrid',
    lat: 40.4168,
    lon: -3.7038,
    country: 'ES',
    state: 'Madrid'
  },
  {
    name: 'Barcelona',
    lat: 41.3851,
    lon: 2.1734,
    country: 'ES',
    state: 'Cataluña'
  },
  {
    name: 'Valencia',
    lat: 39.4699,
    lon: -0.3763,
    country: 'ES',
    state: 'Valencia'
  },
  {
    name: 'Sevilla',
    lat: 37.3891,
    lon: -5.9845,
    country: 'ES',
    state: 'Andalucía'
  },
  {
    name: 'Bilbao',
    lat: 43.263,
    lon: -2.935,
    country: 'ES',
    state: 'País Vasco'
  }
];