"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Cloud, Droplets, Thermometer, Sun } from "lucide-react";

interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  raining: boolean | null;
}

interface HistoryEntry extends WeatherData {
  timestamp: Date;
}

const fetcher = async (url: string): Promise<WeatherData> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function Home() {
  const API_URL = "https://kevin0vcx.pythonanywhere.com/data";
  const { data, error, isLoading } = useSWR<WeatherData>(API_URL, fetcher, {
    refreshInterval: 10000, // auto-refresh every 10 seconds
  });

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (data) {
      const now = new Date();
      setLastUpdated(now);
      setHistory((prev) => {
        const newHistory = [...prev, { ...data, timestamp: now }];
        return newHistory.slice(-10); // Keep last 10
      });
    }
  }, [data]);

  const formatTime = (date: Date | null): string => {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Head>
        <title>Road Weather Station Dashboard IPA 249</title>
        <meta name="description" content="ESP8266 Weather Sensor Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Road Weather Station Dashboard IPA 249
          </h1>

          <div className="overflow-x-auto rounded border border-gray-900 shadow-sm my-6">
            <table className="min-w-full divide-y-2 divide-gray-900">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="*:font-medium *:text-gray-900">
                  <th className="px-3 py-2 whitespace-nowrap">NO</th>
                  <th className="px-3 py-2 whitespace-nowrap">Name</th>
                  <th className="px-3 py-2 whitespace-nowrap">Roll.NO</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-900">
                <tr className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">1</td>
                  <td className="px-3 py-2 whitespace-nowrap">A N V MUKUNDA RAO</td>
                  <td className="px-3 py-2 whitespace-nowrap">20241CSE0114</td>
                </tr>

                <tr className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">2</td>
                  <td className="px-3 py-2 whitespace-nowrap">AISHWARYA SREE V</td>
                  <td className="px-3 py-2 whitespace-nowrap">20241CSE0115</td>
                </tr>

                <tr className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">3</td>
                  <td className="px-3 py-2 whitespace-nowrap">MOULYA V</td>
                  <td className="px-3 py-2 whitespace-nowrap">20241CSE0116</td>
                </tr>

                <tr className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">4</td>
                  <td className="px-3 py-2 whitespace-nowrap">VISHAL A MASHALDI</td>
                  <td className="px-3 py-2 whitespace-nowrap">20241CSE0118</td>
                </tr>

                <tr className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">5</td>
                  <td className="px-3 py-2 whitespace-nowrap">SAMARTH S</td>
                  <td className="px-3 py-2 whitespace-nowrap">20241CSE0119</td>
                </tr>

                <tr className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">6</td>
                  <td className="px-3 py-2 whitespace-nowrap">D NIKHIL REDDY</td>
                  <td className="px-3 py-2 whitespace-nowrap">20241EVL0020</td>
                </tr>
              </tbody>
            </table>
          </div>


          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700">
                Failed to load data. Please try again later.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Rain Condition Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
              {!data ? (
                <div className="text-gray-500">Loading...</div>
              ) : data.raining ? (
                <Cloud className="h-24 w-24 text-blue-500 mx-auto" />
              ) : (
                <Sun className="h-24 w-24 text-yellow-500 mx-auto" />
              )}
              <h2 className="text-2xl text-black font-semibold mt-4">
                {!data
                  ? "Loading..."
                  : data.raining
                    ? "Raining 🌧️"
                    : "Dry ☀️"}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Last updated: {formatTime(lastUpdated)}
              </p>
            </div>

            {/* Temp & Humidity Cards */}
            <div className="grid grid-cols-1 gap-6">
              {/* Temperature */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <Thermometer className="h-8 w-8 text-red-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Temperature
                  </h3>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-bold text-gray-900">
                    {data?.temperature !== null && data?.temperature !== undefined
                      ? `${data.temperature.toFixed(1)} °C`
                      : isLoading
                        ? "Loading..."
                        : "N/A"}
                  </p>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <Droplets className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Humidity
                  </h3>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-bold text-gray-900">
                    {data?.humidity !== null && data?.humidity !== undefined
                      ? `${data.humidity.toFixed(1)}%`
                      : isLoading
                        ? "Loading..."
                        : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="mt-12 text-gray-800 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Weather History
            </h3>
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
                        <td className="py-2 px-4 border-b">
                          {formatTime(entry.timestamp)}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {entry.temperature !== null
                            ? `${entry.temperature.toFixed(1)} °C`
                            : "N/A"}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {entry.humidity !== null
                            ? `${entry.humidity.toFixed(1)}%`
                            : "N/A"}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {entry.raining !== null
                            ? entry.raining
                              ? "Raining"
                              : "Dry"
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-500">
                        No data history yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
