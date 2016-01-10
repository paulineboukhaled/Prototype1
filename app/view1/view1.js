'use strict';

angular.module('myApp.view1', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });

}])

.controller('View1Ctrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
        $scope.newCandidat = {nom: 'dupont', prenom: 'pierre', skill: 'Java_(programming_language)'};
        $scope.checked = true;
        /*$scope.tags= $('#my-tag-list').tags({
            tagData : ['Tag1', 'Tag2']
        } )*/

        $scope.nextStep =  function() {
            $scope.checked = !$scope.checked;
        }

        $scope.user = {
            name: 'awesome user'
        };



        $scope.getTags = function(labs) {
            var i=$scope.tags.getTags().length;
            while(i>-1)
            {
                $scope.tags.removeTag($scope.tags.getTags()[i-1]);
                i--;
            }
            var j=0;
            while($scope.tags.getTags().length!=labs.length)
            {
                //alert(labs[j]);
                $scope.tags.addTag(labs[j]);
                j++;
            }
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