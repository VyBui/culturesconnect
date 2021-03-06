'use strict';

/**
 * @ngdoc service
 * @name herokuTestApp.userService
 * @description
 * # userService
 * Service in the herokuTestApp.
 */
angular.module('herokuTestApp')
  .factory('AuthService', ['$rootScope','$http','$q', '$state', 'localStorageService', function($rootScope, $http, $q, $state, localStorageService){

    // AngularJS will instantiate a singleton by calling "new" on this
    var userService = {};

 	/////
	// name: storeUserCredentials
	// Description: Save session to local Store
	// @param user information response from API
	// @void
	////

	userService.storeUserCredentials = function(user) {
		localStorageService.remove('currentUser');
		localStorageService.set('currentUser', user);
	};

	/////
	// name: getUserCredentials
	// Description: Save session to local Store
	// @param key value (constant from appconfig userLogged)
	// return: user information
	////
	userService.getUserCredentials = function(){
		return localStorageService.get('currentUser');
	};
		/////
	// name: remove LocalStore
	// Description: Remove cookie
	// @param key value (constant from appconfig userLogged)
	// @void
	////
	userService.removeUserCredentials = function() {
		localStorageService.remove('currentUser');
		localStorageService.clearAll();
	};

	userService.removeAll = function() {
		localStorageService.clearAll();
	};


	userService.getUserByUserId = function(userId) {
		var defer = $q.defer();

		var query = new Parse.Query('User');

		query.get(userId, {
			success: function(user) {
				defer.resolve(user);
			},
			error: function(error) {
				defer.reject(error);
			}
		});

		return defer.promise;
	}

	userService.getUserByUserName = function(username) {
		var defer = $q.defer();

		var query = new Parse.Query('User');
		query.equalTo('username', username);

		query.find({
			success: function(user) {
				defer.resolve(user[0]);
			},
			error: function(error) {
				defer.reject(error);
			}
		});

		return defer.promise;
	}

	userService.editUserAccountTwo = function(user) {
		var defer = $q.defer();

		var query = new Parse.Query('User');
		query.equalTo('objectId', user.id);
		query.first().then(function(selectedUser) {
			//set
			//first name
			selectedUser.set('first_name',user.first_name);
			// last name
			selectedUser.set('last_name', user.last_name);
			//password
			if(typeof user.newPassword !== 'undefined' && user.newPassword !== ' '){
				selectedUser.set('password', user.newPassword);
			}
			//email
			selectedUser.set('email', user.email);
			selectedUser.set('username', user.email);
			//Address
			selectedUser.set('address', user.address);
			//City
			selectedUser.set('city', user.city);
			//State
			selectedUser.set('state', user.state);
			//Zip code
			selectedUser.set('zipcode', parseInt(user.zipcode));

			/// save
			selectedUser.save(null, {
				success: function(userafterSave) {
					defer.resolve(userafterSave);
				},
				error: function(error) {
					defer.reject(error);
				}
			});

		});
		return defer.promise;
	}

	userService.authenticate = function(user) {
		var defer = $q.defer();

		var query = new Parse.Query(Parse.User);
		query.whereEqualTo('user', user);
		//query.equalTo('password', user.password);

		query.find({
			success: function(user) {
				console.log(user);
				defer.resolve(user);
			},
			error: function(error) {
				defer.reject(error);
			}
		});

		return defer.promise;
	}

  // Get Facebook Login status
  userService.getFacebookStatus = function() {
    var defer = $q.defer();
    var FacebookStatus= {
      id:0,
      accessToken: 0,
      status: null
    };

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        FacebookStatus.id = response.authResponse.userID;
        FacebookStatus.accessToken = response.authResponse.accessToken;
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        // but has not authenticated your app
        FacebookStatus.status = 'not_authorized';
      } else {
        // the user isn't logged in to Facebook.
      }

      defer.resolve(FacebookStatus);

      return defer.promise;
     });
  }

  //get facebook user information api


 	/// return userService
 	return userService;
  }]);
