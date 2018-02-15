'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LocationUserSchema = Schema({
	woeid: String,
	name: String,
	user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('LocationUser', LocationUserSchema);