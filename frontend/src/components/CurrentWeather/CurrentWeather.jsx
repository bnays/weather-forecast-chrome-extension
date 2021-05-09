import React, { useState, useEffect } from 'react'

function CurrentWeather(props) {
    const { currentWeather } = props;
    const [currentDay, setCurrentDay] = useState("");

    useEffect(() => {
        const date = new Date();
        const dayInWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        setCurrentDay(dayInWeek[date.getDay()]);
    }, [])

    return (
        currentWeather &&
        <div>
            <p>
            {currentWeather.current.temp_c}°C
            </p>
            <p>{currentWeather.location.name}, {currentWeather.location.country}</p>
            <p>{currentWeather.location.localtime}</p>
            <p>{currentDay}</p>
            <p>{currentWeather.current.condition.text}</p>
            <img src={currentWeather.current.condition.icon} alt="" />
        </div>
    )
}

export default CurrentWeather
