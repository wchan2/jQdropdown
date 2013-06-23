jqdropdown
==========

Simple Dropdown Plugin in jQuery


options
--------
* dropdownClass - class to attach to the outermost (ul) element of the dropdown (default null)
* dropdownId - id to attach to the outermost (ul) element of the dropdown (default null)
* listenerEvent - event in which to trigger the dropdown (default = click)
* zindex - z-index of the dropdown (default = 1)
* bgcolor - background color of the dropdown (default = white)
* actions - a list of actions to put into the dropdown
* css - a css object that is applied to the dropdown; please know what you are doing before overridding verticalAlign, listStyle, display, and position

```javascript
$('.dropdown').jqdropdown({
  	dropdownClass: null, // class you want to add to the dropdown
	dropdownId: null, // id that you want to add to the dropdown
	listenerEvent: 'click', // event in which to show the dropdown
	css: {
		zindex: 1,
		bgcolor: '#fff'
	},
	actions: [
		'<a href="#">First Action</a>',
		'<a href="#">Second Action</a>',
		'<a href="#">Third Action</a>'
	]
});
```