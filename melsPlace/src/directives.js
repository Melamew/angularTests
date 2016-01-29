app.directive("fileRead", ['$window', function ($window) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, element, attributes, control) {
            var error = function (message){ 
                if ('fileError' in attributes){
                    scope.$eval(attributes['fileError'], { '$error' : message });
                }
                scope.$apply();
            }
            var fileReader = new $window.FileReader();
            fileReader.onprogress = function (event) {
                if ('fileProgress' in attributes){
                    scope.$eval(attributes['fileProgress'], {'$loaded': event.loaded, '$total': event.total});
                }
                scope.$apply();
            }
            fileReader.onload = function (event) {
                control.$setViewValue(fileReader.result);
                if ('fileLoaded' in attributes){
                    scope.$eval(attributes['fileLoaded']);
                }
                scope.$apply();
            }
            fileReader.onerror = function(event) {
                error(fileReader.error);
            }
            element.bind('change', function(event) {
                var file = event.target.files[0];
                if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                    error("Specified file is not an image.")
                    return;
                }
                if ('fileName' in attributes){
                    scope.fileName = file.name;
                    scope.$apply();
                }
                fileReader.readAsDataURL(file);
            });
        }
    }
}]);

app.directive("galleryFile", ['$parse', function($parse){
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            var model = $parse(attributes.galleryFile);
            var modelSetter = model.assign;
            var error = function (message) {
                if ('error' in attributes){
                    $parse(attributes['error'])({'$error': message });
                }
            }
            element.bind('change', function(event) {
                var file = event.target.files[0];
                var fileName = file.name;
                if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
                    error("Specified file is not an image.")
                    return;
                }
                if ('fileName' in attributes) {
                    scope.fileName = fileName;
                    scope.$apply();
                }
                modelSetter(scope, file);
                if ('fileSelected' in attributes){
                    scope.$eval(attributes['fileSelected']);
                }
                scope.$apply();
            });
        }
    }
}]);