// Karma configuration
module.exports = function (config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',
		frameworks: ['chai', 'mocha'],

		// list of files / patterns to load in the browser
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'src/**/*.js'
		],


		// list of files to exclude
		exclude: [],


		// By default, Karma loads all sibling NPM modules which have a name starting with karma-*.
		// Uncomment the following if you want to deal with it manually:
		//plugins: [
		//  'karma-teamcity-reporter',
		//  'karma-ng-html2js-preprocessor',
		//  'karma-coverage',
		//  'karma-jasmine',
		//  'karma-phantomjs-launcher'
		//],

		// web server port
		port: 8080,

		// cli runner port
		runnerPort: 9100,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		//browsers: ['Chrome'],
		browsers: ['PhantomJS'],


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 5000,

//test results reporter
		reporters: ['progress', 'coverage'],
		coverageReporter: {type: 'html', dir: 'coverage/'},

		preprocessors: {'app/scripts/**/*.js': ['coverage']},

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false


	});
};
