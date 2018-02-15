'use strict'

var express = require('express');
var LocationUserController = require('../controllers/locationUser');

var api = express.Router();
var md_auth = require('../middelwares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/locations'});

api.get('/get-locations-user/:user', md_auth.ensureAuth , LocationUserController.getLocationsUser);
api.post('/save-location-user', md_auth.ensureAuth , LocationUserController.saveLocationUser);
api.delete('/delete-location-user/:woeid', md_auth.ensureAuth , LocationUserController.deleteLocationUser);


module.exports = api;   