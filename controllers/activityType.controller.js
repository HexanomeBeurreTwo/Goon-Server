'use strict';

var models = require('../models/index');


var getActivityTypes = function (req, res) {
	//recupère la liste des types existant
	return res.status(200).json({message: "Not implemented yet."});
}
module.exports.getActivityTypes = getActivityTypes;

/**
 * Controller for POST /activitytype/
 * Creates a type of  activity in the database
 * @param {string} id : a generic, UPPERCASE id, ex: BAR for bars - required
 * @param {string} name : a friendly, readable id, ex: bars - required
 * @param {description} description : a description of the activity type
 * @return {activityType} activityType if creating, error else
 */
var addActivityType = function (req, res) {
	if (!req.body.id)
		return res.status(500).send('ERROR: Missing params "id"');
	if (!req.body.name)
		return res.status(500).send('ERROR: Missing params "name"');
	models.ActivityType.create({
    name: req.body.name,
		id: req.body.id,
		description: req.body.description,
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

/**
 * Controller for GET /activitytype/:id
 * Return a type of activity by id
 * @param {interger} id : the type id
 * @return {activityType} activityType if existing, error else
 */
var getActivityType = function (req, res) {
  var typeId = req.params.id;
  if (!typeId)
    return res.status(500).send('ERROR: Missing params "id"');
  models.ActivityType.findOne({where: {id: typeId}})
  .then(function (activityType) {
    return res.status(200).json(activityType);
  })
  .catch(function(err) {
    console.error(err.stack);
    return res.status(500).send('An error occured. Please try again later.');
  });
}
module.exports.getActivityType = getActivityType;
