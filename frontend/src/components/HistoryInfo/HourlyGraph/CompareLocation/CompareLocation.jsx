import React, { useState } from 'react'
import { Input } from 'antd';
import './CompareLocation.css';

function CompareLocation(props) {  

    const { getCompareByLocation } = props;

    const [searchTerm, setSearchTerm] = useState('');

    const changeValue = (e) => {
        setSearchTerm(e.target.value);
    }
    
    return (
        <div className="compare_input">
            <Input.Search 
                size="large" 
                onChange={changeValue}
                onSearch={() => getCompareByLocation(searchTerm)}
                placeholder="Compare with another location"
            />
        </div>
    )
}

export default CompareLocation
