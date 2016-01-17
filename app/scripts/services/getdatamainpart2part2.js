'use strict';

/**
 * @ngdoc service
 * @name herokuTestApp.getDataMainPart2Part2
 * @description
 * # getDataMainPart2Part2
 * Service in the herokuTestApp.
 */
angular.module('herokuTestApp')
  .service('getDataMainPart2Part2',['$http', '$q', function ($http, $q) {
    	var databaseServicesVar = {};

    	databaseServicesVar.getDatabaseP1 = function() {
    		var defer = $q.defer();
    		$http({method: 'GET', url: '../scripts/database.json', cache:true}).success(function(data, status, headers, config) {
	  			if(typeof data !== 'undefined') {
	  				defer.resolve(data);
	  			}
	  		}).error(function(error){
	  			defer.reject(error);
	  		});
	  		return defer.promise;
    	};

      databaseServicesVar.getDatabaseP2 = function() {
        var defer = $q.defer();
    		$http({method: 'GET', url: '../scripts/database.json', cache:true}).success(function(data, status, headers, config) {
	  			if(typeof data !== 'undefined') {
	  				defer.resolve(data.dataMainPagePart2);
	  			}
	  		}).error(function(error){
	  			defer.reject(error);
	  		});
	  		return defer.promise;
      }

  		return databaseServicesVar;
  }]);
