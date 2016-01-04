'use strict';

/**
 * @ngdoc function
 * @name herokuTestApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the herokuTestApp
 */
angular.module('herokuTestApp')
  .controller('HeaderCtrl',['$scope' , 'ngDialog', function ($scope, ngDialog) {
    console.log("vao day");
    $scope.clickToOpen = function () {
        ngDialog.open({
            template: 'views/modal.html',
						className: 'ngdialog-theme-default ngdialog-theme-custom'
        });
    };
  }]);
