'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync');

var compileDocsStyles = require('./docs-styles').compileDocsStyles,
	compileDocsContent = require('./docs-content').compileDocsContent,
	templatecacheify = require('./html').templatecacheify,
	lint = require('./lint').lint,
	lintDocs = require('./lint').lintDocs,
	buildDocs = require('./docs-build').buildDocs,
	watch = require('./watch').watch,
	config = require('./config'),
	paths = config.paths,
	files = config.files;


function browserSyncOptions(baseDir) {
	var routes;
	// if src path is in the baseDir(s) provided, then we are serving locally, and we want to provide normal routes to bower_components and src directory without serving the entire root directory
	if (baseDir === paths.src || (Array.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
		routes = {
			'/bower_components': paths.bowerComponents,
			'/src': paths.src
		};
	}

	return {
		server: {
			baseDir: baseDir,
			routes: routes
		},
		port: 9000,
		ghostMode: {
			clicks: true,
			location: false,
			forms: true,
			scrolling: true
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'info',
		logPrefix: 'browser-sync',
		notify: false,
		reloadDelay: 100,
		online: true
	};
}

var serveDocs = gulp.series(
	gulp.parallel(
		compileDocsStyles,
		compileDocsContent,
		templatecacheify,
		lint,
		lintDocs
	),
	watch,
	function (done) {
		if (browserSync.active) {
			return;
		}
		browserSync(browserSyncOptions([paths.docs, paths.src, paths.tmp]));
		done();
	}
);
serveDocs.description = 'Serve the docs locally.';

var serveDocsDist = gulp.series(
	buildDocs,
	function () {
		if (browserSync.active) {
			return;
		}
		browserSync(browserSyncOptions(paths.docsDist));
	}
);
serveDocsDist.description = 'Serve docs-dist (the built docs) locally.';


module.exports = {
	serveDocs: serveDocs,
	serveDocsDist: serveDocsDist
};
