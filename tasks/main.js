
/**
 * Module dependencies.
 */

var Hunter = require('../lib/Hunter');
var Users = require('../lib/users');
var co = require('co');

/**
 * Initialize static variables.
 */

var userId = process.env.TWITTER_USER_ID;
var token = process.env.TWITTER_ACCESS_TOKEN_KEY;
var secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

/**
 * Main function.
 */

function *main() {
  var hunter = new Hunter(userId, token, secret);
  var users = yield Users.find({});
  for (var i = 0; i < users.length; i++) {
    yield hunter.follow(users[i].userId);
    Users.remove({ userId: users[i].userId });
  }
}

/**
 * Expose `main`.
 */

module.exports = co.wrap(main);
