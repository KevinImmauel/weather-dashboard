// components/WeatherCard.tsx
import React from 'react';
import { Cloud, Sun, Thermometer, Droplets } from 'lucide-react';

interface WeatherCardProps {
  title: string;
  icon: 'temperature' | 'humidity' | 'rain' | 'sun';
  value: string | number | null;
  unit?: string;
  loading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, icon, value, unit = '', loading }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'temperature':
        return <Thermometer className="h-8 w-8 text-red-500 mr-3" />;
      case 'humidity':
        return <Droplets className="h-8 w-8 text-blue-500 mr-3" />;
      case 'rain':
        return <Cloud className="h-8 w-8 text-blue-500 mr-3" />;
      case 'sun':
        return <Sun className="h-8 w-8 text-yellow-500 mr-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center">
        {renderIcon()}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      {loading ? (
        <div className="mt-4 w-full h-6 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <div className="mt-3">
          <p className="text-3xl font-bold text-gray-900">
            {value !== null ? `${value}${unit}` : 'N/A'}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;