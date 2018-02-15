'use strict'

var mongoose = require('mongoose');
var app = require('./app') //Se carga el fichero de app (express)
var port = process.env.PORT || 3977; //Puerto de servidor web de Node

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/weather', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("Conexión a la DB exitosa...");

		app.listen(port, function(){
			console.log("Servidor del api rest escuchando en http://localhost:"+port);
		});
	}
});