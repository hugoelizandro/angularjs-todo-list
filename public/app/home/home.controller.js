(function () {
  'use strict';

  angular.module('App')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['AlertMsgService'];
  function HomeController(AlertMsgService) {
    var vm = this;

    vm.tasklist = [];

    vm.submit = submit;
    vm.add = add;
    vm.remove = remove;
    vm.show = show;
    vm.update = update;
    vm.clear = clear;
    vm.complete = complete;

    function submit(task) {
      (task.id) ? update(task) : add(task);
    }

    function add(task) {
      task.id = generateId();
      vm.tasklist.push(task);

      AlertMsgService.add({ type: 'success', content: 'Adicionado com sucesso.' });
      clear();
    }

    function remove(task) {
      vm.tasklist.splice(getIndexOfTask(task), 1);
      AlertMsgService.add({ type: 'success', content: 'Removido com sucesso.' });
    }

    function show(task) {
      vm.task = angular.copy(task);
    }

    function update(task) {
      vm.tasklist.splice(getIndexOfTask(task), 1, task);

      vm.clear();
      AlertMsgService.add({ type: 'success', content: 'Editado com sucesso.' });
    }

    function clear() {
      vm.task = {};
    }

    function complete(task) {
      task.complete ? task.complete = false : task.complete = true;
    }

    function getIndexOfTask(task) {
      var index = null;
      vm.tasklist.forEach(function (taskOfList, indexOfList) {
        if (taskOfList.id === task.id) {
          index = indexOfList;
        }
      });

      return index;
    }
  }

  var lastId = 0;
  function generateId() {
    return ++lastId;
  }
})();