import React from 'react';
import { MapPin, Thermometer, Eye, Wind, Droplets, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon, formatTemperature, formatTime, getWindDirection } from '../utils/weatherHelpers';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
}

const IconComponent = ({ iconName, className }: { iconName: string; className?: string }) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    sun: () => <div className={`${className} text-yellow-300`}>☀️</div>,
    moon: () => <div className={`${className} text-blue-200`}>🌙</div>,
    'cloud-sun': () => <div className={`${className}`}>⛅</div>,
    'cloud-moon': () => <div className={`${className}`}>☁️</div>,
    cloud: () => <div className={`${className}`}>☁️</div>,
    clouds: () => <div className={`${className}`}>☁️</div>,
    'cloud-rain': () => <div className={`${className}`}>🌧️</div>,
    'cloud-sun-rain': () => <div className={`${className}`}>🌦️</div>,
    'cloud-moon-rain': () => <div className={`${className}`}>🌧️</div>,
    zap: () => <div className={`${className}`}>⚡</div>,
    snowflake: () => <div className={`${className}`}>❄️</div>,
    fog: () => <div className={`${className}`}>🌫️</div>,
  };

  const Icon = iconMap[iconName];
  return Icon ? <Icon /> : <div className={className}>☁️</div>;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  const iconName = getWeatherIcon(weather.weather[0].icon);
  const isNight = weather.weather[0].icon.includes('n');

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-white/70" />
          <div>
            <h2 className="text-xl font-semibold text-white">{weather.name}</h2>
            <p className="text-white/70 text-sm">{weather.sys.country}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-sm">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <IconComponent iconName={iconName} className="text-6xl" />
          <div>
            <div className="text-5xl font-light text-white mb-1">
              {formatTemperature(weather.main.temp, unit)}°{unit}
            </div>
            <p className="text-white/80 capitalize text-lg">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
        <div className="text-right text-white/70">
          <div className="flex items-center gap-1 mb-2">
            <Thermometer className="w-4 h-4" />
            <span className="text-sm">
              Sensación {formatTemperature(weather.main.feels_like, unit)}°{unit}
            </span>
          </div>
          <div className="text-sm">
            <span>Máx: {formatTemperature(weather.main.temp_max, unit)}°{unit}</span>
            <span className="mx-2">•</span>
            <span>Mín: {formatTemperature(weather.main.temp_min, unit)}°{unit}</span>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm">Viento</span>
          </div>
          <div className="text-white font-medium">
            {weather.wind.speed} m/s
          </div>
          <div className="text-white/60 text-xs">
            {getWindDirection(weather.wind.deg)}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm">Humedad</span>
          </div>
          <div className="text-white font-medium">
            {weather.main.humidity}%
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm">Visibilidad</span>
          </div>
          <div className="text-white font-medium">
            {(weather.visibility / 1000).toFixed(1)} km
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm">Presión</span>
          </div>
          <div className="text-white font-medium">
            {weather.main.pressure} hPa
          </div>
        </div>
      </div>

      {/* Sun times */}
      <div className="mt-6 flex justify-between text-white/70 text-sm">
        <span>🌅 {formatTime(weather.sys.sunrise)}</span>
        <span>🌇 {formatTime(weather.sys.sunset)}</span>
      </div>
    </div>
  );
};