import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };
  return (
    <div className="weather-card">
      <div className="card-header">
        <h2>
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <span>{toDateFunction()}</span>
      </div>
      <div className="card-body">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="weather-icon"
        />
        <div className="temperature">
          {Math.round(weatherData.main.temp)}
          <sup>°C</sup>
        </div>
        <p className="description">
          {weatherData.weather[0].description.toUpperCase()}
        </p>
        <div className="details">
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Latitude: {weatherData.coord.lat}°</p>
          <p>Longitude: {weatherData.coord.lon}°</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
