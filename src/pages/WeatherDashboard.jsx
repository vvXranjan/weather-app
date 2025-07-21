// src/pages/WeatherDashboard.jsx
import React from "react";
import WeatherCard from "../components/WeatherCard";
import SunMoonCard from "../components/SunMoonCard";
import AirQualityCard from "../components/AirQualityCard";

const WeatherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left Column (2/3 width on medium and up) */}
        <div className="md:col-span-2 space-y-6">
          <WeatherCard />
          {/* Add more components like ForecastCard, TemperatureGraph, etc. */}
        </div>

        {/* Right Column (1/3 width on medium and up) */}
        <div className="space-y-6">
          <SunMoonCard />
          <AirQualityCard />
          {/* Add more cards like AllergyCard, UVIndexCard, etc. */}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
