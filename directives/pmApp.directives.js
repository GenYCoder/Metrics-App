angular.module("pmApp.directives", [])
    .directive("imageMove", function ($document) {
        return {
            link: function (scope) {


                //controls the left arrow
                angular.element(document.querySelector("#left-arrow")).bind("click", function () {
                    scope.$apply(scope.pageArrow("left"));
                });

                //controls the right arrow
                angular.element(document.querySelector("#right-arrow")).bind("click", function () {
                    scope.$apply(scope.pageArrow("right"));
                });

                //global keypress for arrow 
                $document.bind("keypress", function (e) {

                    if (e.charCode === 44 || e.keyCode === 44) {

                        scope.$apply(scope.pageArrow("left"));
                    } else if (e.charCode === 46 || e.keyCode === 46) {
                        scope.$apply(scope.pageArrow("right"));
                    }
                });

            },
            restrict: "A"
        };
    });