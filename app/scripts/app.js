'use strict';

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
    'ngDialog',
    'LocalStorageModule',
    'directive.g+signin',
    'multiStepForm',
    'ngFileUpload'
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
      if (requireLogin && currentUser === null) {
        event.preventDefault();
        //return $state.go('app.login');
        return $state.go('app.login');
      }
      else {
        $rootScope.currentUser = currentUser;
        //console.log();
      }
    });
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider ) {
    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl',
    //     controllerAs: 'main'
    //   })
    //   //
    //   .when('/about', {
    //     templateUrl: 'views/about.html',
    //     controller: 'AboutCtrl',
    //     controllerAs: 'about'
    //   })
    //   /*Find Experience*/
    //   .when('/searchExperience', {
    //     templateUrl: 'views/experience/experience.html',
    //     controller: 'AboutCtrl',
    //     controllerAs: 'about'
    //   })
    //   /*local Host*/
    //   .when('/localHost', {
    //     templateUrl: 'views/localHost/main.html',
    //     controller: 'LocalhostCtrl',
    //     controllerAs: 'localhost'
    //   })
    //   // Sign up
    //   .when('/UserauthenticationCtrl', {
    //     templateUrl: 'views/experience/experience.html',
    //     controller: 'AboutCtrl',
    //     controllerAs: 'about'
    //   })
      ///////////////////////////////////
      /// Route
      ///////////////////////////////////
      $urlRouterProvider.otherwise('/homepage');
      $stateProvider
      .state('app',{
          url: '/',
          views: {
              'header': {
                  templateUrl: '/views/layout/header.html'
              },
              'content': {
                  templateUrl: '/views/layout/content.html'
              },
              'footer': {
                  templateUrl: '/views/layout/footer.html'
              }
          },
          data: {
            requireLogin: false // this property will apply to all children of 'app'
          }
        })
        ///////
        // Home
        ///////
        .state('app.homepage', {
            url: 'homepage',
            views: {
                'content@': {
                    templateUrl: 'views/home/home.html',
                    controller: 'MainCtrl'
                }
            },
            data: {
              requireLogin: false
            }
        })
        .state('app.localHost', {
          url: 'localHost',
          views: {
            'content@': {
                templateUrl: 'views/localHost/main.html',
                controller: 'localhostCtrl'
            }
          },
          data: {
            requireLogin: false
          }
        });
  }]);
