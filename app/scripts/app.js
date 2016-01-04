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
    'ngSanitize',
    'angular-flexslider',
    'parse-angular',
    'ngDialog'
  ])
  .config(function ($routeProvider) {
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
  });
