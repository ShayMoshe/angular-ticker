(function () {
	'use strict';

	angular.module('docs', [
		// Angular modules
		'ngRoute',
		// starter-bower-component modules
		'angularTicker'
	])
		.config(config);

	/* @ngInject */
	function config($routeProvider) {
		// console.log("1");
		// routes
		$routeProvider
			.when('/', {
				templateUrl: 'docs.html',
				controller: 'DocsController',
				controllerAs: 'vm',
				// this is so moving between anchor tags doesn't cause a page reload
				reloadOnSearch: false
			})
			.otherwise({
				redirectTo: '/'
			});
	}

})();
