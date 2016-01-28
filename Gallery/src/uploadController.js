app.controller('uploadController', ['$scope', '$http', 'LocationService', 'CONFIG', function($scope, $http, LocationService, CONFIG) {
    var uploadPath = "http://" + CONFIG.imgServer + "/image";
    
    $scope.canUpload = false;
    
    $scope.fileError = function($error){
        $scope.canUpload = false;
        alert($error);
    }
    
    $scope.fileSelected = function() {
        $scope.canUpload = true;
        console.dir($scope.file);
    }
    
    $scope.upload = function() {
        if (undefined == $scope.file) return;
        
        var fd = new FormData();
        fd.append('file', $scope.file);
        $http.post('uploaded/', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
            }).success(function(){ alert("File should now be there...") }).error(function(){ alert("Something went wrong :c")});
        
        /*$http.post(uploadPath, {
            Path: '/uploaded/' + $scope.fileName,
            Name: $scope.name,
            Description: $scope.description
        });*/
    }
    
    $scope.cancel = function() {
        LocationService.goBack();
    }
}]);