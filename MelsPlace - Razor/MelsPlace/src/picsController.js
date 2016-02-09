app.controller("picsController", [
    "$scope", "$http", "LocationService", "CONFIG", function($scope, $http, LocationService, CONFIG) {
        var apiPath = "http://" + CONFIG.imgServer + "/api/Images";
        
        $http({
                method: "GET",
                url: apiPath
            })
            .success(function(data) {
                $scope.images = data;
                $scope.images.forEach(function (img, n) {
                    $http.get(apiPath + "/" + n)
                    .success(function (image) { $scope.images[n].Data = image.Data })
                    .error(function (error) { });
                });
            });

        $scope.shownImage = { Data: "" };

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
        };

        $scope.onKeyDown = function($event) {
            if (27 === $event.keyCode) $scope.hideImage();
        };

        $scope.upload = function() {
            LocationService.goto("/pics/upload");
        };
    }
]);