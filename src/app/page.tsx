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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-8 space-y-10 sm:space-y-12">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-widest text-yellow-400 mb-12 text-center shadow-2xl border-b-4 border-yellow-500">
        WEATHER DOOMCAST
      </h1>

      <div className="flex flex-col sm:flex-row sm:space-x-10 w-full max-w-lg sm:max-w-2xl">
        <input
          type="text"
          className="p-6 text-3xl sm:text-4xl bg-gray-900 border-4 border-yellow-600 text-white rounded-none focus:outline-none focus:ring-2 focus:ring-yellow-600 mb-6 sm:mb-0 sm:w-4/5 shadow-2xl"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="ENTER CITY (e.g., LONDON)"
        />
        <button
          onClick={fetchWeather}
          className="p-6 text-3xl sm:text-4xl bg-transparent border-4 border-yellow-600 text-yellow-600 font-bold uppercase tracking-widest hover:bg-yellow-600 hover:text-black transition-all duration-300 ease-in-out w-full sm:w-auto shadow-2xl flex justify-center items-center"
        >
          GET FORECAST
        </button>
      </div>

      {loading && (
        <p className="text-2xl font-bold text-gray-300 mt-8 sm:mt-10">
          LOADING...
        </p>
      )}

      {error && (
        <p className="text-red-600 font-bold text-xl sm:text-2xl">{error}</p>
      )}

      {forecast && (
        <div className="w-full max-w-xl bg-gray-900 p-10 rounded-none shadow-2xl space-y-8 mt-8 sm:mt-12 border-4 border-yellow-600">
          <h2 className="text-4xl sm:text-5xl font-bold text-center">
            {forecast.city}
          </h2>
          <div className="text-3xl sm:text-4xl text-center">
            Temperature:{" "}
            <span className="font-bold">{forecast.temperature}°C</span>
          </div>
          <div className="text-2xl sm:text-3xl text-center">
            Condition: <span className="font-bold">{forecast.condition}</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-center mt-4 text-yellow-300">
            {forecast.doomcast}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
