'use strict';

var models = require('../models/index');


var getActivities = function (req, res) {
	//recupère la liste des activités
}
module.exports.getActivities = getActivities;

var addActivity = function (req, res) {
	if (!req.query.name)
		return res.status(500).send('ERROR: Missing params "name"');
		console.log('TYPE: ',req.query.type_id);
	models.Activity.create({
		name: req.query.name,
		description: req.query.description,
		ActivityTypeId: req.query.type_id,
		tags: req.query.tags,
		address: req.query.address,
		latitude: req.query.latitude,
		longitude: req.query.longitude,
		temporary: req.query.temporary,
		date_start: req.query.date_start,
		date_end: req.query.date_end,
		opening_hours: req.query.opening_hours,
	})
	.then(function(activity) {
		return res.status(200).json(activity);
	})
	.catch(function(err) {
		console.error(err.stack);
		return res.status(500).send('An error occured when creating an activity with no type. Activity may already exists.');
	});
}
module.exports.addActivity = addActivity;

var updateActivity = function (req, res) {
	// update an activity
}
module.exports.updateActivity = updateActivity;

var deleteActivity = function (req, res) {
	//delete an activity via its id
}
module.exports.deleteActivity = deleteActivity;

var getActivity = function (req, res) {
	//get an activity via its id
}
module.exports.getActivity = getActivity;
