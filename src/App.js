import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import { Sun, Moon, CloudFog } from 'lucide-react';
import MapWeather from './components/MapWeather'; // ✅ Weather map with search + weather

export default function App() {
  const [activeTab, setActiveTab] = useState("Today");
  const tabs = ["Today", "Hourly", "Daily", "Radar", "Monthly"];

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "Today":
        return (
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-gray-50 rounded-lg p-4 shadow-sm flex items-center justify-center">
              <WeatherCard />
            </div>

            <div className="flex-1 flex flex-col gap-6">
              {/* Sun & Moon */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">SUN & MOON</h2>
                <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700">
                  <div className="flex items-center space-x-2"><Sun className="w-5 h-5 text-orange-500" /><span>Sunrise</span></div>
                  <div className="text-right font-medium">{sunMoonData.sunrise}</div>
                  <div className="flex items-center space-x-2"><Sun className="w-5 h-5 text-orange-500" /><span>Sunset</span></div>
                  <div className="text-right font-medium">{sunMoonData.sunset}</div>
                  <div className="flex items-center space-x-2"><Sun className="w-5 h-5 text-orange-500" /><span>Daylight</span></div>
                  <div className="text-right font-medium">{sunMoonData.daylightDuration}</div>
                  <div className="flex items-center space-x-2"><Moon className="w-5 h-5 text-blue-600" /><span>Moonrise</span></div>
                  <div className="text-right font-medium">{sunMoonData.moonrise}</div>
                  <div className="flex items-center space-x-2"><Moon className="w-5 h-5 text-blue-600" /><span>Moonset</span></div>
                  <div className="text-right font-medium">{sunMoonData.moonset}</div>
                  <div className="flex items-center space-x-2"><Moon className="w-5 h-5 text-blue-600" /><span>Moon</span></div>
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
        );

      case "Radar":
        return <MapWeather />; // ✅ Interactive Map with Search + Weather

      case "Hourly":
      case "Daily":
      case "Monthly":
        return (
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md text-center text-gray-700">
            <h2 className="text-xl font-semibold mb-2">{activeTab} Forecast</h2>
            <p>This is where {activeTab.toLowerCase()} weather data will be shown.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter antialiased">
      {/* Tabs */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}
