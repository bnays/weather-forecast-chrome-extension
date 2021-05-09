import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './App.css';
import { getRobots } from '../../actions/account';
import Home from '../../components/Home';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [currentWeather, setCurrentWeather] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  const dispatch = useDispatch();
  
  useEffect(() => {
    const date = new Date();
    const dayInWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    setCurrentDay(dayInWeek[date.getDay()]);
    async function callApi() {
      const request = await axios.get(`${process.env.REACT_APP_API}/currentWeather`).then(res => {
        setCurrentWeather(res.data);
        dispatch(getRobots(res.data));
      });
      return request;
    }
    callApi();
  }, []);

  return (
    currentWeather &&
    <Router>
      <div className="App">
        <Home currentWeather={currentWeather}/>
      </div>
    </Router>
  );
}

export default App;