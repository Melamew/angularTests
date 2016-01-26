app.controller('picsController', ['$scope', '$http', 'LocationService', function($scope, $http, LocationService) {
    $scope.images = [ { Path: 'uploaded/background.jpg'}, { Path: 'uploaded/IMG_0703.jpg'} ]
    
    $scope.shownImage = { Path: '' };
    
    $scope.doDisplayImage = false;
    
    $scope.displayImage = function(image) {
        $scope.shownImage = image;
        $scope.doDisplayImage = true;
        console.log("shownImage: " + JSON.stringify($scope.shownImage));
        console.log("doDisplayImage: " + $scope.doDisplayImage);
    };
    
    $scope.hideImage = function() {
        $scope.doDisplayImage = false;
        $scope.shownImage = undefined;
        console.log("Hide image");
    }
    
    $scope.onKeyDown = function($event) {
        if (27 == $event.keyCode) $scope.hideImage();
    }
    
    $scope.upload = function(){
        LocationService.goto("/pics/upload");
    }
    
}]);