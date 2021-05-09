import React, { useState, useEffect } from 'react'
import CustomLocationInput from './CustomLocationInput/CustomLocationInput';
import './LocationInfo.css'

function LocationInfo(props) {

    const { locationInfo, getWeatherByLocation } = props;
    const [currentDay, setCurrentDay] = useState("");
    const [localTime, setLocalTime] = useState("");

    useEffect(() => {
        const date = new Date();
        const dayInWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        setCurrentDay(date.toDateString());

        const interval = setInterval(() => {
            getLocalTime();
          }, 1000);
          return () => clearInterval(interval);
    }, [])

    const getLocalTime = () => {
        setLocalTime(new Date().toLocaleTimeString());
    }

    return (
        locationInfo &&
        <div>
            <h1 className="local_time">{localTime}</h1>
            <h3 className="current_day">{currentDay}</h3>
            <h3 className="location">{locationInfo.location.name}, {locationInfo.location.country}</h3>
            <div className="weather_condition">
                <CustomLocationInput getWeatherByLocation={getWeatherByLocation}></CustomLocationInput>
                <div className="row">
                    <div className="col-md-6">
                        <img src={locationInfo.current.condition.icon} alt="" />
                    </div>
                    <div className="col-md-6">
                        <h3>{locationInfo.current.temp_c}°C</h3>
                    </div>
                </div>
                <h3>{locationInfo.current.condition.text}</h3>
            </div>
        </div>
    )
}

export default LocationInfo
