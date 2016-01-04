'use strict';

/**
 * @ngdoc function
 * @name herokuTestApp.controller:UserauthenticationCtrl
 * @description
 * # UserauthenticationCtrl
 * Controller of the herokuTestApp
 */
angular.module('herokuTestApp')
  .controller('UserauthenticationCtrl', function () {

    $scope.data = {};

    $scope.signupEmail = function(){
      var user = new Parse.User();
      user.set("username", $scope.data.username);
      user.set("password", $scope.data.password);
      user.set("email", $scope.data.email);
      // other fields can be set just like with Parse.Object
      user.set("somethingelse", "like this!");

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          alert("success!");
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };

    $scope.loginEmail = function(){

    };
  });
