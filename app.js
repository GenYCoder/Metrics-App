var angular = require('angular');

//services
require('./services/pmApp.services');
require('angular-router-browserify')(angular)
require('./services/dataStorage.service');
require('./services/spRest.service');

//controllers
require('./controllers/pmApp.controllers');
require('./controllers/budget.controller');
require('./controllers/image.controller');
require('./controllers/master.controller');
require('./controllers/archive.controller');

//directives
require('./directives/pmApp.directives');

//filters
require('./filters/pmApp.filters');


angular.module("pmApp", [
        "pmApp.services",
        "pmApp.directives",
        "pmApp.controllers",
        "pmApp.filters"
    ])
    .constant("siteLocation", "")
    .constant("activeVolume", "SubA")
    .config(["$routeProvider", function ($routeProvider) {
        //this is setting up the configuration for the application upon launch


        //Routing to the templates
        $routeProvider
            .when("/trends", {
                templateUrl: "views/trends.html",
                controller: "image.controller"
            })
            .when("/volumes", {
                templateUrl: "views/volumes.html",
                controller: "budget.controller"
            })
            .when("/archive.SubA", {
                templateUrl: "views/archive.SubA.html",
                controller: "archive.controller"
            })
            .when("/archive.SubC", {
                templateUrl: "views/archive.SubC.html",
                controller: "archive.controller"
            })
            .when("/404", {
                templateUrl: "views/404.html"
            })
            .otherwise({
                redirectTo: "/trends"
            });



    }]);