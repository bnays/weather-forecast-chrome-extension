var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get("/currentWeather", function(req, res) {
    fetch("https://api.weatherapi.com/v1/current.json?key="+process.env.APP_KEY+"&q=Lalitpur")
    .then(res => res.json())
    .then(json => {
        console.log(json);
        res.send(json);
    })
    .catch(err => console.log(err));
});

module.exports = router;