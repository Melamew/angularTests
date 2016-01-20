app.factory('LocationService', ['$location', '$rootScope', function($location, $rootScope) {
    var service =
    {
        pages: [
        {
            Text: 'Main',
            Path: '/',
            Active: true
        },
        {
            Text: 'Pics',
            Path: '/pics',
            Active: false
        }],
        setActive: function(path){
            console.log("setActive: " + path);
            service.pages
                .filter(function(p, n) { return p.Active })
                .forEach(function(p, n) { p.Active = false; });
            service.pages
                .filter(function(p, n) {return p.Path == path })
                .forEach(function(p, n) { p.Active = true; });
        },
        goto: function(page){
            $location.path(page.Path);
        },
        getPages: function(){
            return service.pages;  
        }
    }
    
    $rootScope.$on('$routeChangeSuccess', function(obj, current, previous) {
        service.setActive(current.originalPath);
    });
    
    return service;
}]);