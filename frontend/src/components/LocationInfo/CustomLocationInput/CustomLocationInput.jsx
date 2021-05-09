import React, { useState } from 'react'
import { Input } from 'antd';
import { CompassOutlined } from '@ant-design/icons';

function CustomLocationInput(props) {  

    const { getWeatherByLocation } = props;

    const [searchTerm, setSearchTerm] = useState('');

    const changeValue = (e) => {
        setSearchTerm(e.target.value);
    }
    
    return (
        <div style={{ marginBottom: 16, maxWidth: 500, textAlign:'center', margin: 'auto' }}>
            <Input.Search 
                size="large" 
                onChange={changeValue}
                onSearch={() => getWeatherByLocation(searchTerm)}
                placeholder="Find Weather By City" 
                prefix={<CompassOutlined />} 
            />
        </div>
    )
}

export default CustomLocationInput
