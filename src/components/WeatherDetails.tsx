import React from "react";

import humidityIcon from "../assets/humidity.svg";

import windIcon from "../assets/wind.png";

interface WeatherDetailsProps {
  icon: string;

  temperature: number;

  cities: string;

  countries: string;

  lat: number;

  log: number;

  humidity: number;

  windSpeed: number;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  icon,

  temperature,

  cities,

  countries,

  lat,

  log,

  humidity,

  windSpeed,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>

      <div className="temp">{temperature}°C</div>

      <div className="location">{cities}</div>

      <div className="countries">{countries}</div>

      <div className="cords">
        <div>
          <span className="lat">latitude</span>

          <span>{lat}</span>
        </div>

        <div>
          <span className="log">longitude</span>

          <span>{log}</span>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />

          <div className="data">
            <div className="humidity-percent">{humidity}%</div>

            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} alt="windSpeed" className="icon" />

          <div className="data">
            <div className="wind-percent">{windSpeed}km/hr</div>

            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
