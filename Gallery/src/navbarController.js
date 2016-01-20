app.controller('navbarController', ['$scope', '$location',
function ($scope, $location) {
    $scope.navPages = [
    {
        Text: 'Main',
        Path: '/',
        Active: true
    },
    {
        Text: 'Pics',
        Path: '/pics',
        Active: false
    }];
    
    $scope.oldButton = $scope.navPages[0];

    $scope.goTo = function(button) {
        console.log("goto: " + button.Active);
        console.log("old: " + $scope.oldButton.Active);
        if ($scope.oldButton) $scope.oldButton.Active = false;
        $location.path(button.Path);
        button.Active = true;
        $scope.oldButton = button;
    }
}]);