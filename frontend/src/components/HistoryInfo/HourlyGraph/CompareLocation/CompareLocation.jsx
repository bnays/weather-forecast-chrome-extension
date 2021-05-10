import React, { useState } from 'react'
import { Input } from 'antd';

function CompareLocation(props) {  

    const { getCompareByLocation, clearCompareByLocation } = props;

    const [searchTerm, setSearchTerm] = useState('');

    const changeValue = (e) => {
        setSearchTerm(e.target.value);
    }
    
    return (
        <div style={{ marginBottom: 16, maxWidth: 500, textAlign:'center', margin: 'auto' }}>
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
