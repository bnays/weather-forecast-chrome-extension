import React, { useState, useEffect } from 'react'
// import HourlyG2 from './HourlyGraph/HourlyG2';
import HourlyGraph from './HourlyGraph/HourlyGraph';

function HistoryInfo(props) {

    const { historyInfo, temperatureScale, getCompareByLocation, compareHistoryInfo, weatherLocation, clearCompareByLocation } = props;

    const [dataSet, setDataSet] = useState([]);
    
    useEffect(() => {
        let hourDataArray = [];
        
        historyInfo.forecast.forecastday.map((item, index) => {
            return (
                    hourDataArray.push({
                        name: historyInfo.location.name+", "+historyInfo.location.country,
                        values: 
                            item.hour.map((v, i) => {
                                return (
                                    temperatureScale === "celsius" ?
                                { date: v.time+":00", temp: v.temp_c } 
                                : { date: v.time+":00", temp: v.temp_f } 
                                )
                            })
                })
            )
        });
        if(compareHistoryInfo !== "") {
            compareHistoryInfo.forecast.forecastday.map((item, index) => {
                return (
                        hourDataArray.push({
                            name: compareHistoryInfo.location.name+", "+compareHistoryInfo.location.country,
                            values: 
                                item.hour.map((v, i) => {
                                    return (
                                        temperatureScale === "celsius" ?
                                    { date: v.time+":00", temp: v.temp_c } 
                                    : { date: v.time+":00", temp: v.temp_f } 
                                    )
                                })
                    })
                )
            }); 
        }
        setDataSet(hourDataArray);
    }, [temperatureScale, compareHistoryInfo, weatherLocation]);

    return (
        <div>
            {/* <HourlyG2 data={dataSet} temperatureScale={temperatureScale} getCompareByLocation={getCompareByLocation} /> */}
            <HourlyGraph 
                data={dataSet} 
                historyInfo={historyInfo} 
                compareHistoryInfo={compareHistoryInfo} 
                temperatureScale={temperatureScale} 
                getCompareByLocation={getCompareByLocation} 
                weatherLocation={weatherLocation} 
                clearCompareByLocation={clearCompareByLocation}
            />
        </div>
    )
}

export default HistoryInfo
