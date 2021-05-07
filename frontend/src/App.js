import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  const [apiResponse, setApiResponse] = useState("");
  
  useEffect(() => {
    async function callApi() {
      const request = await axios.get(`${process.env.REACT_APP_API}/testApi`).then(res => {
        console.log(res);
        setApiResponse(res.data);
      });
      return request;
    }
    callApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {apiResponse}
        </p>
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
