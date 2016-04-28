'use strict';

var channel = require ("../controllers/channel.controller");

module.exports = function(router)
{
	router.get('/channel', channel.getChannels);
	router.post('/channel', channel.addChannel);
	router.put('/channel/:id', channel.updateChannel);
	router.delete('channel/:id', channel.deleteChannel);
	router.get('/channel/:id', channel.getChannel);
	router.get('/channel/:id/activities', channel.getChannelActivities);
	router.post('/channel/subscribe/:id', channel.subscribeChannel);
};
