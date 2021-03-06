var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

const date = new Date();
const dateOnly = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

router.get("/currentWeather", function(req, res) {
    let queryParameter = "";

    if(req.query.searchByLocation == 'true') {
        queryParameter = req.query.location;
    }
    else if(req.query.latitude !== "" && req.query.longitude !== "") {
        queryParameter = req.query.latitude+","+req.query.longitude;
    }
    else {
        queryParameter = "Kathmandu";
    }

    fetch("https://api.weatherapi.com/v1/current.json?key="+process.env.APP_KEY+"&q="+queryParameter)
    .then(res => res.json())
    .then(json => {
        res.send(json);
    })
    .catch(err => console.log(err));
});

router.get("/historyApi", function(req, res) {
    let queryParameter = "";
    if(req.query.searchByLocation == 'true') {
        queryParameter = req.query.location;
    }
    else if(req.query.latitude !== "" && req.query.longitude !== "") {
        queryParameter = req.query.latitude+","+req.query.longitude;
    }
    else {
        queryParameter = "Kathmandu";
    }

    fetch("https://api.weatherapi.com/v1/history.json?key="+process.env.APP_KEY+"&q="+queryParameter+"&dt="+dateOnly)
    .then(res => res.json())
    .then(json => {
        res.send(json);
    })
    .catch(err => console.log(err));
});

router.get("/compareHistoryApi", function(req, res) {
    let queryParameter = req.query.compareByLocation;

    fetch("https://api.weatherapi.com/v1/history.json?key="+process.env.APP_KEY+"&q="+queryParameter+"&dt="+dateOnly)
    .then(res => res.json())
    .then(json => {
        res.send(json);
    })
    .catch(err => console.log(err));
});

module.exports = router;