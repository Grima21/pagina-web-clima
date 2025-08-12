import React from 'react';
import { ForecastData } from '../types/weather';
import { formatDate, formatTemperature, getWeatherIcon } from '../utils/weatherHelpers';

interface ForecastCardProps {
  forecast: ForecastData;
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

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  // Agrupar por días
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof forecast.list>);

  // Tomar los primeros 5 días
  const days = Object.keys(dailyForecasts).slice(0, 5);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-6">Pronóstico de 5 días</h3>
      
      <div className="space-y-4">
        {days.map((day, index) => {
          const dayData = dailyForecasts[day];
          const middayForecast = dayData.find(item => {
            const hour = new Date(item.dt * 1000).getHours();
            return hour >= 12 && hour <= 15;
          }) || dayData[0];

          const minTemp = Math.min(...dayData.map(item => item.main.temp_min));
          const maxTemp = Math.max(...dayData.map(item => item.main.temp_max));
          
          const iconName = getWeatherIcon(middayForecast.weather[0].icon);
          
          return (
            <div
              key={day}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <IconComponent iconName={iconName} className="text-2xl" />
                <div>
                  <div className="text-white font-medium">
                    {index === 0 ? 'Hoy' : formatDate(middayForecast.dt)}
                  </div>
                  <div className="text-white/70 text-sm capitalize">
                    {middayForecast.weather[0].description}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {middayForecast.pop > 0 && (
                  <div className="flex items-center gap-1 text-blue-300">
                    <span className="text-sm">💧</span>
                    <span className="text-sm">{Math.round(middayForecast.pop * 100)}%</span>
                  </div>
                )}
                <div className="text-right text-white">
                  <div className="font-medium">
                    {formatTemperature(maxTemp, unit)}°{unit}
                  </div>
                  <div className="text-white/70 text-sm">
                    {formatTemperature(minTemp, unit)}°{unit}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};