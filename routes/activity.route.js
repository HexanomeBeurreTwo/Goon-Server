'use strict';

var activity = require ("../controllers/activity.controller");

module.exports = function(router)
{
	router.get('/activities', activity.getActivities);
	router.post('/activity', activity.addActivity);
	router.put('/activity/:id', activity.updateActivity);
	router.delete('activity/:id', activity.deleteActivity);
	router.get('/activity/:id', activity.getActivity);
};