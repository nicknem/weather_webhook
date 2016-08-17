require('dotenv').config();
var express = require('express');
var app = express();
var openweatherKey = process.env.OPENWEATHER_KEY;

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

var getCurrentWeather = function(uri, location) {
  // Call weather API
};
