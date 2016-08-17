require('dotenv').config();
var express = require('express');
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log("Listening on port 3000!");
});

// Setup a server with a controller to listen to the webhook you set up on Motion AI
// Call the OpenWeatherMap API
// Respond to the webhook with whatever info you want using the response from OpenWeatherMap
// Finally use Custom Variables to display info to the user

// It gets location from Motion.AI

var baseURI = 'api.openweathermap.org/data/2.5/weather?q=';
var getCurrentWeather = function(uri, query) {
  // Call weather API
  var uri = baseURI + query;
  var openweatherKey = process.env.OPENWEATHER_KEY;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", uri, false);
  xhr.send();
  console.log(xhr.status);
  console.log(xhr.stautsText);
};

console.log(getCurrentWeather(baseURI, "Paris"));
