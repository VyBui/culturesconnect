'use strict';

describe('Directive: addImage', function () {

  // load the directive's module
  beforeEach(module('herokuTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-image></add-image>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addImage directive');
  }));
});
