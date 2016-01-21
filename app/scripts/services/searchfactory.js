'use strict';

/**
 * @ngdoc service
 * @name herokuTestApp.searchFactory
 * @description
 * # searchFactory
 * Factory in the herokuTestApp.
 */
angular.module('herokuTestApp')
  .factory('searchFactory', ['$q', function ($q) {
	// Return list of CC
	var searchOptions = {};
	
	var Division = Parse.Object.extend("Division");
	var CulturesConnect = Parse.Object.extend("CulturesConnect");
	
	// Search với địa điểm.
	searchOptions.getDataWithPlace = function (place) {
		var defer = $q.defer();
		var newPlace = searchOptions.stringToRegex(place);
		var query = new Parse.Query(CulturesConnect);
		
		query.matches("place", newPlace);
		query.addDescending("totalScore");
		query.find({
			success: function(cc) {
				defer.resolve(cc);
			},
			error: function(error) {
				defer.reject(error);
			}
		});
		return defer.promise;
	};
	
	// Search với loại trải nghiệm cụ thể
	searchOptions.getDataWithKindOfCultural = function (kindOfCultural) {
		var defer = $q.defer();
		var query = new Parse.Query(CulturesConnect);
		var innerQuery = new Parse.Query(Division);
		
		innerQuery.equalTo("groupName", "KIND_OF_CULTURAL");
		innerQuery.equalTo("order", parseInt(kindOfCultural));
		
		query.matchesQuery("kindOfCultural", innerQuery);
		query.addDescending("totalScore");
		query.find({
			success: function(cc) {
				defer.resolve(cc);
			},
			error: function(error) {
				defer.reject(error);
			}
		});
		return defer.promise;
	};
	
	// Search với địa điểm + loại trải nghiệm cụ thể
	searchOptions.getDataWithBoth = function (place, kindOfCultural) {
		var defer = $q.defer();
		var newPlace = searchOptions.stringToRegex(place);
		var query = new Parse.Query(CulturesConnect);
		var innerQuery = new Parse.Query(Division);
		
		innerQuery.equalTo("groupName", "KIND_OF_CULTURAL");
		innerQuery.equalTo("order", parseInt(kindOfCultural));
		
		query.matches("place", newPlace);
		query.matchesQuery("kindOfCultural", innerQuery);
		query.addDescending("totalScore");
		query.find({
			success: function(cc) {
				defer.resolve(cc);
			},
			error: function(error) {
				defer.reject(error);
			}
		});
		return defer.promise;
	};
	
	// Không cần truyền gì cả, get hết luôn order by score
	searchOptions.getDataWithoutParameters = function () {
		var defer = $q.defer();
		var query = new Parse.Query(CulturesConnect);
		query.addDescending("totalScore");
		query.find({
			success: function(cc) {
				defer.resolve(cc);
			},
			error: function(error) {
				defer.reject(error);
			}
		});
		return defer.promise;
	};
	
	searchOptions.stringToRegex = function(place) {
		place = place.replace(/\s+/g, " ");
		var str = ", ";
		var newStr = "";
		for(var i = 0; i< place.length; i++) {
			if (str.indexOf(place.charAt(i)) > -1) {
				newStr = newStr + place.charAt(i);
			} else {
				newStr = newStr + "[" + place.charAt(i).toUpperCase() + place.charAt(i).toLowerCase() +"]"
			}			
		}
		return newStr;
	}
	
	// return searchOptions
    return searchOptions;
  }]);

