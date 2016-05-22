describe('<alert-msg>', function () {

    var directive, $scope, $timeout, AlertMsgService;

    beforeEach(module('App'));

    beforeEach(inject(function ($rootScope, $compile, _$timeout_, _AlertMsgService_) {
        $timeout = _$timeout_;
        AlertMsgService = _AlertMsgService_;
        $scope = $rootScope.$new();

        var template = '<alert-msg></alert-msg>';

        directive = $compile(angular.element(template))($scope);
        angular.element('body').append(directive);
        $scope.$apply();
        
    }));

    afterEach(function () {
        angular.element('body').empty();
    });

    describe('when adds a alert with service', function () {
        it('creates a alert', function () {
            AlertMsgService.add({ type: 'success', content: 'Adicionado com sucesso.' });
            $scope.$apply();

            expect(directive.find('div.alert').length).toEqual(1);
            expect(directive.find('div.alert').is(':visible')).toBe(true);
        });
        
        it('adds a class to the alert with the type', function () {
            AlertMsgService.add({ type: 'mytype', content: 'Adicionado com sucesso.' });
            $scope.$apply();

            expect(directive.find('div.alert.alert-mytype').length).toEqual(1);
            expect(directive.find('div.alert.alert-mytype').is(':visible')).toBe(true);
        })
    });

    describe('when clicks at close button', function () {
        beforeEach(function () {
            AlertMsgService.add({ type: 'success', content: 'Adicionado com sucesso.' });
            $scope.$apply();
        });

        it('removes the alert', function () {
            directive.find('div.alert button.close').click();
            $scope.$apply();
            expect(directive.find('div.alert').length).toEqual(0);
        });
    });

    describe('when pass 2000 mileseconds', function () {
        beforeEach(function(){
            AlertMsgService.add({ type: 'success', content: 'Adicionado com sucesso.' });
            $scope.$apply();
        });
        
        it('removes the alert', function () {
            $timeout.flush(1999);
            expect(directive.find('div.alert').length).toEqual(1);
                        
            $timeout.flush(1);
            expect(directive.find('div.alert').length).toEqual(0);            
        });
    });
});