import { NextResponse } from "next/server";

const doomcastForecast: { [key: string]: string } = {
  sunny: "🔥 Just like your ex—hot, distant, and trying to kill you.",
  rainy: "🌊 Drowning in water, just like you're drowning in debt.",
  cloudy: "☁️ Just like your future—gray and depressing.",
  windy: "🌪️ Life’s falling apart, just like your umbrella.",
  snowy: "❄️ Cold, empty, and unforgiving—just like your soul.",
  stormy:
    "⚡ Chaotic, violent, and full of regret—just like your last relationship.",
};

const weatherToDoomcast: { [key: string]: string } = {
  Clear: "sunny",
  Clouds: "cloudy",
  Rain: "rainy",
  Snow: "snowy",
  Thunderstorm: "stormy",
  Drizzle: "rainy",
  Mist: "cloudy",
  Fog: "cloudy",
  Haze: "cloudy",
  Wind: "windy",
};

const getWeatherData = async (city: string) => {
  const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=en`
  );

  if (!weatherResponse.ok) {
    throw new Error("Weather data not available.");
  }

  const weatherData = await weatherResponse.json();
  return weatherData;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");

  if (!city || typeof city !== "string") {
    return NextResponse.json(
      { error: 'Missing or invalid "city" query parameter' },
      { status: 400 }
    );
  }

  try {
    const weatherData = await getWeatherData(city);

    const weatherCondition = weatherData.weather[0].main;
    const doomcastCondition = weatherToDoomcast[weatherCondition] || "cloudy";

    const doomcastMessage =
      doomcastForecast[doomcastCondition] ||
      "🌀 Unpredictable weather... the apocalypse is near!";

    const result = {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      condition: weatherCondition,
      doomcast: doomcastMessage,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
