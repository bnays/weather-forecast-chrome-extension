import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [apiResponse, setApiResponse] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const dayInWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  
  useEffect(() => {
    const date = new Date();
    setCurrentDay(dayInWeek[date.getDay()]);
    async function callApi() {
      const request = await axios.get(`${process.env.REACT_APP_API}/currentWeather`).then(res => {
        console.log(res.data);
        setApiResponse(res.data);
      });
      return request;
    }
    callApi();
  }, []);

  return (
    apiResponse &&
    <div className="App">
      <header className="App-header">
        <p>
          {apiResponse.current.temp_c}°C
        </p>
        <p>{apiResponse.location.name}, {apiResponse.location.country}</p>
        <p>{apiResponse.location.localtime}</p>
        <p>{currentDay}</p>
        <p>{apiResponse.current.condition.text}</p>
        <img src={apiResponse.current.condition.icon} alt="" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;