'use strict';

/**
 * @ngdoc function
 * @name paginationDirectiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the paginationDirectiveApp
 */
angular.module('paginationDirectiveApp')
    .controller('MainCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.numPages = 5;
        $scope.currentPage = 1;

        $scope.pageChangeHandler = function (page) {
            console.log('New Page: ' + page);
        };
    });
