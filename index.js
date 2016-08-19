"use strict";
require('dotenv').config();
var express = require('express');
var app = express();
var request = require('request');
var rp = require('request-promise');

// Setup a server with a controller to listen to the webhook you set up on Motion AI
// Call the OpenWeatherMap API
// Respond to the webhook with whatever info you want using the response from OpenWeatherMap
// Finally use Custom Variables to display info to the user

app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on port 5000!");
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/webhook', function(req, res) {
  getWeather().then(function(data){
      var weather = data.weather[0].main;
      res.send({"weather":weather})
      // res.send(data);
  });
})

function getWeather() {
  return new Promise(function(resolve, reject){
    let query="Paris"
    let uri = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.OPENWEATHER_API_KEY}`;
    // Send the request and process the data
    request.get(uri, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      }
      else {
        reject(error);
      }
    });
  })
};

