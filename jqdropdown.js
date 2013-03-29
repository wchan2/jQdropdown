var jqdropdown = {
	init: function( options, elem, elemSelector ) {
		var self = this;
		
		self.elem         = elem;
		self.$elem        = $(elem);
		self.elemSelector = elemSelector;
		
		self.options = $.extend({}, $.fn.jqdropdown.options, options);

		if (self.options.dropdownId !== null) {
			self.selector = '#' + self.options.dropdownId;
		} else if (self.options.dropdownClass !== null) {
			self.selector = '.' + self.options.dropdownClass;
		} else {
			throw new Error('Invalid argument: Please supply either a dropdownClass or a dropdownId for the dropdown selector');
		}
		
		self.bind();
	},
	
	bind: function() {
		var self = this;
		
		$(document).on(self.options.listenerEvent, self.elemSelector, function(ev) {
			ev.stopImmediatePropagation();
			ev.preventDefault();
			
			$('html').on(self.options.listenerEvent + '.jqdropdown', { selector: self.selector }, self.removeDropdown);
			$(self.selector).remove();
			
			var dropdown = self.buildMenu(self.options.dropdownId, self.options.dropdownClass, self.options.actions);
			$(this).after(dropdown);
			
			dropdown.slideDown().css({
				'z-index': self.options.zindex,
				'background-color': self.options.bgcolor,
				'vertical-align': 'top',
				'list-style': 'none',
				'display': 'inline-block',
				'margin': 0,
				'position': 'absolute'
			}).offset({
				top: ev.pageY,
				left: ev.pageX
			});
		});
	},
	
	buildMenu: function(dropdownId, dropdownClass, actions) {
		var dropdownId    = (typeof dropdownId !== 'undefined') ? ' id="' + dropdownId + '"' : '';
			dropdownClass = (typeof dropdownClass !== 'undefined') ? ' class="' + dropdownClass + '"' : '';		
			dropdownMenu  = '<ul' + dropdownClass + ' ' + dropdownId + '>';

		if (actions.length <= 0) {
			throw new Error('Invalid options: actions; must be an array of html elements');
		}
		
		$.each(actions, function(index, action) {
			dropdownMenu += '<li>' + action + '</li>';
		});
		dropdownMenu += '</ul>';
		
		return $(dropdownMenu).hide();
	},
	
	removeDropdown: function(ev) {
		if (typeof ev !== 'undefined') {
			var selector = ev.data.selector;
		} else {
			var selector = self.selector;
		}
		
		$(selector).slideUp().remove();
	}
};

$.fn.jqdropdown = function( options ) {
	var self = this;
	
	return this.each(function() {
		var dropdown = Object.create(jqdropdown);
		dropdown.init(options, this, self.selector);
	});
};

$.fn.jqdropdown.options = {
	dropdownClass: null,
	dropdownId: null,
	listenerEvent: 'click',
	zindex: 1,
	bgcolor: '#fff',
	actions: [
		'<a href="#">First Action</a>',
		'<a href="#">Second Action</a>',
		'<a href="#">Third Action</a>'
	]
};