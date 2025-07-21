import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample coordinates (New Delhi); you can make this dynamic
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
        <ul className="max-h-[300px] overflow-y-auto">
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
        {daily?.time?.map((date, i) => (
          <p key={i}>
            📅 {date} | 🌡 Max: {daily.temperature_2m_max[i]}°C | Min: {daily.temperature_2m_min[i]}°C
          </p>
        ))}
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
      <div className="tabs flex gap-4 mb-4 text-white">
        {['today', 'hourly', 'daily', 'radar', 'monthly'].map(tab => (
          <button
            key={tab}
            className={`capitalize px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-500' : 'bg-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content bg-white text-black p-4 rounded shadow-md">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default WeatherDashboard;
