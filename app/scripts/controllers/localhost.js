'use strict';

/**
 * @ngdoc function
 * @name herokuTestApp.controller:LocalhostCtrl
 * @description
 * # LocalhostCtrl
 * Controller of the herokuTestApp
 */
angular.module('herokuTestApp')
  .controller('localhostCtrl', ['$scope', 'Upload', '$timeout', 'myService', 'cfpLoadingBar', function ($scope, Upload, $timeout, myService, cfpLoadingBar) {
    console.log($scope.currentUser);
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
      croppedDataUrl: "",
      pictureToAdds: []
    };
    $scope.step3 = {
      vehicle: "",
      cost: "",
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

    // $scope.upload = function (dataUrl) {
    //   Upload.upload({
    //       url: '',
    //       data: {
    //           file: Upload.dataUrltoBlob(dataUrl)
    //       },
    //   }).then(function (response) {
    //       $timeout(function () {
    //           $scope.result = response.data;
    //       });
    //   }, function (response) {
    //       if (response.status > 0) $scope.errorMsg = response.status
    //           + ': ' + response.data;
    //   }, function (evt) {
    //       $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
    //   });
    // };

    $scope.submitAllForm = function() {
      // use angular syn
      //
      // Save Step 1 First
      myService.saveStep1($scope.currentUser, $scope.step1).then(function(data) {

        if(typeof data.id != 'undefined') {
          //success
          cfpLoadingBar.complete();

          // Save Step 2
          myService.saveStep2($scope.currentUser, $scope.step1, $scope.step2, $scope.step3, data).then(function(data2) {

            if(typeof data2.id !== 'undefined') {
              //
              myService.saveStep3($scope.currentUser, $scope.step3, data).then(function(data3) {

              });
            }
          });
        }
      });
    };

   $scope.ByeByeBye = function() {
     var newItemNo = $scope.step2.pictureToAdds.length+1;
     $scope.step2.pictureToAdds.push({'id':'choice'+newItemNo});
   };

   $scope.removeChoice = function() {
     var lastItem = $scope.step2.pictureToAdds.length-1;
     $scope.step2.pictureToAdds.splice(lastItem);
   };

}]);
