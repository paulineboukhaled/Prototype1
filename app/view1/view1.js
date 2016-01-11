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