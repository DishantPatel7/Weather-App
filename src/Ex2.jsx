import React, { useEffect } from "react";
import "./Ex2.css";
import { useState } from "react";
import sun from "../src/assets/sun.png";

export default function Ex2() {
  let [city, setCity] = useState("");
  let [wdetails, setWdetails] = useState();

  let currTime = new Date().toLocaleTimeString();

  let getData = (event) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        finalRes.cod == "404" ? setWdetails(undefined) : setWdetails(finalRes);
      });

    event.preventDefault();
    setCity("");
    document.getElementById("show").style.display = "block";
    document.getElementById("left").style.animationName = "moveL";
    document.getElementById("left").style.borderTopLeftRadius = "20px";
    document.getElementById("left").style.borderBottomLeftRadius = "20px";
    document.getElementById("left").style.borderTopRightRadius = "0px";
    document.getElementById("left").style.borderBottomRightRadius = "0px";

    document.getElementById("form").style.animationName = "moveForm";
    // document.getElementById('form').style.marginTop = "-220px";
    document.getElementById('weather-icon').style.display = "block";
    document.getElementById('show-div').style.animationName = "show";
  };

  return (
    <div className="m-ex2">
      <div className="left" id="left">
        <form onSubmit={getData} id="form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter the city"
          />
          <button className="btn">Search</button>
        </form>
        <div className="weather-icon" id="weather-icon">
          <img src={sun} alt="" />
          <h1>Weather <br />App</h1>
          {/* <p>{currTime}</p> */}
        </div>
      </div>
      <div className="show" id="show">
        {wdetails !== undefined ? (
          <>
            <div className="show-div" id="show-div">
              <h1
                style={{
                  fontSize: "2.9vw",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {wdetails.name}
              </h1>
              <div className="temp">
                <h1 >{wdetails.main.temp} °C</h1>
                <div className="min-max-temp">
                  <h5>{wdetails.main.temp_min}°C</h5>
                  <h5>{wdetails.main.temp_max}°C</h5>
                </div>
              </div>
              <div className="des">
                <h3
                  style={{
                    textAlign: "center",
                    width: "200px",
                    fontSize: "1.2vw",
                    padding: "1vw"
                  }}
                >
                  {wdetails.weather[0].description}
                </h3>
              </div>
              <div className="card-m">
                <div className="card">
                  <h3>{wdetails.main.humidity}%</h3>
                  <p>Humidity</p>
                </div>
                <div className="card">
                  <h3>
                    {wdetails.wind.speed}
                    <span>km/h</span>
                  </h3>
                  <p>Wind</p>
                </div>
                <div className="card">
                  <h3>{wdetails.main.feels_like} °C</h3>
                  <p>Feels like</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
