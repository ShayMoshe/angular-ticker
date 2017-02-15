'use strict';

var gulp = require('gulp'),
	plugins = {
		concat: require('gulp-concat'),
		debug: require('gulp-debug')
	};

var config = require('./config'),
	paths = config.paths,
	files = config.files;

var cleanDist = require('./clean').cleanDist,
	templatecacheify = require('./html').templatecacheify,
	lint = require('./lint').lint;


var build =  gulp.series(
	cleanDist,
	gulp.parallel(
		lint,
		gulp.series(
			// templatecacheify first just in case a change was made without serving
			templatecacheify,
			// concat all js (including templatecache script) to one file in dist
			function () {
				return gulp.src([files.scripts, '!' + files.tests])
					.pipe(plugins.concat(config.moduleName + '.js'))
					.pipe(gulp.dest(paths.dist));
			}
		),
		// copy scss as they are to dist
		function () {
			return gulp.src(files.styles)
				.pipe(plugins.debug({title: 'SOURCE SCSS: '}))
				.pipe(gulp.dest(paths.dist));
		}
	)
);
build.description = 'Build a distribution from component src files.';


module.exports = {
	build: build
};
