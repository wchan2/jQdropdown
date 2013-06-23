describe('jQdropdown', function() {
  it('extends jQuery.fn', function() {
    expect(jQuery.fn.jQdropdown).toBeDefined();
    expect(jQuery('<div />').jQdropdown).toBeDefined();
  });

  it('has plugin options', function() {
    expect(jQuery.fn.jQdropdown.options).toBeDefined();
  });

  it('has CSS options', function() {
    expect(jQuery.fn.jQdropdown.css).toBeDefined();
  });
});