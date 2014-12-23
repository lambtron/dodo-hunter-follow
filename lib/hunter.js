
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

function Hunter(userId, token, secret) {
  if (!(this instanceof Hunter)) return new Hunter();
  this.twitter = getAuthenticatedTwitter(token, secret);
  this.userId = userId;
}

/**
 * Add to Dodo, Follow, and Mute.
 *
 * @param {Array} userIds
 */

Hunter.prototype.addUsersToDodo = function *addUsersToDodo(users) {
  if (!this.twitter || !this.userId) return 'User is not authenticated.';
  var listId = yield getDodoListId(this.userId, this.twitter);
  for (var i = 0; i < users.length; i++) {
    var userId = users[i].userId;
    yield twitter.post('mutes/users/create', { user_id: userId });
    yield twitter.post('friendships/create', { user_id: userId });
    yield twitter.post('lists/members/create', { list_id: listId, user_id: userId });
  }
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

/**
 * Private helper function to get dodo list id.
 *
 * @param {String} userId
 * @param {Object} twitter
 *
 * @return {String}
 */

function *getDodoListId(userId, twitter) {
  var res = yield twitter.get('lists/ownerships', '?user_id=' + userId);
  var lists = JSON.parse(res).lists;
  for (var i = 0; i < lists.length; i++) {
    if (~lists[i].name.indexOf('dodo'))
      return lists[i].id;
  }
  throw 'Dodo list not found.';
}
