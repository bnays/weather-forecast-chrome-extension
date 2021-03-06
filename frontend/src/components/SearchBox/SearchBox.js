import React, { useState } from 'react'
import { Input, Select } from 'antd';
import './SearchBox.css';

const { Option } = Select;

function SearchBox() {

   const [searchEngine, setSearchEngine] = useState('Google');
   const [searchTerm, setSearchTerm] = useState('');

   const selectBefore = (
      <Select defaultValue="Google" className="select-before" onChange={(e) => changeSearchEngine(e)}>
         <Option value="Google">Google</Option>
         <Option value="Bing">Bing</Option>
         <Option value="DuckDuckGo">DuckDuckGo</Option>
      </Select>
   );

   const changeSearchEngine = (value) => {
      setSearchEngine(value);
   }

   const changeValue = (e) => {
      setSearchTerm(e.target.value);
   }

   const redirectToSearchEngine = () =>{
      let domainName = "";
      if(searchEngine === "Google") {
         domainName = "https://www.google.com/search?q=";
      }
      else if(searchEngine === "Bing") {
         domainName = "https://www.bing.com/search?q=";
      }
      else {
         domainName = "https://duckduckgo.com/?q=";
      }
      window.open(domainName+searchTerm);
    }

   return (
      <div>
         <div style={{ marginBottom: 16, maxWidth: 500, textAlign:'center', margin: 'auto' }}>
               <span className="searchBox_label">Search from your favourite search engine.</span>
               <Input.Search size="large" addonBefore={selectBefore} placeholder={"Search in "+searchEngine} onChange={changeValue} onSearch={redirectToSearchEngine}/>
         </div>
      </div>
   )
}

export default SearchBox
