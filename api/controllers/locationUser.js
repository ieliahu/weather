'use strict'

var path = require('path');
//var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var LocationsUser = require('../models/locationUser');

function getLocationsUser(req, res){
	
	var userId = req.params.user;

	if(!userId){
		//Saco todas las LocationsUser de la DB
		var find = LocationsUser.find({}).sort('name');
	}else{
		//Sacar las locaciones de un usuario concreto de la DB
		var find = LocationsUser.find({user: userId}).sort('name');
	}

	find.populate({path: 'user'}).exec((err, locationsUser) => {
		if(err){
			res.status(500).send({message: 'Error en la peición'});
		}else{
			if(!locationsUser){
				res.status(404).send({message: 'No hay locaciones asociadas a este usuario'});
			}else{
				res.status(200).send({locationsUser}); 
			}
		}
	});
}

function saveLocationUser(req, res){
	var locationUser = new LocationsUser();

	var params = req.body;
	locationUser.woeid = params.woeid; 
	locationUser.name = params.name;
	locationUser.user = params.user;

	locationUser.save((err, locationUserStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!locationUserStored){
				res.status(404).send({message: 'No se guardó la Locación'})
			}else{
				res.status(200).send({locationUser: locationUserStored});
			}
		}
	});
}

function deleteLocationUser(req, res){

	var woeidLocationUser = req.params.woeid;

	LocationsUser.find({woeid: woeidLocationUser}).remove((err, locationUserRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!locationUserRemoved){
				res.status(404).send({message: 'No se elimino la Locación'})
			}else{
				res.status(200).send({locationUser: locationUserRemoved});
			}
		}
	});
}


module.exports = {
	getLocationsUser,
	saveLocationUser,
	deleteLocationUser
};