'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.visualisation',
  'myApp.version',
  'lr.upload',
  'angucomplete'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

myApp.controller('helloCtrl', ['$scope', function ($scope) {

}]);


