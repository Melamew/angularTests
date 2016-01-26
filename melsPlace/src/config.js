app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'mainController',
        templateUrl: 'parts/main.html'
        })
    .when('/pics', {
        controller: 'picsController',
        templateUrl: 'parts/pics.html'
    })
    .when('/pics/upload', {
        controller: 'uploadController',
        templateUrl: 'parts/upload.html'
    })
    .otherwise({ redirectTo: '/' });
    
    
}]);

app.constant('config', {
    siteName: "Mel's Place",
    imgServer: "localhost:8080",
});

app.directive("fileread", [function () {
    return {
        restrict: "A",
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);