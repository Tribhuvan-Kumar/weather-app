import React, { useState } from "react";
import "../styles/weatherApp.css";
import searchIcon from "../assets/search.png";
import rainIcon from "../assets/rain.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import cloudsIcon from "../assets/clouds.png";
import clearIcon from "../assets/clear.png";
import drizzleIcon from "../assets/drizzle.png";
import mistIcon from "../assets/mist.png";
import snowIcon from "../assets/snow.png";

const WeatherApp = () => {
  const apiKey = "9dc6cb318404fc00766ec92db3c53c44";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(apiUrl + searchValue + `&appid=${apiKey}`);

      if (response.status === 404) {
        setError(true);
        setWeatherData(null);
        setWeather(false);
      } else {
        const data = await response.json();
        setWeatherData(data);
        setError(false);
        setWeather(true);
      }
    } catch (error) {
      alert("Error fetching weather data: ", error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            spellCheck="false"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button onClick={handleSearch}>
            <img src={searchIcon} alt=" " />
          </button>
        </div>
        <div className="error" style={{ display: error ? "block" : "none" }}>
          <p>Please enter only City name.</p>
        </div>

        {weatherData && (
          <div
            className="weather"
            style={{ display: weather ? "block" : "none" }}
          >
            <img
              className="weather-icon"
              src={
                weatherData.weather[0].main === "Clouds"
                  ? cloudsIcon
                  : weatherData.weather[0].main === "Clear"
                  ? clearIcon
                  : weatherData.weather[0].main === "Rain"
                  ? rainIcon
                  : weatherData.weather[0].main === "Drizzle"
                  ? drizzleIcon
                  : weatherData.weather[0].main === "Mist"
                  ? mistIcon
                  : weatherData.weather[0].main === "Humidity"
                  ? humidityIcon
                  : weatherData.weather[0].main === "Snow"
                  ? snowIcon
                  : ""
              }
              alt=" "
            />

            <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
            <h2 className="city">{weatherData.name}</h2>

            <div className="details">
              <div className="col">
                <img src={humidityIcon} alt=" " />

                <div>
                  <p className="humidity">{weatherData.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="col">
                <img src={windIcon} alt=" " />
                <div>
                  <p className="wind">{weatherData.wind.speed} km/hr</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
