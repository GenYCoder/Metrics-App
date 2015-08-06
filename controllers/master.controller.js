//this is the root controller
angular.module("master.controller", [])
    .controller("masterCtrl", function ($scope, $route, $location, $q, spService, dataStorage, siteLocation) {
        //this is used to control the main tabs of latest trends and budget volume


        var currentPath;
        var selectedCategory = $location.path().replace("/", "") || "trends";
        //will be use to show the budget data and will be share across child controllers
        $scope.config = {};

        //event listeners
        $scope.$on('$routeChangeSuccess', function (event, current, previous) {

            currentPath = current.originalPath.replace("/", "");

            if (!(/archive/g).test(currentPath)) {
                selectedCategory = currentPath;
            } else {
                selectedCategory = "volumes";
            }

        });


        var deferredConfig = $q.defer();


        $scope.initConfig = function () {

            //this will get the configurations for the Performance Metric App. This will need to be change in the future 
            //that will use json
            if (dataStorage.isEmpty($scope.config)) {
                spService.getListItems(siteLocation, "PM Configurations", "",
                    function (response) {
                        var configData = response.data.d.results;
                        for (var i = 0; i < configData.length; i++) {
                            $scope.config[configData[i].Title] = {
                                "url": configData[i].URL,
                                "value": configData[i].Value
                            };
                        }

                        deferredConfig.resolve();

                    },
                    function (response) {
                        deferredConfig.reject(response);
                    }
                );

            }
            return deferredConfig.promise;

        }


        $scope.getCategoryClass = function (category) {
            return category === selectedCategory ? "active-category" : "";
        };

        $scope.selectedCategory = function (category) {
            if (category != selectedCategory) {
                selectedCategory = category;
                $location.path(selectedCategory);
            }
        };

        $scope.initConfig();




    })