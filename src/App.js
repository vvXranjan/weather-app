import React from 'react';
import WeatherCard from './components/WeatherCard';
import { Sun, Moon, CloudFog } from 'lucide-react'; // Icon imports

export default function App() {
  const sunMoonData = {
    sunrise: "5:24 AM",
    sunset: "7:01 PM",
    moonrise: "1:41 PM",
    moonset: "N/A",
    daylightDuration: "13 hrs 37 mins",
    moonPhase: "Waning Crescent"
  };

  const airQualityData = {
    status: "Poor",
    description:
      "The air has reached a high level of pollution and is unhealthy for sensitive groups. Reduce time spent outside if you are feeling symptoms such as difficulty breathing or throat irritation."
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter antialiased">
      {/* Main container */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8 flex flex-col lg:flex-row gap-6">

        {/* Left Column – WeatherCard */}
        <div className="flex-1 bg-gray-50 rounded-lg p-4 shadow-sm flex items-center justify-center">
          <WeatherCard />
        </div>

        {/* Right Column – Info Panels */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Sun & Moon */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">SUN & MOON</h2>
            <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-orange-500" />
                <span>Sunrise</span>
              </div>
              <div className="text-right font-medium">{sunMoonData.sunrise}</div>

              <div className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-orange-500" />
                <span>Sunset</span>
              </div>
              <div className="text-right font-medium">{sunMoonData.sunset}</div>

              <div className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-orange-500" />
                <span>Daylight</span>
              </div>
              <div className="text-right font-medium">{sunMoonData.daylightDuration}</div>

              <div className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-blue-600" />
                <span>Moonrise</span>
              </div>
              <div className="text-right font-medium">{sunMoonData.moonrise}</div>

              <div className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-blue-600" />
                <span>Moonset</span>
              </div>
              <div className="text-right font-medium">{sunMoonData.moonset}</div>

              <div className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-blue-600" />
                <span>Moon</span>
              </div>
              <div className="text-right font-medium">{sunMoonData.moonPhase}</div>
            </div>
          </div>

          {/* Air Quality */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">AIR QUALITY</h2>
              <button className="text-blue-600 hover:underline text-sm font-medium">SEE MORE</button>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <CloudFog className="w-6 h-6 text-gray-600" />
              <span className="text-base text-gray-700">Air Quality</span>
              <span className={`font-semibold px-2 py-0.5 rounded-full text-sm ${
                airQualityData.status === 'Poor' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {airQualityData.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {airQualityData.description}
            </p>
          </div>

          {/* Allergy Outlook */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">ALLERGY OUTLOOK</h2>
              <button className="text-blue-600 hover:underline text-sm font-medium">SEE ALL</button>
            </div>
            <div className="text-sm text-gray-600">
              <p className="mb-2">Dust & Dander: <span className="font-semibold text-red-600">Extreme</span></p>
              <p>Pollen: <span className="font-semibold text-green-600">Low</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
