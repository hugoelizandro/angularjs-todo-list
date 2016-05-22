(function () {
  'use strict';

  angular.module('App')
    .directive('scrollTop', scrollTopDirective);

  function scrollTopDirective() {
    return {
      restrict: 'A',
      controller: scrollTopController
    };
  }

  scrollTopController.$inject = ['$element'];
  function scrollTopController($element) {
    $element.on('click', function () {
      var body = angular.element('html, body');
      body.animate({ scrollTop: 0 }, '300', 'swing');
    });
  }
})();