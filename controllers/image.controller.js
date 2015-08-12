angular.module("image.controller", [])
    .controller("image.controller", ["$scope", "$filter", "$location", "$timeout", "dataStorage", "spService", "siteLocation", function ($scope, $filter, $location, $timeout, dataStorage, spService, siteLocation) {

        //declaring private variables
        var activeTrend = "Manhattan",
            selectedTrendNav = "",
            selectedImageNumber = "img_1",
            counter = 1;

        $scope.maxImageLength = 0;
        $scope.images = [];


        $scope.init = function () {
            if (angular.isUndefined(dataStorage.get("trends"))) {

                spService.getListItems(siteLocation, "Performance Metrics Latest Trends", "?$select=File/Name&$expand=File/Name&$top=2000",
                    function (response) {
                        var jsonData = response.data.d.results;

                        //cleans up the data
                        for (var i = 0, jsonLength = jsonData.length; i < jsonLength; i++) {
                            var filterData = {};
                            filterData.Trend = (jsonData[i].File.Name).match(/^[a-zA-Z]+/g)[0];
                            filterData.FileName = jsonData[i].File.Name;

                            jsonData[i] = filterData;
                        }

                        //store to global
                        dataStorage.add("trends", jsonData);


                        $scope.images = jsonData;
                        $scope.selectedTrend(activeTrend);


                    },
                    function (response) {
                        $location.path("404");
                    }
                );

            } else {

                $scope.images = dataStorage.get("trends");
                $scope.selectedTrend(activeTrend);
            }


        }

        $scope.getSelectedTrend = function () {
            return selectedTrendNav;
        };

        $scope.getTrendClass = function (trend) {
            return selectedTrendNav == trend ? "active-trend" : "";
        }

        $scope.getImageClass = function (id) {
            return id == selectedImageNumber ? "current-image" : "";
        }

        //where an user selects a number in the pagination nav
        $scope.selectedImage = function (id) {
            selectedImageNumber = id;
            counter = parseInt(id.match(/\d+$/g)[0]);
        }

        //does the calculation for the selected trends
        $scope.selectedTrend = function (trend) {
            counter = 1; //this resets to 1 for the counter
            selectedTrendNav = trend;
            selectedImageNumber = "img_1";
            $scope.maxImageLength = ($filter('filter')($scope.images, {
                'Trend': selectedTrendNav
            })).length;
        };

        //view the PDF depending on the category
        $scope.viewPDF = function () {
            var pdfURL = $filter('filter')($scope.trendCategories, {
                'ID': selectedTrendNav
            })[0].PDF;
            window.open(pdfURL, "_blank")
        }

        //controls the pagination for the arrow click
        $scope.pageArrow = function (arrow) {

            if (arrow == "left") {
                if (counter <= 1) {
                    selectedImageNumber = "img_" + $scope.maxImageLength;
                    counter = $scope.maxImageLength;
                } else {
                    selectedImageNumber = "img_" + (counter - 1);
                    counter = counter - 1;
                }

            } else if (arrow == "right") {
                if (counter >= $scope.maxImageLength) {
                    selectedImageNumber = "img_1";
                    counter = 0;
                } else {
                    selectedImageNumber = "img_" + (counter + 1);
                    counter = counter + 1;
                }
            }
        }

        $timeout(function (response) {
            // add trends here with unique id for the images
            // the id is use to track the image and the name will show the nav link
            // note to self in the future this should use d3 js library to self generate the charts
            $scope.trendCategories = [{
                "ID": "Manhattan",
                "Name": "manhattan",
                "PDF": $scope.config.ManhattanLatestTrends.url
            }, {
                "ID": "Regional",
                "Name": "regional",
                "PDF": $scope.config.RegionalLatestTrends.url
            }, {
                "ID": "OR",
                "Name": "or cases by service",
                "PDF": $scope.config.ORCasesLatestTrends.url
            }, {
                "ID": "IAP",
                "Name": "initial active patients",
                "PDF": $scope.config.InitialActivePatients.url
            }, {
                "ID": "Disease",
                "Name": "initial active patients by disease",
                "PDF": $scope.config.IAPDiseases.url
            }, {
                "ID": "Registrations",
                "Name": "registrations",
                "PDF": $scope.config.NewVisitResponse.url
            }, {
                "ID": "Chemo",
                "Name": "chemo",
                "PDF": $scope.config.ChemoLastestTrends.url
            }, {
                "ID": "MSKCC",
                "Name": "total mskcc",
                "PDF": $scope.config.TotalMSKCC.url
            }];
        }, 100);



    }])