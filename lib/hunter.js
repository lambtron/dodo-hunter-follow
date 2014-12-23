
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var Twitter = require('simple-twitter');

/**
 * Expose `Hunter`.
 */

module.exports = Hunter;

/**
 * Initialize a new `Hunter`.
 */

function Hunter(token, secret) {
  if (!(this instanceof Hunter)) return new Hunter();
  this.twitter = getAuthenticatedTwitter(token, secret);
}

/**
 * [follow description]
 *
 * @param {Array} userIds
 */

Hunter.prototype.follow = function follow(userIds) {
  for (var i = 0; i < userIds.length; i++)
    yield this.twitter.post('friendships/create', { user_id: userIds[i] });
};

/**
 * Private helper function to return authenticated twitter client.
 *
 * @param {String} token
 * @param {String} secret
 *
 * @return {Object} twitter
 */

function getAuthenticatedTwitter(token, secret) {
  return thunkify(new Twitter(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    token,
    secret
  ));
};
