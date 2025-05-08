// components/WeatherHistory.tsx
import React from 'react';

interface HistoryEntry {
  timestamp: Date;
  temperature: number | null;
  humidity: number | null;
  raining: boolean | null;
}

interface WeatherHistoryProps {
  history: HistoryEntry[];
}

const WeatherHistory: React.FC<WeatherHistoryProps> = ({ history }) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Weather History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Time</th>
              <th className="py-2 px-4 border-b text-left">Temperature</th>
              <th className="py-2 px-4 border-b text-left">Humidity</th>
              <th className="py-2 px-4 border-b text-left">Conditions</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((entry, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{formatTime(entry.timestamp)}</td>
                  <td className="py-2 px-4 border-b">
                    {entry.temperature !== null ? `${entry.temperature.toFixed(1)} °C` : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {entry.humidity !== null ? `${entry.humidity.toFixed(1)}%` : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {entry.raining !== null ? (
                      entry.raining ? 'Raining' : 'Dry'
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  No history data available yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherHistory;