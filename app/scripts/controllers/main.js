'use strict';

/**
 * @ngdoc function
 * @name herokuTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the herokuTestApp
 */
angular.module('herokuTestApp')
  .controller('MainCtrl',[ '$scope', 'getDataMainPart2Part2', function ($scope, getDataMainPart2Part2) {

    $scope.loadImageForSlider = function() {
        getDataMainPart2Part2.getDatabaseP1()
        .then(function(database){
          $scope.databasePart1 = angular.copy(database.dataMainPagePart1);
          if(typeof $scope.databasePart1.images !== 'undefined') {
            $scope.slides = $scope.databasePart1.images;
          }
        }).finally(function(){

        });
    };

    /*Why Choose Us Section*/
    $scope.loadWhyChooseUs = function() {
      getDataMainPart2Part2.getDatabaseP2()
      .then(function(database) {

        var language = "secondary";
        if(typeof database !== 'undefined') {
          $scope.databasepart2 = angular.copy(database);
          if(language.localeCompare("primary") == 0) {
            console.log("do nothing");
          }
          else {
            $scope.WhyChooseUs = $scope.databasepart2.VietNamese;
          }
          $scope.provines = $scope.databasepart2.provines;
          $scope.experienceTypes = $scope.databasepart2.experienceTypes;
        }
      });
    };


    /*Sing up*/
    $scope.clickToOpen = function () {
        console.log("vao day");
        ngDialog.open({ template: 'popupTmpl.html',  plain: true });
    };

    $scope.searchForExperience = function(searchForTheDestination, kindOfExperiences) {


      // Khi user click tim buttom, goi ham nay ra voi 2 tham so
      console.log("Dia diem: " + searchForTheDestination);
      // tim trong database nhung cc co dia diem trung voi bien searchForTheDestination
      console.log("group: " + kindOfExperiences);
      // tim trong database nhung cc co dia diem trung voi bien kindofExperience
    };

  }]);
