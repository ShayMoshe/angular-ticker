'use strict';

var gulp = require('gulp'),
	plugins = {
		eslint: require('gulp-eslint')
	};

var files = require('./config').files;


function lint() {
	return gulp.src([
		files.scripts,
		'!' + files.tests,
		// ignore auto-generated templatecache scripts from linting
		'!' + files.templateCacheScripts
	])
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format());
}
lint.description = 'Ensures component scripts (.js files in src directory) follow the style standards set in the .eslintrc file';

function lintDocs() {
	return gulp.src([files.docsScripts, '!' + files.docsTests])
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format());
}
lintDocs.description = 'Ensures documentation scripts (.js files in docs directory) follow the style standards set in the .eslintrc file';


module.exports = {
	lint: lint,
	lintDocs: lintDocs
};
