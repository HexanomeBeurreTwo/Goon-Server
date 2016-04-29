'use strict';

var models = require('../models/index');


var getActivities = function (req, res) {
	//recupère la liste des activités
}
module.exports.getActivities = getActivities;

/**
 * Controller for POST /user/
 * Creates a user in the database
 * @param {string} name : the user name - required
 * @param {string} address 
 * @param {decimal} latitude 
 * @param {decimal} longitude
 * @param {boolean} temporary 
 * @param {date} date_start
 * @param {date} date_end
 * @return {Object} activityId if creating, error else
 */
var addActivity = function (req, res) {
	//add an Activity
  if (!req.query.name)
    res.status(500).send('ERROR: Missing params "name"');
  models.Activity.sync().then(function () {
    models.Activity.create({
		name: req.query.name.toLowerCase(),
		description: req.query.description.toLowerCase(),
		tags: req.query.tags.toLowerCase(),
		address: req.query.address,
		latitude: req.query.latitude,
		longitude: req.query.longitude,
		temporary: req.query.temporary,
		date_start: req.query.date_start,
		date_end: req.query.date_end,
		opening_hours: null,
    })
    .then(function(activity) {
      return res.status(200).send({userId: activity.get('id')});
    })
    .catch(function(err) {
      console.error(err.stack);
      return res.status(500).send('An error occured. Activity may already exists.');
    });
  });
}
module.exports.addActivity = addActivity;

var updateActivity = function (req, res) {
	// update an activity
}
module.exports.updateActivity = updateActivity;

/**
 * Controller for delete /activity/:id
 * Return nothing
 * @param {interger} id : the activity id
 */
var deleteActivity = function (req, res) {
	//delete an activity via its id
	var activityId = req.params.id;
  	models.Activity.destroy({where: {id: activityId}, truncate: true})
  	.then(function() {
      return res.send('User with id'+ activityId +' deleted' );
    })
    .catch (function() {
      return res.send('No User with this id :' + activityId);
    });
}
module.exports.deleteActivity = deleteActivity;

/**
 * Controller for GET /activity/:id
 * Return a activity by id
 * @param {interger} id : the activity id
 * @return {Activity} activity if existing, error else
 */
var getActivity = function (req, res) {
	//get an activity via its id
	var activityId = req.params.id;
	models.Activity.findOne({where: {id: activityId,}})
	.then(function (activity) {
	if(activity)
	res.send(activity.toJSON());
	else
	res.send('No Activity with this id :' + activityId);
  	});
}
module.exports.getActivity = getActivity;
