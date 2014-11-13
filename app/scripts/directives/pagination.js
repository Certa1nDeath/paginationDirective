'use strict';

/**
 * @ngdoc directive
 * @name paginationDirectiveApp.directive:pagination
 * @description
 * # pagination
 */
angular.module('paginationDirectiveApp')
    .directive('pagination', function () {
        return {
            templateUrl: 'template/pagination.html',
            restrict: 'E',
            scope: {
                numPages: '=',
                currentPage: '=',
                onSelectPage: '&'
            },
            replace: true,
            link: function postLink(scope, element, attrs) {
                scope.$watch('numPages', function (value) {
                    scope.pages = [];
                    for (var i = 1; i <= value; i++) {
                        scope.pages.push(i);
                    }
                    if (scope.currentPage > value) {
                        scope.selectPage(value);
                    }
                });

                scope.noNext = function () {
                    return scope.numPages === scope.currentPage;
                };

                scope.noPrevious = function () {
                    return scope.currentPage === 1;
                };

                scope.isActive = function (page) {
                    return scope.currentPage === page;
                };

                scope.selectPage = function (page) {
                    if (!scope.isActive(page)) {
                        scope.currentPage = page;
                        scope.onSelectPage({page: page});
                    }
                };

                scope.selectNext = function () {
                    if (!scope.noNext()) {
                        scope.selectPage(scope.currentPage + 1);
                    }
                };

                scope.selectPrevious = function () {
                    if (!scope.noPrevious()) {
                        scope.selectPage(scope.currentPage - 1);
                    }
                };
            }
        };
    });
