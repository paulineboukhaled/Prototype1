'use strict';

angular.module('myApp.viz', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/viz', {
        templateUrl: 'viz/view1.html',
        controller: 'vizCtrl'
    });

}])


.controller('vizCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {


    }
    ]);

