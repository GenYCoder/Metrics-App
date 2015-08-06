var angular = require('angular');

//services
require('angular-router-browserify')(angular)
require('./services/customServices');

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
        "customServices",
        "pmApp.directives",
        "pmApp.controllers",
        "pmApp.filters",
        "ngRoute"
    ])
    .constant("siteLocation", "")
    .config(function ($routeProvider) {
        //this is setting up the configuration for the application upon launch


        //Routing to the templates
        $routeProvider
            .when("/trends", {
                templateUrl: "views/trends.html",
                controller: "imageCtrl"
            })
            .when("/volumes", {
                templateUrl: "views/volumes.html",
                controller: "budgetCtrl"
            })
            .when("/archive.SubA", {
                templateUrl: "views/archive.SubA.html",
                controller: "archiveCtrl"
            })
            .when("/archive.SubC", {
                templateUrl: "views/archive.SubC.html",
                controller: "archiveCtrl"
            })
            .when("/404", {
                templateUrl: "views/404.html"
            })
            .otherwise({
                redirectTo: "/trends"
            });



    });