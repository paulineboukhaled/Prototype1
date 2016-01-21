'use strict';

angular.module('myApp.visualisation', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/visualisation', {
            templateUrl: 'visualisation/visualisation.html',
            controller: 'VisualisationCtrl'
        });
    }])

    .controller('VisualisationCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        $scope.candidats = $rootScope.cand;
        $scope.showItem = false;
        $scope.jobs = $rootScope.job;
        $scope.echelle = ["Year of experience", "Level"];
        $scope.echelleValue = {
            0: {
                level: "Knowledge"
            },
            1: {
                level: "Experience"
            },
            2: {
                level: "Deep"
            },
            3: {
                level: "Expert"
            }
        };


        $scope.keys = function (obj) {
            return obj ? Object.keys(obj) : []
        };

        $scope.removeCandidat = function (key) {
            delete $scope.candidats[key];
        };

        $scope.upCandidat = function (key) {
            var previousId = null;
            for (var id in $scope.candidats) {

                if (id == key && previousId != null) {
                    $scope.switchCandidat(key, previousId);
                    break;
                } else {
                    previousId = id;
                }
            }
        };

        $scope.downCandidat = function (key) {
            var idFound = false;
            for (var id in $scope.candidats) {

                if (idFound) {
                    $scope.switchCandidat(key, id);
                    break;
                }

                if (id == key) {
                    idFound = true;
                }
            }
        };

        $scope.switchCandidat = function (candidat1Id, candidat2Id) {
            //console.log(candidat1Id + " " + candidat2Id);
            var c1 = $scope.candidats[candidat1Id];
            var c2 = $scope.candidats[candidat2Id];
            $scope.candidats[candidat1Id] = c2;
            $scope.candidats[candidat2Id] = c1;

        };

        /*$http.get('http://localhost:8080/TM_JobQuest/api/user/list').
            success(function (data) {
                $scope.candidats = data;
            });

        $http.get('http://localhost:8080/TM_JobQuest/api/position/list').
            success(function (data) {
                $scope.jobs = data;
            });*/


        $scope.init = function() {
            $scope.listEchelleSelectedMultiCompOneCand = $scope.echelle[0];
            $scope.draw();
        };


        // Retourne la liste des jobs selectionnés
        $scope.getSelectedJobs = function() {
            var jobLst = [];
            for(var id in $scope.jobs) {
                var job = $scope.jobs[id];
                if (job.isSelected == true) {
                    jobLst.push(job);
                }
            }
            return jobLst;
        };

        // Retourne la liste des candidats selectionnés
        $scope.getSelectedCandidats = function() {
            var candidatLst = [];
            for(var id in $scope.candidats) {
                var job = $scope.candidats[id];
                if (job.isSelected == true) {
                    candidatLst.push(job);
                }
            }
            return candidatLst;
        }

        // Si array1 contient l'element elt
        $scope.arrayContains = function(array1, elt) {
            for(var id in array1) {
                var elt_ = array1[id];
                if(elt_==elt)
                    return true;
            }
            return false;
        }

        // Si array1 contient l'element elt
        $scope.hashmapContains = function (hasmap1, key1) {
            for (var key in hasmap1) {
                if (key == key1)
                    return true;
            }
            return false;
        }

        // Merge les tableaux en retenant qu'une seule fois chaque valeur
        $scope.fusionArray = function(array1, array2) {
            var a = [];
            for(var id in array1) {
                var elt = array1[id];
                a.push(elt);
            }
            for(var id in array2) {
                var elt = array2[id];
                if(!$scope.arrayContains(a, elt))
                    a.push(elt);
            }
            return a;
        };

        // Retourne la liste de competences pour un job ou un candidat
        $scope.getRequierdCompetences = function(jobOrCandidate) {
            var compLst = [];
            for(var id in jobOrCandidate.skills.computer)
                compLst.push(id);

            return compLst;
        };

        // Retourne toutes les competences des jobs selectionnes
        $scope.getSelectedJobCompetences = function() {
            var compFullLst = [];
            var jobs = $scope.getSelectedJobs();
            for(var id in jobs) {
                var compLst = $scope.getRequierdCompetences(jobs[id]);
                compFullLst  = $scope.fusionArray(compFullLst, compLst);
            }

            return compFullLst;
        };

        // retourne un tableau contenant la correspondance des competences en terme d'annees
        $scope.getSkillsYear = function(jobOrCandidate) {
            var r = [];
            var sortedComptences = $scope.getSelectedJobCompetences(); // ordre attentu
            var cs = $scope.getRequierdCompetences(jobOrCandidate) // a créer



            for(var id in sortedComptences) {
                if($scope.arrayContains(cs, sortedComptences[id])) {
                    r.push(jobOrCandidate.skills.computer[sortedComptences[id]].years);
                }else {
                    r.push(0);
                }

            }
            return r;
        };

        $scope.getSkillYear = function(comp, jobOrCandidate){
            for(var id in jobOrCandidate.skills.computer){
                if(id==comp){
                    return jobOrCandidate.skills.computer[id].years;
                }
            }
            return 0;
        };

        $scope.getSkillLevel = function (comp, jobOrCandidate) {
            console.log("getSkillLevel");
            for (var id in jobOrCandidate.skills.computer) {
                if (id == comp) {
                    return jobOrCandidate.skills.computer[id].level;
                }
            }
            return 0;
        };

        // retourne un tableau contenant la correspondance des competences en terme de Level
        $scope.getSkillsLevel = function (jobOrCandidate) {
            var r = [];
            var sortedComptences = $scope.getSelectedJobCompetences(); // ordre attentu
            var cs = $scope.getRequierdCompetences(jobOrCandidate) // a créer


            for (var id in sortedComptences) {
                if ($scope.arrayContains(cs, sortedComptences[id])) {
                    r.push(jobOrCandidate.skills.computer[sortedComptences[id]].level);
                } else {
                    r.push(0);
                }

            }
            return r;
        }


        $scope.draw = function() {
            $scope.drawRadar();
            $scope.drawMultiCompMultiCand();
            $scope.drawMultiCompOneCand();
            $scope.drawOneCompMultiCandLevel();
            $scope.drawOneCompMultiCand();
            $scope.drawOneCompMultiCandPieChart();
            $scope.listComp = $scope.getSelectedJobCompetences();
        };

        /*----------------------------------------------------------*/
        /*--------------------DRAW GRAPH----------------------------*/
        /*----------------------------------------------------------*/

        $scope.drawMultiCompOneCand = function(candidat) {
            if(candidat==null) {
                candidat = $scope.getSelectedCandidats()[0]; // à traiter
                if(candidat == null)
                    return;
            }

            $scope.currentCand = candidat;

            // On va charger en json les donnees pour les introduire dans highcharts
            var listComp = $scope.getSelectedJobCompetences();
            var compCand = $scope.getSkillsYear(candidat);
            var data = {
                chart: {
                    renderTo : 'containerMultiCompOneCand'
                },
                title: {
                    text: 'Skills of ' + candidat.firstname + " " + candidat.lastname
                },
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: "Year of experience"
                    },
                    min: 0
                },
                xAxis: {
                    categories: listComp
                },

                series: []
            };
            data.series.push(
                {
                    type: 'column',
                    name: candidat.firstname+" "+candidat.name,
                    data: compCand
                }
            );

            var selectedJobs = $scope.getSelectedJobs();
            for(var id in selectedJobs) {
                var c = selectedJobs[id];
                var v = $scope.getSkillsYear(c);
                var n = c.name;
                data.series.push(
                    {
                        type: 'spline',
                        name: n,
                        data: v,
                        marker: {
                            lineWidth: 2
                        }
                    }
                )
            }

            var graph = new Highcharts.Chart(data);

        };

        $scope.drawMultiCompOneCandLevel = function (candidat) {
            if (candidat == null) {
                candidat = $scope.getSelectedCandidats()[0]; // à traiter
                if(candidat == null)
                    return;
            }
            $scope.currentCand = candidat;
            // On va charger en json les donnees pour les introduire dans highcharts
            var listComp = $scope.getSelectedJobCompetences();
            var compCand = $scope.getSkillsYear(candidat);
            var data = {
                chart: {
                    renderTo: 'containerMultiCompOneCandLevel'
                },
                title: {
                    text: 'Skills of ' + candidat.firstname + " " + candidat.lastname
                },
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: "Level"
                    },
                    min: 0,
                    max: 3,
                    labels: {
                        formatter: function () {
                            if ($scope.echelleValue[this.value] != null)
                                return $scope.echelleValue[this.value].level;
                            return this.value;
                        }
                    }
                },
                xAxis: {
                    categories: listComp
                },

                series: []
            };


            data.series.push(
                {
                    type: 'column',
                    name: candidat.firstname + " " + candidat.lastname,
                    data: compCand
                }
            );

            var selectedJobs = $scope.getSelectedJobs();
            for (var id in selectedJobs) {
                var c = selectedJobs[id];
                var v = $scope.getSkillsLevel(c); //null; // $scope.getSkillLevel($scope.currentCand, c);
                var n = c.name;

                data.series.push(
                    {
                        type: 'spline',
                        name: n,
                        data: v,
                        marker: {
                            lineWidth: 2
                        }
                    }
                )
            }
            var graph = new Highcharts.Chart(data);

        };

        $scope.drawOneCompMultiCand = function() {
            var comp=$scope.listCompSelected;
            // On va charger en json les donnees pour les introduire dans highcharts
            var data = {
                chart: {
                    renderTo : 'containerOneCompMultiCand'
                },
                title: {
                    text: 'Selected Skill: ' + comp
                },

                xAxis: {
                    categories: [comp]
                },
                series: [],
                yAxis: {
                    plotLines: [],
                    allowDecimals: false,
                    max:10,
                    title: {
                        text: "Year of experience"
                    }
                }
            };
            var max = 0;
            var selectedCandidats = $scope.getSelectedCandidats();

            for(var id in selectedCandidats) {
                var c = selectedCandidats[id];
                var v = $scope.getSkillYear(comp, c);
                var n = c.firstname + " " + c.lastname;
                data.series.push({
                    type: 'column',
                    name: n,
                    data: [v]
                });
                if(v>max)
                    max = v;
            }

            var color =  ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
                '#FF9655', '#FFF263', '#6AF9C4'];
            var i = 0;
            var selectedJobs = $scope.getSelectedJobs();

            var hash = {};

            for (var id in selectedJobs) {
                var c = selectedJobs[id];
                var v = $scope.getSkillYear(comp, c);
                var n = c.name;

                if ($scope.hashmapContains(hash, v)) {
                    hash[v] = "<b>" + hash[v] + "</b> | <b>" + n + "<b>";
                } else {
                    hash[v] = "<b>" + n + "</b>";
                }

                if (v > max)
                    max = v;

            }

            for (var id in hash) {
                data.yAxis.plotLines.push({
                    color: color[i++ % color.length],
                    dashStyle: 'line', // Style of the plot line. Default to solid
                    value: id, // Value of where the line will appear
                    width: 2,
                    zIndex: 100,
                    // Width of the line  
                    label: {
                        text: hash[id] // Content of the label.

                    }
                });
            }
            data.yAxis.max = max;
            var graph = new Highcharts.Chart(data);

        };

        $scope.drawOneCompMultiCandPieChart = function() {
            var comp=$scope.listCompSelected;

            // On va charger en json les donnees pour les introduire dans highcharts
            var data = {
                chart: {
                    renderTo : 'containerOneCompMultiCandPieChart',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Selected Skill: ' + comp
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: []
            };

            var selectedCandidats = $scope.getSelectedCandidats();

            var sub = {
                type: 'pie',
                name: 'Skill ' + comp,
                data: []
            };

            for(var id in selectedCandidats) {
                var c = selectedCandidats[id];
                var v = $scope.getSkillYear(comp, c);
                var n = c.firstname + " " + c.lastname;
                sub.data.push({
                    name: n,
                    y: v
                });
            }
            data.series.push(sub);

            var graph = new Highcharts.Chart(data);


        };

        $scope.drawRadar = function() {
            var data = {
                chart: {
                    renderTo : 'containerRadar',
                    polar: true,
                    type: 'line'
                },

                title: {
                    text: ''
                },

                pane: {
                    size: '80%'
                },

                xAxis: {
                    categories: [],
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },

                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },
                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f} years of experience</b><br/>'
                },

                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    y: 70,
                    layout: 'vertical'
                },

                series: []
            };

            var selectedCandidats = $scope.getSelectedCandidats();

            for(var id in selectedCandidats) {
                var c = selectedCandidats[id];
                var v = $scope.getSkillsYear(c);
                var n = c.firstname + " " + c.name;
                data.series.push({
                    name: n,
                    data: v,
                    pointPlacement: 'on'
                })
            }

            var selectedJobs = $scope.getSelectedJobs();

            for(var id in selectedJobs) {
                var c = selectedJobs[id];
                var v = $scope.getSkillsYear(c);
                var n = c.name;
                data.series.push({
                    name: n,
                    data: v,
                    pointPlacement: 'on'
                })
            }

            data.xAxis.categories = $scope.getSelectedJobCompetences();
            $scope.radar = new Highcharts.Chart(data);


        };

        $scope.drawMultiCompMultiCand = function() {
            var listComp = $scope.getSelectedJobCompetences();
            var listCand = $scope.getSelectedCandidats();
            var listJob = $scope.getSelectedJobs();
            // On va charger en json les donnees pour les introduire dans highcharts
            var data = {
                chart: {
                    renderTo : 'containerMultiCompMultiCand'
                },
                title: {
                    text: 'All SKills'
                },
                xAxis: {
                    categories: listComp
                },
                yAxis:{
                    title:{
                        text: "Year of experience"
                    },
                    allowDecimals: false,

                },


                series: []
            };

            var selectedCandidats = $scope.getSelectedCandidats();
            for(var id in selectedCandidats) {
                var c = selectedCandidats[id];
                var v = $scope.getSkillsYear(c);
                var n = c.firstname + " " + c.lastname;
                data.series.push({
                    type: 'column',
                    name: n,
                    data: v
                })
            }
            var selectedJobs = $scope.getSelectedJobs();
            for(var id in selectedJobs) {
                var c = selectedJobs[id];
                var v = $scope.getSkillsYear(c);
                var n = c.name;
                data.series.push({
                    type: 'spline',
                    name: n,
                    data: v,
                    marker: {
                        lineWidth: 2
                    }
                })
            }
            var graph = new Highcharts.Chart(data);
        };

        $scope.drawOneCompMultiCandLevel = function () {
            var comp = $scope.listCompSelected;

            // On va charger en json les donnees pour les introduire dans highcharts
            var data = {
                chart: {
                    renderTo: 'containerOneCompMultiCandLevel'
                },
                title: {
                    text: 'Skills ' + comp
                },

                xAxis: {
                    categories: [comp]
                },
                series: [],
                yAxis: {
                    title: {
                        text: 'Level'
                    },
                    min: 0,
                    max: 2,
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            if ($scope.echelleValue[this.value] != null)
                                return $scope.echelleValue[this.value].level;
                            return this.value;
                        }

                    },
                    plotLines: []

                }
            };


            var max = 0;

            var selectedCandidats = $scope.getSelectedCandidats();
            for (var id in selectedCandidats) {
                var c = selectedCandidats[id];
                var v = $scope.getSkillLevel(comp, c);
                var n = c.firstname + " " + c.lastname;
                data.series.push({
                    type: 'column',
                    name: n,
                    data: [v]
                });
                if (v > max)
                    max = v;
            }

            var color = ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
                '#FF9655', '#FFF263', '#6AF9C4'];
            var i = 0;
            var selectedJobs = $scope.getSelectedJobs();

            var hash = {};

            for (var id in selectedJobs) {
                var c = selectedJobs[id];
                var v = $scope.getSkillLevel(comp, c);
                var n = c.name;

                if ($scope.hashmapContains(hash, v)) {
                    hash[v] = "<b>" + hash[v] + "</b> | <b>" + n + "<b>";
                } else {
                    hash[v] = "<b>" + n + "</b>";
                }
                if (v > max)
                    max = v;

            }

            for (var id in hash) {
                //var c = selectedJobs[id];
                var v = $scope.getSkillLevel(comp, c);
                var n = c.name;

                data.yAxis.plotLines.push({
                    color: color[i++ % color.length],
                    dashStyle: 'line', // Style of the plot line. Default to solid
                    value: id, // Value of where the line will appear
                    width: 2,
                    zIndex: 100,
                    // Width of the line  
                    label: {
                        text: hash[id]  // Content of the label.

                    }
                });
                if (v > max)
                    max = v;
            }
            data.yAxis.max = max;
            var graph = new Highcharts.Chart(data);
        };

        $scope.prepareData = function () {
            $scope.listCompSelected = $scope.getSelectedJobCompetences()[0];
            $scope.listEchelleSelected = $scope.echelle[0];
            $scope.drawOneCompMultiCand();
            $scope.drawOneCompMultiCandPieChart();
        }

    }]);