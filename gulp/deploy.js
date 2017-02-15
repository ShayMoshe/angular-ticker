'use strict';

var gulp = require('gulp'),
	plugins = {
		ghPages: require('gulp-gh-pages')
	};

var files = require('./config').files;

var buildDocs = require('./docs-build').buildDocs;


var deploy = gulp.series(
	buildDocs,
	function pushToGithub() {
		return gulp.src(files.docsDist)
			.pipe(plugins.ghPages());
	}
);
deploy.description = 'Deploys docs to Github pages.';


module.exports = {
	deploy: deploy
};
