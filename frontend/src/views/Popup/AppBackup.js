import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './App.css';
import { getCurrentData, getHistoricalData, getCompareHistoricalData } from '../../actions/account';
import Home from '../../components/Home';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from "react-router-dom";
import { notification } from 'antd';
import GitHubLogin from 'react-github-login';


function App() {
  
  const [locationInfo, setLocationInfo] = useState("");
  const [historyInfo, setHistoryInfo] = useState("");
  const [compareHistoryInfo, setCompareHistoryInfo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [weatherLocation, setWeatherLocation] = useState("");
  const [searchByLocation, setSearchByLocation] = useState(false);
  const [compareByLocation, setCompareByLocation] = useState("");
  const [LoggedIn, setLoggedIn] = useState(false);
  
  const dispatch = useDispatch();
  
  const onSuccess = response => {
    authenticateGithub(response);
    openNotification('success', 'Success', "Logged In Successfully.");
  }

  const onFailure = response => {
    console.log(response);
    openNotification('error', 'Error', "Authentication Failed. Please try again.");
  }

  async function authenticateGithub(response) {
    const request = await axios.get(`${process.env.REACT_APP_API}/authenticate`, {
      params: {
      code: response.code,
    }
    }).then(res => {
      window.localStorage.setItem('github-access-token', res.data.access_token);
      setLoggedIn(true);
    });
    return request;
  }

  async function checkAuthentication() {
    const request = await axios.get(`${process.env.REACT_APP_API}/checkAuthenticate`, {
      params: {
        access_token: window.localStorage.getItem('github-access-token'),
    }
    }).then(res => {
      if(res.data.success) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
      }
    });
    return request;
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if(LoggedIn) {
      getLocation();
      callApi();
      callHistoryApi();
      const interval = setInterval(() => {
        getLocation();
        callApi();
        callHistoryApi();
      }, 200000);
      return () => clearInterval(interval);
    }
  }, [dispatch, latitude, longitude, weatherLocation, searchByLocation, LoggedIn]);

  useEffect(() => {
    if(LoggedIn) {
      if(compareByLocation !== "") {
        callCompareHistoryApi();
      }
    }
    
  }, [dispatch, compareByLocation, LoggedIn])

  async function callApi() {
    const request = await axios.get(`${process.env.REACT_APP_API}/currentWeather`, {
      params: {
      access_token: window.localStorage.getItem('github-access-token'),
      latitude: latitude,
      longitude: longitude,
      location: weatherLocation,
      searchByLocation: searchByLocation
    }
    }).then(res => {
      if(res.data === "Authentication Failed") {}
      else {
        if(res.data.error) {
          openNotification('error', 'Error', "Location Not Found");
        }
        else{
          setLocationInfo(res.data);
          dispatch(getCurrentData(res.data));
        }
      }
    });
    return request;
  }
  async function callHistoryApi() {
    const request = await axios.get(`${process.env.REACT_APP_API}/historyApi`, {
      params: {
      access_token: window.localStorage.getItem('github-access-token'),
      latitude: latitude,
      longitude: longitude,
      location: weatherLocation,
      searchByLocation: searchByLocation
    }
    }).then(res => {
      if(res.data === "Authentication Failed") {}
      else {
        if(res.data.error) {
          // openNotification('error', 'Error', "Location Not Found");
        }
        else{
          setHistoryInfo(res.data);
          dispatch(getHistoricalData(res.data));
        }
      }
    });
    return request;
  }

  async function callCompareHistoryApi() {
    const request = await axios.get(`${process.env.REACT_APP_API}/compareHistoryApi`, {
      params: {
      access_token: window.localStorage.getItem('github-access-token'),
      compareByLocation: compareByLocation
    }
    }).then(res => {
      if(res.data === "Authentication Failed") {}
      else {
        if(res.data.error) {
          openNotification('error', 'Error', "Location Not Found");
        }
        else{
          setCompareHistoryInfo(res.data);
          dispatch(getCompareHistoricalData(res.data));
        }
      }
    });
    return request;
  }

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
    callHistoryApi();
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
        { !LoggedIn &&
          <GitHubLogin clientId="c395375be0b12688c9a8"
          onSuccess={onSuccess}
          redirectUri=""
          onFailure={onFailure}/> 
        }

        <button className="btn" id="sign-in">Sign In</button>
        
        { LoggedIn && locationInfo && historyInfo &&
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