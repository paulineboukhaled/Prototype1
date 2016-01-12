'use strict';

angular.module('myApp.view1', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });

}])

.controller('View1Ctrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
        $scope.newCandidat = {nom: 'Dupont', prenom: 'Pierre', skill: 'Java_(programming_language)', city: 'Fribourg', npa:'1700', dateofbirth:'2014-02-20', address:'21 avenue du moleson'};
        $scope.checked = true;
        $scope.prop2 = {
            "type": "select",
            "name": "level",
            "value": "Knowledge",
            "values": ['Knowledge', 'Experience', 'Deep', 'Expert']
        };

        $scope.prop = {
            "type": "select",
            "name": "yearofexperience",
            "value": "1",
            "values": ["1", "2", "3", "4","5","6","7","8","9","10","11", "12", "13", "14","15","16","17","18","19","20","21", "22", "23", "24","25","26","27","28","29","30","31", "32", "33", "34","35","36","37","38","39","40","41", "42", "43", "44","45","46","47","48","49","50"]
        };


        $scope.nextStep =  function() {
            $scope.checked = !$scope.checked;
        }




        $scope.getLabels = function(label) {
            $http.get("http://localhost:8080/TM_JobQuest/api/?skill="+label)
                .success(function(response) {
                    $scope.responseLabels = response;
                    $scope.getTags($scope.responseLabels);
                }
            );
        };



    }

    ]);