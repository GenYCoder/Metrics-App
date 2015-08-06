angular.module("budget.controller", [])
    .controller("budgetCtrl", function ($scope, $location, $timeout, dataStorage, spService, siteLocation) {
        
        var selectedVolume = "SubA";


        $scope.volumeData = [];



        //changes the data model depending on the state
        $scope.changeModel = function (category) {

            if (category === "SubA") {
                if (angular.isUndefined(dataStorage.get(category))) {

                    spService.getListItems(siteLocation, "PM Institutional Activity Table", "?$filter=Year eq " + $scope.config.CurrentYear.value + " and Month eq '" + $scope.config.CurrentMonth.value + "'",
                        function (response) {
                            dataStorage.add(category, response.data.d.results);
                            $scope.volumeData = dataStorage.get(category);
                        },
                        function (response) {
                            $location.path("404");
                        }
                    );

                } else {
                    $scope.volumeData = dataStorage.get(category);
                }
            } else if (category === "SubB") {
                if (angular.isUndefined(dataStorage.get(category))) {

                    spService.getListItems(siteLocation, "PM Actual vs Actual Table", "",
                        function (response) {
                            dataStorage.add(category, response.data.d.results);
                            $scope.volumeData = dataStorage.get(category);
                        },
                        function (response) {
                            $location.path("404");
                        }
                    );

                } else {
                    $scope.volumeData = dataStorage.get(category);

                }
            } else if (category === "SubC") {
                if (angular.isUndefined(dataStorage.get(category))) {

                    spService.getListItems(siteLocation, "PM Regional Table", "?$filter=Year eq " + $scope.config.CurrentYear.value + " and Month eq '" + $scope.config.CurrentMonth.value + "'",
                        function (response) {
                            dataStorage.add(category, response.data.d.results);
                            $scope.volumeData = dataStorage.get(category);

                        },
                        function (response) {
                            $location.path("404");
                        }
                    );

                } else {
                    $scope.volumeData = dataStorage.get(category);
                }
            }


        };

        $scope.getVolumeClass = function (category) {
            return category === selectedVolume ? "active-sub" : "";
        };

        $scope.getArchiveClass = function () {
            if (selectedVolume === "SubB") {
                return "hide-archive";
            }
        };

        $scope.getSelectedVolume = function () {
            return selectedVolume;
        };


        //changes the view of the volume tab for budget charts
        $scope.selectedVolume = function (category) {
            selectedVolume = category;
            $scope.changeModel(category);
        };

        //viewing the archive
        $scope.viewArchive = function () {
            $location.path("/archive." + selectedVolume);
        };

        $timeout(
            function () {
                $scope.volumeCategories = [{
                    "ID": "SubA",
                    "Name": $scope.config.BudgetvsActual.value
                }, {
                    "ID": "SubB",
                    "Name": $scope.config.ActualVSActual.value
                }, {
                    "ID": "SubC",
                    "Name": $scope.config.RegionalsBudgetvsActual.value
                }];
                $scope.selectedVolume(selectedVolume);
            }

            , 100);



    })