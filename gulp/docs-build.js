'use strict';

var gulp = require('gulp'),
	plugins = {
		debug: require('gulp-debug'),
		filter: require('gulp-filter'),
		flatten: require('gulp-flatten'),
		minifyCss: require('gulp-minify-css'),
		minifyHtml: require('gulp-minify-html'),
		ngAnnotate: require('gulp-ng-annotate'),
		replace: require('gulp-replace'),
		uglify: require('gulp-uglify'),
		useref: require('gulp-useref')
	},
	uglifySaveLicense = require('uglify-save-license'),
	mainBowerFiles = require('main-bower-files');

var compileDocsStyles = require('./docs-styles').compileDocsStyles,
	compileDocsContent = require('./docs-content').compileDocsContent,
	templatecacheify = require('./html').templatecacheify,
	lint = require('./lint').lint,
	lintDocs = require('./lint').lintDocs,
	cleanDocs = require('./clean').cleanDocs,
	config = require('./config'),
	paths = config.paths,
	files = config.files,
	errorHandler = config.errorHandler;


function buildDocsFonts() {
	return gulp.src([
		files.docsFonts
	].concat(mainBowerFiles()))
		.pipe(plugins.filter('**/*.{eot,ttf,woff,woff2}'))
		.pipe(plugins.flatten())
		.pipe(gulp.dest(paths.docsDist + '/fonts/'));
}
buildDocsFonts.description = 'Copy fonts from bower dependencies and docs to docs-dist.';

function buildDocsImages() {
	return gulp.src([
		files.docsImages
	])
		.pipe(gulp.dest(paths.docsDist));
}
buildDocsImages.description = 'Copy images from docs to docs-dist.';

function copyCompiledDocsContent() {
	return gulp.src(files.tmpContent)
		.pipe(gulp.dest(paths.docsDistContent));
}
copyCompiledDocsContent.description = 'Copy compiled html content files in .tmp to docs-dist';

var buildDocs = gulp.series(
	cleanDocs,
	// build
	gulp.parallel(
		compileDocsStyles,
		templatecacheify,
		gulp.series(
			compileDocsContent,
			copyCompiledDocsContent
		),
		buildDocsFonts,
		buildDocsImages,
		lint,
		lintDocs
	),
	// then build the rest
	function buildDist() {

		var jsFilter = plugins.filter('**/*.js');
		var cssFilter = plugins.filter('**/*.css');
		var htmlFilter = plugins.filter('**/*.html');
		var indexHtmlFilter = plugins.filter('**/index.html');

		var assets = plugins.useref.assets();

		return gulp.src([
			files.docsHtml
		])
			.pipe(indexHtmlFilter)
			// add assets in build blocks to stream
			.pipe(assets)
			// ng-annotate and minify JS
			.pipe(jsFilter)
			.pipe(plugins.ngAnnotate())
			.pipe(plugins.uglify({preserveComments: uglifySaveLicense}))
			.on('error', errorHandler('uglify'))
			.pipe(jsFilter.restore())
			// minify CSS
			.pipe(cssFilter)
			// replace the font paths with the path to the font folder in the docs-dist folder
			// .pipe(plugins.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', 'fonts/'))
			.pipe(plugins.replace('../../bower_components/it-mlaf-sass/fonts/', 'fonts/'))
			.pipe(plugins.minifyCss())
			.pipe(cssFilter.restore())
			.pipe(assets.restore())
			// useref
			.pipe(plugins.useref())
			.pipe(indexHtmlFilter.restore())
			// minify HTML
			.pipe(htmlFilter)
			.pipe(plugins.minifyHtml({
				empty: true,
				spare: true,
				quotes: true,
				conditionals: true
			}))
			.pipe(htmlFilter.restore())
			.pipe(plugins.debug({title: 'DOCS DIST: '}))
			.pipe(gulp.dest(paths.docsDist))
	}
);
buildDocs.description = 'Builds a docs distribution.';


module.exports = {
	buildDocs: buildDocs
};
