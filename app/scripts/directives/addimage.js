'use strict';

/**
 * @ngdoc directive
 * @name herokuTestApp.directive:addImage
 * @description
 * # addImage
 */
angular.module('herokuTestApp')
  .directive('addImage', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the addImage directive');
      }
    };
  });
