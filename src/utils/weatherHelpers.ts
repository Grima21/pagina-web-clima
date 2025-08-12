export const getWeatherIcon = (weatherCode: string, isNight = false) => {
  const iconMap: Record<string, string> = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'cloud-sun',
    '02n': 'cloud-moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'clouds',
    '04n': 'clouds',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-sun-rain',
    '10n': 'cloud-moon-rain',
    '11d': 'zap',
    '11n': 'zap',
    '13d': 'snowflake',
    '13n': 'snowflake',
    '50d': 'fog',
    '50n': 'fog',
  };
  
  return iconMap[weatherCode] || 'cloud';
};

export const getWeatherGradient = (condition: string, isNight = false) => {
  if (isNight) {
    return 'from-indigo-900 via-purple-900 to-black';
  }
  
  const gradientMap: Record<string, string> = {
    Clear: 'from-blue-400 via-blue-500 to-blue-600',
    Clouds: 'from-gray-400 via-gray-500 to-gray-600',
    Rain: 'from-gray-600 via-blue-700 to-gray-800',
    Snow: 'from-blue-100 via-blue-200 to-blue-300',
    Thunderstorm: 'from-gray-800 via-purple-900 to-black',
    Drizzle: 'from-blue-300 via-blue-400 to-blue-500',
    Mist: 'from-gray-300 via-gray-400 to-gray-500',
    Fog: 'from-gray-300 via-gray-400 to-gray-500',
  };
  
  return gradientMap[condition] || 'from-blue-400 via-blue-500 to-blue-600';
};

export const formatTemperature = (temp: number, unit: 'C' | 'F' = 'C') => {
  if (unit === 'F') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

export const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('es-ES', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

export const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};