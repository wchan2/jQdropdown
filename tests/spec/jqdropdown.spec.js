describe('jQdropdown', function() {
  it('extends jQuery', function() {
    expect(jQuery.fn.jQdropdown).toBeDefined();
    expect(jQuery('<div />').jQdropdown).toBeDefined();
  });

  it('has options', function() {
    expect(jQuery.fn.jQdropdown.options).toBeDefined();
  });
});