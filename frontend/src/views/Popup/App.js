import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './App.css';
import { getCurrentData, getHistoricalData, getCompareHistoricalData } from '../../actions/account';
import Home from '../../components/Home';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from "react-router-dom";
import { notification } from 'antd';

function App() {

  const [locationInfo, setLocationInfo] = useState("");
  const [historyInfo, setHistoryInfo] = useState("");
  const [compareHistoryInfo, setCompareHistoryInfo] = useState("");
  // const [currentDay, setCurrentDay] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [weatherLocation, setWeatherLocation] = useState("");
  const [searchByLocation, setSearchByLocation] = useState(false);
  const [compareByLocation, setCompareByLocation] = useState("");

  const dispatch = useDispatch();
  
  useEffect(() => {
    getLocation();
    const date = new Date();
    // const dayInWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    // setCurrentDay(dayInWeek[date.getDay()]);
    async function callApi() {
      const request = await axios.get(`${process.env.REACT_APP_API}/currentWeather`, {
        params: {latitude: latitude,
        longitude: longitude,
        location: weatherLocation,
        searchByLocation: searchByLocation
      }
      }).then(res => {
        if(res.data.error) {
          openNotification('error');
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
        params: {latitude: latitude,
        longitude: longitude,
        location: weatherLocation,
        searchByLocation: searchByLocation
      }
      }).then(res => {
        if(res.data.error) {
          openNotification('error');
        }
        else{
          setHistoryInfo(res.data);
          dispatch(getHistoricalData(res.data));
        }
      });
      return request;
    }
    callApi();
    callHistoryApi();
  }, [latitude, longitude, weatherLocation]);

  useEffect(() => {
    async function callHistoryApi() {
      const request = await axios.get(`${process.env.REACT_APP_API}/historyApi`, {
        params: {latitude: latitude,
        longitude: longitude,
        location: weatherLocation,
        searchByLocation: searchByLocation,
        compareByLocation: compareByLocation
      }
      }).then(res => {
        if(res.data.error) {
          openNotification('error');
        }
        else{
          setCompareByLocation(res.data);
          dispatch(getCompareHistoricalData(res.data));
        }
      });
      return request;
    }

    compareByLocation !== "" && callHistoryApi();
    
  }, [compareByLocation])

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

  const getCompareByLocation = (location) => {
    setCompareByLocation(location);
  }

  const openNotification = () => {
    notification.error({
      message: `Error`,
      description: 'Location Not Found.',
      placement: 'bottomRight',
      duration: 5,
    });
  };

  return (
    locationInfo && historyInfo &&
    <Router>
      <div className="App">
        <Home locationInfo={locationInfo} historyInfo={historyInfo} getWeatherByLocation={getWeatherByLocation} getCompareByLocation={getCompareByLocation}/>
      </div>
    </Router>
  );
}

export default App;