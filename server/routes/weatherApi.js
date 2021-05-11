var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

const date = new Date();
const dateOnly = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
const accessToken = [];

router.get("/authenticate", function(req, res) {
    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const requestToken = req.query.code;

    fetch("https://github.com/login/oauth/access_token?client_id="+clientID+"&client_secret="+clientSecret+"&code="+requestToken, {
        method: 'POST',
        headers: { 'accept': 'application/json' }
    })
    .then(res => res.json())
    .then(json => {
        accessToken.push(json.access_token);
        res.send(json);
    })
    .catch(err => console.log(err));

})

router.get("/checkAuthenticate", function(req, res) {
    if(accessToken.includes(req.query.access_token)) {
        res.send({success: true});
    }
    else {
        res.send({success: false});
    }
})

router.get("/currentWeather", function(req, res) {
    if(accessToken.includes(req.query.access_token)) {
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
    }
    else {
        res.send("Authentication Failed");
    }
});

router.get("/historyApi", function(req, res) {
    if(accessToken.includes(req.query.access_token)) {
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
    }
    else {
        res.send("Authentication Failed");
    }
});

router.get("/compareHistoryApi", function(req, res) {
    if(accessToken.includes(req.query.access_token)) {
        let queryParameter = req.query.compareByLocation;

        fetch("https://api.weatherapi.com/v1/history.json?key="+process.env.APP_KEY+"&q="+queryParameter+"&dt="+dateOnly)
        .then(res => res.json())
        .then(json => {
            res.send(json);
        })
        .catch(err => console.log(err));
    }
    else {
        res.send("Authentication Failed");
    }
});

module.exports = router;