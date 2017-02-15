'use strict';

var gulp = require('gulp'),
	plugins = {
		watch: require('gulp-watch')
	},
	browserSync = require('browser-sync');

var templatecacheify = require('./html').templatecacheify,
	compileDocsContent = require('./docs-content').compileDocsContent,
	compileDocsStyles = require('./docs-styles').compileDocsStyles,
	files = require('./config').files;

function watch(done) {
	plugins.watch([files.scripts, '!' + files.tests, files.docsHtml, files.docsScripts], browserSync.reload);
	plugins.watch([files.templates], gulp.series(
		templatecacheify,
		browserSync.reload
	));
	plugins.watch([files.docsContent], gulp.series(
		compileDocsContent,
		browserSync.reload
	));
	plugins.watch([files.styles, files.docsStyles], gulp.series(
		compileDocsStyles
	));
	done();

	//TODO: If we ever decide to auto inject into the example, we will need to setup the watches for file additions
	//plugins.watch(paths.cssFiles, {events: ['add', 'addDir', 'unlink', 'unlinkDir']}, batch(function() { return gulp.start('injectCss-dev'); }));
	//plugins.watch(paths.jsFiles, {events: ['add', 'addDir', 'unlink', 'unlinkDir']}, batch(function() { return gulp.start('injectJs-dev'); }));
	//plugins.watch(files.bowerComponents, {events: ['add', 'addDir', 'unlink', 'unlinkDir'] }, batch(function() { return gulp.start('inject-dev'); }));
}
watch.description = 'Watch for changes in src html/js, docs html/js';


module.exports = {
	watch: watch
};
