'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(cors());

app.get('/location', (request, response) => {
  const geoData = require('./data/geo.json');
  const location = geoData.results[0].geometry.location;
  const formAddr = geoData.results[0].formatted_address;
  const search_query = geoData.results[0].address_components[0].short_name.toLowerCase();
  response.send(new Geolocation (search_query, formAddr, location));
});

function Geolocation (search_query,formAddr,location) {
  this.search_query = search_query;
  this.formatted_address = formAddr;
  this.latitude = location['lat'];
  this.longitude = location['lng'];
}

app.listen(PORT);

