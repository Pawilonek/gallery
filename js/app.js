
var galleryApp = angular.module('galleryApp', ['ngRoute', 'ngResource', /*'layoutsController',*/ 'layoutsService', 'authenticationsController', 'authenticationsService',
    'galleriesController', 'galleriesService', 'adminController', 'angularFileUpload', 'filesService']);

galleryApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/galleries', {
                    templateUrl: 'partials/gallery-list.html',
                    controller: 'galleriesCtrl'
                }).
                when('/galleries/:galleryId', {
                    templateUrl: 'partials/gallery.html',
                    controller: 'galleriesCtrl'
                }).
                when('/admin', {
                    templateUrl: 'partials/admin/index.html',
                    controller: 'adminCtrl'
                }).
                when('/admin/galleries/:galleryId', {
                    templateUrl: 'partials/admin/gallery.html',
                    controller: 'adminGalleryCtrl'
                }).
                otherwise({
                    redirectTo: '/galleries'
                });
    }]);

var apiUrl = 'http://localhost/galeria/server/';
var userHash = null;
