'use strict'

var express = require('express');
var PlaceController = require('../controllers/place');

var api = express.Router();
var md_auth = require('../middelwares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/locations'});

api.post('/save-place', md_auth.ensureAuth , PlaceController.savePlace);
api.get('/get-places/:page?', md_auth.ensureAuth , PlaceController.getPlaces);
api.get('/get-place/:woeid', md_auth.ensureAuth , PlaceController.getPlace);
api.get('/get-weather/:woeid', md_auth.ensureAuth , PlaceController.getWeather);
api.get('/get-weather-celcius/:woeid', md_auth.ensureAuth , PlaceController.getWeatherCelcius);



module.exports = api;   