jqdropdown
==========

Simple Dropdown Plugin in jQuery

**USAGE**
options
--------
dropdownClass - class to attach to the outermost (ul) element of the dropdown (default null)
dropdownId - id to attach to the outermost (ul) element of the dropdown (default null)
listenerEvent - event in which to trigger the dropdown (default = click)
zindex - z-index of the dropdown (default = 1)
bgcolor - background color of the dropdown (default = white)
actions - a list of actions to put into the dropdown (default is what is shown here for actions)

``
	$('.dropdown').jqdropdown({
	  dropdownClass: null, // class you want to add to the dropdown
		dropdownId: null, // id that you want to add to the dropdown
		listenerEvent: 'click', // event in which to show the dropdown
		zindex: 1,
		bgcolor: '#fff',
		actions: [
			'<a href="#">First Action</a>',
			'<a href="#">Second Action</a>',
			'<a href="#">Third Action</a>'
		]
	});
``