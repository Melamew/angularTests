﻿var app = angular.module('galleryApp', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'parts/main.html'
        })
    .when('/pics', {
        controller: 'picsController',
        templateUrl: 'parts/pics.html'
    })
    .otherwise({ redirectTo: '/' });
}

]);