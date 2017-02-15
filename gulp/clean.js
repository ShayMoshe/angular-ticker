'use strict';

var gulp = require('gulp'),
	del  = require('del');

var paths = require('./config').paths;


function cleanDist(done) {
	return del([paths.dist], done);
}
cleanDist.description = 'Clear out the distribution folder.';

function cleanDocs(done) {
	return del([paths.tmp, '.publish', paths.docsDist], done);
}
cleanDocs.description = 'Clear out the .tmp, .publish, and docs distribution folder.';


module.exports = {
	cleanDist: cleanDist,
	cleanDocs: cleanDocs
};
