'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', "$http", function ($scope, $http)
      {
/*       $scope.candidats = [
          {nom: 'dupont', prenom: 'pierre'},
          {nom: 'dupont', prenom: 'paul'},
          {nom: 'dupont', prenom: 'jacques'},
          {nom: 'dupont', prenom: 'alice'}
        ];*/

/*        $scope.addCandidat = function(candidat)
        {
          candidat.id = $scope.candidats.length + 1;
          $scope.candidats.push({id:candidat.id, nom:candidat.nom, prenom:candidat.prenom});
        };

        $scope.deleteCandidat = function(candidat)
        {
          var index = $scope.candidats.indexOf(candidat);
          $scope.candidats.splice(index, 1);
        };*/

        getListCandidat();
        function getListCandidat() {

          /*          $scope.candidats = [
           {id:1, nom: 'dupont', prenom: 'pierre'},
           {id:2, nom: 'dupont', prenom: 'paul'},
           {id:3, nom: 'dupont', prenom: 'jacques'},
           {id:4, nom: 'dupont', prenom: 'alice'}
           ];*/

          $http.get("http://localhost:8080/TM_JobQuest/api/listPerson")
              .success(function (response) {
                $scope.candidats = response;
              }
          );
        }

        /*

          $http({
            method: 'GET',
            url: "http://localhost:8080/TM_JobQuest/api/listPerson"
          }).then(function
              successCallback(response) {
            console.log(response);
              $scope.candidats = response;

          }, function errorCallback(response){
              console.log(response);
              $scope.candidats = [
                {nom: 'dupont', prenom: 'pierre'},
                {nom: 'dupont', prenom: 'paul'},
                {nom: 'dupont', prenom: 'jacques'},
                {nom: 'dupont', prenom: 'alice'}
              ];


         });*/




      }]);