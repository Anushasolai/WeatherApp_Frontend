import { useEffect, useState } from "react";
import "./App.css";

import WeatherDetails from "./components/WeatherDetails";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import searchIcon from "./assets/search.png";
import snowIcon from "./assets/snow.png";

function App() {
  const api_key = "2319dc46b805f9f5ba305a291b3c3395";

  const [icons, setIcon] = useState<string>(snowIcon);
  const [temp, setTemp] = useState<number>(0);
  const [city, setCity] = useState<string>("Chennai");
  const [country, setCountry] = useState<string>("IN");
  const [lat, setLat] = useState<number>(0);
  const [log, setLog] = useState<number>(0);
  const [wind, setWind] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [text, setText] = useState<string>("Chennai");
  const [cityNotFound, setCityNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const weatherIconMap: { [key: string]: string } = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    setLoading(true);
    setError(null);
    setCityNotFound(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCity(data.name);
      setTemp(Math.floor(data.main.temp));
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error: any) {
      setError("An error occurred while fetching weather data...");
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="inputCity"
          placeholder="Search city..."
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={search}>
          <img src={searchIcon} alt="searchIcon" />
        </div>
      </div>

      {loading && <div className="loading-msg">Loading...</div>}
      {error && <div className="error-msg">{error}</div>}
      {cityNotFound && <div className="city-not-found">City Not Found</div>}

      {!loading && !cityNotFound && (
        <WeatherDetails
          icon={icons}
          temperature={temp}
          cities={city}
          countries={country}
          lat={lat}
          log={log}
          humidity={humidity}
          windSpeed={wind}
        />
      )}
      <p className="copyright">
        Designed By <span>Anu</span>
      </p>
    </div>
  );
}

export default App;
