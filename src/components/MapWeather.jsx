import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to change map view
const ChangeMapView = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 8);
    }
  }, [coords, map]); // ✅ include map as a dependency

  return null;
};

const MapWeather = () => {
  const [position, setPosition] = useState({ lat: 28.6139, lng: 77.2090 }); // Default: Delhi
  const [weather, setWeather] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch weather data when position updates
  useEffect(() => {
    if (!position.lat || !position.lng) return;

    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data.current);
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };

    fetchWeather();
  }, [position]);

  // Search handler
  const handleSearch = async () => {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: searchTerm });

    if (results.length > 0) {
      const { x: lng, y: lat } = results[0];
      setPosition({ lat, lng });
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Search Box */}
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
        <input
          type="text"
          placeholder="Search Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "6px", width: "200px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "8px",
            padding: "6px 10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {/* Map Display */}
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView coords={position} />
        <Marker position={[position.lat, position.lng]}>
          <Popup>
            {weather ? (
              <div>
                <strong>Weather Info:</strong>
                <br />
                🌡 Temp: {weather.temperature_2m}°C
                <br />
                💨 Wind: {weather.wind_speed_10m} km/h
                <br />
                💧 Humidity: {weather.relative_humidity_2m}%
              </div>
            ) : (
              "Loading weather..."
            )}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapWeather;
