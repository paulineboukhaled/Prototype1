'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl',
      css: 'bower_components/bootstrap/dist/css/bootstrap.min.css'
  });
}])

.controller('View3Ctrl', ['$scope', '$http', '$route', '$rootScope', '$location', function ($scope, $http, $route, $rootScope, $location) {

        $scope.candidats = [];
        $scope.positions = [];
        $scope.bestPositions = [];
        $scope.loading = true;



        $http.get('http://localhost:8080/TM_JobQuest/api/position/globallist').
            success(function (data) {
                $scope.positions = data;
            });



        $http.get('http://localhost:8080/TM_JobQuest/api/user/globallist').
            success(function (data) {
                $scope.candidats = data;
                $scope.loading =false;
            });



        $scope.getBestPositions = function (uri){
            console.log(uri);
            $http.post('http://localhost:8080/TM_JobQuest/api/matching/user', {personId: uri} ).
                success(function (data) {
                    $scope.bestPositions = data;
                    console.log($scope.bestPositions);
                });

        }

        $scope.candidatsPA = {};
        $scope.jobssPA = {};

        $scope.showCandidatInfoChange = function (index){
            console.log("showUser");
            $scope.candidats[index].show = !$scope.candidats[index].show;
        };

        $scope.showPositionInfoChange = function (index){
            console.log("showPosition");
            $scope.positions[index].show = !$scope.positions[index].show;

        };


        $scope.showVisualisation = function () {
            console.log("show visual");

            $scope.candidatsPA = {};
            $scope.jobsPA = {};

            var id = 0;
            for(var candId in $scope.candidats){
                if($scope.candidats[candId].isSelected){
                    console.log($scope.candidats[candId]);


                    var skills = {};
                    skills["computer"] = {};

                    for(var skillId in $scope.candidats[candId].skills){
                        skills["computer"][$scope.candidats[candId].skills[skillId].name] = {
                            "years":parseInt($scope.candidats[candId].skills[skillId].yearOfExperience),
                            "level":parseInt($scope.candidats[candId].skills[skillId].level)
                        };

                    }

                    $scope.candidatsPA[id] = {
                        "lastname": $scope.candidats[candId].name,
                        "firstname":$scope.candidats[candId].firstname,
                        "position": (id + 1),
                        "isSelected":"false",
                        "skills": skills
                    };

                    id++;

                }
            }

/*
            {
                "0":{
                "name":"DevCpp",
                    "position":"1",
                    "isSelected":"false",
                    "skills":{
                    "computer":{
                        "Java_(programming_language)":{
                            "years":2,
                                "level":4
                        },
                        "skill2":{
                            "years":3,
                                "level":3
                        },
                        "skill3":{
                            "years":1,
                                "level":1
                        }
                    }
                }
            },*/
/*
            {
                "0":{
                "position":1,
                    "isSelected":"false",
                    "skills":{
                    "computer":{
                        "Java_(programming_language)":{
                            "years":"2",
                                "level":"4"
                        },
                        "skill2":{
                            "years":"3",
                                "level":"3"
                        },
                        "skill3":{
                            "years":"1",
                                "level":"1"
                        }
                    }
                }
            }
            }
*/
            id = 0;
            for(var jobId in $scope.positions){
                if($scope.positions[jobId].isSelected){
                    console.log($scope.positions[jobId]);


                    var skills = {};
                    skills["computer"] = {};

                    for(var skillId in $scope.positions[jobId].skills){
                        skills["computer"][$scope.positions[jobId].skills[skillId].name] = {
                            "years":parseInt($scope.positions[jobId].skills[skillId].yearOfExperience),
                            "level":parseInt($scope.positions[jobId].skills[skillId].level)
                        };

                    }

                    $scope.jobsPA[id] = {
                        "name": $scope.positions[jobId].position,
                        "position": (id + 1),
                        "isSelected":"false",
                        "skills": skills
                    };

                    id++;

                }
            }

            $rootScope.cand = $scope.candidatsPA;
            $rootScope.job = $scope.jobsPA;

            $location.url('/visualisation');

        };



      /*getListCandidat();
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
      }*/



}]);