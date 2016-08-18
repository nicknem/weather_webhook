require('dotenv').config();
var express = require('express');
var app = express();
var request = require('request');


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/webhook', function(req, res) {
  // Call the function that gets the weather
  uri = "http://www.infoclimat.fr/public-api/gfs/json?_ll=48.85341,2.3488&_auth=AxkDFFMtVHYEKQcwAHYLIlgwBzIKfAIlAX1RMl04AH0JYlY3Dm4HYVc5UC0PIAM1AC0HZA02BDQCaVEpWCpfPgNpA29TOFQzBGsHYgAvCyBYdgdmCioCJQFqUTRdLgBhCWlWNg5zB2RXOlA1DyEDNgA2B2MNLQQjAmBRMlgyXz0DZQNnUzVUMwRpB2MALwsgWG4HYApnAj8BZFEyXTcAZQlvVjUOOAc2V2lQNw8hAzQANwdmDTUEPwJpUTBYMF8jA38DHlNDVCsEKwcnAGULeVh2BzIKawJu&_c=4b9f518e8ed378f74c951c21f0fae953"
  request.get(uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body); // Print the data
    }
    else {
      console.log(response.statusCode, body);
    }
  })
})

app.listen(3000, function() {
  console.log("Listening on port 3000!");
});

// Setup a server with a controller to listen to the webhook you set up on Motion AI
// Call the OpenWeatherMap API
// Respond to the webhook with whatever info you want using the response from OpenWeatherMap
// Finally use Custom Variables to display info to the user

// It gets location from Motion.AI

// var baseURI = 'api.openweathermap.org/data/2.5/weather?q=';
// var openweatherKey = process.env.OPENWEATHER_KEY;
// var uri = baseURI + "Paris" + "&appid=" + openweatherKey;
// REQUEST TO INFO CLIMAT URI WORKS HERE


