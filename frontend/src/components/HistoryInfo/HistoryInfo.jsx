import React, { useState, useEffect } from 'react'
import HourlyG2 from './HourlyGraph/HourlyG2';
import HourlyGraph from './HourlyGraph/HourlyGraph';

function HistoryInfo(props) {

    const { historyInfo, temperatureScale, getCompareByLocation } = props;

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
        console.log(hourDataArray);
        setDataSet(hourDataArray);
    }, [temperatureScale]);

    return (
        <div>
            <HourlyG2 data={dataSet} temperatureScale={temperatureScale} getCompareByLocation={getCompareByLocation} />
        </div>
    )
}

export default HistoryInfo
