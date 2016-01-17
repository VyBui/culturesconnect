'use strict';

describe('Directive: mainSliderImage', function () {

  // load the directive's module
  beforeEach(module('herokuTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-slider-image></main-slider-image>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mainSliderImage directive');
  }));
});
