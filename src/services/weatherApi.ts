// services/weatherApi.ts

export interface WeatherData {
    temperature: number | null;
    humidity: number | null;
    raining: boolean | null;
  }
  
  const API_URL = '/api/weather'; // Using Next.js rewrites for CORS handling
  
  export async function fetchWeatherData(): Promise<WeatherData> {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }