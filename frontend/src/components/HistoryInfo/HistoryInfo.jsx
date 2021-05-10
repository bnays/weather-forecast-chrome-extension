import React, { useState, useEffect } from 'react'
import HourlyG2 from './HourlyGraph/HourlyG2';
import HourlyGraph from './HourlyGraph/HourlyGraph';

function HistoryInfo(props) {

    const { historyInfo } = props;

    const [forecastDay, setForecastDay] = useState([]);

    const datas = [
        [10, 30, 40, 20],
        [10, 40, 30, 20, 50, 10],
        [60, 30, 40, 20, 30]
    ]
    var i = 0;

    const [data, setData] = useState([]);

    const [dataSet, setDataSet] = useState([]);

    useEffect(() => {
        changeData();
    }, []);

    const changeData = () => {
        setData(datas[i++]);
        if(i === datas.length) i = 0;
    }

    
    useEffect(() => {
        let hourDataArray = [];
        setForecastDay(historyInfo.forecast.forecastday);
        historyInfo.forecast.forecastday.map((item, index) => {
            return (
                    // item.hour.map((v, i) => {
                    //     return (
                    //         hourDataArray.push(v.time+","+v.temp_c)
                    //     )
                    // })
                    hourDataArray.push({
                        name: historyInfo.location.name+", "+historyInfo.location.country,
                        values: 
                            item.hour.map((v, i) => {
                                return (
                                { date: v.time+":00", temp: v.temp_c } 
                                )
                            })
                })
            )
        });
        console.log(hourDataArray);
        setDataSet(hourDataArray);
    }, [])

    return (
        <div>
            {/* <HourlyGraph data={dataSet} width={600} height={400} /> */}
            <HourlyG2 data={dataSet} width={600} height={400} />
        </div>
    )
}

export default HistoryInfo
