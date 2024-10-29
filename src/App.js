import { Oval } from "react-loader-spinner";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import WeatherCard from "./WeatherCard"; // Import the WeatherCard component
import "./App.css";

function GfGWeatherApp() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const changeBackground = (weatherCondition) => {
    const body = document.body;
    let backgroundImage =
      "url('https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg')"; // Default image

    switch (weatherCondition) {
      case "Clear":
        backgroundImage =
          "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
        break;
      case "Clouds":
        backgroundImage =
          "url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
        break;
      case "Rain":
        backgroundImage =
          "url('https://centralca.cdn-anvilcms.net/media/images/2019/01/02/images/Rainy_Weather_pix.max-2400x1350.jpg')";
        break;
      case "Snow":
        backgroundImage =
          "url('https://images.pexels.com/photos/7245519/pexels-photo-7245519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
        break;
      default:
        backgroundImage =
          "url('https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg')";
    }

    body.style.backgroundImage = backgroundImage;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY;
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          setWeather({ data: res.data, loading: false, error: false });
          changeBackground(res.data.weather[0].main);
          setInput(""); // Clear the input after a successful fetch
        })
        .catch(() => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
        });
    }
  };

  useEffect(() => {
    // Set default background on mount
    changeBackground(null);

    // Reset background on unmount
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  return (
    <div className="App">
      <h1 className="app-name">Weather Forecast</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.loading && (
        <>
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: "20px" }}>City not found</span>
          </span>
        </>
      )}
      {weather && weather.data && weather.data.main && (
        <div className="card-container">
          <WeatherCard weatherData={weather.data} />
        </div>
      )}
      <footer className="footer">
        <p>Designed by Surya Gouthu</p>
      </footer>
    </div>
  );
}

export default GfGWeatherApp;
