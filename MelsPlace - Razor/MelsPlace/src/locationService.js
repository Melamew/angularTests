app.factory('LocationService', ['$location', '$rootScope', '$window', function($location, $rootScope, $window) {
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
            if (undefined == path) return;
            console.log("setActive: " + path);
            service.pages
                .filter(function(p, n) { return p.Active })
                .forEach(function(p, n) { p.Active = false; });
            
            var activeIndex = service.pages
                .filter(function(p, n) { return path.indexOf(p.Path) > -1; } )
                .map(function(p, n) { return { Lenth: p.Path.length,
                                             Index: n}});
            
            activeIndex.sort(function (o1, o2) { o1.Length > o2.Lenth });
            if (activeIndex != undefined && activeIndex.length > 0)
                service.pages[activeIndex[activeIndex.length - 1].Index].Active = true;
        },
        
        goto: function(page){
            if (typeof page == "string")
                $location.path(page);
            else
                $location.path(page.Path);
        },
        
        getPages: function(){
            return service.pages;  
        },
        
        goBack: function() {
            $window.history.back();
        }
    }
    
    $rootScope.$on('$routeChangeSuccess', function(obj, current, previous) {
        service.setActive(current.originalPath);
    });
    
    return service;
}]);