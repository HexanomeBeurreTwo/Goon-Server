'use strict';

var models = require('../models/index');


var getActivities = function (req, res) {
	//recupère la liste des activités
}
module.exports.getActivities = getActivities;

/**
 * Controller for POST /activity/
 * Creates a activity in the database
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
	if (!req.body.name)
		res.status(500).send('ERROR: Missing params "name"');
  models.Activity.sync().then(function () {
    models.Activity.create({
		name: req.body.name.toLowerCase(),
		description: req.body.description.toLowerCase(),
		tags: req.body.tags,
		address: req.body.address,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		temporary: req.body.temporary,
		date_start: req.body.date_start,
		date_end: req.body.date_end,
		opening_hours: req.body.opening_hours,
		ActivityTypeId: req.body.ActivityTypeId,
    })
    .then(function(activity) {
      return res.status(200).json({activityId: activity.get('id')});
    })
    .catch(function(err) {
      console.error(err.stack);
      return res.status(500).json({error: 'An error occured. Activity may already exists.'});
    });
  });
};
module.exports.addActivity = addActivity;

/**
 * Controller for update /activity/:id
 * Return a activity by id
 * @param {interger} id : the activity id
 * @return {User} activity if existing, error else
 */
var updateActivity = function (req, res) {
	// update an activity
	var activityId = req.params.id;
	var selector = { where: { id: activityId } };
	var values = new Object();
  if (req.body.name)
    values.name = req.body.name;

  if (values) {
    models.Activity.findById(activityId).then(function(activity) {
      return activity.update(values, selector);
    }).then(function(activity) {
      if(activity)
        res.status(200).json(activity);
      else
        res.status(500).json({ error: 'No Activity with this id :' + activityId});
    }).catch(function(err) {
      console.error(err.stack);
      res.status(500).json({ error: 'Error updating activity: '+ err});
    });
  } else  {
      res.status(500).json({ error: 'No update because there are no name'});
  }
};
module.exports.updateActivity = updateActivity;

/**
 * Controller for delete /activity/:id
 * Return nothing
 * @param {interger} id : the activity id
 */
var deleteActivity = function (req, res) {
	//delete an activity via its id
  var activityId = req.params.id;
  models.Activity.findById(activityId).then(function(activity) {
    return activity.destroy();
  }).then(function(activity) {
    if(activity)
      res.status(200).json({ message: 'Activity with id'+ activityId +' deleted' });
    else
      res.status(500).json({ error: 'No Activity with this id :' + activityId});
  }).catch(function(error) {
    console.log("ops: " + error);
    res.status(500).json({ error: 'Error deleting activity: '+ error});
  });
};
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
