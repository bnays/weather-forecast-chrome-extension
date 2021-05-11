import React, { useState, useEffect } from 'react'
import CustomLocationInput from './CustomLocationInput/CustomLocationInput';
import { Row, Col } from 'antd';
import './LocationInfo.css'

function LocationInfo(props) {

    const { locationInfo, getWeatherByLocation, temperatureScale } = props;
    const [currentDay, setCurrentDay] = useState("");
    const [localTime, setLocalTime] = useState("");

    useEffect(() => {
        const date = new Date();
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
        <div className="container">
            <h1 className="local_time">{localTime}</h1>
            
            <div className="weather_condition">
                <CustomLocationInput getWeatherByLocation={getWeatherByLocation}></CustomLocationInput>
                <div className="weather_container">
                    <Row>
                        <Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
                            <div className="location">
                                <h3 className="current_day">{currentDay}</h3>
                                <h3 className="location">{locationInfo.location.name}, {locationInfo.location.country}</h3>
                            </div>
                        </Col>
                        <Col span={8} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 3 }}>
                            <div className="weather_info_image">
                                <img src={"./images/"+locationInfo.current.condition.icon.split("/")[5]+"/"+locationInfo.current.condition.icon.split("/")[6]} alt="" />
                            </div>
                        </Col>
                        <Col span={8} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 1 }}>
                            <div className="weather_info">
                                <h3>{ temperatureScale === 'celsius' ? locationInfo.current.temp_c+"°C" : locationInfo.current.temp_f+"°F" }</h3>
                                <h3>{locationInfo.current.condition.text}</h3>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default LocationInfo
