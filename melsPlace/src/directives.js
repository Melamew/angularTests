app.directive('mpUpload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes){
            var fileReader = new FileReader();
            element.bind('change', function(event){
                var fileName =  event.target.files[0].name;
                if ('mpFilename' in attributes){
                    console.log("Filename: " + fileName);
                    scope.fileName = fileName;
                    scope.$apply();
                }
            });
        }
    }
})