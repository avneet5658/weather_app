import axios from "axios";
import {
  FETCH_WEATHER_FAILURE,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
} from "./weatherTypes";

const fetchweatherrequest = () => {
  return {
    type: FETCH_WEATHER_REQUEST,
  };
};

const fetchweathersuccess = (data) => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: data,
  };
};

const fetchweatherfailure = (error) => {
  return {
    type: FETCH_WEATHER_FAILURE,
    payload: error,
  };
};

export const fetchWeatherData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=84858fc4b353000607a37aba83bc1339`;
  return (dispatch) => {
    dispatch(fetchweatherrequest);
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        dispatch(fetchweathersuccess(response.data));
      })
      .catch((error) => dispatch(fetchweatherfailure(error)));
  };
};
