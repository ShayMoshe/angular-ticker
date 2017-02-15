# API

The Full Config Object look like:
  ```javascript
vm.tickerConfig = {
			shape: 'pacman',
			color: 'orange',
			interval : 1500,
			icon: 'intelicon-play',
			stopIcon : 'intelicon-alert-solid',
			title: 'News',
            animation : 'marquee',
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
  ```

1. **shape** - none, triangle ( _default_ ), pacman.
2. **color** - blue ( _default_ ), orange, red, dark-blue, light-blue, pale-blue, green, light-gray, gray, dark-gray.  see the colors at [MLAF](https://mlaf.intel.com/#/colors)
3. **interval** - the time between messages in milliseconds ( _default - 4000_ ).
4. **icon** - the icon on the ticker while runing ( _default - intelicon-comment-solid_ ), **stopIcon** - the icon on the picker while pause (the mouse is over the ticker) ( _default - intelicon-pause_ ). see the full icon list at [MLAF](https://mlaf.intel.com/#/iconLibrary)
5. **animation** - ticker ( _default_ ), marquee.