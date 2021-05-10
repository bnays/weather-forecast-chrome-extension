import React, { useState } from 'react'
import LocationInfo from './LocationInfo/LocationInfo'
import SearchBox from './SearchBox/SearchBox'
import { Layout, Menu, Breadcrumb } from 'antd';
import './Home.css';
import TemperatureScaleSelect from './LocationInfo/TemperatureScaleSelect/TemperatureScaleSelect';
import HistoryInfo from './HistoryInfo/HistoryInfo';

const { Header, Content, Footer } = Layout;

function Home(props) {
    const { locationInfo, historyInfo, getWeatherByLocation, getCompareByLocation } = props;
    const [temperatureScale, setTemperatureScale] = useState('celsius');

    const changeTemperatureScale = (value) => {
        setTemperatureScale(value);
    }
    
    return (
        <div>
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <TemperatureScaleSelect temperatureScale={temperatureScale} changeTemperatureScale={changeTemperatureScale}/>
                <div className="row">
                    <div className="col-md-12">
                        <SearchBox />
                        <LocationInfo locationInfo={locationInfo} getWeatherByLocation={getWeatherByLocation} temperatureScale={temperatureScale}/>
                        <HistoryInfo historyInfo={historyInfo} temperatureScale={temperatureScale} getCompareByLocation={getCompareByLocation}/>
                    </div>
                </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </div>
    )
}

export default Home
