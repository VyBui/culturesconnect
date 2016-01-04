'use strict';

describe('Controller: UserauthenticationCtrl', function () {

  // load the controller's module
  beforeEach(module('herokuTestApp'));

  var UserauthenticationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserauthenticationCtrl = $controller('UserauthenticationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserauthenticationCtrl.awesomeThings.length).toBe(3);
  });
});
