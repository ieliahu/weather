'use strict'

var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Place = require('../models/place');

function savePlace(req, res){
	var place = new Place();

	var params = req.body;
	place.woeid = params.woeid;
	place.name = params.name;

	place.save((err, placeStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el lugar'});
		}else{
			if(!placeStored){
				res.status(404).send({message: 'El lugar no se guardó'});
			}else{
				res.status(200).send({place: placeStored});
			}
		}
	});
}



function getPlace(req, res){
	var placeWoeid = req.params.woeid;

	Place.findOne({woeid: placeWoeid}, (err, place) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!place){
				res.status(404).send({message: 'El lugar no existe'});
			}else{
				res.status(200).send({place});
			}
		}
	});
}

function getWeather(req, res){
		var YQL = require('yql');
		var placeWoeid = req.params.woeid;
		
	    var query = new YQL("select item.condition, location.city, location.country from weather.forecast where woeid ="+placeWoeid); 
        
		query.exec(function(err, data) {
			if(err){
				res.status(500).send({message: 'Error en la petición'});
			}else{
				if(!data){
					res.status(404).send({message: 'No se encontró el clima'});
				}else{
					res.status(200).send({data
						
					});
				}
			}
		});	
}


function getWeatherCelcius(req, res){
		var YQL = require('yql');
		var placeWoeid = req.params.woeid;
		
        var query = new YQL("select item from weather.forecast where u='c' and woeid ="+placeWoeid);
		query.exec(function(err, data) {
			if(err){
				res.status(500).send({message: 'Error en la petición'});
			}else{
				if(!data){
					res.status(404).send({message: 'No se encontró el clima'});
				}else{
					res.status(200).send({data
						
					});
				}
			}
		});	
}

function getPlaces(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
    
    var itemsPerPage = 3;
	
	Place.find().sort('name').paginate(page, itemsPerPage, function(err, places, total){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!places){
				res.status(500).send({message: 'No hay Locaciones'});
			}else{
				res.status(200).send({
					pages: total,
					places: places
				});
			}
		}
	});
}

module.exports = {
	savePlace,
	getPlace,
	getPlaces,
	getWeather,
	getWeatherCelcius
};