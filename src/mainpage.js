import React, { useState, useEffect } from "react";
import DailyWeather from "./components/daily-weather";
import "./mainpage.css";
import LoadingPage from "./PageLoading";

function MainPage() {
  const [data, setData] = useState();
  const [loading, Setloading] = useState(true);
  const today = new Date();
  const dayy = today.getDay();

  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
      alert("Sorry, Geolocation is not supported by this browser");
    }
  }
  const posError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((res) => {
        if (res.state === "denied") {
          alert(
            "Enable location permissions for this website in your browser settings"
          );
        }
      });
    } else {
      alert("Unable to acces your location.");
    }
  };

  const showPosition = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    fetchData(lat, long);
  };

  const fetchData = (latitude, longitude) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=9ed5cd34115430ad4d102ad0b11d9845`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
        Setloading(false);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    getPosition();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="weather-today">
            <h1>Weather App</h1>
            <img
              src={
                "http://openweathermap.org/img/wn/" +
                data.current.weather[0].icon +
                "@2x.png"
              }
              alt=""
            />
            <h2>Today</h2>
            <p>{data.current.weather[0].description}</p>
            <p>Now: {data.current.temp}°C</p>
            <p>Feels like: {data.current.feels_like}°C</p>
            <p>Humidity: {data.current.humidity}%</p>
          </div>
          <div className="daily-weather">
            {data.daily.slice(0, 6).map((day, i) => {
              return (
                <DailyWeather
                  dia={weekday[(dayy + i + 1) % 7]}
                  img={day.weather[0].icon}
                  titulo={day.weather[0].description}
                  max={day.temp.max}
                  min={day.temp.min}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default MainPage;
