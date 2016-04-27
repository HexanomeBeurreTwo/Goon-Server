'use strict';

var channel = require ("../controllers/channel.controller");

module.exports = function(router)
{
	router.get('/channels', channel.getChannels);
	router.post('/channel', channel.addChannel);
	router.update('/channel/:id', channel.updateChannel);
	router.delete('channel/:id', channel.deleteChannel);
	router.get('/channel/:id', channel.getChannel);
};