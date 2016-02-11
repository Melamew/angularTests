app.controller("picsController", [
    "$scope", "$http", "$q", "LocationService", "CONFIG", function($scope, $http, $q, LocationService, CONFIG) {
        $scope.images = [];
        var apiPath = "http://" + CONFIG.imgServer + "/api/Images";

        $http.get(apiPath).success(function(payload) {
            var images = payload;
            console.log("Images: " + images.length);
            images.forEach(function(value) {
                console.log("Attempting to get image: " + value.Id);
                $http.get(apiPath + "/" + value.Id).success(function(payload) { $scope.images.push(payload) });
            });
            
        });
        
        $scope.doDisplayImage = false;

        $scope.displayImage = function(image) {
            $scope.shownImage = image;
            $scope.doDisplayImage = true;
            console.log("doDisplayImage: " + $scope.shownImage.Name);
        };

        $scope.hideImage = function() {
            $scope.doDisplayImage = false;
            $scope.shownImage = undefined;
            console.log("Hide image");
        };

        $scope.onKeyDown = function($event) {
            if (27 === $event.keyCode) $scope.hideImage();
        };

        $scope.upload = function() {
            LocationService.goto("/pics/upload");
        };
    }
]);