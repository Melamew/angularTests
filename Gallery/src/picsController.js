app.controller('picsController', ['$scope', '$http', function($scope, $http) {
    $scope.images = [ { Path: 'uploaded/background.jpg'}, { Path: 'uploaded/IMG_0715.jpg'} ]
    
    $scope.shownImage;
    
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
    
}]);