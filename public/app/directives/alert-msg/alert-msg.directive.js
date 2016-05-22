(function () {
  'use strict';

  angular.module('App')
    .directive('alertMsg', alertMsgDirective);

  function alertMsgDirective() {
    return {
      controller: 'AlertMsgController',
      controllerAs: 'vm',
      templateUrl: 'app/directives/alert-msg/alert-msg.template.html'
    };
  }
})();