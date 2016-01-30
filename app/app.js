'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.cvForm',
  'myApp.positionForm',
  'myApp.matching',
  'myApp.visualisation',
  'myApp.version',
  'myApp.home',
  'lr.upload',
  'angucomplete'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);



