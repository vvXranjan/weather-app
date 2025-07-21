import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

const tabLabels = ["Today", "Hourly", "Daily", "Radar", "Monthly"];

const WeatherTabs = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    onTabChange(tabLabels[newValue].toLowerCase());
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md mb-6 px-2">
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Weather tabs"
      >
        {tabLabels.map((label, index) => (
          <Tab
            key={label}
            label={label}
            sx={{
              fontWeight: selectedTab === index ? "bold" : "normal",
              color: selectedTab === index ? "#007BFF" : "#555",
              borderBottom: selectedTab === index ? "3px solid #007BFF" : "none",
              textTransform: "none",
              fontSize: 16,
              padding: "10px 16px",
            }}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default WeatherTabs;
