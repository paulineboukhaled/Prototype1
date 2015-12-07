'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
        $scope.newCandidat = {nom: 'dupont', prenom: 'pierre', skill: 'java'};
        $scope.tags= $('#my-tag-list').tags({
            tagData : ['Tag1', 'Tag2']
        } )
        getListCandidat();




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


        //  function getListCandidat() {
        //  $http.get("http://localhost:8080/TM_JobQuest/api/listPerson")
        //      .success(function (response) {
        //        $scope.candidats = response;
        //      }
        //  );
        //}


        $scope.getTags = function(labs) {
            var i=$scope.tags.getTags().length;
            while($scope.tags.getTags().length!=0)
            {
                $scope.tags.removeTag($scope.tags.getTags()[i]);
                i--;
            }
            var j=0;
            while($scope.tags.getTags().length!=labs.length)
            {
                $scope.tags.addTag(labs[j]);
                j++;
            }
        }

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


        $scope.getLabels = function(label) {
            $http.get("http://localhost:8080/TM_JobQuest/api/?foo="+label)
                .then(function successCallback(response) {
                    $scope.responseLabels = response.data.skill;
                    $scope.getTags($scope.responseLabels);
                    //$scope.candidats = response.data;
                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    console.log(response);
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





    }

    ]);