'use strict';

/**
 * @ngdoc function
 * @name herokuTestApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the herokuTestApp
 */
angular.module('herokuTestApp')
  .controller('HeaderCtrl',['$scope' , 'ngDialog', 'AuthService', '$window', '$state', function ($scope, ngDialog, AuthService, $window, $state) {
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
        if(typeof $scope.currentUser.attributes.authData !== 'undefined')
        {
          // facebook user
        }
        // check if google+ user
        // check if parse user
      }
    }

    $scope.logOut = function() {
      Parse.User.logOut();
      $state.go("app.homepage");
    }
  }]);
