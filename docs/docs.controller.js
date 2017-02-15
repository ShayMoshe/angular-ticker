(function () {
	'use strict';

	angular.module('docs').controller('DocsController', DocsController);

	/* @ngInject */
	function DocsController($location, $anchorScroll) {

		var vm = this;
		vm.form = {};
		vm.submit = function(){
			// console.info('submit',vm.form);
			var temp = vm.form;
			vm.tickerConfigDynamic.messages.push({"message": vm.form.message,"type":vm.form.type, "link" : vm.form.link});
			console.log('config dynamic',vm.tickerConfigDynamic);
		};
		
		vm.config ='{{vm.tickerConfig}}'
		vm.tickerConfig = {
			messages:  [
			{
				"message":"Angular Ticker for your site...",
				"type":"info"
			},
			{
				"message":"Angular Ticker with Intel branding",
				"type":"info",
				"link":"https://github.intel.com/smoshe4/angular-ticker"
			}
			]
		};
		
		vm.tickerConfig2 = {
			shape: 'pacman',
			color: 'orange',
			interval : 1500,
			icon: 'intelicon-play',
			// stopIcon : 'intelicon-alert-solid',
			title: 'News',
			messages:  [
			{
				"message":"Angular Ticker for your site...",
				"type":"error"
			},
			{
				"message":"Angular Ticker with Intel branding",
				"type":"info",
				"link":"https://github.intel.com/smoshe4/angular-ticker"
			}
			]
		};
		
		vm.tickerConfig3 = {
			shape: 'none',
			color: 'red',
			interval : 5000,
			icon: 'intelicon-alert-solid',
			title: 'Alerts',
            animation : 'marquee',
			messages:  [
			{
				"message":"Angular Ticker for your site...",
				"type":"info"
			},
			{
				"message":"Angular Ticker with Intel branding",
				"type":"info",
				"link":"https://github.intel.com/smoshe4/angular-ticker"
			}
			]
		};
		
		vm.tickerConfigDynamic = {
			messages:  [
			{
				"message":"Angular Ticker for your site...",
				"type":"info"
			}
			]
		};
		
		vm.awesomeness = Math.floor(Math.random() * 10000) + 100;

		// DO NOT REMOVE THE BELOW CODE. It allows anchor links to work properly (e.g. http://url.intel.com/#anchor)
		// triggered by the onloads that are fired for the ng-includes in docs.html
		// this is so we can $anchorScroll to the content as soon as it is available
		vm.tryScrolling = function () {
			if ($location.hash().length > 0) {
				$anchorScroll();
			}
		};
		
		
		
		
		
	}

})();
