import React, { useState, useEffect } from 'react'
import LocationInfo from './LocationInfo/LocationInfo'
import SearchBox from './SearchBox/SearchBox'
import { Layout, Menu, Breadcrumb } from 'antd';
import './Home.css';
import TemperatureScaleSelect from './LocationInfo/TemperatureScaleSelect/TemperatureScaleSelect';
import HistoryInfo from './HistoryInfo/HistoryInfo';

const { Header, Content, Footer } = Layout;

function Home(props) {
    const { locationInfo, historyInfo, getWeatherByLocation, getCompareByLocation, compareHistoryInfo, weatherLocation, clearCompareByLocation } = props;
    const [temperatureScale, setTemperatureScale] = useState('celsius');
    const [fillColor1, setFillColor1] = useState("gold");
    const [fillColor2, setFillColor2] = useState("yellow");
    const [svgStyle, setSvgStyle] = useState('0');
    const [wrapperBackgroundColor, setWrapperBackgroundColor] = useState('#95c7ef');

    const changeTemperatureScale = (value) => {
        setTemperatureScale(value);
    }

    useEffect(() => {
        getHour();
        const interval = setInterval(() => {
            getHour();
          }, 60000);
          return () => clearInterval(interval);
    }, [])

    const getHour = () => {
        const date = new Date();
        const hour = date.getHours();
        console.log(hour);
        if(hour < 6 || hour >= 13 ) {
            setFillColor1("gray");
            setFillColor2("black");
            setSvgStyle('76%');
            setWrapperBackgroundColor('#567e9e');
        }
        else {
            setFillColor1("gold");
            setFillColor2("yellow");
            setSvgStyle('0');
            setWrapperBackgroundColor('#95c7ef');
        }
    }
    
    return (
        <div className="wrapper" style={{backgroundColor: `${ wrapperBackgroundColor }`}}>
            <Layout className="layout">
                <Content style={{ padding: '0' }}>
                        <svg width="300" height="300" className="sun" style={{left: `${ svgStyle }`}}>
                            <defs>
                            <filter id="dropshadow" height="130%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
                                <feOffset dx="2" dy="2" result="offsetblur"/> 
                                <feComponentTransfer>
                                    <feFuncA type="linear" slope="0.5"/> 
                                </feComponentTransfer>
                                <feMerge> 
                                    <feMergeNode/> 
                                    <feMergeNode in="SourceGraphic"/> 
                                </feMerge>
                            </filter>
                            </defs>
                            <circle r="100" cx="150" cy="150" fill={fillColor1} filter="url(#dropshadow)"/>
                            <circle r="80" cx="150" cy="150" fill={fillColor2}/>
                        </svg>
                        <div>
                            <TemperatureScaleSelect temperatureScale={temperatureScale} changeTemperatureScale={changeTemperatureScale}/>
                            <SearchBox />
                        </div>
                        <div className="clearfix"></div>
                        <div className="main-content">
                            <LocationInfo locationInfo={locationInfo} getWeatherByLocation={getWeatherByLocation} temperatureScale={temperatureScale}/>
                            <HistoryInfo 
                                historyInfo={historyInfo} 
                                temperatureScale={temperatureScale} 
                                getCompareByLocation={getCompareByLocation}
                                compareHistoryInfo={compareHistoryInfo}
                                weatherLocation={weatherLocation}
                                clearCompareByLocation={clearCompareByLocation}
                            />
                        </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </div>
    )
}

export default Home
