import React, { useState, useEffect } from 'react'
// import HourlyG2 from './HourlyGraph/HourlyG2';
import HourlyGraph from './HourlyGraph/HourlyGraph';

function HistoryInfo(props) {

    const { historyInfo, temperatureScale, getCompareByLocation, compareHistoryInfo, weatherLocation, clearCompareByLocation } = props;

    return (
        <div>
            <HourlyGraph 
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
