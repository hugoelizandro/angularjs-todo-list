(function () {
    'use strict';

    angular.module('App')
        .service('AlertMsgService', AlertMsgService);

    AlertMsgService.$inject = ['$timeout'];
    function AlertMsgService($timeout) {
        var service = this;

        service.alerts = [];

        service.add = add;
        service.remove = remove;

        function add(alert) {
            service.alerts.push(alert);

            $timeout(function () {
                service.remove(0);
            }, 2000);
        }

        function remove(index) {
            service.alerts.splice(index, 1);
        }
    }
})();