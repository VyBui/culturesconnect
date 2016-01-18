'use strict';

/**
 * @ngdoc function
 * @name herokuTestApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the herokuTestApp
 */
angular.module('herokuTestApp')
  .controller('HeaderCtrl',['$scope' , 'ngDialog', 'AuthService', '$window', function ($scope, ngDialog, AuthService, $window) {
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

    $scope.loading = function() {
        // check if user already loggin.
        $scope.checkLogin();
    };

    $scope.checkLogin = function() {
      // current User
      $scope.currentUser   = Parse.User.current();
      if($scope.currentUser === null) {
        // Show login button
      }

      else {
        // check if facebook uers
        if(typeof $scope.currentUser.attributes.authData.facebook !== 'undefined')
        {
          // facebook user
          console.log($scope.currentUser);
        }
        // check if google+ user
        // check if parse user
      }
    }

    $scope.logout = function() {
      var user = Parse.User.current();
      Parse.User.logOut();
      $window.reload();
    }
  }]);
