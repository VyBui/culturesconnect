'use strict';

describe('Service: getDataMainPart2Part2', function () {

  // load the service's module
  beforeEach(module('herokuTestApp'));

  // instantiate service
  var getDataMainPart2Part2;
  beforeEach(inject(function (_getDataMainPart2Part2_) {
    getDataMainPart2Part2 = _getDataMainPart2Part2_;
  }));

  it('should do something', function () {
    expect(!!getDataMainPart2Part2).toBe(true);
  });

});
