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
				});
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
		};
		vm.activeMsg = 0;
		vm.stopMsg = false;

		vm.setVisible = function (index) {

			if (index == vm.activeMsg) {
				return (true);
			} else {
				return (false);
			}
		};

		vm.refresh = function () {
			if (!vm.stopMsg) {
				$scope.$apply(function () {
					vm.activeMsg++;
					if (vm.activeMsg >= vm.msgs.length) {
						vm.activeMsg = 0;
					}
				});
			}
		};

		vm.stop = function (bool) {
			vm.stopMsg = bool;
			if (!bool) {
				vm.class = vm.icon;
			} else {
				vm.class = vm.stopIcon;
			}
		};
	}
})();

/* NOTE: This template.js file is auto-generated from the *.html files in your src directory. Any changes you make to this file will be overwritten. */
'use strict'; angular.module("angularTicker").run(["$templateCache", function ($templateCache) {
	$templateCache.put("angular-marquee.html", "<div class=\"tickerD\" data-ng-init=\"vm.msgs;vm.activeMsg\" ng-show=\"vm.msgs.length\" align=\"left\"><div style=\"position: absolute; z-index: 3;\" class=\"ngtickerIcon {{vm.color}}\"><i ng-class=\"vm.class\"></i> <span class=\"tickerTitel\">{{vm.title}}</span></div><div style=\"position: absolute; left: 87px; z-index: 2; height:0;\" class=\"{{vm.shape}} {{vm.color}}Border\"></div><div id=\"ngtickerMessage\" class=\"ngtickerMessage\" style=\"width: 100%;\" ng-mouseover=\"vm.stop(true);\" ng-mouseleave=\"vm.stop(false);\"><marquee width=\"100%\" scrolldelay=\"60\" onmouseover=\"this.stop();\" onmouseout=\"this.start();\"><span data-ng-repeat=\"msgObj in vm.msgs track by $index\" ng-class=\"msgObj.type\" style=\"padding-left: 80px;\">{{msgObj.message}} <a target=\"blank\" ng-show=\"msgObj.link\" style=\"font-size:12px;\" href=\"{{msgObj.link}}\">Read more>></a></span></marquee></div></div>");
	$templateCache.put("angular-ticker.html", "<div class=\"tickerD\" ng-mouseover=\"vm.stop(true);\" ng-mouseleave=\"vm.stop(false);\" data-ng-init=\"vm.msgs;vm.activeMsg\" ng-show=\"vm.msgs.length\" align=\"left\"><div class=\"ngtickerIcon {{vm.color}}\"><i ng-class=\"vm.class\"></i> <span class=\"tickerTitel\">{{vm.title}}</span></div><div class=\"{{vm.shape}} {{vm.color}}Border\"></div><div id=\"ngtickerMessage\" class=\"ngtickerMessage\"><ul><li class=\"img-responsive list\" ng-show=\"vm.setVisible($index)\" data-ng-repeat=\"msgObj in vm.msgs track by $index\"><p ng-class=\"msgObj.type\">{{msgObj.message}}</p><a target=\"blank\" ng-show=\"msgObj.link\" style=\"font-size:12px;\" href=\"{{msgObj.link}}\">Read more>></a></li></ul></div></div>");
}]);