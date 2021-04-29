import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../redux/weatherAction";
import debounce from "lodash.debounce";
const HomeComponent = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((state) => state.weather.data);

  const debouncedSave = useCallback(
    debounce((city) => dispatch(fetchWeatherData(city)), 700),
    []
  );

  const handleSearch = (e) => {
    const city = e.target.value;
    debouncedSave(city);
  };

  return (
    <div className="p-5">
      <h1 className="text-danger px-5" style={{ fontSize: "70px" }}>
        Weather-App
      </h1>
      <div className="mx-5 py-2">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Enter your city"
          className="form-control"
        />
      </div>

      {console.log(Object.keys(currentWeather).length)}
      {Object.keys(currentWeather).length !== 0 ? (
        <div className="container">
          <div className="d-flex justify-content-center bg-light rounded-top">
            <div className="px-5 mx-5 mt-4 container">
              <h2 className="text-success" style={{ fontSize: "50px" }}>
                {currentWeather.name}
              </h2>
              {currentWeather.sys.country && (
                <p>Country Code: {currentWeather.sys.country}</p>
              )}
            </div>

            <div className="mx-5 mt-4 container">
              <div style={{ fontSize: "50px", color: "blue" }}>
                {(currentWeather.main.temp - 273.15).toFixed(2)}&deg;C
              </div>
            </div>
            <div className="container">
              <img src="cloudy.png" height="100px" />
              <p>
                <b>{currentWeather.weather[0].main}</b>
              </p>
            </div>
          </div>
          <div className="bg-light rounded-bottom">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Main</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Min Temp</td>
                  <td>
                    {(currentWeather.main.temp_min - 273.15).toFixed(2)}&deg;C
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Max Temp</td>
                  <td>
                    {(currentWeather.main.temp_max - 273.15).toFixed(2)}&deg;C
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Pressure</td>
                  <td>{currentWeather.main.pressure}</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td>Humidity</td>
                  <td>{currentWeather.main.humidity}</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Wind</td>
                  <td>
                    Speed:{currentWeather.wind.speed}v &nbsp;Deg:
                    {currentWeather.wind.deg}&deg;
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1>No Data Found</h1>
      )}
    </div>
  );
};

export default HomeComponent;
