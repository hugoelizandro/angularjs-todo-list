(function () {
    'use strict';

    angular.module('App')
        .controller('AlertMsgController', AlertMsgController);

    AlertMsgController.$inject = ['AlertMsgService'];
    function AlertMsgController(AlertMsgService) {
        var vm = this;

        vm.alertList = AlertMsgService.alerts;
        vm.removeAlert = AlertMsgService.remove;
    }
})();