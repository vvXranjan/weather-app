import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const latitude = 28.6139;
  const longitude = 77.2090;

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_days=3`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, []);

  const renderToday = () => {
    const current = weatherData?.current;
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Today's Weather</h2>
        <p>🌡 Temperature: {current?.temperature_2m}°C</p>
        <p>💧 Humidity: {current?.relative_humidity_2m}%</p>
        <p>💨 Wind Speed: {current?.wind_speed_10m} km/h</p>
      </div>
    );
  };

  const renderHourly = () => {
    const hourly = weatherData?.hourly;
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Hourly Forecast</h2>
        <ul className="max-h-[300px] overflow-y-auto space-y-1 text-sm">
          {hourly?.time?.slice(0, 12).map((time, index) => (
            <li key={index}>
              🕓 {time} → 🌡 {hourly.temperature_2m[index]}°C
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderDaily = () => {
    const daily = weatherData?.daily;
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Daily Forecast</h2>
        <ul className="space-y-1 text-sm">
          {daily?.time?.map((date, i) => (
            <li key={i}>
              📅 {date} | 🌡 Max: {daily.temperature_2m_max[i]}°C | Min: {daily.temperature_2m_min[i]}°C
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderRadar = () => (
    <div>
      <h2 className="text-xl font-bold mb-2">Radar</h2>
      <p>Radar data is not supported in Open-Meteo. You can embed a radar map from another source here.</p>
    </div>
  );

  const renderMonthly = () => (
    <div>
      <h2 className="text-xl font-bold mb-2">Monthly Forecast</h2>
      <p>Monthly forecast is not available in Open-Meteo. You could aggregate weekly averages manually.</p>
    </div>
  );

  const renderTabContent = () => {
    if (loading) return <p>Loading...</p>;

    switch (activeTab) {
      case 'today':
        return renderToday();
      case 'hourly':
        return renderHourly();
      case 'daily':
        return renderDaily();
      case 'radar':
        return renderRadar();
      case 'monthly':
        return renderMonthly();
      default:
        return null;
    }
  };

  return (
    <div className="weather-dashboard p-4">
      {/* Tabs */}
      <div className="tabs flex gap-2 flex-wrap justify-center mb-6">
        {['today', 'hourly', 'daily', 'radar', 'monthly'].map((tab) => (
          <button
            key={tab}
            className={`capitalize px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="tab-content bg-white text-gray-800 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto"
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WeatherDashboard;
