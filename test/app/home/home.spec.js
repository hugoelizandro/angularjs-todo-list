describe('Home', function () {

    var template, $scope, AlertMsgService;

    beforeEach(module('App'));

    beforeEach(inject(function ($rootScope, $compile, $templateCache, $controller, _AlertMsgService_) {
        AlertMsgService = _AlertMsgService_;
        $scope = $rootScope.$new();
        template = angular.element('body');

        var templateString = '<section ng-include="\'app/home/home.template.html\'" ng-controller="HomeController as vm"></section>';
        spyOn(AlertMsgService, 'add');

        template.append($compile(angular.element(templateString))($scope));
        $scope.$apply();
    }));

    afterEach(function () {
        template.empty();
    });

    describe('when adding a new task', function () {
        beforeEach(function () {
            template.find('input[name="name"]').val('Minha Tarefa').trigger('input');
            template.find('textarea[name="description"]').val('Descrição da tarefa').trigger('input');
            template.find('button[type="submit"]').click();

            $scope.$apply();
        });

        it('adds the task at table', function () {
            expect(template.find('table tbody tr').length).toEqual(1);
            expect(template.find('table tbody tr').text()).toContain('Minha Tarefa');
            expect(template.find('table tbody tr').text()).toContain('Descrição da tarefa');
        });

        it('clears the form', function () {
            expect(template.find('input[name="name"]').val()).toEqual('');
            expect(template.find('textarea[name="description"]').val()).toEqual('');
        });

        it('calls the AlertMsgService', function () {
            expect(AlertMsgService.add).toHaveBeenCalledWith({ type: 'success', content: 'Adicionado com sucesso.' });
        });
    });

    describe('when edit a task', function () {
        beforeEach(function () {
            template.find('input[name="name"]').val('Minha Tarefa').trigger('input');
            template.find('textarea[name="description"]').val('Descrição da tarefa').trigger('input');
            template.find('button[type="submit"]').click();
            $scope.$apply();

            template.find('table tbody tr button.btn-edit').click();
            $scope.$apply();

            AlertMsgService.add.calls.reset();
        });

        it('fills the form with the task', function () {
            expect(template.find('input[name="name"]').val()).toEqual('Minha Tarefa');
            expect(template.find('textarea[name="description"]').val()).toEqual('Descrição da tarefa');
        });

        describe('when confirms the edition', function () {
            beforeEach(function () {
                template.find('input[name="name"]').val('Alterado nome da tarefa').trigger('input');
                template.find('button[type="submit"]').click();
                $scope.$apply();
            });

            it('updates the task on table', function () {
                expect(template.find('table tbody tr').text()).toContain('Alterado nome da tarefa');
                expect(template.find('table tbody tr').text()).toContain('Descrição da tarefa');
            });

            it('clears the form', function () {
                expect(template.find('input[name="name"]').val()).toEqual('');
                expect(template.find('textarea[name="description"]').val()).toEqual('');
            });

            it('calls the AlertMsgService', function () {
                expect(AlertMsgService.add).toHaveBeenCalledWith({ type: 'success', content: 'Editado com sucesso.' });
            });

            it('doesn\'t add a new task at table', function () {
                expect(template.find('table tbody tr').length).toEqual(1);
            });
        });

        describe('when cancels the edition', function () {
            beforeEach(function () {
                template.find('input[name="name"]').val('Alterado nome da tarefa').trigger('input');
                template.find('button.btn-cancel').click();
                $scope.$apply();
            });

            it('doesn\'t update the task on table', function () {
                expect(template.find('table tbody tr').text()).toContain('Minha Tarefa');
                expect(template.find('table tbody tr').text()).toContain('Descrição da tarefa');
            });

            it('clears the form', function () {
                expect(template.find('input[name="name"]').val()).toEqual('');
                expect(template.find('textarea[name="description"]').val()).toEqual('');
            });
        });
    });

    describe('when removes a task', function () {
        beforeEach(function () {
            template.find('input[name="name"]').val('Minha Tarefa').trigger('input');
            template.find('textarea[name="description"]').val('Descrição da tarefa').trigger('input');
            template.find('button[type="submit"]').click();
            $scope.$apply();

            AlertMsgService.add.calls.reset();

            template.find('table tbody tr button.btn-remove').click();
            $scope.$apply();
        });

        it('removes the task on table', function () {
            expect(template.find('table tbody tr').length).toEqual(0);
        });

        it('calls the AlertMsgService', function () {
            expect(AlertMsgService.add).toHaveBeenCalledWith({ type: 'success', content: 'Removido com sucesso.' });
        });
    });

    describe('when completes a task', function () {
        beforeEach(function () {
            template.find('input[name="name"]').val('Minha Tarefa').trigger('input');
            template.find('textarea[name="description"]').val('Descrição da tarefa').trigger('input');
            template.find('button[type="submit"]').click();
            $scope.$apply();

            AlertMsgService.add.calls.reset();

            template.find('table tbody tr button.btn-complete').click();
            $scope.$apply();
        });

        it('adds the class "line-through" at row', function () {
            expect(template.find('table tbody tr td:eq(0)').hasClass('line-through')).toBeTruthy();
            expect(template.find('table tbody tr td:eq(1)').hasClass('line-through')).toBeTruthy();
        });

        describe('when clicks again', function () {
            beforeEach(function () {
                template.find('table tbody tr button.btn-complete').click();
                $scope.$apply();
            });

            it('undus the taks', function () {
                expect(template.find('table tbody tr td:eq(0)').hasClass('line-through')).toBeFalsy();
                expect(template.find('table tbody tr td:eq(1)').hasClass('line-through')).toBeFalsy();
            });
        });
    });
});