
/**
 * Module dependencies.
 */

var main = require('./tasks/main.js');
var CronJob = require('cron').CronJob;

/**
 * Initiate monthly Cronjob.
 * Job will every day at 12:00am.
 */

new CronJob({
  cronTime: "0 0 * * *",
  onTick: main(),
  start: true,
  timeZone: "America/Los_Angeles"
});
