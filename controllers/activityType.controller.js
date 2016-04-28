'use strict';

var models = require('../models/index');


var getActivityTypes = function (req, res) {
	//recupère la liste des types existant
}
module.exports.getActivityTypes = getActivityTypes;

var addActivityType = function (req, res) {
	if (!req.query.id)
		return res.status(500).send('ERROR: Missing params "id"');
	if (!req.query.name)
		return res.status(500).send('ERROR: Missing params "name"');
	models.ActivityType.create({
    name: req.query.name,
		id: req.query.id,
		description: req.query.description,
	})
	.then(function(activityType) {
		return res.status(200).json(activityType);
	})
	.catch(function(err) {
		console.error(err.stack);
		return res.status(500).send('An error occured. ActivityType may already exists.');
	});
}
module.exports.addActivityType = addActivityType;

var updateActivityType = function (req, res) {
	// update an activity
}
module.exports.updateActivityType = updateActivityType;

var deleteActivityType = function (req, res) {
	//delete an activity via its id
}
module.exports.deleteActivityType = deleteActivityType;

var getActivityType = function (req, res) {
  var typeId = req.params.id;
  if (!typeId)
    return res.status(500).send('ERROR: Missing params "id"');
  models.ActivityType.findOne({where: {id: typeId}})
  .then(function (type) {
    return res.status(200).json(type);
  })
  .catch(function(err) {
    console.error(err.stack);
    return res.status(500).send('An error occured. Please try again later.');
  });
}
module.exports.getActivityType = getActivityType;
