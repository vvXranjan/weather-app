import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";

const WeatherDashboard = ({ latitude, longitude }) => {
  const [tab, setTab] = useState(0);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude,
            longitude,
            hourly: "temperature_2m,relative_humidity_2m",
            daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset",
            timezone: "auto",
            past_days: 3,
          },
        })
        .then((res) => {
          setWeatherData(res.data);
        });
    }
  }, [latitude, longitude]);

  const renderTabContent = () => {
    if (!weatherData) return <p>Loading...</p>;

    if (tab === 0) {
      return (
        <div>
          <h3>Today's Summary</h3>
          <p>Temp: {weatherData.daily.temperature_2m_max[0]}°C</p>
          <p>Humidity: {weatherData.hourly.relative_humidity_2m[0]}%</p>
        </div>
      );
    }

    if (tab === 1) {
      return (
        <div>
          <h3>Hourly</h3>
          <ul>
            {weatherData.hourly.time.slice(0, 24).map((time, idx) => (
              <li key={time}>
                {time}: {weatherData.hourly.temperature_2m[idx]}°C
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (tab === 2) {
      return (
        <div>
          <h3>Daily</h3>
          <ul>
            {weatherData.daily.time.map((day, idx) => (
              <li key={day}>
                {day}: {weatherData.daily.temperature_2m_min[idx]}°C -{" "}
                {weatherData.daily.temperature_2m_max[idx]}°C
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (tab === 3) {
      const avgTemp = (
        weatherData.daily.temperature_2m_max.reduce((a, b) => a + b, 0) /
        weatherData.daily.temperature_2m_max.length
      ).toFixed(1);
      return (
        <div>
          <h3>Monthly (Simulated)</h3>
          <p>Avg Max Temp: {avgTemp}°C</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Box>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
        <Tab label="Today" />
        <Tab label="Hourly" />
        <Tab label="Daily" />
        <Tab label="Monthly" />
      </Tabs>
      <Box p={2}>{renderTabContent()}</Box>
    </Box>
  );
};

export default WeatherDashboard;
