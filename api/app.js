'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var location_user_routes = require('./routes/locationUser');
var places_routes = require('./routes/place');

app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

//Configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//Rutas base
app.use('/api', user_routes); 
app.use('/api', location_user_routes); 
app.use('/api', places_routes); 

module.exports = app;