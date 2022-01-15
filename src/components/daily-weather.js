import React from "react";
import "./daily-weather.css";

function DailyWeather(props) {
  return (
    <React.Fragment>
      <div className="daily-card">
        <img
          src={"http://openweathermap.org/img/wn/" + props.img + "@2x.png"}
          alt=""
        />
        <h3>{props.dia}</h3>
        <p>{props.titulo}</p>
        <p>Max: {props.max}°C</p>
        <p>Min: {props.min}°C</p>
      </div>
    </React.Fragment>
  );
}

export default DailyWeather;
