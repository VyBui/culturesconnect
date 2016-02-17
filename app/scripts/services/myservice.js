'use strict';

/**
 * @ngdoc service
 * @name herokuTestApp.myService
 * @description
 * # myService
 * Service in the herokuTestApp.
 */
angular.module('herokuTestApp')
  .factory('myService', ['$q', 'cfpLoadingBar', function ($q, cfpLoadingBar) {


    var localHostSave = {};

    var Picture = Parse.Object.extend("Picture");
  	var Experience = Parse.Object.extend("Experience");
  	var ProfileObject = Parse.Object.extend("Profile");

    localHostSave.saveStep1 = function (user, step1) {
  		var defer = $q.defer();
      cfpLoadingBar.start();
      var queryProfile = new Parse.Query(ProfileObject);


      queryProfile.include("user");
      queryProfile.equalTo('userId', user);

      queryProfile.find({
      success: function(getProfile) {
        var profile ;
        if(typeof getProfile[0].id != 'undefined') {
          // updating....
          profile = getProfile[0];
        }

        else {
          profile = new ProfileObject();
          profile.set("userId", user);
        }

        profile.set("reason1", step1.firstSpecial);
        profile.set("reason2", step1.secondSpecial);
        profile.set("reason3", step1.thirdSpecial);
        profile.set("whyBecomeConnector", step1.whyBecome);

        profile.save(null, {
          success: function(newProfile) {
            defer.resolve(newProfile);

          },
          error: function(gameScore, error) {
            console.log('Failed to update a object, with error code: ' + error.message);
          }
        });
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        if(error.code === 101) {

        }
      }
    });

  		return defer.promise;
  	};

    localHostSave.saveStep2 = function(user, step1, step2, step3, experience) {
      var defer = $q.defer();

      var newExp = new Experience();
      var newPicture = new Picture();

      console.log(step3);

      newExp.set("userId", user);
      newExp.set("eName", step2.eName);
      newExp.set("place", step1.whereExperience);
      newExp.set("vehicleId", step3.vehicle);
      newExp.set("numberOfPeople", step3.numberOfPeople);
      newExp.set("languageId", step3.language);
      newExp.set("translator", step3.translator);


      newExp.save(null, {
        success: function(data) {
          if(typeof data.id !== 'undefined') {
            console.log("vao day");
            newPicture.set("path",  step2.picFile);
            newPicture.set("userId",  user);
            newPicture.set("expId", experience);

            newPicture.save(null, {
              success: function() {
                console.log("success");
              },
              error: function() {

              }
            })
          }
        },
        error: function() {

        }
      });

      return defer.promise;
    };

    localHostSave.saveStep3 = function(user, step3, experience) {
      var defer = $q.defer();

      console.log(step3);

      console.log(experience);

      return defer.promise;
    };

    return localHostSave;
  }]);
