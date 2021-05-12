import React from 'react'
import { Select } from 'antd';
import './TemperatureScaleSelect.css';

const { Option } = Select;

function TemperatureScaleSelect(props) {

    const { changeTemperatureScale, temperatureScale } = props;

    return (
        <div className="TemperatureInput">
            <span>Unit: </span>
            <Select defaultValue={temperatureScale} style={{ width: 160 }} onChange={changeTemperatureScale}>
                <Option value="celsius">Temperature(°C)</Option>
                <Option value="fahrenheit">Temperature(°F)</Option>
            </Select>
        </div>
    )
}

export default TemperatureScaleSelect
