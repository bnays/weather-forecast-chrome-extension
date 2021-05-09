import React from 'react'
import LocationInfo from './LocationInfo/LocationInfo'
import SearchBox from './SearchBox/SearchBox'
import { Layout, Menu, Breadcrumb } from 'antd';
import './Home.css';

const { Header, Content, Footer } = Layout;

function Home(props) {
    const { locationInfo, getWeatherByLocation } = props;
    
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
                <div className="row">
                    <div className="col-md-12">
                        <SearchBox></SearchBox>
                        <LocationInfo locationInfo={locationInfo} getWeatherByLocation={getWeatherByLocation} ></LocationInfo>
                    </div>
                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </div>
    )
}

export default Home
