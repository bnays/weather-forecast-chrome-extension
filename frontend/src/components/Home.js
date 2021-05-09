import React from 'react'
import CurrentLocationInfo from './CurrentLocationInfo/CurrentLocationInfo'
import CurrentWeather from './CurrentWeather/CurrentWeather'
import SearchBox from './SearchBox/SearchBox'

function Home(props) {
    const { currentWeather } = props;
    
    return (
        <div>
            <SearchBox></SearchBox>
            <CurrentWeather currentWeather={currentWeather}></CurrentWeather>
            <CurrentLocationInfo></CurrentLocationInfo>
        </div>
    )
}

export default Home
