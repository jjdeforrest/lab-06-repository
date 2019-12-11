'use strict';

// DEPENDENCIES
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());

// GLOBAL VARIABLES
let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let error = {
  status: 500,
  responseText: "Sorry, something went wrong",
}

// LOCATION PATH
app.get('/location', (request, response) => {

  const geoData = require('./data/geo.json');
  let query = request.query.data.toLowerCase();
  const location = geoData.results[0].geometry.location;
  const formAddr = geoData.results[0].formatted_address;
  const search_query = geoData.results[0].address_components[0].short_name.toLowerCase();
  if (query !== search_query) {
    response.send(error);
    console.log(error);
    return null;
  }
  response.send(new Geolocation (search_query, formAddr, location));
});
// LOCATION CONSTRUCTOR FUNCTION
function Geolocation (search_query,formAddr,location) {

  this.search_query = search_query;
  this.formatted_address = formAddr;
  this.latitude = location.lat;
  this.longitude = location.lng;
}

// WEATHER PATH
app.get('/weather', (request , response ) => {
  const reply = [];
  const weatherData = require('./data/darksky.json');
  const weatherArr = weatherData.daily.data
  for (let i = 0; i < weatherArr.length; i++) {
    reply.push(new Forecast (weatherArr[i].summary, weatherArr[i].time));
  }
  response.send( reply );
})

// FORECAST CONSTRUCTOR FUNCTION
function Forecast (summary, time) {
  this.forecast = summary;
  this.time = getDate(new Date(time));
}

// RETURNS FORMATTED DATE STRING
function getDate (time) {
  let day = weekday[time.getDay()];
  let month = months[time.getMonth()];
  let date = time.getDate();
  let year = time.getFullYear();
  return `${day} ${month} ${date} ${year}`;
}

app.listen(PORT);

