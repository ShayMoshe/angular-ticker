'use strict';

var gulp = require('gulp'),
	plugins = {
		autoprefixer: require('gulp-autoprefixer'),
		sass: require('gulp-sass'),
		sourcemaps: require('gulp-sourcemaps'),
		rename: require('gulp-rename')
	},
	browserSync = require('browser-sync');


var config = require('./config'),
	paths = config.paths,
	errorHandler = config.errorHandler;


function compileDocsStyles() {
	return gulp.src(paths.docs + '/styles/index.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({
			includePaths: [paths.bowerComponents]
		}))
		.on('error', errorHandler('sass'))
		.pipe(plugins.autoprefixer())
		.on('error', errorHandler('autoprefixer'))
		.pipe(plugins.sourcemaps.write())
		.pipe(plugins.rename('docs.css'))
		.pipe(gulp.dest(paths.tmp))
		.pipe(browserSync.reload({stream: true}));
}
compileDocsStyles.description = 'Compiles docs SCSS to CSS.';


module.exports = {
	compileDocsStyles: compileDocsStyles
};
