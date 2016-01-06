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
    $scope.clickToOpen = function (option) {
        ngDialog.open({
            template: 'views/modal.html',
			className: 'ngdialog-theme-default ngdialog-theme-custom',
			controller: 'UsersCtrl',
			resolve: {
	         	option: function () {
	           	return option;
         }
       }
        });
    };
  }]);
