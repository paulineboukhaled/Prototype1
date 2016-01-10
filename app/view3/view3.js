'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [function() {

      getListCandidat();
      function getListCandidat() {
        $http.get("http://localhost:8080/TM_JobQuest/api/listPerson")
            .then(function successCallback(response) {
              console.log(response);
              $scope.candidats = response.data;

              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
              $scope.candidats = [
                {nom: 'dupont', prenom: 'pierre'},
                {nom: 'dupont', prenom: 'paul'},
                {nom: 'dupont', prenom: 'jacques'},
                {nom: 'dupont', prenom: 'alice'}
              ];
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
      }
      $scope.deleteCandidat = function (candidat) {
        $http.post("http://localhost:8080/TM_JobQuest/api/delete", candidat).then(function successCallback(response) {
          console.log(response);
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          console.log(response);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

      }
      $scope.addCandidat = function (candidat) {
        $http.post("http://localhost:8080/TM_JobQuest/api/post", candidat).then(function successCallback(response) {
          console.log(response);
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          console.log(response);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }



}]);