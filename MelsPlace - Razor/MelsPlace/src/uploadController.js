app.controller('uploadController', ["$scope", "$http", "LocationService", "CONFIG", function($scope, $http, LocationService, CONFIG) {
    var uploadPath = "http://" + CONFIG.imgServer + "/api/Images";
    
    $scope.canUpload = false;
    
    $scope.fileError = function($error){
        $scope.canUpload = false;
        alert($error);
    }
    
    $scope.fileSelected = function() {
        console.dir($scope.file);
        if (undefined == $scope.file) return;
        var reader = new FileReader();
        reader.onprogress = function (event) {
            console.log("onprogress " + event.total / 100 * event.loaded + "%");
        };
        reader.onerror = function(event) {
            console.log("onerror");
            alert("Could not read file");
            console.log(event.data);
            $scope.canUpload = false;
            $scope.$apply();
        }
        reader.onload = function () {
            console.log("onload");
            $scope.data = btoa(reader.result);
            $scope.canUpload = true;
            $scope.$apply();
        }
        reader.readAsBinaryString($scope.file);
    }
    
    $scope.upload = function() {
        if (undefined == $scope.file) return;

        $scope.canUpload = false;
        $http.post(uploadPath, JSON.stringify({
            Name: $scope.name,
            Description: $scope.description,
            Type: $scope.file.name.split(".").pop(),
            Data: $scope.data
        }),
        {
            transformRequest: angular.identity,
            headers: { 'Content-Type': "application/json" }
        }).success(function() {
            LocationService.goBack();
        }).error(function() {
            alert("Something went wrong :c");
        });

        $scope.data = undefined;
        $scope.name = undefined;
        $scope.description = undefined;
    }
    
    $scope.cancel = function() {
        LocationService.goBack();
    }
}]);