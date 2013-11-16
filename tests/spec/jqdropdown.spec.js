describe('jQdropdown', function() {
  it('extends jQuery.fn', function() {
    expect(jQuery.fn.jQdropdown).toBeDefined();
    expect(jQuery('<div />').jQdropdown).toBeDefined();
  });

  it('throws an Invalid Argument error when dropdownSelector is not specified in the options passed to jQdropdown', function() {
    expect(function() {
      jQuery('<div />').jQdropdown();
    }).toThrow(new Error('Invalid Argument: Please supply either a dropdownClass or a dropdownId for the dropdown selector'));
  });

  it('throws an Invalid Argument error when actions is provided and is not an array of HTML tags', function() {
    expect(function() {
      jQuery('<div />').jQdropdown({
        dropdownClass: 'someClass',
        actions: 'testAction'
      }).appendTo('body').trigger('click');
    }).toThrow(new Error('Invalid Arguments: actions; must be an array of html elements'));
  });
});