'use strict';

describe('Directive: pagination', function () {

    beforeEach(module('paginationDirectiveApp'));
    beforeEach(module('template/pagination.html'));

    var element;
    var scope;
    var $compile;

    var getListElements = function () {
        return element.find('li');
    };

    var getPageElement = function (number) {
        return getListElements().eq(number);
    };

    function getAElementFromPage(number) {
        return getPageElement(number).find('a');
    }

    var getTextFromPageElement = function (number) {
        return getAElementFromPage(number).text();
    };

    var compileElement = function (html) {
        var linkFunction = $compile(html);
        element = linkFunction(scope);
    };

    beforeEach(inject(function ($rootScope, _$compile_) {
        $compile = _$compile_;
        scope = $rootScope.$new();
    }));

    describe('with standard directive', function () {

        beforeEach(function () {
            scope.numPages = 5;
            scope.currentPage = 3;
            compileElement('<pagination num-pages="numPages" current-page="currentPage"></pagination>');
            scope.$digest();
        });

        it('has the number of the page as text in each page item', function () {
            for (var i = 1; i < scope.numPages; i++) {
                expect(getTextFromPageElement(i)).toEqual('' + i);
            }
        });

        it('sets the current-page to be active', function () {
            var currentPageItem = getPageElement(scope.currentPage);
            expect(currentPageItem.hasClass('active')).toBe(true);
        });

        it('disables "next" if current-page is num-pages', function () {
            scope.currentPage = 5;
            scope.$digest();
            var nextPageItem = getPageElement(-1);
            expect(nextPageItem.hasClass('disabled')).toBe(true);
        });

        it('changes currentPage if a page link is clicked', function () {
            var page2 = getAElementFromPage(2);
            page2.triggerHandler('click');
            scope.$digest();
            expect(scope.currentPage).toBe(2);
        });

        it('does not change the current page on "next" click if already at last page', function () {
            var next = getAElementFromPage(-1);
            scope.currentPage = 5;
            scope.$digest();
            next.triggerHandler('click');
            scope.$digest();
            expect(scope.currentPage).toBe(5);
        });

        it('changes the number of items when numPages changes', function () {
            scope.numPages = 8;
            scope.$digest();
            expect(getListElements().length).toBe(10);
            expect(getTextFromPageElement(0)).toBe('Previous');
            expect(getTextFromPageElement(-1)).toBe('Next');
        });

    });

    describe('with on-select attribute', function () {

        beforeEach(function () {
            scope.numPages = 5;
            scope.currentPage = 3;
            scope.selectPageHandler = jasmine.createSpy('selectPageHandler');
            compileElement('<pagination num-pages="numPages" current-page="currentPage" on-select-page="selectPageHandler(page)"></pagination>');
            scope.$digest();
        });

        it('executes the onSelectPage expression when the current page changes', function () {
            var page2 = getAElementFromPage(2);
            page2.triggerHandler('click');
            scope.$digest();
            expect(scope.selectPageHandler).toHaveBeenCalledWith(2);
        });

    });


});
