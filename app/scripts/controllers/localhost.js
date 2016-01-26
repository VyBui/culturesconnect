'use strict';

/**
 * @ngdoc function
 * @name herokuTestApp.controller:LocalhostCtrl
 * @description
 * # LocalhostCtrl
 * Controller of the herokuTestApp
 */
angular.module('herokuTestApp')
  .controller('localhostCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {

    $scope.step1 = {
      firstSpecial: "",
      secondSpecial: "",
      thirdSpecial: "",
      whyBecome: "",
      kindOfExperiences: "",
      whereExperience: ""
    };
    $scope.step2 = {
      eName: "",
      croppedDataUrl: ""
    };
    $scope.step3 = {
      vehicle: "",
      cost: 0,
      language: "",
      support: "",
      numberOfPeople: ""
    };

    $scope.steps = [
    {
        templateUrl: 'views/localHost/step1.html',
        title: 'Profile'
    },
    {
        templateUrl: 'views/localHost/step2.html',
        title: 'Describe your experience'
    },
    {
        templateUrl: 'views/localHost/step3.html',
        title: 'Support Information'
    },
    {
        templateUrl: 'views/localHost/step4.html',
        title: 'Preview'
    }
    ];


    $scope.upload = function (dataUrl) {
      Upload.upload({
          url: '',
          data: {
              file: Upload.dataUrltoBlob(dataUrl)
          },
      }).then(function (response) {
          $timeout(function () {
              $scope.result = response.data;
          });
      }, function (response) {
          if (response.status > 0) $scope.errorMsg = response.status
              + ': ' + response.data;
      }, function (evt) {
          $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
      });
    };

    $scope.submitAllForm = function() {
      console.log($scope);

    };
}]);
