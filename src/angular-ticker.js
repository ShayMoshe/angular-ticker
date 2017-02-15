(function () {
	'use strict';

	angular.module('angularTicker', []);

	angular.module('angularTicker')
		.directive('angularTicker', angularTicker)
		.controller('tickerController', tickerController);

	/* @ngInject */
	function angularTicker() {
		var directive = {
			restrict: 'E',
			scope: {},
			bindToController: true,
			controller: 'tickerController',
			controllerAs: 'vm',

			link: function (scope, element, attrs, tickerController) {
				scope.contentUrl = "angular-ticker.html";
				var attrsObj = JSON.parse(attrs.angularTicker);
				if (attrsObj.hasOwnProperty('animation')) {
					scope.contentUrl = "angular-" + attrsObj.animation + ".html";
				}
				tickerController.initialize();
				attrs.$observe('angularTicker', function () {
					tickerController.initialize();
				})
			},
			template: '<div ng-include="contentUrl"></div>'
		};
		return directive;
	}

	/* @ngInject */
	function tickerController($scope, $attrs, $element) {
		var vm = this;
		vm.msgs = [];
		vm.interval = 4000;
		vm.color = 'blue';
		vm.shape = 'triangle';
		vm.title = '';
		vm.stopIcon = 'intelicon-pause';
		vm.icon = 'intelicon-comment-solid';
		vm.class = vm.icon;
		vm.intervalId = null;

		vm.initialize = function () {
			var config = JSON.parse($attrs.angularTicker);
			vm.config = config;
			// console.info('config',config);
			if (config.hasOwnProperty('shape')) {
				vm.shape = config.shape;
			}
			if (config.hasOwnProperty('color')) {
				vm.color = config.color;
			}
			if (config.hasOwnProperty('title')) {
				vm.title = config.title;
			}
			if (config.hasOwnProperty('icon')) {
				vm.icon = config.icon;
				vm.class = vm.icon;
			}
			if (config.hasOwnProperty('stopIcon')) {
				vm.stopIcon = config.stopIcon;
			}
			vm.msgs = config.messages;
			if (config.hasOwnProperty('interval')) {
				vm.interval = config.interval;
			}
			if (vm.intervalId == null) {
				vm.intervalId = setInterval(vm.refresh, vm.interval);
			}

			// $scope.$apply();
		}
		vm.activeMsg = 0;
		vm.stopMsg = false;

		vm.setVisible = function (index) {

			if (index == vm.activeMsg) {
				return (true);
			} else {
				return (false);
			}
		}

		vm.refresh = function () {
			if (!vm.stopMsg) {
				$scope.$apply(function () {
					vm.activeMsg++;
					if (vm.activeMsg >= vm.msgs.length) {
						vm.activeMsg = 0;
					}
				});
			}
		}

		vm.stop = function (bool) {
			vm.stopMsg = bool;
			if (!bool) vm.class = vm.icon;
			else vm.class = vm.stopIcon;
		}

	}
})();
