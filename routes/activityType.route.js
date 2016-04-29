'use strict';

var activityType = require ("../controllers/activityType.controller");

module.exports = function(router)
{
	router.get('/activitytype', activityType.getActivityTypes);
	router.post('/activitytype', activityType.addActivityType);
	router.put('/activitytype/:id', activityType.updateActivityType);
	router.delete('activitytype/:id', activityType.deleteActivityType);
	router.get('/activitytype/:id', activityType.getActivityType);
};
