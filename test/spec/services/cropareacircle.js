'use strict';

describe('Service: cropAreaCircle', function () {

  // load the service's module
  beforeEach(module('herokuTestApp'));

  // instantiate service
  var cropAreaCircle;
  beforeEach(inject(function (_cropAreaCircle_) {
    cropAreaCircle = _cropAreaCircle_;
  }));

  it('should do something', function () {
    expect(!!cropAreaCircle).toBe(true);
  });

});
