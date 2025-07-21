// src/components/WeatherCard.jsx
import { useEffect, useState } from "react";
import { FaTemperatureHigh, FaWind } from "react-icons/fa";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=26.85&longitude=80.95&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather));
  }, []);

  if (!weather)
    return (
      <div className="p-4 text-center text-gray-600">Loading weather...</div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Lucknow Weather
      </h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaTemperatureHigh className="text-orange-500 text-3xl" />
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {weather.temperature}°C
            </p>
            <p className="text-sm text-gray-500">Temperature</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaWind className="text-blue-500 text-2xl" />
          <div>
            <p className="text-lg font-semibold text-gray-700">
              {weather.windspeed} km/h
            </p>
            <p className="text-sm text-gray-500">Wind Speed</p>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        Weather Code: {weather.weathercode}
      </div>
    </div>
  );
};

export default WeatherCard;
