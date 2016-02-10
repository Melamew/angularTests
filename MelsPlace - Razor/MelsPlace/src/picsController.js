app.controller("picsController", [
    "$scope", "$http", "$q", "LocationService", "CONFIG", function($scope, $http, $q, LocationService, CONFIG) {
        var apiPath = "http://" + CONFIG.imgServer + "/api/Images";

        $http.get(apiPath).then(function successCallback(payload) {
            $scope.images = payload;
            console.log("Scope images: " + $scope.images.length);
            var promises = [];
            angular.forEach($scope.images, function (value) { promises.push($http.get(apiPath + "/" + value.Id)) });
            $q.all(promises).then(function(imagePayload) {
                var image = $scope.images.filter(function (value) { return value.Id === imagePayload.Id });
                if (image.length !== 1) return;
                image[0] = imagePayload;
            });
        });

        $scope.doDisplayImage = false;

        $scope.displayImage = function(image) {
            $scope.shownImage = image;
            $scope.doDisplayImage = true;
            console.log("doDisplayImage: " + $scope.doDisplayImage.Name);
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