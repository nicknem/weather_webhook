"use strict";
require('dotenv').config();
var express = require('express');
var app = express();
var request = require('request');
var rp = require('request-promise');

// Parsing Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json

app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on port 5000!");
});

// Answer the webhook with the current weather
app.post('/webhook/location/', function(req, res) {
  console.log(req.body.result); //print the extracted data
  var city = req.body.reply;
  getWeather(city).then(function(data){
    var tempKelvin= data.main.temp;
    var tempCelsius = Math.floor(tempKelvin - 273.15);
    var weather = (data.weather[0].main).toLowerCase();
    var description = data.weather[0].description;
    res.send({
      "weather":weather,
      "temperature":tempCelsius,
      "description":description,
      "city" :city
    })
  });
})

// Get current weather
function getWeather(location) {
  return new Promise(function(resolve, reject){
    let query = location;
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
app.get("/", function(req, res) {
  getWeather("Paris").then(function(data) {
    var tempKelvin= data.main.temp;
    var tempCelsius = Math.floor(tempKelvin - 273.15);
    var weather = (data.weather[0].main).toLowerCase();
    var description = data.weather[0].description;
    console.log(`The weather is ${weather} with a ${description}. The temperature is ${tempCelsius} degrees Celsius.`);
  });
})
