'use strict';

var models = require('../models/index');


var getChannels = function (req, res) {
	//recupère la liste des activités
}
module.exports.getChannels = getChannels;

/**
 * Add a channel to the database
 * @param {string} name : the channel name - required
 * @param {string} description : a channel description
 * @return {Object} channelId if creating, error else
 */
var addChannel = function (req, res) {
  if (!req.query.name)
    return res.status(500).send('ERROR: Missing params "name"');
	models.Channel.sync().then(function () {
	  models.Channel.create({
	    name: req.query.name,
	    description: req.query.description,
	    tags: null,
	  })
	  .then(function(channel) {
	    return res.status(200).send({channelId: channel.get('id')});
	  })
	  .catch(function(err) {
	    console.error(err.stack);
	    return res.status(500).send('An error occured. Channel may already exists.');
	  });
	});
};
module.exports.addChannel = addChannel;

var updateChannel = function (req, res) {
	// update a Channel via its id
}
module.exports.updateChannel = updateChannel;

var deleteChannel = function (req, res) {
	//delete a Channel via its id
}
module.exports.deleteChannel = deleteChannel;

var getChannel = function (req, res) {
	//get a Channel via its id
}
module.exports.getChannel = getChannel;

var getChannelActivities = function (req, res) {

}
module.exports.getChannelActivities = getChannelActivities;

/**
 * Subscribe a user to a channel
 * @param {integer} userId : the id of the user - required
 * @param {interger} channelId : the id of the channel - required
 * @return {Channel} Return the channel is succed, error else
 */
var subscribeChannel = function (req, res) {
  if (!req.query.userId)
    return res.status(500).send('ERROR: Missing params "userId"');
  var channelId = req.params.id;
  var userId = req.query.userId;
  models.Channel.findOne({where: {id: channelId}})
  .then(function (channel) {
    models.User.findOne({where: {id: userId}})
    .then(function (user) {
      user.addChannel(channel);
      return res.status(200).json(channel);
    })
    .catch(function (err) {
	    console.error(err.stack);
	    return res.status(500).send('An error occured. User might not exist.');
    });
  })
  .catch(function (err) {
    console.error(err.stack);
    return res.status(500).send('An error occured. Channel might not exist.');
  });
}
module.exports.subscribeChannel = subscribeChannel;
