;(function( $ ) {

	var jQdropdown = {
		init: function( options, elem, elemSelector ) {
			var self = this;
			
			self.elem         = elem;
			self.$elem        = $(elem);
			self.elemSelector = elemSelector;
			
			self.options = $.extend({}, $.fn.jQdropdown.options, options);
			self.css = $.extend({}, $.fn.jQdropdown.css, $.fn.jQdropdown.css);
			delete self.options.css;

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
			
			$(document).on(self.options.listenerEvent, self.elemSelector, function(event) {
				event.stopImmediatePropagation();
				event.preventDefault();
				
				$('html').on(self.options.listenerEvent + '.jqdropdown', { selector: self.selector }, self.removeDropdown);
				$(self.selector).remove();
				
				var dropdown = self.buildMenu(self.options.dropdownId, self.options.dropdownClass, self.options.actions);
				$(this).after(dropdown);
				
				dropdown.slideDown().css(self.css).offset({
					top: event.pageY,
					left: event.pageX
				});
			});
		},
		buildMenu: function(dropdownId, dropdownClass, actions) {
			var $dropdownMenu = $('<ul />');

			if (dropdownClass) {
				$dropdownMenu.addClass(dropdownClass);
			}

			if (dropdownId) {
				$dropdownMenu.attr('id', dropdownId);
			}

			if (actions.length <= 0) {
				throw new Error('Invalid options: actions; must be an array of html elements');
			}
			
			$.each(actions, function(index, action) {
				$dropdownMenu.append($('<li />').html(action));
			});
			
			return $dropdownMenu.hide();
		},
		removeDropdown: function(event) {
			var selector;

			if (typeof event !== 'undefined') {
				selector = event.data.selector;
			} else {
				selector = self.selector;
			}
			
			$(selector).slideUp().remove();
		}
	};

	$.fn.jQdropdown = function( options ) {
		var self = this;
		
		return this.each(function() {
			var dropdown = Object.create(jQdropdown);
			dropdown.init(options, this, self.selector);
		});
	};

	$.fn.jQdropdown.css = {
			verticalAlign: 'top',
			listStyle: 'none',
			display: 'inline-block',
			margin: 0,
			position: 'absolute',
			zindex: 1,
			bgcolor: '#fff'
	};

	$.fn.jQdropdown.options = {
		dropdownClass: null,
		dropdownId: null,
		listenerEvent: 'click',
		css: {},
		actions: [
			'<a href="#">First Action</a>',
			'<a href="#">Second Action</a>',
			'<a href="#">Third Action</a>'
		]
	};

}(jQuery));