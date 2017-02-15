'use strict';

var gulp = require('gulp'),
	args = require('yargs').argv,
	karma = require('karma').server;

var files = require('./config').files;


function runTests(done, singleRun) {
  if(singleRun === undefined) {
    singleRun = false;
  }
  karma.start({
    configFile: process.cwd() + '/' + files.karmaConfig,
    singleRun: singleRun
  }, done)
}
runTests.description = 'Runs unit tests - continuously by default.';

function runTestsOnce(done) {
	runTests(done, true);
}
runTestsOnce.description = 'Runs unit tests once.';


module.exports = {
	test: runTestsOnce,
	tdd: runTests
};
