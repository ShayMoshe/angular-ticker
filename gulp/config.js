'use strict';

var plugins = {
	util: require('gulp-util')
};

var projectName = 'angular-ticker'; // must be kebab-case
var moduleName = 'angularTicker'; // must be camelCase

var paths = {
	src: 'src',
	docs: 'docs',
	docsContent: 'docs/content',
	dist: 'dist',
	tmp: '.tmp',
	tmpContent: '.tmp/content',
	docsDist: 'docs-dist',
	docsDistContent: 'docs-dist/content',
	bowerComponents: 'bower_components',
	nodeModules: 'node_modules'
};

var files = {
	bowerComponents: paths.bowerComponents + '/**/*',
	nodeModules: paths.nodeModules + '/**/*',
	templates: paths.src + '/**/*.html',
	scripts: paths.src + '/**/*.js',
	templateCacheScripts: paths.src + '/**/*.templates.js',
	styles: paths.src + '/**/*.scss',
	tests: paths.src + '/**/*.spec.js',
	docsHtml: paths.docs + '/**/*.html',
	docsContent: paths.docsContent + '/**/*.md',
	docsScripts: paths.docs + '/**/*.js',
	docsTests: paths.docs + '/**/*.spec.js',
	docsStyles: paths.docs + '/**/*.scss',
	docsImages: paths.docs + '/**/*.{jpg,jpeg,tiff,gif,png,svg,ico}',
	docsFonts: paths.docs + '/fonts/**/*',
	docsDist: paths.docsDist + '/**/*',
	tmpContent: paths.tmpContent + '/**/*.html',
	karmaConfig: 'karma.conf.js',
	tmp: paths.tmp + '/**/*',
	dist: paths.dist + '/**/*'
};

var wiredep = {
	directory: paths.bowerComponents,
	// exclude jquery because we don't want to include it unless we actually need it
	// exclude bootstrap-sass javascript because we don't want jquery unless we actually need it, and we have angular-bootstrap for native components
	exclude: [/jquery/, /bootstrap-sass\/.*\.js/]
	// NOTE: If you decide to re-enable wiredep of scss files, you will want to use the below exclude property, as it excludes scss files that are already imported by other dependencies. Be sure to also make the required changes in gulp/docs-styles.js and dependencies.scss in order to re-enable wiredep.
	// exclude bootstrap-sass scss files because it-mlaf-sass handles importing them
	// exclude modular-scale scss because it-mlaf-sass handles importing it
	// exclude: [/jquery/, /bootstrap-sass\/.*\.js/, /bootstrap-sass\/.*\.scss/, /modular-scale/, /bourbon/]
};


module.exports = {
	projectName: projectName,
	moduleName: moduleName,
	errorHandler: function (title) {
		return function (err) {
			plugins.util.log(plugins.util.colors.red('[' + title + ']'), err.toString());
			this.emit('end');
		};
	},
	paths: paths,
	files: files,
	wiredep: wiredep
};
