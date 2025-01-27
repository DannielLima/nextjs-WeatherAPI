"use client";

import { useState } from "react";

interface WeatherForecast {
  city: string;
  temperature: number;
  condition: string;
  doomcast: string;
}

const Home = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (res.ok) {
        setForecast(data);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to fetch data");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8">Weather API</h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="p-3 border border-gray-600 rounded-lg text-gray-800"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (e.g., London)"
        />
        <button
          onClick={fetchWeather}
          className="ml-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Forecast
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {forecast && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">{forecast.city}</h2>
          <p className="text-lg mb-2">Temperature: {forecast.temperature}°C</p>
          <p className="text-lg mb-4">Condition: {forecast.condition}</p>
          <p className="text-xl">{forecast.doomcast}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
