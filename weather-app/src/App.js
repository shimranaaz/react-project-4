import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import "./WeatherApp.css";

const App = () => {
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "8a84ea5f93efbc7c269dad9d3cf888b2";

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city.trim()) return; 

      try {
        setError("");
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError("City not found. Please try another city.");
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="app">
      <h1>Weather App🌦️</h1>
      <input
        type="text"
        className="city-input"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default App;
