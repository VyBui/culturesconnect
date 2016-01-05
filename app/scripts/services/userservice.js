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

    // AngularJS will instantiate a singleton by calling "new" on this function
  }]);
