;(function( $ ) {
  'use strict';
  
  var jQdropdown = {
    defaultOptions: {
      dropdownClass: null,
      dropdownId: null,
      listenerEvent: 'click',
      actions: [
        '<a href="#">First Action</a>',
        '<a href="#">Second Action</a>',
        '<a href="#">Third Action</a>'
      ]
    },
    defaultCSS: {
      verticalAlign: 'top',
      listStyle: 'none',
      display: 'inline-block',
      margin: 0,
      position: 'absolute',
      zindex: 1,
      bgcolor: '#fff'
    },
    init: function(options, cssOptions, elem, elemSelector) {
      var self = this;
      
      self.elem         = elem;
      self.$elem        = $(elem);
      self.elemSelector = elemSelector;
      
      self.options = $.extend({}, this.defaultOptions, options);
      self.css = $.extend({}, this.defaultCSS, cssOptions);

      if (self.options.dropdownId !== null) {
        self.selector = '#' + self.options.dropdownId;
      } else if (self.options.dropdownClass !== null) {
        self.selector = '.' + self.options.dropdownClass;
      } else {
        throw new Error('Invalid Argument: Please supply either a dropdownClass or a dropdownId for the dropdown selector');
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
      if (!(actions instanceof Array) || actions.length <= 0) {
        throw new Error('Invalid Arguments: actions; must be an array of html elements');
      }
      if (dropdownClass) {
        $dropdownMenu.addClass(dropdownClass);
      }
      if (dropdownId) {
        $dropdownMenu.attr('id', dropdownId);
      }
      $.each(actions, function(index, action) {
        $dropdownMenu.append($('<li />').html(action));
      });
      
      return $dropdownMenu.hide();
    },
    removeDropdown: function(event) {
      var self = this,
          selector;

      if (typeof event !== 'undefined') {
        selector = event.data.selector;
      } else {
        selector = self.selector;
      }
      
      $(selector).slideUp().remove();
    }
  };

  $.fn.jQdropdown = function(options) {
    var self = this;
    
    return this.each(function() {
      var dropdown = Object.create(jQdropdown),
          cssOptions = (options && options.css) ? options.css : {};
      
      dropdown.init(options, cssOptions, this, self.selector);
    });
  };
}(jQuery));