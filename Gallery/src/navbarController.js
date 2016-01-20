app.controller('navbarController', ['$scope', '$location',
function ($scope, $location) {
    $scope.navPages = [
    {
        Text: 'Main',
        Path: '/'
    },
    {
        Text: 'Pics',
        Path: '/pics'
    }];

    $scope.goTo = function(path) {
        $location.path(path);
    }
}]);