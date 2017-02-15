'use strict';

var gulp = require('gulp'),
	plugins = {
		debug: require('gulp-debug'),
		minifyHtml: require('gulp-minify-html'),
		angularTemplatecache: require('gulp-angular-templatecache')
	};

var config = require('./config'),
	paths = config.paths,
	files = config.files;


function templatecacheify(dest) {
	// default to writing to src directory
	if (typeof dest !== 'string') {
		dest = paths.src;
	}
	return gulp.src(files.templates)
		.pipe(plugins.debug({title: 'FILES TO TEMPLATECACHE: '}))
		.pipe(plugins.minifyHtml({
			empty: true,
			spare: true,
			quotes: true,
			conditionals: true
		}))
		.pipe(plugins.angularTemplatecache(config.projectName + '.templates.js', {
			module: config.moduleName,
			templateHeader: '/* NOTE: This template.js file is auto-generated from the *.html files in your src directory. Any changes you make to this file will be overwritten. */\n\'use strict\';angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {'
		}))
		.pipe(gulp.dest(dest));
}
templatecacheify.description = 'Concat and templatecache all html files in src.';


module.exports = {
	templatecacheify: templatecacheify
};
