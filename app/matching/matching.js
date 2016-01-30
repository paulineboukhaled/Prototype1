'use strict';

angular.module('myApp.matching', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/matching', {
    templateUrl: 'matching/matching.html',
    controller: 'MatchingCtrl'
  });
}])

.controller('MatchingCtrl', ['$scope', '$http', '$route', '$rootScope', '$location', function ($scope, $http, $route, $rootScope, $location) {
        $scope.candidats = [];
        $scope.positions = [];
        $scope.bestPositions = [];
        $scope.bestCandidates = [];
        $scope.loadingCand = true;
        $scope.loadingPos = true;
        $scope.nbresults = 5;
        $scope.candidatSelected = [];
        $scope.positionSelected = [];
        $scope.showmatchingCand = false;
        $scope.showmatchingPos = false;


        $scope.showmatch = function(cand){
            $scope.candidatSelected = cand;
            $scope.showmatchingCand = !$scope.showmatchingCand;
            console.log($scope.showmatchingCand);
            console.log("appel");
        };

        $scope.showmatchPos = function(pos){
            $scope.positionSelected = pos;
            console.log(pos);
            $scope.showmatchingPos = !$scope.showmatchingPos;
        };

        $scope.lowNbResults = function (){
            if($scope.nbresults==0){
                $scope.nbresults = 0;
            }else{
                $scope.nbresults--;
            }
        };

        $scope.upperNbResults = function(){
            if($scope.nbresults==100){
                $scope.nbresults = 100;
            }else{
                $scope.nbresults++;
            }

        };

        $scope.changeNbResults = function(nbresults){
            $scope.nbresults = nbresults;

        };

        $http.get('http://localhost:8080/TM_JobQuest/api/position/globallist').
            success(function (data) {
                $scope.loadingPos =false;
                $scope.positions = data;
                var i = 0;
                for(var pId in $scope.positions) {
                    $scope.positions[pId].index = i++;
                }
            });


        $scope.getCandidat = function (uri){
            for(var id in $scope.candidats){
                if($scope.candidats[id].uri == uri){
                    return $scope.candidats[id];
                }
            }
        };

        $scope.getPosition = function (uri){
            for(var id in $scope.positions){
                if($scope.positions[id].uri == uri){
                    return $scope.positions[id];
                }
            }
        };

        $http.get('http://localhost:8080/TM_JobQuest/api/user/globallist').
            success(function (data) {
                $scope.candidats = data;
                $scope.loadingCand =false;
                var i = 0;
                for(var pId in $scope.candidats) {
                    $scope.candidats[pId].index = i++;
                }
            });



        $scope.getBestPositions = function (uri, nb){
            console.log(uri + " s");
            $http.post('http://localhost:8080/TM_JobQuest/api/matching/user', {personId: uri, numberOfResults:nb} ).
                success(function (data) {
                    $scope.bestPositions = data;
                    console.log("u " +uri);
                    console.log($scope.bestPositions);
                    //console.log(nb);
                });

        };

        $scope.getBestCandidates = function(uri, nb){
            console.log(uri);
            $http.post('http://localhost:8080/TM_JobQuest/api/matching/position', {positionId: uri, numberOfResults:nb} ).
                success(function (data) {
                    $scope.bestCandidates = data;
                    //console.log($scope.bestPositions);
                    //console.log(nb);
                });

        };

        $scope.candidatsPA = {};
        $scope.jobssPA = {};

        $scope.showCandidatInfoChange = function (index){
            console.log("showUser");
            $scope.candidats[index].show = !$scope.candidats[index].show;
        };

        $scope.showPositionInfoChange = function (index){
            console.log("showPosition" + index);
            $scope.positions[index].show = !$scope.positions[index].show;

        };


        $scope.showVisualisation = function () {
            console.log("show visual");

            $scope.candidatsPA = {};
            $scope.jobsPA = {};

            var id = 0;
            for(var candId in $scope.candidats){
                if($scope.candidats[candId].isSelected){
                    //console.log($scope.candidats[candId]);
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

}]);