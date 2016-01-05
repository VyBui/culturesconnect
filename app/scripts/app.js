'use strict';

//initial parse
Parse.initialize("35gDWedNY3uVt6bHHHjEIBeGvHp7BoaN1wXbLF2n", "Zxgz4cKELphn9KlrsygEfyzrrvhU6rySx4O6zEMf");
/**
 * @ngdoc overview
 * @name herokuTestApp
 * @description
 * # herokuTestApp
 *
 * Main module of the application.
 */
angular
  .module('herokuTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'angular-flexslider',
    'parse-angular',
    'ngDialog'
  ])
  .run(['$rootScope', '$state', '$stateParams',function ($rootScope, $state, $stateParams){
    //set root state for checking state change on the navigator
    //@see layout/header.html
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    //capture state change, check authentication
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin  = toState.data.requireLogin;
      var currentUser   = Parse.User.current();
      //console.log(currentUser);
      if (requireLogin && currentUser === null) {
        event.preventDefault();
        return $state.go('app.login');
      }
      else {
        $rootScope.currentUser = currentUser;
        //console.log();
      }
    });
  }])
  .config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      //
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      /*Find Experience*/
      .when('/searchExperience', {
        templateUrl: 'views/experience/experience.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      // Sign up
      .when('/UserauthenticationCtrl', {
        templateUrl: 'views/experience/experience.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
