app.controller('uploadController', ['$scope', 'LocationService', function($scope, LocationService) {
    
    $scope.image = undefined;
    
    $scope.openFile = function() {
        
    }
    
    $scope.upload = function() {
        console.log("Upload...");
    }
    
    $scope.cancel = function() {
        LocationService.goto("/");
    }
}]);