angular.module("archive.controller", [])
    .controller("archiveCtrl", function ($scope, $location, $timeout, siteLocation, spService) {

        var currentArchivePath = $location.path().replace("/", "");
        
        //goes by path and list name
        var listNameRoutes = {
            "archive.SubA": "PM Institutional Activity Table",
            "archive.SubC": "PM Regional Table"
        };

        $scope.currentYear = "";
        $scope.startingYear = currentArchivePath === "archive.SubA" ? 2012 : 2015;
        $scope.volumeData = []; //dymamic changing data 

        $scope.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        //I would keep adding onto here for any new Data Model. Would change if necessary of data structure
        //is similar
        $scope.getData = function (year, month) {
            //will only search if year and month are selected
            if (!angular.isUndefined(year) && !angular.isUndefined(month)) {


                spService.getListItems(siteLocation, listNameRoutes[currentArchivePath], "?$filter=Year eq " + year + " and Month eq '" + month + "'",
                    function (response) {
                        $scope.volumeData = response.data.d.results;

                        //if no data then return an error message
                        if ($scope.volumeData.length === 0) {
                            $scope.errorMsg = "No data exist for " + $scope.queryMonth + " " + $scope.queryYear;
                        } else {
                            $scope.errorMsg = "";
                        }
                    },
                    function (response) {
                        $location.path("404");
                    }
                );

            }

        };

        $scope.viewNormal = function () {
            $location.path("volumes");
        };

        //this needs to be run for precise event matching for setting variables
        $timeout(function () {
            $scope.queryYear = $scope.currentYear = $scope.config.CurrentYear.value;
            $scope.queryMonth = $scope.config.CurrentMonth.value;
            $scope.getData($scope.queryYear, $scope.queryMonth);

        }, 100);



    });