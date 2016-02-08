app.controller('navbarController', ['$scope', '$location', 'LocationService',
function ($scope, $location, LocationService) {
    $scope.navPages = LocationService.getPages();
    $scope.goTo = function(page) {
        LocationService.goto(page);
    }
    
    
}]);