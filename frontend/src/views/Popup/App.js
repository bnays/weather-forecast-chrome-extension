import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './App.css';
import { getCurrentData, getHistoricalData, getCompareHistoricalData } from '../../actions/weather';
import Home from '../../components/Home';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from "react-router-dom";
import { notification } from 'antd';


function App() {
  
  const [locationInfo, setLocationInfo] = useState("");
  const [historyInfo, setHistoryInfo] = useState("");
  const [compareHistoryInfo, setCompareHistoryInfo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [weatherLocation, setWeatherLocation] = useState("");
  const [searchByLocation, setSearchByLocation] = useState(false);
  const [compareByLocation, setCompareByLocation] = useState("");
  
  const dispatch = useDispatch();

  useEffect(() => {
      async function callApi() {
        const request = await axios.get(`${process.env.REACT_APP_API}/currentWeather`, {
          params: {
          latitude: latitude,
          longitude: longitude,
          location: weatherLocation,
          searchByLocation: searchByLocation
        }
        }).then(res => {
            if(res.data.error) {
              openNotification('error', 'Error', res.data.error.message);
            }
            else{
              setLocationInfo(res.data);
              dispatch(getCurrentData(res.data));
            }
        });
        return request;
      }
      async function callHistoryApi() {
        const request = await axios.get(`${process.env.REACT_APP_API}/historyApi`, {
          params: {
          latitude: latitude,
          longitude: longitude,
          location: weatherLocation,
          searchByLocation: searchByLocation
        }
        }).then(res => {
            if(res.data.error) {
              // openNotification('error', 'Error', res.data.error.message);
            }
            else{
              setHistoryInfo(res.data);
              dispatch(getHistoricalData(res.data));
            }
        });
        return request;
      }

      getLocation();
      callApi();
      callHistoryApi();
      const interval = setInterval(() => {
        getLocation();
        callApi();
        callHistoryApi();
      }, 200000);
      return () => clearInterval(interval);
  }, [dispatch, latitude, longitude, weatherLocation, searchByLocation]);

  useEffect(() => {
    async function callCompareHistoryApi() {
      const request = await axios.get(`${process.env.REACT_APP_API}/compareHistoryApi`, {
        params: {
        compareByLocation: compareByLocation
      }
      }).then(res => {
          if(res.data.error) {
            openNotification('error', 'Error', res.data.error.message);
          }
          else{
            setCompareHistoryInfo(res.data);
            dispatch(getCompareHistoricalData(res.data));
          }
      });
      return request;
    }
    if(compareByLocation !== "") {
      callCompareHistoryApi();
    }
  }, [dispatch, compareByLocation])

  const getLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
      });
  }
  }

  const getWeatherByLocation = (search_term) => {
    setWeatherLocation(search_term);
    setSearchByLocation(true);
  }

  const clearCompareByLocation = () => {
    setSearchByLocation(true);
  }

  const getCompareByLocation = (location) => {
    setCompareByLocation(location);
  }

  const openNotification = (type, message, description) => {
    if(type === "error") {
      notification.error({
        message: message,
        description: description,
        placement: 'bottomRight',
        duration: 5,
      });
    }
    else {
      notification.success({
        message: message,
        description: description,
        placement: 'bottomRight',
        duration: 5,
      });
    }
  };

  return (
    <Router>
      <div className="App">
        { locationInfo && historyInfo &&
          <Home 
            locationInfo={locationInfo} 
            historyInfo={historyInfo} 
            getWeatherByLocation={getWeatherByLocation} 
            getCompareByLocation={getCompareByLocation}
            compareHistoryInfo={compareHistoryInfo}
            weatherLocation={weatherLocation}
            clearCompareByLocation={clearCompareByLocation}
          />
        }
      </div>
    </Router>
  );
}

export default App;