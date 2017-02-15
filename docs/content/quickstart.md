# Quickstart

1. Get angular-ticker into your Angular app. If you use bower:
  ```bash
  bower install --save angular-ticker
  ```

   If you don't use bower, you can grab the source code in the `dist` folder of the [latest release][release].
    ```html
    <script src="bower_components/angular-ticker/dist/angular-ticker.js"></script>
	 ```	

2. Import the angular-ticker  styles into your main SCSS file.
  ```scss
  @import "bower_components/angular-ticker/dist/angular-ticker";
  ```

3. Add `angularTicker` to your main module's list of dependencies.

  ```javascript
  angular.module('yourAmazingApp', ['angularTicker']);
  ```

4. Create a configuration object for angular-ticker in the controller of the view where you want to use it.

  ```javascript
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
  ```

5. Use the `angular-ticker` element in your html, and the directive will do the rest.

  ```html
 <angular-ticker data-angular-ticker={{vm.config}}></angular-ticker>
  ```



[release]: https://github.intel.com/smoshe4/angular-ticker/releases
