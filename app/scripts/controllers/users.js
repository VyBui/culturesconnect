'use strict';

/**
 * @ngdoc function
 * @name herokuTestApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the herokuTestApp
 */
angular.module('herokuTestApp')
  .controller('UsersCtrl', ['$rootScope', '$scope', '$state', '$http', 'AuthService', '$window', 'option', function ($rootScope, $scope, $state, $http, AuthService, $window, option) {
    /*
		functionName: signup

	*/
	$scope.signUp = function(form) {
		var user = new Parse.User();
		user.set("username", form.testEmail.toLowerCase());
		user.set("email", form.testEmail.toLowerCase());
		user.set("password", form.password);
		user.set("first_name", form.first_name);
		/*
			Show Loading
		*/
		$scope.delay = 0;
		$scope.minDuration = 10;
		$scope.message = 'Please Wait...';
		$scope.backdrop = true;
		$scope.promise = $http.get('http://httpbin.org/delay/3');

		user.signUp(null, {
			success: function(user) {
				// Notify AngularJS to sync currentUser
				console.log("user day");
				console.log(user);
				$scope.promise = null;
				$scope.$apply();
				// Remove Everything
				var publicReadACL = new Parse.ACL();
				publicReadACL.setPublicReadAccess(false);
				publicReadACL.setPublicWriteAccess(false);
				// ACL to restrict write to user, and no public access
				// give write access to the current user
				publicReadACL.setWriteAccess( user.id, true);
				publicReadACL.setReadAccess( user.id, true);
				user.setACL(publicReadACL);
				//$state.go('app.dashboard');
			},
			error: function(user, error) {
				//alert("Unable to sign up:  " + error.code + " " + error.message);
				if(error.message === "username "+ user.get("email")+" already taken"){
					$scope.existEmail = user.get("email");
				}
			}
		});
	};
	/*

	//////////////////// END SIGN UP //////////////////////////
	///////
	/// LOGIN CTROL
	///////
	/*
		functionName: logIn
		parammeter: form (email, password)

	*/
	$scope.logIn = function(form) {
		//
		// Add busy
		$scope.delay = 0;
		$scope.minDuration = 10;
		$scope.message = 'Please Wait...';
		$scope.backdrop = true;
		$scope.promise = $http.get('http://httpbin.org/delay/3');

		Parse.User.logIn(form.email.toLowerCase(), form.password, {
			success: function(user) {
				$state.go('app.dashboard');
				// $scope.loginStatus = "Login successfully";
				$scope.loginForgot = null;
				$scope.promise = null;
				// Save current user
				//AuthService.storeUserCredentials(user);
			},
			error: function(user, error) {
				//Case user login with invalid account
				if(error.code === "101" || parseInt(error.code) === 101) {
					$scope.loginForgot = true;
					$scope.promise = null;
				}
			}
		});
	};

  /*
    Login with facebook
  */
  $scope.loginWithFacebook = function() {
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          FB.api('/me?fields=id,name,email,permissions', function (response) {

              user.set('username', response.name);
              user.set('email', response.email);
              user.save();
            });
        } else {
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  }
  /*
    Log out
  */

  $scope.logOut = function() {
    Parse.User.logOut();
    $window.reload();
  }

	$scope.forgotMessage = "Enter your email address and we'll send instructions to reset your password";
	/*
		Forgot password
	*/
	$scope.resetPassword = function(userEmail) {
		Parse.User.requestPasswordReset(userEmail, {
		  success: function(data) {
		  	// hide input and submit

		 	//Can't remember your password? Don't worry about it — it happens.

			//Your email is: buithevybkdn@gmail.com
			// Please check your emaill address to resetting new password. Thank you for using Krynkle.
			AuthService.getUserByUserName(userEmail).then(function(data){
				if(typeof data !== 'undefined') {
					$scope.userForgot = data.attributes;
				}
				else {
					$scope.userForgot = null;
				}
			});
		  },
		  error: function(error) {
		    // Show the error message somewhere
		    $scope.forgotMessage = "Sorry, " + error.message;
		  }
		});
	}

	/*
		Go forgot
	*/
	$scope.goForgot = function() {
		$scope.showForgotPassword= true ;
		$scope.userForgot = null
	}

	/*
		Back to login
	*/

	$scope.backToLogin = function() {
		$scope.showForgotPassword = null;
	}

	//check if already user
	$scope.currentUser = Parse.User.current();
	if($scope.currentUser !== null) {
		// hide login form
		// show logout form
		$scope.loginStatus = true;
	}
	///////////////////////END LOGIN //////////////////////////
		// var query = new Parse.Query("User");
		// query.equalTo("username", "truong.vu@codeenginestudio.com");
		// query.first()
		// .then(function(result){
		// });
		// return;
	$scope.logOut = function(form) {
		$scope.currentUser = null;
		Parse.User.logOut();
		$window.location.reload();
		$scope.loginStatus = null;
	}

	if(typeof option !== 'undefined') {
		$scope.option = option;
	}
  }]);
